import { BrainCircuit, CheckCircle2, Loader2, Sparkles, WandSparkles } from "lucide-react";
import { useState } from "react";
import { analyzeFeedback } from "../services/api";

const examples = [
  "My money was deducted but the payment failed and I still haven't received a refund.",
  "The app keeps crashing whenever I try to open the checkout page.",
  "The delivery was earlier than expected. Excellent experience!",
];

export default function AIAnalyze() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

const analyze = async () => {
  if (!text.trim()) return;

  setLoading(true);
  setResult(null);

  try {
    const data = await analyzeFeedback(text);
    setResult(data);
  } catch (error) {
    alert(error.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">INTELLIGENCE LAYER</span>
          <h1>AI Analyze</h1>
          <p>Turn unstructured feedback into useful support signals.</p>
        </div>
      </div>

      <div className="ai-layout">
        <section className="ai-input-card">
          <div className="ai-title">
            <div className="ai-icon-large">
              <WandSparkles size={22} />
            </div>
            <div>
              <h2>Analyze customer feedback</h2>
              <p>Paste a complaint, review or support message below.</p>
            </div>
          </div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Example: My payment failed but the money was deducted..."
          />

          <div className="example-list">
            <span>Try an example:</span>
            {examples.map((example) => (
              <button key={example} onClick={() => setText(example)}>
                {example}
              </button>
            ))}
          </div>

          <div className="ai-actions">
            <span>
              <Sparkles size={15} />
              Powered by your Python ML pipeline
            </span>
            <button className="primary-btn" onClick={analyze} disabled={loading}>
              {loading ? <Loader2 className="spin" size={17} /> : <BrainCircuit size={17} />}
              {loading ? "Analyzing..." : "Analyze with AI"}
            </button>
          </div>
        </section>

        <section className="ai-output-card">
          {!result && !loading && (
            <div className="empty-ai">
              <div className="empty-ai-icon">
                <BrainCircuit size={28} />
              </div>
              <h3>Your analysis will appear here</h3>
              <p>
                InsightDesk will classify sentiment, category and priority and
                return confidence scores.
              </p>
            </div>
          )}

          {loading && (
            <div className="empty-ai">
              <Loader2 className="spin" size={34} />
              <h3>Analyzing feedback...</h3>
              <p>Running preprocessing and classification.</p>
            </div>
          )}

          {result && (
            <>
              <div className="analysis-header">
                <div>
                  <span className="eyebrow">AI RESULT</span>
                  <h2>Analysis complete</h2>
                </div>
                <div className="success-pill">
                  <CheckCircle2 size={15} />
                  Ready
                </div>
              </div>

              <div className="result-grid">
                <ResultBlock
                  title="Sentiment"
                  value={result.sentiment}
                  confidence={result.sentimentConfidence}
                />
                <ResultBlock
                  title="Category"
                  value={result.category}
                  confidence={result.categoryConfidence}
                />
                <ResultBlock
                  title="Priority"
                  value={result.priority}
                  confidence={result.priorityConfidence}
                />
                <ResultBlock title="Intent" value={result.intent} confidence={null} />
              </div>

              <div className="similar-box">
                <div>
                  <span className="eyebrow">SIMILAR FEEDBACK</span>
                  <h3>3 matching issues found</h3>
                </div>
                <span className="similar-score">0.87 avg. similarity</span>
              </div>

              <div className="similar-item">
                <div className="similar-index">01</div>
                <div>
                  <strong>Payment deducted but order failed.</strong>
                  <span>Payment · Negative · 91% similar</span>
                </div>
              </div>

              <div className="similar-item">
                <div className="similar-index">02</div>
                <div>
                  <strong>Transaction failed after the amount was charged.</strong>
                  <span>Payment · Negative · 87% similar</span>
                </div>
              </div>

              <div className="similar-item">
                <div className="similar-index">03</div>
                <div>
                  <strong>Checkout returned an error after payment.</strong>
                  <span>Technical · Negative · 82% similar</span>
                </div>
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}

function ResultBlock({ title, value, confidence }) {
  return (
    <div className="result-block">
      <span>{title}</span>
      <strong>{value}</strong>
      {confidence !== null && (
        <>
          <div className="confidence-row">
            <div className="confidence-track">
              <div style={{ width: `${confidence}%` }} />
            </div>
            <b>{confidence}%</b>
          </div>
          <small>confidence</small>
        </>
      )}
    </div>
  );
}
