"use client";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  Wand2,
} from "lucide-react";

import { QuizAnswerInput } from "@/components/quiz/QuizAnswerInput";
import { useQuizSession } from "@/components/quiz/QuizSessionProvider";
import { QUIZ_MATERIALS } from "@/data/quiz";
import { use } from "react";

type PageProps = {
  params: Promise<{
    materialId: string;
    level: string;
  }>;
};

const normalize = (text: string) =>
  text.replace(/[^a-z0-9]/gi, "").toLowerCase();

export default function QuizLevelDetailPage({ params }: PageProps) {
  const { materialId, level } = use(params);

  const material = QUIZ_MATERIALS.find((item) => item.id === materialId);

  if (!material) {
    notFound();
  }

  const levelNumber = Number(level);
  const quizLevel = material.levels.find((lvl) => lvl.level === levelNumber);

  if (!quizLevel) {
    notFound();
  }

  const router = useRouter();
  const createSessionKey = (levelValue: number) =>
    `belajar:${material.id}:${levelValue}`;

  const sessionKey = createSessionKey(quizLevel.level);
  const {
    progress,
    setCurrentQuestionIndex,
    setAnswer,
    setLastResult,
    setLevelCompleted,
    isLevelCompleted,
  } = useQuizSession(sessionKey);

  const questions = quizLevel.questions;
  const totalQuestions = questions.length;
  const currentQuestion =
    questions[progress.currentQuestionIndex] ?? questions[0];

  const derivedAnswer = currentQuestion
    ? progress.answers[currentQuestion.id] ?? ""
    : "";

  const isFirstQuestion = progress.currentQuestionIndex === 0;
  const currentLevelCompleted = isLevelCompleted();

  const nextLevel = material.levels.find(
    (lvl) => lvl.level === quizLevel.level + 1
  );
  const nextLevelHref = nextLevel
    ? `/dashboard/quiz/belajar/${material.id}/level/${nextLevel.level}`
    : null;

  const levelItems = material.levels.map((lvl) => {
    const keyForLevel = createSessionKey(lvl.level);
    return {
      href: `/dashboard/quiz/belajar/${material.id}/level/${lvl.level}`,
      label: `Level ${lvl.level}`,
      isActive: lvl.level === quizLevel.level,
      completed: isLevelCompleted(keyForLevel),
    };
  });

  const handleAutoFill = () => {
    if (!currentQuestion) return;
    setAnswer(currentQuestion.id, currentQuestion.correctAnswer);
    setLastResult(undefined);
  };

  const handleCheck = () => {
    if (!currentQuestion) return;
    const userAnswer = progress.answers[currentQuestion.id] ?? "";
    const isCorrect =
      normalize(userAnswer) === normalize(currentQuestion.correctAnswer);
    setLastResult(isCorrect ? "correct" : "wrong");

    if (isCorrect) {
      const updatedAnswers = {
        ...progress.answers,
        [currentQuestion.id]: userAnswer,
      };

      const allCorrect = questions.every((question) => {
        const stored = updatedAnswers[question.id] ?? "";
        return normalize(stored) === normalize(question.correctAnswer);
      });

      if (allCorrect) {
        setLevelCompleted(true);
      }
    }
  };

  const handleNextQuestion = () => {
    if (progress.currentQuestionIndex >= totalQuestions - 1) {
      return;
    }

    setCurrentQuestionIndex(progress.currentQuestionIndex + 1);
  };

  const handlePreviousQuestion = () => {
    if (progress.currentQuestionIndex <= 0) {
      return;
    }

    setCurrentQuestionIndex(progress.currentQuestionIndex - 1);
  };

  const handleInputChange = (nextValue: string) => {
    if (!currentQuestion) return;
    setAnswer(currentQuestion.id, nextValue);
    setLastResult(undefined);
  };

  const resultBadge =
    progress.lastResult === "correct"
      ? {
          text: "Jawaban benar",
          className: "bg-[#1BA5A5]/20 text-[#0f6b6b]",
        }
      : progress.lastResult === "wrong"
      ? {
          text: "Masih salah, coba lagi",
          className: "bg-[#F97362]/20 text-[#a23422]",
        }
      : null;

  return (
    <div className="flex h-full flex-col gap-6 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 w-full">
      <div className="flex flex-col gap-2">
        <Link
          href="/dashboard/quiz/belajar"
          className="flex items-center text-sm text-brand-gold hover:text-[#b89245] transition w-fit"
        >
          <ChevronLeft />
          Kembali ke daftar quiz
        </Link>
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <span className="inline-flex items-center justify-center rounded-full bg-[#F3E2B8] border border-brand-gold/60 px-4 py-1 text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#6B7280]">
              Mode Belajar · Level {quizLevel.level}
            </span>
            <h1 className="text-3xl sm:text-4xl font-semibold text-[#1E293B]">
              {material.title}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={`
                inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium
                transition-all duration-300
                ${
                  resultBadge
                    ? resultBadge.className
                    : "opacity-0 scale-95 pointer-events-none"
                }
              `}
            >
              {resultBadge && (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  {resultBadge.text}
                </>
              )}
            </span>
            <p className="text-sm text-[#475569] bg-white/70 border border-[#E2D4BB] rounded-full px-3 py-1">
              Soal {progress.currentQuestionIndex + 1} dari {totalQuestions}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0">
        <div className="w-full h-auto lg:h-[calc(100vh-8rem-8rem)] overflow-visible lg:overflow-hidden">
          <div className="flex h-full flex-col gap-4 lg:flex-row lg:gap-6">
            <aside className="w-full lg:w-72 shrink-0 flex flex-col items-start gap-3">
              <div className="w-full">
                <p className="text-xs font-semibold tracking-[0.18em] text-[#6B7280] uppercase mb-2">
                  Level
                </p>
                <div className="flex flex-col gap-2">
                  {levelItems.map((level) => (
                    <Link
                      key={level.href}
                      href={level.href}
                      className={`flex w-full items-center justify-between rounded-2xl border p-4 text-md font-semibold text-left transition cursor-pointer shadow-sm transition hover:translate-y-1 hover:shadow-xl ${
                        level.isActive
                          ? "bg-[radial-gradient(circle_at_top,_rgba(255,252,245,0.98),_rgba(247,234,208,0.98))] border-brand-gold"
                          : "border-transparent bg-brand-gold/5 hover:border-brand-gold"
                      }`}
                    >
                      {level.label}
                      {level.completed ? (
                        <CheckCircle2 className="h-4 w-4 text-[#1BA5A5]" />
                      ) : level.isActive ? (
                        <ArrowRight className="h-4 w-4 text-[#1E293B]" />
                      ) : null}
                    </Link>
                  ))}
                </div>
              </div>
            </aside>

            <section className="flex-1 overflow-y-auto rounded-2xl sm:rounded-[28px] lg:rounded-[32px] border border-[#E2D4BB] bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.96),_rgba(243,232,217,0.96))] p-6 sm:p-8 lg:p-12 flex flex-col gap-4 sm:gap-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-[#1E293B]">
                {currentQuestion.prompt}
              </h2>

              <div className="flex flex-wrap gap-2">
                {currentQuestion.options.map((option) => (
                  <span
                    key={option}
                    className="rounded-full border border-[#E2D4BB] bg-white/70 px-4 py-2 text-sm text-[#1E293B]"
                  >
                    {option}
                  </span>
                ))}
              </div>

              <QuizAnswerInput
                value={derivedAnswer}
                onChange={handleInputChange}
              />

              <div className="flex flex-col gap-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={handleAutoFill}
                    className="flex items-center justify-center gap-2 rounded-2xl border border-[#E2D4BB] bg-[#F5F3F0] px-4 py-3 text-sm font-semibold text-[#1E293B] transition hover:border-brand-gold cursor-pointer"
                  >
                    <Wand2 className="h-4 w-4" />
                    Tampilkan Jawaban
                  </button>
                  <button
                    type="button"
                    onClick={handleCheck}
                    className="flex items-center justify-center gap-2 rounded-2xl border border-[#1BA5A5] text-[#1BA5A5] bg-white/80 px-4 py-3 text-sm font-semibold transition hover:bg-[#1BA5A5]/10 cursor-pointer"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    Periksa Jawaban
                  </button>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={handlePreviousQuestion}
                    disabled={isFirstQuestion}
                    className="flex items-center justify-center gap-2 rounded-2xl border border-[#E2D4BB] bg-white/80 px-4 py-3 text-sm font-semibold text-[#1E293B] transition hover:border-brand-gold disabled:opacity-40 cursor-pointer"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Soal Sebelumnya
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (currentLevelCompleted && nextLevelHref) {
                        router.push(nextLevelHref);
                        return;
                      }
                      handleNextQuestion();
                    }}
                    disabled={
                      (!currentLevelCompleted &&
                        progress.currentQuestionIndex >= totalQuestions - 1) ||
                      (currentLevelCompleted && !nextLevelHref)
                    }
                    className="flex items-center justify-center gap-2 rounded-2xl border border-transparent bg-[#1E293B] px-4 py-3 text-sm font-semibold text-white transition disabled:opacity-40 cursor-pointer"
                  >
                    {currentLevelCompleted
                      ? nextLevelHref
                        ? `Masuk Level ${nextLevel?.level}`
                        : "Semua Level Tuntas"
                      : "Soal Berikutnya"}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
