import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiGet, apiPost } from "../api.js";
import QuizStepper from "../components/QuizStepper.jsx";
import LikertScale from "../components/LikertScale.jsx";
import ProgressBar from "../components/ProgressBar.jsx";
import ErrorBanner from "../components/ErrorBanner.jsx";

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    apiGet("/api/questions")
      .then((data) => {
        if (mounted) setQuestions(data.questions || []);
      })
      .catch((err) => setError(err.message));
    return () => {
      mounted = false;
    };
  }, []);

  const currentQuestion = questions[currentIndex];
  const currentValue = currentQuestion ? answers[currentQuestion.id] : undefined;

  const handleNext = async () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      return;
    }
    setIsSubmitting(true);
    setError("");
    const payload = Object.entries(answers).map(([id, score]) => ({ id, score }));
    try {
      await apiPost("/api/quiz", { answers: payload });
      navigate("/results");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceed = currentValue !== undefined;

  return (
    <div className="space-y-6">
      <ErrorBanner message={error} />
      <ProgressBar current={currentIndex + 1} total={questions.length || 1} />
      {currentQuestion ? (
        <>
          <QuizStepper
            current={currentIndex + 1}
            total={questions.length}
            question={currentQuestion.text}
          />
          <LikertScale
            value={currentValue}
            onChange={(value) =>
              setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }))
            }
          />
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
              className="rounded-full border border-sand-300 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-sand-600"
              disabled={currentIndex === 0}
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="rounded-full bg-basil-500 px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white disabled:opacity-50"
              disabled={!canProceed || isSubmitting}
            >
              {currentIndex < questions.length - 1 ? "Next" : "See Results"}
            </button>
          </div>
        </>
      ) : (
        <div className="text-sm text-sand-600">Loading questions...</div>
      )}
    </div>
  );
}
