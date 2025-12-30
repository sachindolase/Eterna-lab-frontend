import { Token } from "./types";

type PriceUpdateCallback = (updates: Map<string, { price: number; change: number }>) => void;

class WebSocketMock {
  private callbacks: PriceUpdateCallback[] = [];
  private intervalId: NodeJS.Timeout | null = null;
  private tokens: Token[] = [];

  connect(tokens: Token[]) {
    this.tokens = tokens;
    this.startPriceUpdates();
  }

  disconnect() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  subscribe(callback: PriceUpdateCallback) {
    this.callbacks.push(callback);
    return () => {
      this.callbacks = this.callbacks.filter((cb) => cb !== callback);
    };
  }

  private startPriceUpdates() {
    this.intervalId = setInterval(() => {
      const updates = new Map<string, { price: number; change: number }>();

      this.tokens.forEach((token) => {
        // Simulate price changes (-2% to +2%)
        const changePercent = (Math.random() - 0.5) * 4;
        const newPrice = token.price * (1 + changePercent / 100);
        const priceChange = ((newPrice - token.price) / token.price) * 100;

        updates.set(token.id, {
          price: newPrice,
          change: priceChange,
        });
      });

      this.callbacks.forEach((callback) => callback(updates));
    }, 2000); // Update every 2 seconds
  }
}

export const wsMock = new WebSocketMock();

