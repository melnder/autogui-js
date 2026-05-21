import { ScreenshotImage, type ScreenshotRegion } from "./system.js";
export type DigitOcrChar = {
    text: string;
    x: number;
    y: number;
    width: number;
    height: number;
    confidence: number;
};
export type DigitOcrResult = {
    text: string;
    confidence: number;
    chars: DigitOcrChar[];
};
export type DigitOcrOptions = {
    threshold?: number;
    invert?: boolean;
    textColor?: "bright" | "white";
    minGlyphWidth?: number;
    minGlyphHeight?: number;
    maxGlyphGap?: number;
    minConfidence?: number;
};
export declare function readDigits(image: ScreenshotImage, options?: DigitOcrOptions): DigitOcrResult;
export declare function readDigitsOnScreen(region: ScreenshotRegion, options?: DigitOcrOptions): DigitOcrResult;
export declare function readDigitsOnScreen(x: number, y: number, width: number, height: number, options?: DigitOcrOptions): DigitOcrResult;
