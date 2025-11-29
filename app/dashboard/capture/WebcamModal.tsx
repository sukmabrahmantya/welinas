"use client";

import { X } from "lucide-react";
import Webcam from "react-webcam";
import type React from "react";

type WebcamModalProps = {
  isOpen: boolean;
  onClose: () => void;

  webcamRef: React.RefObject<Webcam | null>;

  pendingCapture: string | null;
  setPendingCapture: React.Dispatch<React.SetStateAction<string | null>>;

  cameraError: string | null;
  setCameraError: React.Dispatch<React.SetStateAction<string | null>>;

  devices: MediaDeviceInfo[];
  selectedDeviceId?: string;
  setSelectedDeviceId: React.Dispatch<React.SetStateAction<string | undefined>>;

  videoConstraints: MediaTrackConstraints;

  onUseCapturedPhoto: () => void;

  loadDevices: () => Promise<void> | void;
};

export function WebcamModal({
  isOpen,
  onClose,
  webcamRef,
  pendingCapture,
  setPendingCapture,
  cameraError,
  setCameraError,
  devices,
  selectedDeviceId,
  setSelectedDeviceId,
  videoConstraints,
  onUseCapturedPhoto,
  loadDevices,
}: WebcamModalProps) {
  if (!isOpen) return null;

  const handleClose = () => {
    setPendingCapture(null);
    setCameraError(null);
    onClose();
  };

  const handleCaptureClick = () => {
    if (!webcamRef.current) {
      setCameraError("Kamera belum siap.");
      return;
    }

    const screenshot = webcamRef.current.getScreenshot();
    if (!screenshot) {
      setCameraError("Gagal mengambil gambar. Pastikan kamera diizinkan.");
      return;
    }

    setCameraError(null);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        setCameraError("Tidak dapat memproses gambar.");
        return;
      }

      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const fixedDataUrl = canvas.toDataURL("image/png");
      setPendingCapture(fixedDataUrl);
    };

    img.onerror = () => {
      setCameraError("Gagal memuat hasil jepret kamera.");
    };

    img.src = screenshot;
  };

  return (
    <div className="fixed inset-0 z-40 bg-[#0f172a]/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-4xl h-[80vh] max-h-[80vh] rounded-2xl sm:rounded-[28px] p-6 sm:p-8 flex flex-col gap-6 transform transition-all duration-200 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.96),_rgba(247,234,208,0.96))] shadow-2xl border border-[#E2D4BB]">
        <div className="flex items-start justify-between gap-4 shrink-0">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-[#6B7280]">
              Mode Kamera
            </p>
            <h2 className="text-2xl font-semibold text-[#1E293B]">
              Ambil Foto
            </h2>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="text-[#6B7280] hover:text-[#1E293B]"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-[#6B7280]">Pilih kamera:</span>
            <select
              value={selectedDeviceId ?? ""}
              onChange={(e) => setSelectedDeviceId(e.target.value)}
              className="rounded-xl border border-[#D4D4D8] px-3 py-1.5 text-xs sm:text-sm text-[#1E293B] bg-white focus:outline-none focus:ring-2 focus:ring-[#1BA5A5]"
            >
              {devices.length === 0 && (
                <option value="">Mencari kamera…</option>
              )}
              {devices.map((device, idx) => (
                <option key={device.deviceId} value={device.deviceId}>
                  {device.label || `Kamera ${idx + 1}`}
                </option>
              ))}
            </select>
          </div>
          <p className="text-[11px] sm:text-xs text-[#9CA3AF]">
            Pilih kamera eksternal bila tersedia untuk hasil teks yang lebih
            tajam.
          </p>
        </div>

        <div className="flex-1 min-h-0">
          <div className="h-full rounded-[28px] border border-[#D4D4D8] bg-black overflow-hidden flex items-center justify-center">
            {pendingCapture ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={pendingCapture}
                alt="hasil jepret kamera"
                className="w-full h-full object-contain bg-black"
              />
            ) : (
              <div className="w-full h-full">
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/png"
                  mirrored
                  videoConstraints={videoConstraints}
                  className="w-full h-full object-contain bg-black"
                  onUserMedia={() => {
                    void loadDevices();
                  }}
                  onUserMediaError={() =>
                    setCameraError(
                      "Tidak dapat mengakses kamera. Izinkan akses kamera dan coba lagi."
                    )
                  }
                />
              </div>
            )}
          </div>
        </div>

        {cameraError && (
          <p className="text-sm text-center text-[#F97362]">{cameraError}</p>
        )}

        <div className="grid gap-3 sm:grid-cols-2 shrink-0">
          {pendingCapture ? (
            <>
              <button
                type="button"
                onClick={() => setPendingCapture(null)}
                className="rounded-2xl border border-[#D4D4D8] px-4 py-3 text-sm font-semibold text-[#1E293B] hover:border-[#1BA5A5]"
              >
                Ambil Ulang
              </button>
              <button
                type="button"
                onClick={onUseCapturedPhoto}
                className="rounded-2xl bg-[#1E293B] px-4 py-3 text-sm font-semibold text-white hover:bg-[#162033]"
              >
                Gunakan Foto
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={handleCaptureClick}
                className="rounded-2xl bg-[#1E293B] px-4 py-3 text-sm font-semibold text-white hover:bg-[#162033]"
              >
                Ambil Foto
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="rounded-2xl border border-[#D4D4D8] px-4 py-3 text-sm font-semibold text-[#1E293B] hover:border-[#1BA5A5]"
              >
                Batalkan
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
