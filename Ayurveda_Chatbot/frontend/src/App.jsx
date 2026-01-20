import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Quiz from "./pages/Quiz.jsx";
import Results from "./pages/Results.jsx";
import Chat from "./pages/Chat.jsx";
import LayoutShell from "./components/LayoutShell.jsx";

export default function App() {
  return (
    <LayoutShell>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/results" element={<Results />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </LayoutShell>
  );
}
