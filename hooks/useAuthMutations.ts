import { useMutation, useQueryClient } from "@tanstack/react-query";

type AuthResponse = {
  user: {
    id: string;
    name: string;
    email: string;
  };
};

type LoginPayload = {
  email: string;
  password: string;
};

type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

type ForgotPasswordPayload = {
  email: string;
};

type ForgotPasswordResponse = {
  message: string;
};

type ResetPasswordPayload = {
  token: string;
  password: string;
};

type ResetPasswordResponse = {
  message: string;
};

export function useLoginMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "Gagal masuk");
      }
      return data as AuthResponse;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["current-user"] });
    },
  });
}

export function useRegisterMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: RegisterPayload) => {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "Gagal mendaftar");
      }
      return data as AuthResponse;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["current-user"] });
    },
  });
}

export function useLogoutMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });
      if (!response.ok) {
        throw new Error("Gagal keluar");
      }
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["current-user"] });
    },
  });
}

export function useForgotPasswordMutation() {
  return useMutation({
    mutationFn: async (payload: ForgotPasswordPayload) => {
      const response = await fetch("/api/auth/forgot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "Gagal memproses permintaan");
      }
      return data as ForgotPasswordResponse;
    },
  });
}

export function useResetPasswordMutation() {
  return useMutation({
    mutationFn: async (payload: ResetPasswordPayload) => {
      const response = await fetch("/api/auth/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "Gagal memperbarui password");
      }
      return data as ResetPasswordResponse;
    },
  });
}
