import React from "react";

export default function TipList({ title, tips }) {
  return (
    <div className="glass rounded-3xl border border-sand-200 p-6 shadow-sm">
      <h3 className="font-display text-2xl text-sand-900">{title}</h3>
      <ul className="mt-4 space-y-3 text-sm text-sand-700">
        {tips.map((tip) => (
          <li key={tip} className="flex items-start gap-3">
            <span className="mt-2 h-2 w-2 rounded-full bg-basil-500" />
            <span>{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
