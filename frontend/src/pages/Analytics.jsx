import {
  Area,
  AreaChart,
  CartesianGrid,
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import ChartCard from "../components/ChartCard";

const monthly = [
  { month: "Apr", positive: 120, negative: 84 },
  { month: "May", positive: 141, negative: 96 },
  { month: "Jun", positive: 163, negative: 110 },
  { month: "Jul", positive: 151, negative: 92 },
  { month: "Aug", positive: 184, negative: 118 },
  { month: "Sep", positive: 202, negative: 108 },
];

const resolution = [
  { category: "Payment", hours: 13 },
  { category: "Login", hours: 8 },
  { category: "Delivery", hours: 21 },
  { category: "Technical", hours: 26 },
  { category: "Support", hours: 7 },
];

export default function Analytics() {
  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">REPORTING</span>
          <h1>Analytics</h1>
          <p>Understand trends across sentiment, categories and resolution time.</p>
        </div>
        <button className="ghost-btn">Last 6 months ▾</button>
      </div>

      <div className="analytics-kpis">
        <div className="mini-kpi">
          <span>Positive feedback</span>
          <strong>61.8%</strong>
          <small>↑ 7.3% month over month</small>
        </div>
        <div className="mini-kpi">
          <span>Negative feedback</span>
          <strong>38.2%</strong>
          <small>↓ 4.2% month over month</small>
        </div>
        <div className="mini-kpi">
          <span>Avg. resolution</span>
          <strong>18.4h</strong>
          <small>↓ 11.2% month over month</small>
        </div>
        <div className="mini-kpi">
          <span>AI confidence</span>
          <strong>91.6%</strong>
          <small>Across all classifications</small>
        </div>
      </div>

      <div className="two-column-grid">
        <ChartCard title="Sentiment trend" subtitle="Monthly positive vs negative feedback">
          <div className="chart-box tall">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthly}>
                <defs>
                  <linearGradient id="aPos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6d5dfc" stopOpacity={0.24} />
                    <stop offset="100%" stopColor="#6d5dfc" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="aNeg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ef476f" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#ef476f" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="#e9eaf2" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="positive"
                  stroke="#6d5dfc"
                  strokeWidth={2.5}
                  fill="url(#aPos)"
                />
                <Area
                  type="monotone"
                  dataKey="negative"
                  stroke="#ef476f"
                  strokeWidth={2.5}
                  fill="url(#aNeg)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Resolution time" subtitle="Average hours to resolve by category">
          <div className="chart-box tall">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={resolution} layout="vertical" margin={{ left: 6, right: 10 }}>
                <CartesianGrid horizontal={false} stroke="#e9eaf2" />
                <XAxis type="number" axisLine={false} tickLine={false} />
                <YAxis
                  dataKey="category"
                  type="category"
                  width={76}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip />
                <Bar dataKey="hours" fill="#25b7d3" radius={[0, 7, 7, 0]} barSize={18} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <section className="section-card insight-panel">
        <div className="section-header">
          <div>
            <span className="eyebrow">AUTOMATED INSIGHT</span>
            <h3>What changed this month?</h3>
          </div>
          <span className="insight-badge">AI generated</span>
        </div>

        <div className="insight-grid">
          <div>
            <strong>Payment issues decreased</strong>
            <p>
              Payment-related negative feedback fell by 9.4% compared with
              August, reducing the overall high-priority queue.
            </p>
          </div>
          <div>
            <strong>Technical tickets take longer</strong>
            <p>
              Technical issues have the highest average resolution time at
              26 hours and represent 15% of total feedback.
            </p>
          </div>
          <div>
            <strong>Support sentiment remains strong</strong>
            <p>
              Support-related feedback has the highest positive sentiment and
              the lowest average resolution time.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
