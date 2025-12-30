import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Token, TokenTableState, SortConfig } from "@/lib/types";

const initialState: TokenTableState = {
  tokens: [],
  sortConfig: {
    column: null,
    direction: null,
  },
  isLoading: false,
  error: null,
};

const tokenSlice = createSlice({
  name: "tokens",
  initialState,
  reducers: {
    setTokens: (state, action: PayloadAction<Token[]>) => {
      state.tokens = action.payload;
    },
    updateTokenPrice: (
      state,
      action: PayloadAction<{ id: string; price: number; priceChange24h: number }>
    ) => {
      const token = state.tokens.find((t) => t.id === action.payload.id);
      if (token) {
        token.price = action.payload.price;
        token.priceChange24h = action.payload.priceChange24h;
      }
    },
    setSortConfig: (state, action: PayloadAction<SortConfig>) => {
      state.sortConfig = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setTokens, updateTokenPrice, setSortConfig, setLoading, setError } =
  tokenSlice.actions;
export default tokenSlice.reducer;

