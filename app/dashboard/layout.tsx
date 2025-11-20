import { ReactNode } from "react";

import { FloatingCameraAction } from "@/components/FloatingCamera";
import { DashboardHeader } from "@/components/DashboardHeader";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DashboardHeader />
      {children}
      <FloatingCameraAction />
    </div>
  );
}
