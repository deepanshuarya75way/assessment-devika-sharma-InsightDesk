import { Filter, Plus, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import FeedbackTable from "../components/FeedbackTable";
import { getFeedback } from "../services/api";

export default function Feedback() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const loadFeedback = async () => {
      try {
        const data = await getFeedback();
        setRows(data);
      } catch (error) {
        console.error("Failed to load feedback:", error);
      } finally {
        setLoading(false);
      }
    };

    loadFeedback();
  }, []);

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      const customer = row.customer?.toLowerCase() || "";
      const feedback = row.feedback?.toLowerCase() || "";
      const searchText = search.toLowerCase();

      const matchesSearch =
        customer.includes(searchText) ||
        feedback.includes(searchText);

      const matchesFilter =
        filter === "All" ||
        row.sentiment === filter ||
        row.priority === filter;

      return matchesSearch && matchesFilter;
    });
  }, [rows, search, filter]);

  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">CUSTOMER VOICE</span>

          <h1>Feedback</h1>

          <p>
            Search, filter and review the latest customer feedback.
          </p>
        </div>

        <button className="primary-btn">
          <Plus size={17} />
          Add feedback
        </button>
      </div>

      <section className="section-card">
        <div className="toolbar">
          <div className="table-search">
            <Search size={17} />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search customers or feedback..."
            />
          </div>

          <div className="toolbar-actions">
            <div className="filter-select">
              <Filter size={16} />

              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Negative">Negative</option>
                <option value="Positive">Positive</option>
                <option value="Neutral">Neutral</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <button className="ghost-btn">
              Export CSV
            </button>
          </div>
        </div>

        {loading ? (
          <div
            style={{
              padding: "40px",
              textAlign: "center",
              color: "#7f8395",
              fontSize: "12px",
            }}
          >
            Loading feedback...
          </div>
        ) : filteredRows.length === 0 ? (
          <div
            style={{
              padding: "40px",
              textAlign: "center",
              color: "#7f8395",
              fontSize: "12px",
            }}
          >
            No feedback found.
          </div>
        ) : (
          <FeedbackTable rows={filteredRows} />
        )}
      </section>
    </div>
  );
}
