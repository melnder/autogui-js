type NativeScreenshot = {
    width: number;
    height: number;
    data: Buffer;
    path?: string;
};
type NativeAddon = {
    moveTo(x: number, y: number): boolean;
    click(x?: number, y?: number, button?: string): boolean;
    scroll(steps: number, direction: string): boolean;
    press(vkCode: number): boolean;
    getPixelColor(x: number, y: number): {
        r: number;
        g: number;
        b: number;
    };
    screenshot(...args: [] | [path: string] | [x: number, y: number, width: number, height: number, path?: string]): NativeScreenshot;
    focusWindow(windowName: string): boolean;
};
export declare const native: NativeAddon;
export {};
