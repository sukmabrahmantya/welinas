"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  ShieldCheck,
  ShieldOff,
} from "lucide-react";
import Image from "next/image";

import { Input } from "@/components/Input";
import { Button } from "@/components/ui/button";
import { useResetPasswordMutation } from "@/hooks/useAuthMutations";

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const resetPasswordMutation = useResetPasswordMutation();

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        router.push("/login");
      }, 2500);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [router, success]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!token) {
      setError(
        "Token tidak ditemukan. Silakan ulangi permintaan reset password."
      );
      return;
    }
    if (password.length < 8) {
      setError("Password minimal 8 karakter.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Konfirmasi password tidak sama.");
      return;
    }
    setError(null);
    setSuccess(null);
    resetPasswordMutation.mutate(
      { token, password },
      {
        onSuccess: (data) => {
          setSuccess(data.message);
        },
        onError: (err) => {
          setError(
            err instanceof Error ? err.message : "Gagal memperbarui password"
          );
        },
      }
    );
  };

  const disabled = !token;

  return (
    <div className="min-h-screen bg-[#F3E8D9] relative overflow-hidden flex lg:items-center">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-12 right-6 w-32 h-32 border-2 border-[#1E293B]/10 rounded-full" />
        <div className="absolute bottom-16 left-10 w-36 h-36 border-2 border-[#1E293B]/10 rounded-full" />
        <div className="absolute top-1/3 right-1/4 w-24 h-24 border-2 border-brand-gold/20 rounded-full" />
      </div>

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-36 -left-20 h-72 w-[130%] -rotate-6 bg-[#111827]/8" />
        <div className="absolute -top-24 right-[-60px] h-64 w-64 rounded-full bg-brand-gold/30 blur-3xl" />
        <div className="absolute bottom-[-80px] -left-20 h-72 w-72 rounded-full bg-[#F97362]/20 blur-3xl" />
        <div className="absolute bottom-[-120px] left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-gold/22 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.15] [background-image:linear-gradient(to_right,#11182722_1px,transparent_1px),linear-gradient(to_bottom,#11182722_1px,transparent_1px)] [background-size:48px_48px]" />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100vh-8rem)]">
          <div className="hidden lg:block order-1">
            <div className="relative">
              <div className="relative w-full max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1E293B]/5 to-brand-gold/5 rounded-full blur-3xl" />
                <div className="relative bg-white/60 backdrop-blur-sm rounded-2xl sm:rounded-[28px] p-8 lg:p-12 shadow-xl border border-[#1E293B]/10">
                  <Image
                    src="/images/character.png"
                    alt="Ilustrasi reset password"
                    width={420}
                    height={420}
                    className="mx-auto w-full max-w-sm object-contain"
                    priority
                  />
                </div>
              </div>
              <div className="hidden lg:block absolute -bottom-4 -right-8 bg-white px-6 py-3 rounded-full shadow-lg border border-[#1E293B]/10 animate-float">
                <p className="text-sm text-[#1E293B]">
                  🔒 Jaga keamanan akunmu
                </p>
              </div>
            </div>
          </div>

          <div className="order-2">
            <div className="max-w-md mx-auto lg:mx-0">
              <button
                type="button"
                onClick={() => router.push("/login")}
                className="inline-flex items-center gap-2 text-[#6B7280] hover:text-[#1E293B] transition-colors mb-6 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">Kembali ke Masuk</span>
              </button>

              <h1 className="text-4xl lg:text-5xl text-[#1E293B] mb-4">
                Atur Password Baru
              </h1>
              <p className="text-lg text-[#6B7280] mb-8">
                Masukkan password baru yang kuat untuk akun Welinas Anda.
              </p>

              {disabled && (
                <div className="rounded-2xl border border-[#F97362]/30 bg-[#FEF2F2] px-4 py-4 text-sm text-[#991b1b] mb-6 flex items-start gap-3">
                  <ShieldOff className="w-5 h-5 mt-0.5" />
                  <div>
                    Token reset tidak ditemukan. Silakan ulangi permintaan reset
                    password melalui halaman Lupa Password.
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="relative">
                  <Input
                    label="Password Baru"
                    type={showPassword ? "text" : "password"}
                    placeholder={showPassword ? "password" : "••••••••"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    icon={<Lock className="w-5 h-5" />}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-[65%] -translate-y-1/2 text-[#6B7280] hover:text-[#1E293B]"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>

                <div className="relative">
                  <Input
                    label="Konfirmasi Password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder={showConfirmPassword ? "password" : "••••••••"}
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    icon={<Lock className="w-5 h-5" />}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-[65%] -translate-y-1/2 text-[#6B7280] hover:text-[#1E293B]"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {error && (
                  <p className="text-sm text-[#F97362] bg-[#FEE2E2] border border-[#FCA5A5] rounded-xl px-4 py-2">
                    {error}
                  </p>
                )}

                {success && (
                  <div className="flex items-start gap-3 rounded-2xl border border-[#22C55E]/30 bg-[#DCFCE7] px-4 py-3 text-[#14532d] text-sm">
                    <ShieldCheck className="w-5 h-5" />
                    <span>{success}</span>
                  </div>
                )}

                <Button
                  type="submit"
                  size="xl"
                  disabled={disabled || resetPasswordMutation.isPending}
                  className="w-full cursor-pointer disabled:opacity-50"
                >
                  {resetPasswordMutation.isPending
                    ? "Menyimpan..."
                    : "Simpan Password"}
                  {!resetPasswordMutation.isPending && (
                    <ArrowRight className="w-5 h-5" />
                  )}
                </Button>
              </form>

              <div className="mt-10 rounded-2xl border border-[#D4D4D8]/60 bg-white/80 px-5 py-4 text-sm text-[#475569]">
                <p className="font-semibold text-[#1E293B] mb-2">
                  Tips keamanan password:
                </p>
                <ul className="list-disc ml-5 space-y-1">
                  <li>
                    Gunakan kombinasi huruf besar, huruf kecil, angka, dan
                    simbol.
                  </li>
                  <li>
                    Hindari menggunakan password yang sama dengan platform lain.
                  </li>
                  <li>
                    Ubah password Anda secara berkala untuk keamanan optimal.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F3E8D9] flex items-center justify-center text-[#1E293B]">
          Memuat formulir reset password...
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}
