from flask import Flask, jsonify, request
from flask_cors import CORS
from model import FeedbackModel
from pathlib import Path
import csv

app = Flask(__name__)
CORS(app)

MODEL = FeedbackModel(Path(__file__).parent / "dataset.csv")

FEEDBACK_FILE = Path(__file__).parent / "feedback.csv"

FEEDBACK_FIELDS = [
"feedback",
"predicted_sentiment",
"predicted_category",
"predicted_priority",
"predicted_intent",
"sentiment_confidence",
"category_confidence",
"priority_confidence",
"prediction_correct",
"corrected_sentiment",
"corrected_category",
"corrected_priority"
]

@app.get("/")
def home():
    return jsonify({
        "message": "InsightDesk AI API",
        "status": "running",
        "endpoints": [
            "GET /api/feedback",
            "GET /api/stats",
            "POST /api/analyze",
            "GET /api/health"
        ]
    })


@app.get("/api/health")
def health():
    return jsonify({"status": "healthy"})


@app.get("/api/feedback")
def get_feedback():
    return jsonify(MODEL.get_feedback())


@app.get("/api/stats")
def get_stats():
    return jsonify(MODEL.get_stats())


@app.post("/api/analyze")
def analyze():
    data = request.get_json(silent=True) or {}
    text = str(data.get("text", "")).strip()

    if not text:
        return jsonify({"error": "Feedback text is required"}), 400

    try:
        result = MODEL.predict(text)
        return jsonify(result)

    except Exception as exc:
        return jsonify({
            "error": f"Analysis failed: {exc}"
        }), 500

@app.post("/api/feedback")
def collect_feedback():
    data= request.get_json(silent= True) or {}
    feedback = str(data.get("feedback","")).strip()

    if not feedback:
        return jsonify({
            "error":"Feedback is required"
        }),400

    if FEEDBACK_FILE.exists():
        with open(FEEDBACK_FILE, "r", newline="",encoding="utf-8") as file: 
            reader= csv.DictReader(file)

            for row in reader:
                if row.get("feedback","").strip().lower()== feedback.lower():
                    return jsonify({
                        "error":"This feedback has already been submitted"
                    }), 409

    record = { 
        "feedback": feedback,

            "predicted_sentiment":
            data.get("predictedSentiment",""),

        "predicted_category":
            data.get("predictedCategory",""),

        "predicted_priority":
            data.get("predictedIntent",""),

        "sentiment_confidence":
            data.get("sentimentConfidence",""),

        "category_confidence":
            data.get("categoryConfidence",""),

        "priority_confidence":
            data.get("priorityConfidence",""),

        "prediction_correct":
            data.get("predictedCorrect", False),

        "corrected_sentiment":
            data.get("correctedSentiment",""),

        "corrected_category":
            data.get("correctedCategory",""),

         "corrected_priority":
            data.get("correctedPriority","")  
    }

    try:
        file_exists= FEEDBACK_FILE.exists()

        with open(
            FEEDBACK_FILE,
            "a",
            newline="",
            encoding="utf-8"
        ) as file:

            writer = csv.DictWriter(
            file,
            fieldnames=FEEDBACK_FIELDS
            )

            if not file_exists:
                writer.writerheader()

            writer.writerow(record)
            
            return jsonify({
                "message":"Feedback collected successfuly"
            }),201

    except Exception as exc:
        return jsonify({
                            "error": f"could not dave the feedvack:{exc}"
                        }),500

@app.errorhandler(404)
def not_found(_):
    return jsonify({"error": "Endpoint not found"}), 404


@app.errorhandler(500)
def server_error(_):
    return jsonify({"error": "Internal server error"}), 500


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )