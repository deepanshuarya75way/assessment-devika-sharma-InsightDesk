import {
  AlertTriangle,
  Clock3,
  MessageSquareText,
  ThumbsDown,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import StatCard from "../components/StatCard";
import ChartCard from "../components/ChartCard";
import FeedbackTable from "../components/FeedbackTable";

const trendData = [
  { day: "1", positive: 34, negative: 22 },
  { day: "5", positive: 42, negative: 26 },
  { day: "10", positive: 37, negative: 29 },
  { day: "15", positive: 55, negative: 31 },
  { day: "20", positive: 48, negative: 24 },
  { day: "25", positive: 61, negative: 32 },
  { day: "30", positive: 67, negative: 28 },
];

const categoryData = [
  { name: "Payment", value: 31 },
  { name: "Login", value: 24 },
  { name: "Delivery", value: 18 },
  { name: "Technical", value: 15 },
  { name: "Other", value: 12 },
];

const categoryColors = ["#6d5dfc", "#25b7d3", "#f59e0b", "#ef476f", "#64748b"];

const feedback = [
  {
    id: 1,
    customer: "Rahul Mehta",
    feedback: "Money was deducted but the payment failed.",
    category: "Payment",
    sentiment: "Negative",
    priority: "High",
    time: "12 min ago",
  },
  {
    id: 2,
    customer: "Priya Sharma",
    feedback: "I haven't been able to log into my account since morning.",
    category: "Login",
    sentiment: "Negative",
    priority: "Medium",
    time: "42 min ago",
  },
  {
    id: 3,
    customer: "Aman Verma",
    feedback: "The delivery reached earlier than expected. Great service!",
    category: "Delivery",
    sentiment: "Positive",
    priority: "Low",
    time: "1 hr ago",
  },
  {
    id: 4,
    customer: "Neha Singh",
    feedback: "The app crashes every time I open the checkout page.",
    category: "Technical",
    sentiment: "Negative",
    priority: "High",
    time: "2 hr ago",
  },
];

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      <strong>Day {label}</strong>
      {payload.map((item) => (
        <div key={item.dataKey}>
          <span>{item.name}</span>
          <b>{item.value}</b>
        </div>
      ))}
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">OVERVIEW</span>
          <h1>Good morning, Devika</h1>
          <p>Here’s what’s happening with your customer feedback.</p>
        </div>
        <button className="primary-btn">
          <MessageSquareText size={17} />
          New feedback
        </button>
      </div>

      <div className="stats-grid">
        <StatCard
          label="Total feedback"
          value="1,248"
          change="12.4%"
          icon={MessageSquareText}
        />
        <StatCard
          label="Negative sentiment"
          value="38.2%"
          change="4.2%"
          positive={false}
          icon={ThumbsDown}
        />
        <StatCard
          label="High priority"
          value="126"
          change="8.1%"
          positive={false}
          icon={AlertTriangle}
        />
        <StatCard
          label="Avg. resolution"
          value="18.4h"
          change="11.2%"
          icon={Clock3}
        />
      </div>

      <div className="two-column-grid">
        <ChartCard
          title="Sentiment overview"
          subtitle="Daily feedback volume over the last 30 days"
          action={<button className="ghost-btn">Last 30 days ▾</button>}
        >
          <div className="chart-box">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="positiveFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6d5dfc" stopOpacity={0.24} />
                    <stop offset="100%" stopColor="#6d5dfc" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="negativeFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ef476f" stopOpacity={0.18} />
                    <stop offset="100%" stopColor="#ef476f" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="#e9eaf2" />
                <XAxis dataKey="day" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} width={28} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="positive"
                  name="Positive"
                  stroke="#6d5dfc"
                  strokeWidth={2.5}
                  fill="url(#positiveFill)"
                />
                <Area
                  type="monotone"
                  dataKey="negative"
                  name="Negative"
                  stroke="#ef476f"
                  strokeWidth={2.5}
                  fill="url(#negativeFill)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="legend-row">
            <span><i className="legend-dot purple" /> Positive</span>
            <span><i className="legend-dot pink" /> Negative</span>
          </div>
        </ChartCard>

        <ChartCard
          title="Issue categories"
          subtitle="What customers are talking about"
        >
          <div className="donut-layout">
            <div className="donut-box">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={63}
                    outerRadius={88}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={entry.name} fill={categoryColors[index]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="donut-center">
                <strong>1,248</strong>
                <span>feedback</span>
              </div>
            </div>

            <div className="category-legend">
              {categoryData.map((item, index) => (
                <div className="category-row" key={item.name}>
                  <span>
                    <i
                      className="legend-dot"
                      style={{ background: categoryColors[index] }}
                    />
                    {item.name}
                  </span>
                  <strong>{item.value}%</strong>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>
      </div>

      <section className="section-card">
        <div className="section-header">
          <div>
            <h3>Recent feedback</h3>
            <p>The latest customer issues detected by InsightDesk.</p>
          </div>
          <button className="ghost-btn">View all</button>
        </div>
        <FeedbackTable rows={feedback} compact />
      </section>
    </div>
  );
}
