import React from "react";

export default function ResultCard({ title, summary, scores }) {
  return (
    <div className="glass rounded-3xl border border-sand-200 p-8 shadow-sm">
      <h2 className="font-display text-3xl text-sand-900">{title}</h2>
      <p className="mt-3 text-sm text-sand-700">{summary}</p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {Object.entries(scores || {}).map(([key, value]) => (
          <div key={key} className="rounded-2xl bg-white p-4 text-center">
            <div className="text-xs uppercase tracking-widest text-sand-500">{key}</div>
            <div className="mt-2 text-2xl font-semibold text-sand-900">{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
