import {
  BarChart3,
  BrainCircuit,
  ChevronLeft,
  FileText,
  LayoutDashboard,
  MessageSquareText,
  Settings,
  Sparkles,
  UploadCloud,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const mainLinks = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/feedback", label: "Feedback", icon: MessageSquareText },
  { to: "/ai", label: "AI Analyze", icon: BrainCircuit },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
];

const secondaryLinks = [
  { label: "Upload Data", icon: UploadCloud },
  { label: "Reports", icon: FileText },
];

export default function Sidebar({ mobileOpen, closeMobile }) {
  return (
    <>
      <div
        className={`sidebar-overlay ${mobileOpen ? "show" : ""}`}
        onClick={closeMobile}
      />

      <aside className={`sidebar ${mobileOpen ? "mobile-open" : ""}`}>
        <div className="sidebar-header">
          <div className="brand">
            <div className="logo-mark">
              <Sparkles size={17} />
            </div>
            <div>
              <strong>InsightDesk</strong>
              <span>AI Workspace</span>
            </div>
          </div>

          <button className="icon-btn sidebar-close" onClick={closeMobile}>
            <ChevronLeft size={18} />
          </button>
        </div>

        <div className="workspace-pill">
          <div className="workspace-avatar">I</div>
          <div>
            <strong>Acme Workspace</strong>
            <span>Customer Operations</span>
          </div>
        </div>

        <nav className="nav-section">
          <p className="nav-label">Workspace</p>
          {mainLinks.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={closeMobile}
              className={({ isActive }) =>
                `nav-item ${isActive ? "active" : ""}`
              }
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <nav className="nav-section">
          <p className="nav-label">Management</p>
          {secondaryLinks.map(({ label, icon: Icon }) => (
            <button className="nav-item nav-button" key={label}>
              <Icon size={18} />
              <span>{label}</span>
              <span className="coming-soon">Soon</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-spacer" />

        <div className="ai-card">
          <div className="ai-card-icon">
            <Sparkles size={18} />
          </div>
          <div>
            <strong>AI is learning</strong>
            <span>1,248 feedback items analyzed</span>
          </div>
        </div>

        <button className="nav-item nav-button">
          <Settings size={18} />
          <span>Settings</span>
        </button>

        <div className="sidebar-footer">
          <div className="status-dot" />
          <span>All systems operational</span>
        </div>
      </aside>
    </>
  );
}
