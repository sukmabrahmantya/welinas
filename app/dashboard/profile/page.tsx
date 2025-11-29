"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { Input } from "@/components/Input";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Eye, EyeOff, Lock } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const { data: currentUser, isLoading, refetch } = useCurrentUser();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  useEffect(() => {
    if (!isLoading && !currentUser) {
      router.replace("/login");
    }
  }, [currentUser, isLoading, router]);

  useEffect(() => {
    if (currentUser) {
      setFormData((prev) => ({
        ...prev,
        name: currentUser.name ?? "",
        email: currentUser.email ?? "",
        bio: currentUser.bio ?? "",
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      }));
    }
  }, [currentUser]);

  const updateMutation = useMutation({
    mutationFn: async () => {
      if (!currentUser) throw new Error("User not found");
      const payload: Record<string, unknown> = {
        id: currentUser.id,
        name: formData.name,
        bio: formData.bio,
      };
      if (formData.newPassword) {
        payload.password = formData.newPassword;
        payload.currentPassword = formData.currentPassword;
      }

      const response = await fetch("/api/user", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "Gagal memperbarui profil");
      }
      return data;
    },
    onSuccess: () => {
      setStatus("Profil berhasil diperbarui");
      setError(null);
      setFormData((prev) => ({ ...prev, password: "" }));
      void refetch();
    },
    onError: (err) => {
      setError(err instanceof Error ? err.message : "Gagal memperbarui");
      setStatus(null);
    },
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setStatus(null);

    if (formData.newPassword || formData.confirmNewPassword) {
      if (!formData.currentPassword) {
        setError("Masukkan password lama untuk mengubah password.");
        return;
      }
      if (formData.newPassword !== formData.confirmNewPassword) {
        setError("Konfirmasi password baru tidak sama.");
        return;
      }
      if (formData.newPassword.length < 8) {
        setError("Password baru minimal 8 karakter.");
        return;
      }
    }

    updateMutation.mutate();
  };

  if (isLoading || !currentUser) {
    return (
      <div className="flex h-full min-h-[60vh] items-center justify-center text-[#6B7280]">
        Memuat profil…
      </div>
    );
  }

  const initials =
    currentUser.name
      ?.split(" ")
      .map((part) => part[0]?.toUpperCase())
      .slice(0, 2)
      .join("") ?? "U";

  return (
    <div className="flex h-full flex-col gap-6 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 w-full">
      <div className="flex items-center rounded-2xl sm:rounded-[28px] lg:rounded-[32px] border p-6 sm:px-8 lg:px-12 gap-4 sm:gap-6 border-[#E2D4BB] bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.96),_rgba(243,232,217,0.96))] shadow-sm">
        <div className="h-16 w-16 rounded-full bg-brand-gold text-[#0F172A] flex items-center justify-center text-2xl font-semibold shadow-lg">
          {initials}
        </div>
        <div>
          <p className="text-sm uppercase tracking-widest text-[#6B7280]">
            Profil Pengguna
          </p>
          <h1 className="text-2xl font-semibold text-[#1E293B]">
            {currentUser.name}
          </h1>
          <p className="text-sm text-[#6B7280]">{currentUser.email}</p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="border rounded-[32px] border-[#E2D4BB] bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.96),_rgba(243,232,217,0.96))] p-6 sm:p-8 lg:p-12 shadow-xl space-y-6"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <Input
            label="Nama Lengkap"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Nama lengkapmu"
            required
          />
          <Input
            label="Email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="nama@email.com"
            disabled
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-[#1E293B]">Bio</label>
          <textarea
            value={formData.bio}
            onChange={(e) => handleChange("bio", e.target.value)}
            placeholder="Ceritakan sedikit tentang dirimu…"
            className="mt-2 w-full rounded-2xl border border-[#E4E4ED] bg-[#F8FAFC] px-4 py-3 text-sm text-[#111827] focus:border-[#1BA5A5] focus:outline-none focus:ring-0 min-h-[120px]"
          />
        </div>

        <div className="rounded-2xl  p-6 gap-4 sm:gap-6 bg-brand-gold/15">
          <div className="text-sm font-semibold text-[#1E293B]">
            Kosongkan jika tidak ingin merubahnya
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="relative w-full">
              <Input
                label="Password Lama"
                type={showPasswords.current ? "text" : "password"}
                placeholder={
                  showPasswords.current ? "Password Lama" : "••••••••"
                }
                value={formData.currentPassword}
                onChange={(e) => handleChange("password", e.target.value)}
                icon={<Lock className="w-5 h-5" />}
                helperText="Minimal 8 karakter"
                required
              />
              <button
                type="button"
                onClick={() =>
                  setShowPasswords((prev) => ({
                    ...prev,
                    current: !prev.current,
                  }))
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#1E293B] transition-colors"
              >
                {showPasswords.current ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            <div className="text-sm text-[#6B7280] flex items-center">
              Password selalu dienkripsi. Kosongkan kolom password baru jika
              tidak ingin mengubah.
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="relative w-full">
              <Input
                label="Password Baru"
                type={showPasswords.new ? "text" : "password"}
                placeholder={showPasswords.new ? "Password Baru" : "••••••••"}
                value={formData.newPassword}
                onChange={(e) => handleChange("newPassword", e.target.value)}
                icon={<Lock className="w-5 h-5" />}
                helperText="Minimal 8 karakter"
                required
              />
              <button
                type="button"
                onClick={() =>
                  setShowPasswords((prev) => ({
                    ...prev,
                    new: !prev.new,
                  }))
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#1E293B] transition-colors"
              >
                {showPasswords.new ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            <div className="relative w-full">
              <Input
                label="Konfirmasi Password Baru"
                type={showPasswords.confirm ? "text" : "password"}
                placeholder={
                  showPasswords.confirm
                    ? "Konfirmasi Password Baru"
                    : "••••••••"
                }
                value={formData.confirmNewPassword}
                onChange={(e) =>
                  handleChange("confirmNewPassword", e.target.value)
                }
                icon={<Lock className="w-5 h-5" />}
                helperText="Minimal 8 karakter"
                required
              />
              <button
                type="button"
                onClick={() =>
                  setShowPasswords((prev) => ({
                    ...prev,
                    confirm: !prev.confirm,
                  }))
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#1E293B] transition-colors"
              >
                {showPasswords.confirm ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {status && (
          <div className="rounded-2xl border border-[#22C55E]/20 bg-[#ECFDF5] px-4 py-3 text-sm text-[#0F766E]">
            {status}
          </div>
        )}
        {error && (
          <div className="rounded-2xl border border-[#F97362]/40 bg-[#FEF2F2] px-4 py-3 text-sm text-[#B91C1C]">
            {error}
          </div>
        )}

        <div className="flex flex-wrap gap-3 justify-end ">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/dashboard")}
          >
            Batal
          </Button>
          <Button
            type="submit"
            disabled={updateMutation.isPending}
            className="bg-[#1E293B] text-white hover:bg-[#162033] disabled:opacity-60"
          >
            {updateMutation.isPending ? "Menyimpan..." : "Simpan Perubahan"}
          </Button>
        </div>
      </form>
    </div>
  );
}
