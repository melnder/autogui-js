import { native } from "./native.js";

export function getPixelColor(x: number, y: number): { r: number, g: number, b: number } {
    return native.getPixelColor(x, y);
}

export function focusWindow(windowName: string): boolean {
    return native.focusWindow(windowName);
}