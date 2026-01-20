import React from "react";
import PrimaryCTA from "../components/PrimaryCTA.jsx";
import DoshaCard from "../components/DoshaCard.jsx";

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="grid gap-8 md:grid-cols-2">
        <div className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-sand-500">
            Ayurveda Lifestyle Guide
          </p>
          <h1 className="font-display text-5xl leading-tight text-sand-900">
            Discover your dosha balance and build rituals that support your day.
          </h1>
          <p className="text-base text-sand-700">
            Prakriti Guru offers a guided assessment, personalized lifestyle tips, and a mindful
            chat assistant focused on Ayurveda routines, food balance, and stress relief.
          </p>
          <div className="flex flex-wrap gap-4">
            <PrimaryCTA to="/quiz">Start Assessment</PrimaryCTA>
            <PrimaryCTA to="/chat">Talk to the Guru</PrimaryCTA>
          </div>
        </div>
        <div className="glass rounded-3xl border border-sand-200 p-8 shadow-sm">
          <p className="text-sm uppercase tracking-[0.3em] text-sand-500">
            What you get
          </p>
          <ul className="mt-6 space-y-4 text-sm text-sand-700">
            <li>Guided 30-question assessment with dosha scores.</li>
            <li>Personalized lifestyle and food guidance.</li>
            <li>Ayurveda-first chat responses with structured tips.</li>
            <li>Session-based conversation history.</li>
          </ul>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <DoshaCard
          title="Vata"
          description="Air + ether. Creative, quick, light."
          traits={["Needs warmth and routine", "Benefits from grounding foods", "Sensitive to cold and dryness"]}
        />
        <DoshaCard
          title="Pitta"
          description="Fire + water. Focused, intense, bright."
          traits={["Needs cooling balance", "Thrives on consistency", "Sensitive to heat and spice"]}
        />
        <DoshaCard
          title="Kapha"
          description="Earth + water. Steady, calm, strong."
          traits={["Needs lightness and movement", "Benefits from variety", "Sensitive to heaviness"]}
        />
      </section>
    </div>
  );
}
