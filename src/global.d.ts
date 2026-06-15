declare global {
  interface Window {
    ym?: (
      counterId: number,
      method: string,
      target?: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

export {};
