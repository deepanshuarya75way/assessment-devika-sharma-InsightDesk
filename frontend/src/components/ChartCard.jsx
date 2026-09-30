export default function ChartCard({ title, subtitle, action, children, className = "" }) {
  return (
    <section className={`chart-card ${className}`}>
      <div className="section-header">
        <div>
          <h3>{title}</h3>
          {subtitle && <p>{subtitle}</p>}
        </div>
        {action && <div>{action}</div>}
      </div>
      {children}
    </section>
  );
}
