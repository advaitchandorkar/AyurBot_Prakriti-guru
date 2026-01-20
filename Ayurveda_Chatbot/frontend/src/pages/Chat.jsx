import React, { useEffect, useState } from "react";
import { apiGet, apiPost } from "../api.js";
import ChatSidebar from "../components/ChatSidebar.jsx";
import ChatWindow from "../components/ChatWindow.jsx";
import ErrorBanner from "../components/ErrorBanner.jsx";

export default function Chat() {
  const [conversations, setConversations] = useState([]);
  const [activeId, setActiveId] = useState("");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState("");

  const loadConversations = async () => {
    const data = await apiGet("/api/conversations");
    setConversations(data.conversations || []);
    if (!activeId && data.conversations?.length) {
      setActiveId(data.conversations[0].convo_id);
    }
  };

  useEffect(() => {
    loadConversations().catch((err) => setError(err.message));
  }, []);

  useEffect(() => {
    if (!activeId) return;
    apiGet(`/api/conversations/${activeId}/messages`)
      .then((data) => setMessages(data.messages || []))
      .catch((err) => setError(err.message));
  }, [activeId]);

  const handleNew = async () => {
    try {
      const data = await apiPost("/api/conversations", { title: "New Conversation" });
      const convo = data.conversation;
      setConversations((prev) => [convo, ...prev]);
      setActiveId(convo.convo_id);
      setMessages([]);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    setIsTyping(true);
    setError("");
    const optimistic = { role: "user", content: input, created_at: Date.now() };
    setMessages((prev) => [...prev, optimistic]);
    setInput("");
    try {
      const data = await apiPost("/api/chat", { convo_id: activeId, text: optimistic.content });
      const reply = { role: "assistant", content: data.reply, created_at: Date.now() };
      setMessages((prev) => [...prev, reply]);
      if (!activeId) {
        setActiveId(data.convo_id);
        await loadConversations();
      } else {
        await loadConversations();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-[260px_1fr]">
      <ChatSidebar
        conversations={conversations}
        activeId={activeId}
        onSelect={setActiveId}
        onNew={handleNew}
      />
      <div className="flex flex-col gap-4">
        <ErrorBanner message={error} />
        <ChatWindow messages={messages} isTyping={isTyping} />
        <div className="glass flex items-center gap-3 rounded-3xl border border-sand-200 p-4">
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask about food, routines, or stress balance..."
            className="flex-1 bg-transparent text-sm text-sand-700 focus:outline-none"
          />
          <button
            type="button"
            onClick={handleSend}
            disabled={isTyping}
            className="rounded-full bg-basil-500 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-white disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
