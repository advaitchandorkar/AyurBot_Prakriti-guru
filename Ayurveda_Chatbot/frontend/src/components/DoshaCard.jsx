import React from "react";

export default function DoshaCard({ title, description, traits }) {
  return (
    <div className="glass rounded-3xl border border-sand-200 p-6 shadow-sm">
      <h3 className="font-display text-2xl font-semibold text-sand-900">{title}</h3>
      <p className="mt-2 text-sm text-sand-700">{description}</p>
      <ul className="mt-4 space-y-2 text-sm text-sand-700">
        {traits.map((trait) => (
          <li key={trait} className="flex items-start gap-2">
            <span className="mt-1 h-2 w-2 rounded-full bg-basil-500" />
            <span>{trait}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
