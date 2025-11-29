"use client";

import { ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";

type Section = {
  key: string;
  label: string;
  content: string | string[];
};

type SastraDetailContentProps = {
  sections: Section[];
};

export function SastraDetailContent({ sections }: SastraDetailContentProps) {
  const [activeKey, setActiveKey] = useState(sections[0]?.key ?? "");

  const activeSection = useMemo(() => {
    return sections.find((section) => section.key === activeKey) ?? sections[0];
  }, [sections, activeKey]);

  if (!activeSection) {
    return null;
  }

  return (
    <>
      <div className="w-full h-auto lg:h-[calc(100vh-8rem-8rem)] overflow-visible lg:overflow-hidden">
        <div className="flex h-full flex-col gap-4 lg:flex-row lg:gap-6">
          <aside className="w-full lg:w-72 shrink-0 flex flex-col items-start gap-3">
            {sections.map((section) => {
              const isActive = section.key === activeSection.key;

              return (
                <button
                  key={section.key}
                  onClick={() => setActiveKey(section.key)}
                  className={`flex items-center justify-between w-full rounded-2xl border p-4 text-md font-semibold text-left transition cursor-pointer shadow-sm transition hover:translate-y-1 hover:shadow-xl  ${
                    isActive
                      ? "bg-[radial-gradient(circle_at_right,_rgba(255,252,245,0.98),_rgba(247,234,208,0.98))] border-brand-gold"
                      : "border-transparent bg-brand-gold/5 hover:border-brand-gold"
                  }`}
                >
                  {section.label}
                  {isActive && (
                    <ChevronRight className="h-4 w-4 text-brand-gold" />
                  )}
                </button>
              );
            })}
          </aside>

          <main className="flex-1 overflow-y-auto rounded-2xl sm:rounded-[28px] lg:rounded-[32px] border border-[#E2D4BB] bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.96),_rgba(243,232,217,0.96))] p-6 sm:p-8 lg:p-12 flex flex-col gap-4 sm:gap-6 shadow-sm">
            <div key={activeSection.key} className="space-y-4 animate-detail">
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold text-[#111827]">
                  {activeSection.label}
                </h2>
              </div>

              {Array.isArray(activeSection.content) ? (
                activeSection.key === "contoh" ? (
                  <div className="flex-1 space-y-3 text-sm sm:text-base leading-relaxed font-[var(--literary-font)] text-[#374151]">
                    {activeSection.content.map((item, index) => (
                      <p key={item + index}>{item}</p>
                    ))}
                  </div>
                ) : activeSection.key === "kegunaan" ? (
                  <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base leading-relaxed text-[#4B5563]">
                    {activeSection.content.map((item, index) => (
                      <li key={item + index}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <ul className="space-y-3 text-[#4B5563]">
                    {activeSection.content.map((item, index) => (
                      <li
                        key={item + index}
                        className="p-3 text-sm leading-relaxed rounded-2xl bg-white/60 border border-[#E5E7EB]"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                )
              ) : (
                <p className="text-base leading-relaxed text-[#4B5563]">
                  {activeSection.content}
                </p>
              )}
            </div>
          </main>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeSlide {
          0% {
            opacity: 0;
            transform: translateY(8px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-detail {
          animation: fadeSlide 0.35s ease;
        }
      `}</style>
    </>
  );
}
