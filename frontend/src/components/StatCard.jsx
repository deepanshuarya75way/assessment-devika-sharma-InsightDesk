import { ArrowDownRight, ArrowUpRight } from "lucide-react";

export default function StatCard({ label, value, change, positive = true, icon: Icon }) {
  return (
    <div className="stat-card">
      <div className="stat-top">
        <div className="stat-icon">
          <Icon size={18} />
        </div>
        <span className="stat-label">{label}</span>
      </div>

      <div className="stat-value">{value}</div>

      <div className={`stat-change ${positive ? "positive" : "negative"}`}>
        {positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        {change}
        <span>vs last month</span>
      </div>
    </div>
  );
}
