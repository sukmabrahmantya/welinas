import type { ReactNode } from "react";

import { QuizSessionProvider } from "@/components/quiz/QuizSessionProvider";

export default function QuizLayout({ children }: { children: ReactNode }) {
  return <QuizSessionProvider>{children}</QuizSessionProvider>;
}
