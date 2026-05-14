import { native } from "./native.js";

export type MouseButton = "left" | "right" | "middle";

export function moveTo(x: number, y: number): void {
  if (!Number.isFinite(x) || !Number.isFinite(y)) {
    throw new TypeError("moveTo(x, y) requires finite numbers");
  }

  native.moveTo(Math.round(x), Math.round(y));
}

export function click(x?: number, y?: number, button?: MouseButton): void {
  if (button === undefined) {
    button = "left";
  }
  if (x === undefined) {
    x = -1;
  }
  if (y === undefined) {
    y = -1;
  }
  native.click(x, y, button);
}