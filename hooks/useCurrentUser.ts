import { useQuery } from "@tanstack/react-query";

type CurrentUser =
  | {
      id: string;
      name: string;
      email: string;
      bio?: string;
      avatarUrl?: string;
    }
  | null;

export function useCurrentUser() {
  return useQuery({
    queryKey: ["current-user"],
    queryFn: async (): Promise<CurrentUser> => {
      const response = await fetch("/api/auth/me", {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch current user");
      }

      const data = await response.json();
      return data.user ?? null;
    },
  });
}
