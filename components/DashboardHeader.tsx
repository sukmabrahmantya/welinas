"use client";

import { useState } from "react";
import { DASHBOARD_MENUS } from "@/lib/dashboard/menus";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export function DashboardHeader() {
  const pathname = usePathname();
  const showNav = pathname !== "/dashboard";
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-[#020617] via-[#0F172A] to-[#1E293B] text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-[#22C55E]/60 via-[#22D3EE]/60 to-[#FBBF24]/70 opacity-70 blur-md" />
            <Image
              src="/images/brand.png"
              alt="Logo Welinas"
              width={32}
              height={32}
              className="relative w-9 h-9 sm:w-10 sm:h-10 object-contain rounded-xl "
            />
          </div>
          <p className="font-semibold text-lg sm:text-2xl leading-tight text-brand-gold tracking-tight">
            Welinas.
          </p>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {showNav && (
            <Link
              href="/dashboard"
              className="relative px-3 py-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition"
            >
              Beranda
            </Link>
          )}

          {showNav &&
            DASHBOARD_MENUS.map((menu) => {
              const isActive =
                pathname === menu.href || pathname.startsWith(menu.href + "/");

              return (
                <Link
                  key={menu.href}
                  href={menu.href}
                  className={`relative px-3 py-1.5 rounded-full transition ${
                    isActive
                      ? "text-brand-gold bg-white/10 shadow-[0_0_12px_rgba(251,191,36,0.45)]"
                      : "text-white/75 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {menu.label}
                  {isActive && (
                    <span className="pointer-events-none absolute -bottom-1.5 left-1/2 h-1 w-6 -translate-x-1/2 rounded-full bg-brand-gold opacity-90" />
                  )}
                </Link>
              );
            })}

          <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-gradient-to-tr from-[#FACC15] via-[#FB923C] to-[#22C55E] text-[#0F172A] flex items-center justify-center font-semibold text-sm sm:text-base shadow-md">
            U
          </div>
        </nav>

        <button
          type="button"
          onClick={() => setIsMobileOpen((prev) => !prev)}
          className="md:hidden inline-flex items-center justify-center rounded-full p-2 text-white hover:bg-white/10"
          aria-label="Toggle navigation"
        >
          {isMobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {isMobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-gradient-to-b from-[#020617] via-[#020617] to-[#0F172A]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 space-y-2">
            {showNav && (
              <Link
                href="/dashboard"
                onClick={() => setIsMobileOpen(false)}
                className="block rounded-xl px-3 py-2 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white"
              >
                Beranda
              </Link>
            )}

            {showNav &&
              DASHBOARD_MENUS.map((menu) => {
                const isActive =
                  pathname === menu.href ||
                  pathname.startsWith(menu.href + "/");

                return (
                  <Link
                    key={menu.href}
                    href={menu.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={`block rounded-xl px-3 py-2 text-sm font-medium transition ${
                      isActive
                        ? "bg-white/10 text-brand-gold shadow-[0_0_10px_rgba(251,191,36,0.35)]"
                        : "text-white/80 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {menu.label}
                  </Link>
                );
              })}

            <div className="pt-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-[#FACC15] via-[#FB923C] to-[#22C55E] text-[#0F172A] flex items-center justify-center font-semibold text-sm shadow-md">
                U
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
