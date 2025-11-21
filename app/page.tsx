"use client";

import GlitchText from "@/components/GlitchText";
import TextType from "@/components/TextType";
import { ArrowRight, BookOpen, Sparkles, Users } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-6 w-32 h-32 border-2 border-[#1E293B]/10 rounded-full" />
        <div className="absolute bottom-14 right-12 w-40 h-40 border-2 border-[#1E293B]/10 rounded-full" />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 border-2 border-[#D9B15F]/20 rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100vh-8rem)]">
          {/* Left Column - Content */}
          <div className="space-y-8 lg:space-y-8 order-2 lg:order-1">
            {/* Logo & Brand */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-3 px-5 py-2 bg-white rounded-full shadow-sm border border-[#1E293B]/10">
                <BookOpen className="w-5 h-5 text-[#D9B15F]" />
                <span className="text-[#1E293B] text-sm">
                  Platform Literasi Digital
                </span>
              </div>

              <GlitchText
                speed={1}
                enableShadows={true}
                enableOnHover={true}
                className="text-5xl lg:text-6xl xl:text-8xl custom-class leading-tight"
              >
                Welinas.
              </GlitchText>
            </div>

            {/* Tagline */}
            <div className="space-y-4">
              <TextType
                text={[
                  "Platform literasi & sastra untuk semua",
                  "Baca, pahami, dan maknai setiap kata",
                  "Dari pemula sampai pecinta sastra",
                ]}
                typingSpeed={75}
                pauseDuration={1500}
                showCursor={true}
                cursorCharacter="|"
                className="text-2xl lg:text-3xl text-[#1E293B]/90"
              />
              <p className="text-lg lg:text-xl text-[#6B7280] leading-relaxed max-w-xl">
                Jelajahi, baca, dan bagikan karya sastra dari berbagai genre.
                Temukan inspirasi dalam setiap kata.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#1E293B]/5 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-5 h-5 text-[#1E293B]" />
                </div>
                <div>
                  <p className="text-sm text-[#1E293B]">Koleksi Lengkap</p>
                  <p className="text-xs text-[#6B7280] mt-1">
                    Puisi, prosa, & sastra
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#1E293B]/5 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-[#D9B15F]" />
                </div>
                <div>
                  <p className="text-sm text-[#1E293B]">Kurasi Terbaik</p>
                  <p className="text-xs text-[#6B7280] mt-1">
                    Karya pilihan minggu ini
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#1E293B]/5 flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-[#1E293B]" />
                </div>
                <div>
                  <p className="text-sm text-[#1E293B]">Untuk Semua</p>
                  <p className="text-xs text-[#6B7280] mt-1">
                    Segala usia & gender
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <div className="flex flex-col md:flex-row gap-3">
                <button
                  onClick={() => router.push("/login")}
                  className="
                  group inline-flex items-center gap-3
                  px-8 py-4 cursor-pointer
                  bg-[#1E293B] text-white
                  rounded-2xl
                  shadow-lg shadow-[#1E293B]/20
                  hover:bg-[#1E293B]/90 hover:shadow-xl hover:shadow-[#1E293B]/30
                  transition-all duration-300
                  hover:scale-105
                "
                >
                  <span className="text-lg">Mulai Menjelajah</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => router.push("/dashboard")}
                  className="
                  group inline-flex items-center gap-3
                  px-8 py-4 cursor-pointer
                  bg-secondary text-white
                  rounded-2xl
                  shadow-lg shadow-[#1E293B]/20
                  hover:bg-[#1E293B]/90 hover:shadow-xl hover:shadow-[#1E293B]/30
                  transition-all duration-300
                  hover:scale-105
                "
                >
                  <span className="text-sm">Dashboard (Testing Mode)</span>
                </button>
              </div>

              <p className="text-sm text-[#6B7280] mt-4">
                Gratis untuk semua pengguna
              </p>
            </div>
          </div>

          {/* Right Column - Illustration */}
          <div className="order-1 lg:order-2">
            <div className="relative">
              {/* Main illustration container */}
              <div className="relative w-full max-w-md mx-auto aspect-square">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1E293B]/5 to-[#D9B15F]/5 rounded-full blur-3xl" />
                <div className="relative bg-white/50 backdrop-blur-sm rounded-3xl p-8 lg:p-12 shadow-xl border border-[#1E293B]/10">
                  <Image
                    src="/images/character.png"
                    alt="Ilustrasi pembaca Welinas"
                    width={420}
                    height={420}
                    className="mx-auto w-full max-w-xs lg:max-w-sm object-contain"
                    priority
                  />
                  {/* <LineIllustration /> */}
                </div>
              </div>

              {/* Floating badges */}
              <div className="hidden lg:block absolute -top-6 -right-4 bg-white px-6 py-3 rounded-full shadow-lg border border-[#1E293B]/10 animate-float">
                <p className="text-sm text-[#1E293B]">📚 1000+ Karya</p>
              </div>

              <div className="hidden lg:block absolute -bottom-8 -left-8 bg-white px-6 py-3 rounded-full shadow-lg border border-[#1E293B]/10 animate-float-delayed">
                <p className="text-sm text-[#1E293B]">✨ Baru Minggu Ini</p>
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

        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 3s ease-in-out infinite 1.5s;
        }
      `}</style>
    </div>
  );
}
