"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, MailCheck, MailWarning } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Input } from "@/components/Input";
import { Button } from "@/components/ui/button";
import { useForgotPasswordMutation } from "@/hooks/useAuthMutations";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const forgotPasswordMutation = useForgotPasswordMutation();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setInfoMessage(null);
    forgotPasswordMutation.mutate(
      { email },
      {
        onSuccess: (data) => {
          setInfoMessage(data.message);
        },
        onError: (err) => {
          setError(
            err instanceof Error ? err.message : "Gagal memproses permintaan"
          );
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-[#F3E8D9] relative overflow-hidden flex lg:items-center">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-16 right-10 w-32 h-32 border-2 border-[#1E293B]/10 rounded-full" />
        <div className="absolute bottom-20 left-6 w-40 h-40 border-2 border-[#1E293B]/10 rounded-full" />
        <div className="absolute top-1/3 right-1/4 w-24 h-24 border-2 border-brand-gold/20 rounded-full" />
      </div>

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-12 h-72 w-[120%] -rotate-6 bg-[#111827]/8" />
        <div className="absolute -top-24 right-[-60px] h-64 w-64 rounded-full bg-brand-gold/30 blur-3xl" />
        <div className="absolute bottom-[-80px] -left-20 h-72 w-72 rounded-full bg-[#1BA5A5]/20 blur-3xl" />
        <div className="absolute bottom-[-120px] left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-gold/22 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.15] [background-image:linear-gradient(to_right,#11182722_1px,transparent_1px),linear-gradient(to_bottom,#11182722_1px,transparent_1px)] [background-size:48px_48px]" />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100vh-8rem)]">
          <div className="hidden lg:block order-1">
            <div className="relative">
              <div className="relative w-full max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1E293B]/5 to-brand-gold/5 rounded-full blur-3xl" />
                <div className="relative bg-white/50 backdrop-blur-sm rounded-2xl sm:rounded-[28px] p-8 lg:p-12 shadow-xl border border-[#1E293B]/10">
                  <Image
                    src="/images/character-3.png"
                    alt="Ilustrasi pemulihan akun"
                    width={420}
                    height={420}
                    className="mx-auto w-full max-w-sm object-contain"
                    priority
                  />
                </div>
              </div>
              <div className="hidden lg:block absolute -bottom-4 -right-8 bg-white px-6 py-3 rounded-full shadow-lg border border-[#1E293B]/10 animate-float">
                <p className="text-sm text-[#1E293B]">🔐 Amankan akunmu</p>
              </div>
            </div>
          </div>

          <div className="order-2">
            <div className="max-w-md mx-auto lg:mx-0">
              <button
                onClick={() => router.push("/login")}
                className="inline-flex items-center gap-2 text-[#6B7280] hover:text-[#1E293B] transition-colors mb-6 cursor-pointer"
                type="button"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">Kembali ke Login</span>
              </button>

              <h1 className="text-4xl lg:text-5xl text-[#1E293B] mb-4">
                Pulihkan Password
              </h1>
              <p className="text-lg text-[#6B7280] mb-8">
                Masukkan email terdaftar dan kami akan mengirimkan instruksi
                untuk membuat password baru.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <Input
                  label="Email"
                  type="email"
                  placeholder="nama@email.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  icon={<MailWarning className="w-5 h-5" />}
                  required
                />

                {error && (
                  <p className="text-sm text-[#F97362] bg-[#FEE2E2] border border-[#FCA5A5] rounded-xl px-4 py-2">
                    {error}
                  </p>
                )}

                {infoMessage && (
                  <div className="flex items-start gap-3 rounded-2xl border border-[#22C55E]/30 bg-[#DCFCE7] px-4 py-3 text-[#1E293B] text-sm">
                    <MailCheck className="w-5 h-5 text-[#15803d]" />
                    <span>{infoMessage}</span>
                  </div>
                )}

                <Button
                  type="submit"
                  size="xl"
                  disabled={forgotPasswordMutation.isPending}
                  className="w-full cursor-pointer disabled:opacity-50"
                >
                  {forgotPasswordMutation.isPending
                    ? "Mengirim..."
                    : "Kirim tautan pemulihan"}
                  {!forgotPasswordMutation.isPending && (
                    <ArrowRight className="w-5 h-5" />
                  )}
                </Button>
              </form>

              <div className="mt-10 rounded-2xl border border-[#D4D4D8]/60 bg-white/80 px-5 py-4 text-sm text-[#475569]">
                <p className="font-semibold text-[#1E293B] mb-2">
                  Belum menerima email?
                </p>
                <ul className="list-disc ml-5 space-y-1">
                  <li>Periksa folder spam atau promo Anda.</li>
                  <li>Pastikan email yang dimasukkan sudah benar.</li>
                  <li>
                    Hubungi{" "}
                    <span className="text-brand-gold font-semibold">
                      support@welinas.id
                    </span>{" "}
                    jika tetap tidak ada.
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
