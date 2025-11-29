"use client";

import { DashboardHeader } from "@/components/DashboardHeader";
import { FloatingCameraAction } from "@/components/FloatingCamera";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F3E8D9]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-32 h-72 w-[140%] -rotate-6 bg-[#111827]/8" />
        <div className="absolute -top-24 right-[-60px] h-64 w-64 rounded-full bg-brand-gold/30 blur-3xl" />
        <div className="absolute bottom-[-80px] -left-20 h-72 w-72 rounded-full bg-[#4F46E5]/20 blur-3xl" />
        <div className="absolute bottom-[-100px] left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-gold/22 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.15] [background-image:linear-gradient(to_right,#11182722_1px,transparent_1px),linear-gradient(to_bottom,#11182722_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="absolute inset-x-0 top-20 h-72 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.78),transparent_65%)]" />
      </div>

      <div className="relative min-h-screen flex flex-col">
        <DashboardHeader />
        <main className="flex-1">{children}</main>
        <FloatingCameraAction />
      </div>
    </div>
  );
}
