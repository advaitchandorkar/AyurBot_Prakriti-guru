import React from "react";

export default function MessageBubble({ role, content }) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
          isUser
            ? "bg-basil-500 text-white"
            : "bg-white text-sand-800 border border-sand-200"
        }`}
      >
        {content}
      </div>
    </div>
  );
}
