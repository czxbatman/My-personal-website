export type HelicopterAction = "takeoff" | "patrol" | "search" | "point" | "hold" | "return"
export interface HelicopterStatus { state: string; ready: boolean; pointMode: boolean; activity?: string | null }
export interface HelicopterScene { command(action: HelicopterAction): void; collapse(): void; layout(): void; dispose(): void }
export function createHelicopterScene(options: {
  host: HTMLElement; stage: HTMLElement; reducedMotion: boolean;
  onStatus(status: HelicopterStatus): void; onError(): void;
}): HelicopterScene
