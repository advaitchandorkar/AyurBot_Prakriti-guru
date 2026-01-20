import React from "react";

export default function ProgressBar({ current, total }) {
  const percent = Math.round((current / total) * 100);
  return (
    <div className="w-full">
      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-widest text-sand-600">
        <span>Progress</span>
        <span>{percent}%</span>
      </div>
      <div className="mt-2 h-2 rounded-full bg-sand-200">
        <div
          className="h-2 rounded-full bg-basil-500 transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
