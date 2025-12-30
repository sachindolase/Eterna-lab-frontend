export type SortDirection = "asc" | "desc" | null;

export type SortConfig = {
  column: string | null;
  direction: SortDirection;
};

export interface Token {
  id: string;
  name: string;
  symbol: string;
  price: number;
  priceChange24h: number;
  volume24h: number;
  marketCap: number;
  liquidity: number;
  category: "new-pairs" | "final-stretch" | "migrated";
  pair: string;
  createdAt: string;
  description?: string;
}

export interface TokenTableState {
  tokens: Token[];
  sortConfig: SortConfig;
  isLoading: boolean;
  error: string | null;
}

