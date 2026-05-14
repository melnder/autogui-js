import { native } from "./native.js";
export function getPixelColor(x, y) {
    return native.getPixelColor(x, y);
}
export function focusWindow(windowName) {
    return native.focusWindow(windowName);
}
