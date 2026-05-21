import { native } from "./native.js";
export class ScreenshotImage {
    constructor(image) {
        this.width = image.width;
        this.height = image.height;
        this.data = image.data;
        this.path = image.path;
    }
    getPixelColor(x, y) {
        if (!Number.isFinite(x) || !Number.isFinite(y)) {
            throw new TypeError("getPixelColor(x, y) requires finite numbers");
        }
        const pixelX = Math.round(x);
        const pixelY = Math.round(y);
        if (pixelX < 0 || pixelX >= this.width || pixelY < 0 || pixelY >= this.height) {
            throw new RangeError("Pixel coordinates are outside the image bounds");
        }
        const offset = (pixelY * this.width + pixelX) * 4;
        return {
            r: this.data[offset],
            g: this.data[offset + 1],
            b: this.data[offset + 2],
        };
    }
}
export function getPixelColor(x, y) {
    return native.getPixelColor(x, y);
}
function assertRegion(region) {
    if (!Number.isFinite(region.x) ||
        !Number.isFinite(region.y) ||
        !Number.isFinite(region.width) ||
        !Number.isFinite(region.height)) {
        throw new TypeError("screenshot region requires finite x, y, width, and height numbers");
    }
    if (region.width <= 0 || region.height <= 0) {
        throw new RangeError("screenshot region width and height must be greater than zero");
    }
    return {
        x: Math.round(region.x),
        y: Math.round(region.y),
        width: Math.round(region.width),
        height: Math.round(region.height),
    };
}
function isObject(value) {
    return typeof value === "object" && value !== null;
}
function isRegion(value) {
    if (!isObject(value)) {
        return false;
    }
    return "x" in value || "y" in value || "width" in value || "height" in value;
}
export function screenshot(optionsOrRegionOrX = {}, y, width, height, path) {
    if (typeof optionsOrRegionOrX === "number") {
        const region = assertRegion({
            x: optionsOrRegionOrX,
            y,
            width,
            height,
        });
        if (path !== undefined && typeof path !== "string") {
            throw new TypeError("screenshot path must be a string");
        }
        return new ScreenshotImage(native.screenshot(region.x, region.y, region.width, region.height, path));
    }
    if (!isObject(optionsOrRegionOrX)) {
        throw new TypeError("screenshot(path?), screenshot(region), screenshot(options), or screenshot(x, y, width, height, path?) expected");
    }
    const optionsOrRegion = optionsOrRegionOrX;
    const options = isRegion(optionsOrRegion) ? { region: optionsOrRegion } : optionsOrRegion;
    if (options.path !== undefined && typeof options.path !== "string") {
        throw new TypeError("screenshot path must be a string");
    }
    if (options.region === undefined) {
        const image = options.path === undefined ? native.screenshot() : native.screenshot(options.path);
        return new ScreenshotImage(image);
    }
    const region = assertRegion(options.region);
    return new ScreenshotImage(native.screenshot(region.x, region.y, region.width, region.height, options.path));
}
export function focusWindow(windowName) {
    return native.focusWindow(windowName);
}
