import { useEffect, useRef } from "react";
import { useAppDispatch } from "@/store/hooks";
import { updateTokenPrice } from "@/store/tokenSlice";
import { wsMock } from "@/lib/websocket-mock";
import { Token } from "@/lib/types";

export function useWebSocket(tokens: Token[]) {
  const dispatch = useAppDispatch();
  const isConnectedRef = useRef(false);

  useEffect(() => {
    if (tokens.length === 0) return;

    if (!isConnectedRef.current) {
      wsMock.connect(tokens);
      isConnectedRef.current = true;
    }

    const unsubscribe = wsMock.subscribe((updates) => {
      updates.forEach((update, id) => {
        dispatch(
          updateTokenPrice({
            id,
            price: update.price,
            priceChange24h: update.change,
          })
        );
      });
    });

    return () => {
      unsubscribe();
      if (isConnectedRef.current) {
        wsMock.disconnect();
        isConnectedRef.current = false;
      }
    };
  }, [tokens, dispatch]);
}

