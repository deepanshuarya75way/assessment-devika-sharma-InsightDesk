import { ChevronRight } from "lucide-react";

const tone = {
  Negative: "badge danger",
  Positive: "badge success",
  Neutral: "badge neutral",
};

const priorityTone = {
  High: "priority high",
  Medium: "priority medium",
  Low: "priority low",
};

export default function FeedbackTable({ rows, compact = false }) {
  return (
    <div className="table-wrap">
      <table className="feedback-table">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Feedback</th>
            <th>Category</th>
            <th>Sentiment</th>
            <th>Priority</th>
            {!compact && <th />}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td>
                <div className="customer-cell">
                  <div className="customer-avatar">{row.customer[0]}</div>
                  <div>
                    <strong>{row.customer}</strong>
                    <span>{row.time}</span>
                  </div>
                </div>
              </td>
              <td className="feedback-copy">{row.feedback}</td>
              <td>{row.category}</td>
              <td>
                <span className={tone[row.sentiment]}>{row.sentiment}</span>
              </td>
              <td>
                <span className={priorityTone[row.priority]}>{row.priority}</span>
              </td>
              {!compact && (
                <td className="row-action">
                  <button className="table-arrow" aria-label="View feedback">
                    <ChevronRight size={17} />
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
