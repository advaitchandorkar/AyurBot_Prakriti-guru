import React from "react";
import MessageBubble from "./MessageBubble.jsx";
import TypingIndicator from "./TypingIndicator.jsx";

export default function ChatWindow({ messages, isTyping }) {
  return (
    <div className="flex h-[70vh] flex-col rounded-3xl border border-sand-200 bg-white/60 p-6 shadow-sm">
      <div className="flex-1 space-y-4 overflow-y-auto">
        {messages.length === 0 && (
          <div className="text-sm text-sand-500">
            Start by asking about Ayurveda lifestyle, diet, or routines.
          </div>
        )}
        {messages.map((message, index) => (
          <MessageBubble key={`${message.created_at || index}`} role={message.role} content={message.content} />
        ))}
        {isTyping && <TypingIndicator />}
      </div>
    </div>
  );
}
