import React from "react";

export default function QuizStepper({ current, total, question }) {
  return (
    <div className="glass rounded-3xl border border-sand-200 p-8 shadow-sm">
      <div className="text-xs font-semibold uppercase tracking-[0.3em] text-sand-500">
        Question {current} of {total}
      </div>
      <h2 className="mt-4 font-display text-3xl text-sand-900">{question}</h2>
    </div>
  );
}
