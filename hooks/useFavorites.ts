import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type FavoriteWord = {
  id: string;
  word: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export function useFavorites(userId?: string | null) {
  return useQuery({
    queryKey: ["favorites", userId],
    queryFn: async (): Promise<FavoriteWord[]> => {
      if (!userId) return [];
      const response = await fetch(`/api/favorites?userId=${userId}`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "Gagal memuat favorit");
      }
      return data;
    },
    enabled: Boolean(userId),
  });
}

export function useCreateFavorite() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      userId,
      word,
      notes,
    }: {
      userId: string;
      word: string;
      notes?: string;
    }) => {
      const response = await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, word, notes }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "Gagal menambah favorit");
      }
      return data as FavoriteWord;
    },
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({
        queryKey: ["favorites", variables.userId],
      });
    },
  });
}

export function useUpdateFavorite() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      word,
      notes,
      userId,
    }: {
      id: string;
      word?: string;
      notes?: string;
      userId: string;
    }) => {
      const response = await fetch("/api/favorites", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, word, notes }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "Gagal mengubah favorit");
      }
      return data;
    },
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({
        queryKey: ["favorites", variables.userId],
      });
    },
  });
}

export function useDeleteFavorite() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      userId,
    }: {
      id: string;
      userId: string;
    }) => {
      const response = await fetch(`/api/favorites?id=${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "Gagal menghapus favorit");
      }
      return data;
    },
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({
        queryKey: ["favorites", variables.userId],
      });
    },
  });
}
