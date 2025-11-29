"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, Menu, User, X } from "lucide-react";

import { DASHBOARD_MENUS } from "@/lib/dashboard/menus";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useLogoutMutation } from "@/hooks/useAuthMutations";

export function DashboardHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const showNav = pathname !== "/dashboard";
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
  const avatarRef = useRef<HTMLDivElement | null>(null);

  const { data: currentUser } = useCurrentUser();
  const logoutMutation = useLogoutMutation();

  const initials =
    currentUser?.name
      ?.split(" ")
      .map((part) => part[0]?.toUpperCase())
      .slice(0, 2)
      .join("") ?? "U";

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSettled: () => {
        setAvatarMenuOpen(false);
        setIsMobileOpen(false);
        router.replace("/");
      },
    });
  };

  useEffect(() => {
    if (!avatarMenuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        avatarRef.current &&
        !avatarRef.current.contains(event.target as Node)
      ) {
        setAvatarMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [avatarMenuOpen]);

  useEffect(() => {
    setAvatarMenuOpen(false);
    setIsMobileOpen(false);
  }, [pathname]);

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

          {currentUser ? (
            <div className="relative" ref={avatarRef}>
              <button
                type="button"
                onClick={() => setAvatarMenuOpen((prev) => !prev)}
                className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-brand-gold text-[#0F172A] flex items-center justify-center font-semibold text-sm sm:text-base shadow-md focus:outline-none focus:ring-2 focus:ring-brand-gold/70 focus:ring-offset-2 focus:ring-offset-[#020617] cursor-pointer hover:opacity-80"
                aria-haspopup="menu"
                aria-expanded={avatarMenuOpen}
              >
                {initials}
              </button>
              {avatarMenuOpen && (
                <div className="absolute right-0 mt-3 w-48 rounded-2xl border border-white/10 bg-[#020617]/95 text-white shadow-2xl backdrop-blur-md z-50 overflow-hidden">
                  <div className="px-4 py-3 border-b border-white/5">
                    <p className="text-xs text-white/60">Masuk sebagai</p>
                    <p className="text-sm font-semibold truncate">
                      {currentUser.name ?? "Pengguna Welinas"}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setAvatarMenuOpen(false);
                      router.push("/dashboard/profile");
                    }}
                    className="cursor-pointer w-full flex items-center gap-2 px-4 py-3 text-left text-sm hover:bg-white/5 transition"
                  >
                    <User className="h-4 w-4 text-brand-gold" />
                    <span>Profil</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleLogout}
                    disabled={logoutMutation.isPending}
                    className="cursor-pointer w-full flex items-center gap-2 px-4 py-3 text-left text-sm text-[#FCA5A5] hover:bg-[#7F1D1D]/40 disabled:opacity-60 disabled:cursor-not-allowed transition"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>
                      {logoutMutation.isPending ? "Keluar..." : "Keluar"}
                    </span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="text-sm font-semibold bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition"
            >
              Masuk
            </Link>
          )}
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

            {currentUser ? (
              <div className="pt-2 space-y-3">
                <button
                  onClick={() => {
                    setIsMobileOpen(false);
                    router.push("/dashboard/profile");
                  }}
                  className="w-full rounded-xl bg-white/10 px-3 py-2 text-sm font-semibold text-white hover:bg-white/20"
                >
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  disabled={logoutMutation.isPending}
                  className="w-full rounded-xl border border-white/20 px-3 py-2 text-sm font-semibold text-white hover:bg-white/10 disabled:opacity-60"
                >
                  {logoutMutation.isPending ? "Keluar..." : "Keluar"}
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsMobileOpen(false)}
                className="block rounded-xl bg-white/10 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-white/20"
              >
                Masuk
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
