import { native } from "./native";

export type MouseButton = "left" | "right" | "middle";

export function moveTo(x: number, y: number): void {
  if (!Number.isFinite(x) || !Number.isFinite(y)) {
    throw new TypeError("moveTo(x, y) requires finite numbers");
  }

  native.moveTo(Math.round(x), Math.round(y));
}

export function click(button: MouseButton = "left"): void {
  native.click(button);
}