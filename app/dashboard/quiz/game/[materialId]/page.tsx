"use client";

import { use, useEffect, useMemo, useRef, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import {
  AlertTriangle,
  CheckCircle2,
  Heart,
  LogOut,
  RefreshCcw,
  ShieldOff,
  Trophy,
} from "lucide-react";

import { useQuizGameSession } from "@/components/quiz/QuizSessionProvider";
import { QUIZ_MATERIALS } from "@/data/quiz";
import Crosshair from "@/components/Crosshair";
import TargetCursor from "@/components/TargetCursor";

type PageProps = {
  params: Promise<{
    materialId: string;
  }>;
};

const shuffleWithSeed = <T,>(items: T[], seed: number): T[] => {
  const result = [...items];
  let currentSeed = seed;

  const random = () => {
    currentSeed = (currentSeed * 1664525 + 1013904223) % 4294967296;
    return currentSeed / 4294967296;
  };

  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
};

type OptionStyle = {
  transform: string;
};

function createRandomOptionStyles(optionCount: number): OptionStyle[] {
  return Array.from({ length: optionCount }, () => {
    const vertical = Math.floor(Math.random() * 51) - 25;
    const horizontal = Math.floor(Math.random() * 41) - 20;
    const rotation = Math.floor(Math.random() * 11) - 5;

    return {
      transform: `translate(${horizontal}px, ${vertical}px) rotate(${rotation}deg)`,
    };
  });
}

export default function QuizGamePlayPage({ params }: PageProps) {
  const { materialId } = use(params);
  const router = useRouter();
  const material = QUIZ_MATERIALS.find((item) => item.id === materialId);

  if (!material) {
    notFound();
  }

  const [roundSeed, setRoundSeed] = useState(() => Date.now());
  const [countdown, setCountdown] = useState(3);
  const [isReady, setIsReady] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "correct" | "wrong";
    message: string;
  } | null>(null);
  const [showGameOver, setShowGameOver] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const questions = useMemo(() => {
    return material.levels.flatMap((level, index) => {
      const perLevelSeed = roundSeed + index * 97;
      const shuffledQuestions = shuffleWithSeed(level.questions, perLevelSeed);
      return shuffledQuestions.map((question) => ({
        ...question,
        level: level.level,
      }));
    });
  }, [material, roundSeed]);

  const totalQuestions = questions.length;
  const sessionKey = `game:${material.id}`;
  const { progress, updateSession, resetGame } = useQuizGameSession(
    sessionKey,
    {
      maxHp: 3,
    }
  );

  const currentQuestion =
    progress.currentQuestionIndex >= totalQuestions
      ? null
      : questions[progress.currentQuestionIndex];

  const startCountdown = () => {
    setCountdown(3);
    setIsReady(false);
  };

  const handleRestart = () => {
    resetGame();
    setRoundSeed(Date.now());
    setShowGameOver(false);
    setShowSuccess(false);
    setFeedback(null);
    startCountdown();
  };

  useEffect(() => {
    handleRestart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isReady) {
      return;
    }
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsReady(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isReady, roundSeed]);

  useEffect(() => {
    if (progress.completed && totalQuestions > 0) {
      setShowSuccess(true);
    }
  }, [progress.completed, totalQuestions]);

  const handleAdvance = () => {
    updateSession((prev) => {
      const nextIndex = Math.min(prev.currentQuestionIndex + 1, totalQuestions);
      return {
        ...prev,
        currentQuestionIndex: nextIndex,
        completed: nextIndex >= totalQuestions,
      };
    });
  };

  const handleOptionSelect = (option: string) => {
    if (!currentQuestion || !isReady || showGameOver || showSuccess) {
      return;
    }

    const isCorrect = option === currentQuestion.correctAnswer;
    const nextHp = isCorrect ? progress.hp : Math.max(progress.hp - 1, 0);
    const willGameOver = !isCorrect && nextHp <= 0;

    setFeedback({
      type: isCorrect ? "correct" : "wrong",
      message: isCorrect ? "Tepat! Lanjutkan." : "Oops, coba lagi!",
    });

    updateSession((prev) => ({
      ...prev,
      score: isCorrect ? prev.score + 10 : prev.score,
      hp: nextHp,
    }));

    if (willGameOver) {
      setTimeout(() => {
        setFeedback(null);
        setShowGameOver(true);
      }, 600);
      return;
    }

    setTimeout(() => {
      setFeedback(null);
      handleAdvance();
    }, 1000);
  };

  const hearts = Array.from({ length: progress.maxHp ?? 3 });

  const exitGame = () => {
    router.push("/dashboard/quiz");
  };

  const questionPosition = Math.min(
    progress.currentQuestionIndex + 1,
    totalQuestions
  );

  const optionStyles = useMemo(() => {
    if (!currentQuestion) return [] as OptionStyle[];
    return createRandomOptionStyles(currentQuestion.options.length);
  }, [currentQuestion?.id, currentQuestion?.options.length]);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isWrapped, setIsWrapped] = useState(false);

  useEffect(() => {
    const checkWrap = () => {
      const el = containerRef.current;
      if (!el) return;

      const children = Array.from(el.children) as HTMLElement[];
      if (children.length <= 1) {
        setIsWrapped(false);
        return;
      }

      const firstTop = children[0].offsetTop;
      const wrapped = children.some((child) => child.offsetTop !== firstTop);

      setIsWrapped(wrapped);
    };

    checkWrap();

    window.addEventListener("resize", checkWrap);
    return () => window.removeEventListener("resize", checkWrap);
  }, [currentQuestion?.options.length]);

  return (
    <div className="flex h-full flex-col gap-6 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 w-full lg:h-[calc(100vh-4rem)]">
      <Crosshair color="black" />
      <TargetCursor
        spinDuration={0}
        hideDefaultCursor={true}
        parallaxOn={false}
      />

      <div className="flex flex-wrap items-center justify-between rounded-2xl sm:rounded-[28px] lg:rounded-[32px] border p-6 sm:px-8 lg:px-12 gap-4 sm:gap-6 border-[#E2D4BB] bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.96),_rgba(243,232,217,0.96))] shadow-sm">
        <div className="flex items-center gap-6">
          <div className="space-y-1">
            <span className="inline-flex items-center rounded-full bg-[#F3E2B8] border border-brand-gold/70 px-4 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-[#6B7280]">
              Mode Game · Shooting
            </span>
            <p className="text-xl font-semibold text-[#1E293B]">
              {material.title}
            </p>
          </div>
          <div className="flex items-center gap-1">
            {hearts.map((_, index) => (
              <Heart
                key={`heart-${index}`}
                className={`h-6 w-6 ${
                  index < progress.hp
                    ? "fill-[#F97362] text-[#F97362] animate-heartbeat"
                    : "text-[#E2D4BB]"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="rounded-full bg-[#1E293B] px-5 py-2 text-white text-sm font-semibold shadow-md shadow-black/20">
            {progress.score} Poin
          </div>
          <button
            type="button"
            onClick={exitGame}
            className="inline-flex items-center gap-2 rounded-2xl border border-[#E2D4BB] bg-white/80 px-4 py-2 text-sm font-semibold text-[#1E293B] transition hover:border-[#F97362] hover:bg-[#FFF1ED] cursor-target"
          >
            <LogOut className="h-4 w-4" />
            Keluar
          </button>
        </div>
      </div>

      <section className="border rounded-[32px] border-[#E2D4BB] bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.96),_rgba(243,232,217,0.96))] p-6 sm:p-8 lg:p-12 shadow-xl space-y-6 relative overflow-hidden flex-1">
        <div className="flex items-center justify-between gap-4">
          {currentQuestion && (
            <p className="text-xs sm:text-sm font-semibold text-[#1BA5A5] uppercase tracking-[0.28em]">
              Level {currentQuestion.level}
            </p>
          )}
          <p className="text-xs sm:text-sm uppercase tracking-[0.28em] text-[#6B7280]">
            Soal {questionPosition} / {totalQuestions}
          </p>
        </div>

        {currentQuestion ? (
          <div className="h-full flex flex-col">
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#1E293B]">
              {currentQuestion.prompt}
            </h2>

            <div
              ref={containerRef}
              className={`flex flex-1 justify-center items-center flex-wrap ${
                isWrapped ? "gap-6" : "gap-12"
              }`}
            >
              {currentQuestion.options.map((option, index) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleOptionSelect(option)}
                  className="rounded-2xl sm:rounded-[28px] border border-[#E2D4BB] bg-white/85 px-10 py-4 text-left text-xl font-semibold text-[#1E293B] shadow-sm transition hover:-translate-y-1 hover:shadow-lg hover:bg-[#FFF3D6] cursor-target"
                  style={optionStyles[index]}
                  disabled={!isReady || showGameOver || showSuccess}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-24 space-y-4">
            <Trophy className="h-14 w-14 mx-auto text-brand-gold" />
            <p className="text-2xl font-semibold text-[#1E293B]">
              Semua soal telah dimainkan!
            </p>
          </div>
        )}
      </section>

      {!isReady && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-[#0f172a]/80 backdrop-blur-sm text-white">
          <div className="text-center space-y-4">
            <p className="text-xs sm:text-sm uppercase tracking-[0.5em] text-[#FBBF24]">
              Bersiaplah
            </p>
            <p className="text-6xl sm:text-7xl font-bold drop-shadow-[0_8px_20px_rgba(0,0,0,0.45)]">
              {countdown > 0 ? countdown : "Mulai!"}
            </p>
          </div>
        </div>
      )}

      {feedback && (
        <div className="fixed inset-0 z-35 bg-[#0f172a]/60 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="w-full max-w-sm rounded-2xl sm:rounded-[28px] bg-white border border-[#E2D4BB] px-6 py-8 text-center shadow-2xl">
            {feedback.type === "correct" ? (
              <CheckCircle2 className="h-12 w-12 mx-auto text-[#1BA5A5]" />
            ) : (
              <AlertTriangle className="h-12 w-12 mx-auto text-[#F97362]" />
            )}
            <p className="mt-4 text-xl font-semibold text-[#1E293B]">
              {feedback.message}
            </p>
          </div>
        </div>
      )}

      {showGameOver && (
        <div className="fixed inset-0 z-40 bg-[#0f172a]/80 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="w-full max-w-md rounded-2xl sm:rounded-[28px] bg-white border border-[#E2D4BB] p-8 space-y-6 text-center shadow-2xl">
            <ShieldOff className="h-12 w-12 mx-auto text-[#F97362]" />
            <div>
              <p className="text-2xl font-semibold text-[#1E293B]">HP habis!</p>
              <p className="text-[#6B7280] mt-2">
                Kamu berhasil mengumpulkan{" "}
                <span className="font-semibold text-brand-gold">
                  {progress.score} poin
                </span>
                . Mau coba ulangi?
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={handleRestart}
                className="flex items-center justify-center gap-2 rounded-2xl border border-[#1E293B] px-4 py-3 text-sm font-semibold text-[#1E293B] hover:bg-[#1E293B] hover:text-white transition cursor-target"
              >
                <RefreshCcw className="h-4 w-4" />
                Main Lagi
              </button>
              <button
                type="button"
                onClick={exitGame}
                className="flex items-center justify-center gap-2 rounded-2xl border border-transparent bg-[#1E293B] px-4 py-3 text-sm font-semibold text-white cursor-target"
              >
                <LogOut className="h-4 w-4" />
                Keluar
              </button>
            </div>
          </div>
        </div>
      )}

      {showSuccess && (
        <div className="fixed inset-0 z-40 bg-[#0f172a]/80 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="w-full max-w-md rounded-2xl sm:rounded-[28px] bg-white border border-[#E2D4BB] p-8 space-y-6 text-center shadow-2xl">
            <Trophy className="h-12 w-12 mx-auto text-brand-gold" />
            <div>
              <p className="text-2xl font-semibold text-[#1E293B]">
                Selesai! 🎉
              </p>
              <p className="text-[#6B7280] mt-2">
                Kamu menuntaskan semua soal dengan{" "}
                <span className="font-semibold text-brand-gold">
                  {progress.score} poin
                </span>
                .
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={handleRestart}
                className="flex items-center justify-center gap-2 rounded-2xl border border-[#1BA5A5] text-[#1BA5A5] px-4 py-3 text-sm font-semibold hover:bg-[#1BA5A5]/10 transition cursor-target"
              >
                <RefreshCcw className="h-4 w-4" />
                Main Lagi
              </button>
              <button
                type="button"
                onClick={exitGame}
                className="flex items-center justify-center gap-2 rounded-2xl border border-transparent bg-[#1E293B] px-4 py-3 text-sm font-semibold text-white cursor-target"
              >
                <LogOut className="h-4 w-4" />
                Keluar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
