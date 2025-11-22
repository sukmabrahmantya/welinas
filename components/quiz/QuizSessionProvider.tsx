"use client";

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type QuizProgress = {
  currentQuestionIndex: number;
  answers: Record<string, string>;
  lastResult?: "correct" | "wrong";
  completed: boolean;
};

type QuizSessionMap = Record<string, QuizProgress>;

type QuizGameSession = {
  currentQuestionIndex: number;
  hp: number;
  maxHp: number;
  score: number;
  completed: boolean;
};

const defaultProgress: QuizProgress = {
  currentQuestionIndex: 0,
  answers: {},
  completed: false,
};

const defaultGameSession: QuizGameSession = {
  currentQuestionIndex: 0,
  hp: 3,
  maxHp: 3,
  score: 0,
  completed: false,
};

type QuizSessionContextValue = {
  getProgress: (key: string) => QuizProgress;
  setCurrentQuestionIndex: (key: string, index: number) => void;
  setAnswer: (key: string, questionId: string, value: string) => void;
  setLastResult: (key: string, result?: "correct" | "wrong") => void;
  setLevelCompleted: (key: string, completed: boolean) => void;
  isLevelCompleted: (key: string) => boolean;
  resetSession: (key: string) => void;
  initializeGameSession: (key: string, initial?: Partial<QuizGameSession>) => void;
  getGameSession: (key: string) => QuizGameSession;
  updateGameSession: (
    key: string,
    updater: (prev: QuizGameSession) => QuizGameSession,
  ) => void;
  resetGameSession: (key: string) => void;
};

const QuizSessionContext = createContext<QuizSessionContextValue | null>(null);

export function QuizSessionProvider({ children }: { children: ReactNode }) {
  const [sessionMap, setSessionMap] = useState<QuizSessionMap>({});
  const [gameSessions, setGameSessions] = useState<
    Record<string, QuizGameSession>
  >({});

  const getProgress = useCallback(
    (key: string): QuizProgress => {
      return sessionMap[key] ?? { ...defaultProgress };
    },
    [sessionMap],
  );

  const setCurrentQuestionIndex = useCallback(
    (key: string, index: number) => {
      setSessionMap((prev) => {
        const progress = prev[key] ?? { ...defaultProgress };
        return {
          ...prev,
          [key]: {
            ...progress,
            currentQuestionIndex: index,
            lastResult: undefined,
          },
        };
      });
    },
    [],
  );

  const setAnswer = useCallback(
    (key: string, questionId: string, value: string) => {
      setSessionMap((prev) => {
        const progress = prev[key] ?? { ...defaultProgress };
        return {
          ...prev,
          [key]: {
            ...progress,
            answers: {
              ...progress.answers,
              [questionId]: value,
            },
          },
        };
      });
    },
    [],
  );

  const setLastResult = useCallback((key: string, result?: "correct" | "wrong") => {
    setSessionMap((prev) => {
      const progress = prev[key] ?? { ...defaultProgress };
      return {
        ...prev,
        [key]: {
          ...progress,
          lastResult: result,
        },
      };
    });
  }, []);

  const setLevelCompleted = useCallback((key: string, completed: boolean) => {
    setSessionMap((prev) => {
      const progress = prev[key] ?? { ...defaultProgress };
      if (progress.completed === completed) {
        return prev;
      }
      return {
        ...prev,
        [key]: {
          ...progress,
          completed,
        },
      };
    });
  }, []);

  const isLevelCompleted = useCallback(
    (key: string) => {
      return sessionMap[key]?.completed === true;
    },
    [sessionMap],
  );

  const resetSession = useCallback((key: string) => {
    setSessionMap((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  const initializeGameSession = useCallback(
    (key: string, initial?: Partial<QuizGameSession>) => {
      setGameSessions((prev) => {
        if (prev[key]) {
          return prev;
        }
        return {
          ...prev,
          [key]: {
            ...defaultGameSession,
            ...initial,
          },
        };
      });
    },
    [],
  );

  const getGameSession = useCallback(
    (key: string): QuizGameSession => {
      return gameSessions[key] ?? { ...defaultGameSession };
    },
    [gameSessions],
  );

  const updateGameSession = useCallback(
    (key: string, updater: (prev: QuizGameSession) => QuizGameSession) => {
      setGameSessions((prev) => {
        const current = prev[key] ?? { ...defaultGameSession };
        return {
          ...prev,
          [key]: updater(current),
        };
      });
    },
    [],
  );

  const resetGameSession = useCallback((key: string) => {
    setGameSessions((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  const value = useMemo<QuizSessionContextValue>(
    () => ({
      getProgress,
      setCurrentQuestionIndex,
      setAnswer,
      setLastResult,
      setLevelCompleted,
      isLevelCompleted,
      resetSession,
      initializeGameSession,
      getGameSession,
      updateGameSession,
      resetGameSession,
    }),
    [
      getProgress,
      setCurrentQuestionIndex,
      setAnswer,
      setLastResult,
      setLevelCompleted,
      isLevelCompleted,
      resetSession,
      initializeGameSession,
      getGameSession,
      updateGameSession,
      resetGameSession,
    ],
  );

  return (
    <QuizSessionContext.Provider value={value}>
      {children}
    </QuizSessionContext.Provider>
  );
}

export function useQuizSession(key: string) {
  const context = useContext(QuizSessionContext);

  if (!context) {
    throw new Error("useQuizSession must be used within QuizSessionProvider");
  }

  const progress = context.getProgress(key);
  const isLevelCompleted = (targetKey: string = key) =>
    context.isLevelCompleted(targetKey);

  return {
    progress,
    setCurrentQuestionIndex: (index: number) =>
      context.setCurrentQuestionIndex(key, index),
    setAnswer: (questionId: string, value: string) =>
      context.setAnswer(key, questionId, value),
    setLastResult: (result?: "correct" | "wrong") =>
      context.setLastResult(key, result),
    setLevelCompleted: (completed: boolean) =>
      context.setLevelCompleted(key, completed),
    isLevelCompleted,
    resetSession: () => context.resetSession(key),
  };
}

export function useQuizGameSession(
  key: string,
  options?: { maxHp?: number },
) {
  const context = useContext(QuizSessionContext);

  if (!context) {
    throw new Error("useQuizGameSession must be used within QuizSessionProvider");
  }

  const desiredHp = options?.maxHp ?? defaultGameSession.maxHp;

  useEffect(() => {
    context.initializeGameSession(key, {
      maxHp: desiredHp,
      hp: desiredHp,
    });
  }, [context, key, desiredHp]);

  const progress = context.getGameSession(key);

  return {
    progress,
    updateSession: useCallback(
      (updater: (prev: QuizGameSession) => QuizGameSession) =>
        context.updateGameSession(key, updater),
      [context, key],
    ),
    resetGame: useCallback(() => {
      context.resetGameSession(key);
      context.initializeGameSession(key, {
        maxHp: desiredHp,
        hp: desiredHp,
      });
    }, [context, key, desiredHp]),
  };
}
