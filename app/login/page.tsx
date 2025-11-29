"use client";

import { useEffect, useState } from "react";
import { Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/Input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/hooks/useAuthMutations";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const loginMutation = useLoginMutation();
  const { data: currentUser } = useCurrentUser();

  useEffect(() => {
    if (currentUser) {
      router.replace("/dashboard");
    }
  }, [currentUser, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    loginMutation.mutate(
      { email, password },
      {
        onSuccess: () => {
          router.replace("/dashboard");
        },
        onError: (err) => {
          setError(err instanceof Error ? err.message : "Gagal masuk");
        },
      },
    );
  };

  return (
    <div className="min-h-screen bg-[#F3E8D9] relative overflow-hidden flex lg:items-center">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-32 h-32 border-2 border-[#1E293B]/10 rounded-full" />
        <div className="absolute bottom-12 left-10 w-40 h-40 border-2 border-[#1E293B]/10 rounded-full" />
        <div className="absolute top-1/2 right-1/4 w-24 h-24 border-2 border-brand-gold/20 rounded-full" />
      </div>

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-32 h-72 w-[140%] -rotate-6 bg-[#111827]/8" />
        <div className="absolute -top-24 right-[-60px] h-64 w-64 rounded-full bg-brand-gold/30 blur-3xl" />
        <div className="absolute bottom-[-80px] -left-20 h-72 w-72 rounded-full bg-[#4F46E5]/20 blur-3xl" />
        <div className="absolute bottom-[-100px] left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-gold/22 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.15] [background-image:linear-gradient(to_right,#11182722_1px,transparent_1px),linear-gradient(to_bottom,#11182722_1px,transparent_1px)] [background-size:48px_48px]" />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100vh-8rem)]">
          {/* Left Column - Illustration */}
          <div className="hidden lg:block order-1">
            <div className="relative">
              <div className="relative w-full max-w-md mx-auto aspect-square">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1E293B]/5 to-brand-gold/5 rounded-full blur-3xl" />
                <div className="relative bg-white/50 backdrop-blur-sm rounded-2xl sm:rounded-[28px] p-8 lg:p-12 shadow-xl border border-[#1E293B]/10">
                  <Image
                    src="/images/character-2.png"
                    alt="Ilustrasi pembaca Welinas"
                    width={420}
                    height={420}
                    className="mx-auto w-full max-w-xs lg:max-w-sm object-contain -scale-x-100"
                    priority
                  />
                </div>
              </div>

              {/* Floating badge */}
              <div className="hidden lg:block absolute -bottom-4 -right-8 bg-white px-6 py-3 rounded-full shadow-lg border border-[#1E293B]/10 animate-float">
                <p className="text-sm text-[#1E293B]">📖 Selamat Datang</p>
              </div>
            </div>
          </div>

          {/* Right Column - Login Form */}
          <div className="order-2">
            <div className="max-w-md mx-auto lg:mx-0">
              {/* Header */}
              <div className="mb-4">
                <button
                  onClick={() => router.push("/")}
                  className="inline-flex items-center gap-2 text-[#6B7280] hover:text-[#1E293B] transition-colors mb-6 cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4 rotate-180" />
                  <span className="text-sm">Kembali</span>
                </button>

                <h1 className="text-4xl lg:text-5xl text-[#1E293B] mb-4">
                  Masuk
                </h1>
                <p className="text-lg text-[#6B7280]">
                  Selamat datang kembali! Masukkan kredensial Anda untuk
                  melanjutkan.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Email"
                  type="email"
                  placeholder="nama@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  icon={<Mail className="w-5 h-5" />}
                  required
                />

                <div className="relative">
                  <Input
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    placeholder={showPassword ? "password" : "••••••••"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    icon={<Lock className="w-5 h-5" />}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-[65%] -translate-y-1/2 text-[#6B7280] hover:text-[#1E293B] transition-colors"
                  >
                    {showPassword ? (
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

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-[#D4D4D8] text-[#1E293B] focus:ring-brand-gold"
                    />
                    <span className="text-sm text-[#6B7280]">Ingat saya</span>
                  </label>
                  <button
                    type="button"
                    className="text-sm text-brand-gold hover:text-[#1E293B] transition-colors"
                  >
                    Lupa password?
                  </button>
                </div>

                <Button
                  type="submit"
                  size="xl"
                  disabled={loginMutation.isPending}
                  className="w-full cursor-pointer disabled:opacity-50"
                >
                  {loginMutation.isPending ? "Memproses..." : "Masuk"}
                  {!loginMutation.isPending && (
                    <ArrowRight className="w-5 h-5" />
                  )}
                </Button>
              </form>

              {/* Divider */}
              <div className="relative mt-8 mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#D4D4D8]"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-[#F5F3F0] text-[#6B7280]">atau</span>
                </div>
              </div>

              {/* Sign up link */}
              <div className="text-center">
                <p className="text-[#6B7280]">
                  Belum punya akun?{" "}
                  <button
                    type="button"
                    onClick={() => router.push("/signup")}
                    className="text-brand-gold hover:text-[#1E293B] transition-colors cursor-pointer"
                  >
                    Daftar sekarang
                  </button>
                </p>
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
