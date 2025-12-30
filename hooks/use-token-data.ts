import { useQuery } from "@tanstack/react-query";
import { mockTokens } from "@/lib/mock-data";
import { Token } from "@/lib/types";

async function fetchTokens(): Promise<Token[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return mockTokens;
}

export function useTokenData() {
  return useQuery({
    queryKey: ["tokens"],
    queryFn: fetchTokens,
    staleTime: 30000,
  });
}

