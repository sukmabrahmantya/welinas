"use client";

import { Camera, ImageUp, UploadCloud } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function FloatingCameraAction() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const navigate = (mode: "upload" | "camera") => {
    setIsOpen(false);
    router.push(`/dashboard/capture?mode=${mode}`);
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: Event) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <div
        ref={containerRef}
        className="fixed bottom-6 right-6 flex flex-col items-end gap-3"
      >
        {isOpen && (
          <div className="bg-[radial-gradient(circle_at_top,_rgba(255,252,245,0.98),_rgba(247,234,208,0.98))] rounded-2xl shadow-2xl border border-brand-gold p-4 w-56 space-y-3 menu-fade">
            <button
              onClick={() => navigate("upload")}
              className="w-full flex items-center gap-3 rounded-xl border border-[#E2D4BB] bg-[radial-gradient(circle_at_top,_rgba(255,252,245,0.98),_rgba(247,234,208,0.98))] px-4 py-3 text-left text-[#1E293B] transition hover:scale-105 hover:shadow-xl hover:border-brand-gold cursor-pointer"
            >
              <UploadCloud className="h-5 w-5 text-[#1BA5A5]" />
              <span className="text-sm font-medium">Upload Image</span>
            </button>
            <button
              onClick={() => navigate("camera")}
              className="w-full flex items-center gap-3 rounded-xl border border-[#E2D4BB] bg-[radial-gradient(circle_at_top,_rgba(255,252,245,0.98),_rgba(247,234,208,0.98))] px-4 py-3 text-left text-[#1E293B] transition hover:scale-105 hover:shadow-xl hover:border-brand-gold cursor-pointer"
            >
              <ImageUp className="h-5 w-5 text-[#F97362]" />
              <span className="text-sm font-medium">Ambil Gambar</span>
            </button>
          </div>
        )}

        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className={`h-14 w-14 rounded-full bg-[#1E293B] text-white flex items-center justify-center shadow-xl border-4 border-brand-gold transition-transform duration-300 hover:scale-105 cursor-pointer ${
            isOpen ? "camera-pop" : ""
          }`}
          aria-label="Buka kamera"
        >
          <Camera />
        </button>
      </div>

      <style jsx>{`
        @keyframes camera-pop {
          0% {
            transform: scale(0.9);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }

        @keyframes menu-fade {
          0% {
            opacity: 0;
            transform: translateY(12px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .camera-pop {
          animation: camera-pop 0.4s ease;
        }

        .menu-fade {
          animation: menu-fade 0.35s ease-out;
        }
      `}</style>
    </>
  );
}
