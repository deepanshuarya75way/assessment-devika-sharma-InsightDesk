from flask import Flask, jsonify, request
from flask_cors import CORS
from model import FeedbackModel
from pathlib import Path

app = Flask(__name__)
CORS(app)

MODEL = FeedbackModel(Path(__file__).parent / "dataset.csv")


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