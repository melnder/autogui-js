type NativeAddon = {
    moveTo(x: number, y: number): boolean;
    click(button?: string): boolean;
    press(vkCode: number): boolean;
};
export declare const native: NativeAddon;
export {};
