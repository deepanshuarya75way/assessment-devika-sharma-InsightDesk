# InsightDesk AI

**InsightDesk** is an AI-powered customer feedback intelligence platform built with **React.js, Flask, and Python**.

It helps analyze customer feedback by classifying messages based on **sentiment, category, and priority**, while also finding similar feedback using **TF-IDF and cosine similarity**.

## Tech Stack

*Frontend*: React, Vite, Recharts

*Backend*: Flask, Python

*AI/ML*: scikit-learn, Pandas, NumPy



## Requirements

Make sure the following are installed:

* **Node.js 20.19+ or 22.12+**
* **Python 3.10+**
* npm

Vite 8 requires Node.js 20.19+ or 22.12+.

## ScreenShots
<img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/01e05849-5358-446b-9d79-ef5d61645068" />

<img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/e3370412-d9a4-442c-8ac5-7185244cafb2" />

## Known Limitations

Dashboard analytics are partly demo/static.
No token based authentication.
CSV used instead of a database.
Some Settings, Reports, and Upload options are UI placeholders.
ML model is trained when the backend starts.
Dataset is for demonstration purposes.


## Run the Project

The frontend and backend need to run separately.

### 1. Clone the repository

```bash
git clone https://github.com/devikasharma0810/InsightDesk.git
cd InsightDesk
```

---

## 2. Start the Backend

Open a terminal and navigate to the backend:

```bash
cd backend
```

### Create a virtual environment

#### Windows

```bash
python -m venv venv
venv\Scripts\activate
```

#### macOS / Linux

```bash
python3 -m venv venv
source venv/bin/activate
```

### Install dependencies

```bash
python -m pip install -r requirements.txt
```

### Start Flask

```bash
python app.py
```

The backend will run at:

```text
http://localhost:5000
```

Check the backend:

```text
http://localhost:5000/api/health
```

Expected response:

```json
{
  "status": "healthy"
}
```

The Flask application exposes the health, feedback, statistics, and AI analysis endpoints directly from `app.py`.

---

## 3. Start the Frontend

Open a **second terminal**.

From the project root:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the URL shown by Vite, normally:

```text
http://localhost:5173
```

The frontend uses React Router and currently provides the following routes: `/dashboard`, `/feedback`, `/ai`, and `/analytics`.

---


### Optional environment variable

Create:

```text
frontend/.env.local
```

with:

```env
VITE_API_URL=http://localhost:5000/api
```

For normal local development, this file is optional because the frontend already uses the same URL as its default.

---

## API Endpoints

| Method | Endpoint        | Purpose                        |
| ------ | --------------- | ------------------------------ |
| GET    | `/api/health`   | Check backend status           |
| GET    | `/api/feedback` | Get customer feedback          |
| GET    | `/api/stats`    | Get feedback statistics        |
| POST   | `/api/analyze`  | Analyze a new feedback message |

## Dataset

The dataset is located at:

```text
backend/dataset.csv
```

It contains customer feedback and labels used by the application.

Current columns:

```text
customer
text
sentiment
category
priority
time
date
resolution_hours
```

The repository currently contains **200 feedback records**.

Example:

```csv
customer,text,sentiment,category,priority,time,date,resolution_hours
Rahul Mehta,Payment failed but the amount was deducted from my account,negative,payment,high,1 hr ago,2026-04-01,11
```

---


### Analytics

Provides visualizations for feedbac
