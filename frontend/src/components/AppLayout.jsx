import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="app-shell">
      <Sidebar mobileOpen={mobileOpen} closeMobile={() => setMobileOpen(false)} />
      <div className="main-shell">
        <Navbar onMenu={() => setMobileOpen(true)} />
        <main className="page-container">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
