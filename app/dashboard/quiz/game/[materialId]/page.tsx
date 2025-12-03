"use client";

import { use, useCallback, useEffect, useMemo, useRef, useState } from "react";
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
  const [levelCelebration, setLevelCelebration] = useState<
    { level: number; nextLevel: number } | null
  >(null);
  const levelCelebrationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const [gameOverLevel, setGameOverLevel] = useState<number | null>(null);

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

  const levelStructure = useMemo(() => {
    let startIndex = 0;
    return material.levels.map((level) => {
      const meta = {
        level: level.level,
        startIndex,
        questionCount: level.questions.length,
      };
      startIndex += level.questions.length;
      return meta;
    });
  }, [material]);

  const getNextLevelNumber = useCallback(
    (levelNumber: number) => {
      const idx = levelStructure.findIndex((meta) => meta.level === levelNumber);
      return levelStructure[idx + 1]?.level;
    },
    [levelStructure],
  );

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

  const startCountdown = useCallback(() => {
    setCountdown(3);
    setIsReady(false);
  }, []);

  const handleAdvance = useCallback(
    (options?: { resetHp?: boolean }) => {
      updateSession((prev) => {
        const nextIndex = Math.min(
          prev.currentQuestionIndex + 1,
          totalQuestions,
        );
        return {
          ...prev,
          currentQuestionIndex: nextIndex,
          completed: nextIndex >= totalQuestions,
          hp: options?.resetHp ? prev.maxHp : prev.hp,
        };
      });
    },
    [totalQuestions, updateSession],
  );

  const clearLevelTimer = useCallback(() => {
    if (levelCelebrationTimerRef.current) {
      clearTimeout(levelCelebrationTimerRef.current);
      levelCelebrationTimerRef.current = null;
    }
  }, []);

  const handleRestart = useCallback(() => {
    clearLevelTimer();
    resetGame();
    setRoundSeed(Date.now());
    setShowGameOver(false);
    setShowSuccess(false);
    setFeedback(null);
    setLevelCelebration(null);
    setGameOverLevel(null);
    startCountdown();
  }, [clearLevelTimer, resetGame, startCountdown]);

  const celebrateLevelCompletion = useCallback(
    (levelNumber: number) => {
      const upcoming = getNextLevelNumber(levelNumber);
      if (!upcoming) {
        handleAdvance({ resetHp: true });
        return;
      }

      setLevelCelebration({ level: levelNumber, nextLevel: upcoming });
      clearLevelTimer();
      levelCelebrationTimerRef.current = setTimeout(() => {
        setLevelCelebration(null);
        handleAdvance({ resetHp: true });
      }, 2000);
    },
    [clearLevelTimer, getNextLevelNumber, handleAdvance],
  );

  const handleRetryLevel = useCallback(() => {
    if (!gameOverLevel) {
      handleRestart();
      return;
    }

    const targetMeta = levelStructure.find(
      (meta) => meta.level === gameOverLevel,
    );
    if (!targetMeta) {
      handleRestart();
      return;
    }

    clearLevelTimer();
    setShowGameOver(false);
    setFeedback(null);
    setLevelCelebration(null);
    setGameOverLevel(null);
    updateSession((prev) => ({
      ...prev,
      currentQuestionIndex: targetMeta.startIndex,
      completed: false,
      hp: prev.maxHp,
    }));
    startCountdown();
  }, [clearLevelTimer, gameOverLevel, handleRestart, levelStructure, startCountdown, updateSession]);

  useEffect(() => {
    handleRestart();
  }, [handleRestart]);

  useEffect(() => {
    return () => {
      clearLevelTimer();
    };
  }, [clearLevelTimer]);

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
      clearLevelTimer();
      setLevelCelebration(null);
      setShowSuccess(true);
    }
  }, [clearLevelTimer, progress.completed, totalQuestions]);

  const handleOptionSelect = (option: string) => {
    if (
      !currentQuestion ||
      !isReady ||
      showGameOver ||
      showSuccess ||
      levelCelebration
    ) {
      return;
    }

    const isCorrect = option === currentQuestion.correctAnswer;
    const hpAfterAnswer = isCorrect
      ? progress.hp
      : Math.max(progress.hp - 1, 0);
    const willGameOver = !isCorrect && hpAfterAnswer <= 0;
    const isLastQuestionOverall =
      progress.currentQuestionIndex === totalQuestions - 1;
    const nextQuestionLevel = questions[progress.currentQuestionIndex + 1]?.level;
    const isFinishingLevel =
      isCorrect && nextQuestionLevel !== currentQuestion.level;

    setFeedback({
      type: isCorrect ? "correct" : "wrong",
      message: isCorrect ? "Tepat! Lanjutkan." : "Oops, coba lagi!",
    });

    updateSession((prev) => ({
      ...prev,
      score: isCorrect ? prev.score + 10 : prev.score,
      hp: hpAfterAnswer,
    }));

    if (willGameOver) {
      setGameOverLevel(currentQuestion.level);
      setTimeout(() => {
        setFeedback(null);
        setShowGameOver(true);
      }, 600);
      return;
    }

    setTimeout(() => {
      setFeedback(null);
      if (isFinishingLevel && !isLastQuestionOverall) {
        celebrateLevelCompletion(currentQuestion.level);
      } else {
        handleAdvance({ resetHp: false });
      }
    }, 1000);
  };

  const hearts = Array.from({ length: progress.maxHp ?? 3 });

  const exitGame = useCallback(() => {
    setShowGameOver(false);
    setLevelCelebration(null);
    setFeedback(null);
    setGameOverLevel(null);
    router.push("/dashboard/quiz");
  }, [router]);

  const questionPosition = Math.min(
    progress.currentQuestionIndex + 1,
    totalQuestions
  );

  const optionStyles = useMemo(() => {
    if (!currentQuestion) return [] as OptionStyle[];
    return createRandomOptionStyles(currentQuestion.options.length);
  }, [currentQuestion]);

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
                  disabled={
                    !isReady ||
                    showGameOver ||
                    showSuccess ||
                    Boolean(levelCelebration)
                  }
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

      {levelCelebration && (
        <div className="fixed inset-0 z-38 bg-[#0f172a]/70 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="w-full max-w-md rounded-2xl sm:rounded-[28px] bg-white border border-[#E2D4BB] p-8 space-y-4 text-center shadow-2xl">
            <CheckCircle2 className="h-12 w-12 mx-auto text-[#1BA5A5]" />
            <p className="text-2xl font-semibold text-[#1E293B]">
              Level {levelCelebration.level} tuntas!
            </p>
            <p className="text-[#6B7280]">
              Bersiap memasuki Level {levelCelebration.nextLevel}. HP akan
              dipulihkan penuh.
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
              <p className="text-2xl font-semibold text-[#1E293B]">
                Energi habis di {gameOverLevel ? `Level ${gameOverLevel}` : "level ini"}
              </p>
              <p className="text-[#6B7280] mt-2">
                Kamu sudah mengumpulkan
                <span className="font-semibold text-brand-gold">
                  {" "}
                  {progress.score} poin
                </span>
                . Pilih ingin mengulang level ini atau reset dari awal.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={handleRetryLevel}
                className="flex items-center justify-center gap-2 rounded-2xl border border-[#1E293B] px-4 py-3 text-sm font-semibold text-[#1E293B] hover:bg-[#1E293B] hover:text-white transition cursor-target"
              >
                <RefreshCcw className="h-4 w-4" />
                Ulangi Level Ini
              </button>
              <button
                type="button"
                onClick={handleRestart}
                className="flex items-center justify-center gap-2 rounded-2xl border border-transparent bg-[#1E293B] px-4 py-3 text-sm font-semibold text-white cursor-target"
              >
                <RefreshCcw className="h-4 w-4" />
                Mulai dari Awal
              </button>
            </div>
            <button
              type="button"
              onClick={exitGame}
              className="w-full flex items-center justify-center gap-2 rounded-2xl border border-transparent bg-[#F5F3F0] px-4 py-3 text-sm font-semibold text-[#1E293B] hover:bg-[#EDE9E3] cursor-target"
            >
              <LogOut className="h-4 w-4" />
              Keluar Arena
            </button>
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
