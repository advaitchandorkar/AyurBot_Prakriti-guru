import React from "react";
import { Link } from "react-router-dom";

export default function PrimaryCTA({ to, children }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center justify-center rounded-full bg-basil-500 px-6 py-3 text-sm font-semibold uppercase tracking-widest text-white shadow-lg transition hover:bg-basil-600"
    >
      {children}
    </Link>
  );
}
