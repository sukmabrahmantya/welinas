"use client";

import { Camera, ImageUp, UploadCloud } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function FloatingCameraAction() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <div className="fixed bottom-6 right-6 flex flex-col items-end gap-3">
        {isOpen && (
          <div className="bg-white rounded-2xl shadow-2xl border border-[#D4D4D8] p-4 w-56 space-y-3 menu-fade">
            <button
              onClick={() => {
                setIsOpen(false);
                router.push("/dashboard/capture");
              }}
              className="w-full flex items-center gap-3 rounded-xl border border-[#D4D4D8] px-4 py-3 text-left text-[#1E293B] hover:bg-[#F5F3F0] transition"
            >
              <UploadCloud className="h-5 w-5 text-[#1BA5A5]" />
              <span className="text-sm font-medium">Upload Image</span>
            </button>
            <button className="w-full flex items-center gap-3 rounded-xl border border-[#D4D4D8] px-4 py-3 text-left text-[#1E293B] hover:bg-[#F5F3F0] transition">
              <ImageUp className="h-5 w-5 text-[#F97362]" />
              <span className="text-sm font-medium">Ambil Gambar</span>
            </button>
          </div>
        )}

        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className={`h-14 w-14 rounded-full bg-[#1E293B] text-white flex items-center justify-center shadow-xl border-4 border-[#D9B15F] transition-transform duration-300 hover:scale-105 ${
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
