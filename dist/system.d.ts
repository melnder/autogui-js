export type Color = {
    r: number;
    g: number;
    b: number;
};
export type ScreenshotRegion = {
    x: number;
    y: number;
    width: number;
    height: number;
};
export type ScreenshotOptions = {
    region?: ScreenshotRegion;
    path?: string;
};
type NativeScreenshot = {
    width: number;
    height: number;
    data: Buffer;
    path?: string;
};
export declare class ScreenshotImage {
    readonly width: number;
    readonly height: number;
    readonly data: Buffer;
    readonly path?: string;
    constructor(image: NativeScreenshot);
    getPixelColor(x: number, y: number): Color;
}
export declare function getPixelColor(x: number, y: number): {
    r: number;
    g: number;
    b: number;
};
export declare function screenshot(region?: ScreenshotRegion): ScreenshotImage;
export declare function screenshot(options?: ScreenshotOptions): ScreenshotImage;
export declare function focusWindow(windowName: string): boolean;
export {};
