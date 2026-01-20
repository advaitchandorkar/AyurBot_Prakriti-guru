import React from "react";

export default function ChatSidebar({ conversations, activeId, onSelect, onNew }) {
  return (
    <aside className="glass w-full rounded-3xl border border-sand-200 p-6 md:w-72">
      <button
        type="button"
        onClick={onNew}
        className="w-full rounded-2xl border border-basil-500 px-4 py-3 text-xs font-semibold uppercase tracking-widest text-basil-600 hover:bg-basil-500 hover:text-white"
      >
        New Conversation
      </button>
      <div className="mt-6 space-y-2">
        {conversations.length === 0 && (
          <div className="text-xs text-sand-500">No conversations yet.</div>
        )}
        {conversations.map((convo) => (
          <button
            key={convo.convo_id}
            type="button"
            onClick={() => onSelect(convo.convo_id)}
            className={`w-full rounded-2xl px-4 py-3 text-left text-sm ${
              convo.convo_id === activeId
                ? "bg-basil-500 text-white"
                : "bg-white text-sand-700 hover:border hover:border-basil-500"
            }`}
          >
            {convo.title || "Conversation"}
          </button>
        ))}
      </div>
    </aside>
  );
}
