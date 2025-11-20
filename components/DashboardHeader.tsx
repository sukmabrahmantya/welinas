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
    <header className="bg-[#1E293B] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/images/brand.png"
            alt="Logo Welinas"
            width={32}
            height={32}
            className="w-9 h-9 sm:w-10 sm:h-10 object-contain"
          />
          <p className="font-semibold text-lg sm:text-2xl leading-tight text-brand-gold">
            Welinas.
          </p>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {showNav && (
            <Link
              href="/dashboard"
              className="relative text-white/80 transition hover:text-white"
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
                  className={`relative transition hover:text-white ${
                    isActive ? "text-brand-gold" : "text-white/80"
                  }`}
                >
                  {menu.label}
                  {isActive && (
                    <span className="absolute -bottom-1.5 left-1/2 h-1 w-2 -translate-x-1/2 rounded-full bg-brand-gold" />
                  )}
                </Link>
              );
            })}

          <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-brand-gold text-primary flex items-center justify-center font-semibold text-sm sm:text-base">
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
        <div className="md:hidden border-t border-white/10">
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
                        ? "bg-white/10 text-brand-gold"
                        : "text-white/80 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {menu.label}
                  </Link>
                );
              })}

            <div className="pt-2">
              <div className="h-8 w-8 rounded-full bg-brand-gold text-primary flex items-center justify-center font-semibold text-sm">
                U
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
