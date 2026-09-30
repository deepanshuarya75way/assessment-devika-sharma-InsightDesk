import { Bell, ChevronDown, Menu, Moon, Search, Sparkles } from "lucide-react";

export default function Navbar({ onMenu }) {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="icon-btn mobile-menu" onClick={onMenu} aria-label="Open menu">
          <Menu size={20} />
        </button>

        <div className="brand-mobile">
          <div className="logo-mark">
            <Sparkles size={17} />
          </div>
          <span>InsightDesk</span>
        </div>

        <div className="global-search">
          <Search size={18} />
          <input placeholder="Search feedback, customers, reports..." />
          <kbd>⌘ K</kbd>
        </div>
      </div>

      <div className="topbar-actions">
        <button className="icon-btn" aria-label="Toggle theme">
          <Moon size={18} />
        </button>

        <button className="icon-btn notification-btn" aria-label="Notifications">
          <Bell size={18} />
          <span className="notification-dot" />
        </button>

        <div className="user-menu">
          <div className="avatar">K</div>
          <div className="user-copy">
            <strong>Devika</strong>
            <span>Admin</span>
          </div>
          <ChevronDown size={16} />
        </div>
      </div>
    </header>
  );
}
