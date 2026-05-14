type NativeAddon = {
    moveTo(x: number, y: number): boolean;
    click(x?: number, y?: number, button?: string): boolean;
    press(vkCode: number): boolean;
    getPixelColor(x: number, y: number): {
        r: number;
        g: number;
        b: number;
    };
    focusWindow(windowName: string): boolean;
};
export declare const native: NativeAddon;
export {};
