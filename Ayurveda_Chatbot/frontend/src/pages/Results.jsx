import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiGet } from "../api.js";
import ResultCard from "../components/ResultCard.jsx";
import TipList from "../components/TipList.jsx";
import ErrorBanner from "../components/ErrorBanner.jsx";

const guidance = {
  vata: [
    "Favor warm, cooked meals with healthy oils.",
    "Keep a consistent daily routine and sleep schedule.",
    "Choose grounding practices like gentle yoga or walking."
  ],
  pitta: [
    "Prioritize cooling foods and hydration.",
    "Balance intensity with calming breaks.",
    "Avoid excessive heat, spicy foods, and late nights."
  ],
  kapha: [
    "Add light, warm, and spicy meals to energize digestion.",
    "Include daily movement and variety.",
    "Keep morning routines active and uplifting."
  ],
  "vata-pitta": [
    "Blend warmth and cooling foods, avoiding extremes.",
    "Build a steady routine with restorative breaks.",
    "Use mindfulness to balance intensity and change."
  ],
  "pitta-kapha": [
    "Choose cooling yet light meals.",
    "Add movement to avoid stagnation.",
    "Make time for relaxation to soften intensity."
  ],
  "vata-kapha": [
    "Stick to warm, light, and well-spiced meals.",
    "Keep a consistent sleep schedule.",
    "Use gentle movement to stay grounded and energized."
  ],
  tridoshic: [
    "Stay mindful of seasonal shifts and adjust gently.",
    "Keep meals fresh, balanced, and consistent.",
    "Alternate active and restorative practices."
  ]
};

export default function Results() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    apiGet("/api/quiz")
      .then((data) => setResult(data.result))
      .catch((err) => setError(err.message));
  }, []);

  const profile = result?.profile || "tridoshic";
  const tips = guidance[profile] || guidance.tridoshic;

  return (
    <div className="space-y-8">
      <ErrorBanner message={error} />
      {result ? (
        <>
          <ResultCard title="Your Dosha Profile" summary={result.result} scores={result.scores} />
          <TipList title="Lifestyle Guidance" tips={tips} />
          <div className="flex flex-wrap gap-4">
            <Link
              to="/quiz"
              className="rounded-full border border-sand-300 px-6 py-3 text-xs font-semibold uppercase tracking-widest text-sand-600"
            >
              Retake Assessment
            </Link>
            <Link
              to="/chat"
              className="rounded-full bg-basil-500 px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white"
            >
              Go to Chat
            </Link>
          </div>
        </>
      ) : (
        <div className="text-sm text-sand-600">No results yet. Take the assessment first.</div>
      )}
    </div>
  );
}
