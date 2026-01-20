import React from "react";

const options = [
  { value: 0, label: "Never" },
  { value: 1, label: "Rarely" },
  { value: 2, label: "Sometimes" },
  { value: 3, label: "Often" },
  { value: 4, label: "Always" }
];

export default function LikertScale({ value, onChange }) {
  return (
    <div className="grid gap-3 md:grid-cols-5">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={`rounded-2xl border px-4 py-3 text-sm font-semibold ${
            value === option.value
              ? "border-basil-500 bg-basil-500 text-white"
              : "border-sand-200 bg-white text-sand-700 hover:border-basil-500"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
