export * as mouse from "./mouse.js";
export * as keyboard from "./keyboard.js";
export * as system from "./system.js";
export * as ocr from "./ocr.js";

export { moveTo, click, scroll } from "./mouse.js";
export type { ScrollDirection } from "./mouse.js";
export { press, Key } from "./keyboard.js";
export {
  getPixelColor,
  screenshot,
  ScreenshotImage,
  focusWindow,
} from "./system.js";
export type { Color, ScreenshotOptions, ScreenshotRegion } from "./system.js";
export { readDigits, readDigitsOnScreen } from "./ocr.js";
export type { DigitOcrChar, DigitOcrOptions, DigitOcrResult } from "./ocr.js";
