"use client";

import { DASHBOARD_MENUS } from "@/lib/dashboard/menus";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function DashboardHeader() {
  const pathname = usePathname();
  const showNav = pathname !== "/dashboard";

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
      </div>
    </header>
  );
}
