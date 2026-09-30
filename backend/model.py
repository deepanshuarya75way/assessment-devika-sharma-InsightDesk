import re
import numpy as np
import pandas as pd

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics.pairwise import cosine_similarity


class FeedbackModel:

    def __init__(self, dataset_path):

        self.dataset_path = dataset_path

        self.df = pd.read_csv(dataset_path)
        self.df = self.df.fillna("")

        required_columns = {
            "text",
            "sentiment",
            "category",
            "priority"
        }

        missing = required_columns - set(self.df.columns)

        if missing:
            raise ValueError(
                f"Missing dataset columns: {sorted(missing)}"
            )

        self.vectorizer = TfidfVectorizer(
            lowercase=True,
            stop_words="english",
            ngram_range=(1, 2),
            max_features=3000
        )

        # Convert text to numerical features
        X = self.vectorizer.fit_transform(
            self.df["text"].astype(str)
        )

        # Three separate classifiers
        self.sentiment_model = LogisticRegression(
            max_iter=1000
        )

        self.category_model = LogisticRegression(
            max_iter=1000
        )

        self.priority_model = LogisticRegression(
            max_iter=1000
        )

        # Train models
        self.sentiment_model.fit(
            X,
            self.df["sentiment"]
        )

        self.category_model.fit(
            X,
            self.df["category"]
        )

        self.priority_model.fit(
            X,
            self.df["priority"]
        )

        # Save vectors for similarity search
        self.feedback_vectors = X

    @staticmethod
    def clean_text(text):

        text = text.lower()

        text = re.sub(
            r"[^a-z0-9\s]",
            " ",
            text
        )

        text = re.sub(
            r"\s+",
            " ",
            text
        ).strip()

        return text

    @staticmethod
    def confidence(model, X):

        probabilities = model.predict_proba(X)[0]

        return round(
            float(np.max(probabilities)) * 100,
            1
        )

    def predict(self, text):

        cleaned = self.clean_text(text)

        X = self.vectorizer.transform(
            [cleaned]
        )

        sentiment = str(
            self.sentiment_model.predict(X)[0]
        ).title()

        category = str(
            self.category_model.predict(X)[0]
        ).title()

        priority = str(
            self.priority_model.predict(X)[0]
        ).title()

        sentiment_conf = self.confidence(
            self.sentiment_model,
            X
        )

        category_conf = self.confidence(
            self.category_model,
            X
        )

        priority_conf = self.confidence(
            self.priority_model,
            X
        )

        # Similarity search
        similarities = cosine_similarity(
            X,
            self.feedback_vectors
        )[0]

        best_indexes = np.argsort(
            similarities
        )[::-1][:3]

        similar_feedback = []

        for idx in best_indexes:

            score = round(
                float(similarities[idx]) * 100,
                1
            )

            if score <= 0:
                continue

            row = self.df.iloc[int(idx)]

            similar_feedback.append({
                "id": f"FB{int(idx) + 1:03d}",
                "text": str(row["text"]),
                "category": str(
                    row["category"]
                ).title(),
                "sentiment": str(
                    row["sentiment"]
                ).title(),
                "similarity": score
            })

        intent = self.infer_intent(
            cleaned,
            category,
            priority
        )

        return {
            "sentiment": sentiment,
            "sentiment_confidence": sentiment_conf,

            "category": category,
            "category_confidence": category_conf,

            "priority": priority,
            "priority_confidence": priority_conf,

            "intent": intent,

            "similar_feedback": similar_feedback
        }

    @staticmethod
    def infer_intent(
        text,
        category,
        priority
    ):

        if any(
            word in text
            for word in [
                "refund",
                "deducted",
                "charged",
                "transaction"
            ]
        ):
            return "Failed Transaction"

        if any(
            word in text
            for word in [
                "login",
                "password",
                "sign in",
                "account"
            ]
        ):
            return "Account Access"

        if any(
            word in text
            for word in [
                "crash",
                "error",
                "bug",
                "freeze"
            ]
        ):
            return "Application Error"

        if priority == "High":
            return "Urgent Customer Complaint"

        return f"{category} Feedback"

    def get_feedback(self):

        result = []

        for idx, row in self.df.iterrows():

            result.append({
                "id": f"FB{idx + 1:03d}",

                "customer": str(
                    row.get(
                        "customer",
                        f"Customer {idx + 1}"
                    )
                ),

                "feedback": str(
                    row["text"]
                ),

                "category": str(
                    row["category"]
                ).title(),

                "sentiment": str(
                    row["sentiment"]
                ).title(),

                "priority": str(
                    row["priority"]
                ).title(),

                "time": str(
                    row.get(
                        "time",
                        "Recently"
                    )
                )
            })

        return result

    def get_stats(self):

        total = len(self.df)

        negative_count = int(
            (
                self.df["sentiment"].str.lower()
                == "negative"
            ).sum()
        )

        high_count = int(
            (
                self.df["priority"].str.lower()
                == "high"
            ).sum()
        )

        positive_count = int(
            (
                self.df["sentiment"].str.lower()
                == "positive"
            ).sum()
        )

        return {
            "total": total,

            "negative": round(
                (negative_count / total) * 100,
                1
            ) if total else 0,

            "high_priority": high_count,

            "avg_resolution": 18.4,

            "positive": round(
                (positive_count / total) * 100,
                1
            ) if total else 0
        }


if __name__ == "__main__":

    model = FeedbackModel("dataset.csv")

    print(
        model.predict(
            "My money was deducted but "
            "the payment failed"
        )
    )