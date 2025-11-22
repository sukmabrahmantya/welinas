"use client";

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
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

type QuizSessionContextValue = {
  getProgress: (key: string) => QuizProgress;
  setCurrentQuestionIndex: (key: string, index: number) => void;
  setAnswer: (key: string, questionId: string, value: string) => void;
  setLastResult: (key: string, result?: "correct" | "wrong") => void;
  setLevelCompleted: (key: string, completed: boolean) => void;
  isLevelCompleted: (key: string) => boolean;
  resetSession: (key: string) => void;
};

const QuizSessionContext = createContext<QuizSessionContextValue | null>(null);

const defaultProgress: QuizProgress = {
  currentQuestionIndex: 0,
  answers: {},
  completed: false,
};

export function QuizSessionProvider({ children }: { children: ReactNode }) {
  const [sessionMap, setSessionMap] = useState<QuizSessionMap>({});

  const getProgress = useCallback(
    (key: string): QuizProgress => {
      return sessionMap[key] ?? { ...defaultProgress };
    },
    [sessionMap]
  );

  const setCurrentQuestionIndex = useCallback((key: string, index: number) => {
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
  }, []);

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
    []
  );

  const setLastResult = useCallback(
    (key: string, result?: "correct" | "wrong") => {
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
    },
    []
  );

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
    [sessionMap]
  );

  const resetSession = useCallback((key: string) => {
    setSessionMap((prev) => {
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
    }),
    [
      getProgress,
      setCurrentQuestionIndex,
      setAnswer,
      setLastResult,
      setLevelCompleted,
      isLevelCompleted,
      resetSession,
    ]
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
