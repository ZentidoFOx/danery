declare module 'canvas-confetti' {
  interface Options {
    particleCount?: number;
    spread?: number;
    origin?: { x?: number; y?: number };
    colors?: string[];
    ticks?: number;
    [key: string]: any;
  }

  type ConfettiFunction = (options?: Options) => void;
  
  const confetti: ConfettiFunction;
  export default confetti;
}
