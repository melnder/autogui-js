export type MouseButton = "left" | "right" | "middle";
export type ScrollDirection = "up" | "down";
export declare function moveTo(x: number, y: number): void;
export declare function click(x?: number, y?: number, button?: MouseButton): void;
export declare function scroll(steps: number, direction: ScrollDirection): void;
