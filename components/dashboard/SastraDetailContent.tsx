"use client";

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
                  className={`w-full rounded-2xl border border-[#D4D4D8]/60 p-4 text-md font-semibold text-center transition text-left cursor-pointer ${
                    isActive
                      ? "bg-brand-gold text-primary shadow-lg hover:bg-brand-gold/80"
                      : "border-transparent bg-white/70 text-[#475569] hover:bg-white hover:text-[#1E293B]"
                  }`}
                >
                  {section.label}
                </button>
              );
            })}
          </aside>

          <main className="flex-1 overflow-y-auto bg-white rounded-2xl sm:rounded-[28px] lg:rounded-[32px] border border-[#E4E4ED] p-6 sm:p-8 lg:p-12 flex flex-col gap-4 sm:gap-6">
            <div key={activeSection.key} className="space-y-4 animate-detail">
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold text-[#1E293B]">
                  {activeSection.label}
                </h2>
              </div>

              {Array.isArray(activeSection.content) ? (
                activeSection.key === "contoh" ? (
                  <div className="flex-1 space-y-3 text-sm sm:text-base leading-relaxed font-[var(--literary-font)] text-[#475569]">
                    {activeSection.content.map((item, index) => (
                      <p key={item + index}>{item}</p>
                    ))}
                  </div>
                ) : activeSection.key === "kegunaan" ? (
                  <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base leading-relaxed text-[#475569]">
                    {activeSection.content.map((item, index) => (
                      <li key={item + index}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <ul className="space-y-3 text-[#475569]">
                    {activeSection.content.map((item, index) => (
                      <li
                        key={item + index}
                        className="p-3 text-sm leading-relaxed"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                )
              ) : (
                <p className="text-base leading-relaxed text-[#475569]">
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
