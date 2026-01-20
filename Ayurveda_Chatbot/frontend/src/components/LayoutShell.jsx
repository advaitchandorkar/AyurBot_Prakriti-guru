import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function LayoutShell({ children }) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 bg-sand-50/80 backdrop-blur border-b border-sand-200">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="text-2xl font-display font-semibold text-sand-900">
            Prakriti Guru
          </Link>
          <nav className="flex items-center gap-6 text-sm font-semibold uppercase tracking-wider">
            <NavLink className="text-sand-700 hover:text-sand-900" to="/quiz">
              Assessment
            </NavLink>
            <NavLink className="text-sand-700 hover:text-sand-900" to="/results">
              Results
            </NavLink>
            <NavLink className="text-sand-700 hover:text-sand-900" to="/chat">
              Chat
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}
