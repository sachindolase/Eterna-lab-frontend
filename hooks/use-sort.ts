import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSortConfig } from "@/store/tokenSlice";
import { Token, SortDirection } from "@/lib/types";

export function useSort(tokens: Token[]) {
  const dispatch = useAppDispatch();
  const sortConfig = useAppSelector((state) => state.tokens.sortConfig);

  const sortedTokens = useMemo(() => {
    if (!sortConfig.column || !sortConfig.direction) {
      return tokens;
    }

    const sorted = [...tokens].sort((a, b) => {
      let aValue: number | string;
      let bValue: number | string;

      switch (sortConfig.column) {
        case "name":
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case "price":
          aValue = a.price;
          bValue = b.price;
          break;
        case "change24h":
          aValue = a.priceChange24h;
          bValue = b.priceChange24h;
          break;
        case "volume":
          aValue = a.volume24h;
          bValue = b.volume24h;
          break;
        case "marketCap":
          aValue = a.marketCap;
          bValue = b.marketCap;
          break;
        default:
          return 0;
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortConfig.direction === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return sortConfig.direction === "asc"
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number);
    });

    return sorted;
  }, [tokens, sortConfig]);

  const handleSort = (column: string) => {
    let direction: SortDirection = "asc";

    if (sortConfig.column === column) {
      if (sortConfig.direction === "asc") {
        direction = "desc";
      } else if (sortConfig.direction === "desc") {
        direction = null;
      }
    }

    dispatch(
      setSortConfig({
        column: direction ? column : null,
        direction,
      })
    );
  };

  return { sortedTokens, sortConfig, handleSort };
}

