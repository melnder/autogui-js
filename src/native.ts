import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

type NativeScreenshot = {
  width: number;
  height: number;
  data: Buffer;
  path?: string;
};

type NativeAddon = {
  moveTo(x: number, y: number): boolean;
  click(x?: number, y?: number, button?: string): boolean;
  press(vkCode: number): boolean;
  getPixelColor(x: number, y: number): { r: number, g: number, b: number };
  screenshot(...args: [] | [path: string] | [x: number, y: number, width: number, height: number, path?: string]): NativeScreenshot;
  focusWindow(windowName: string): boolean;
};

const addonPath = path.join(
  __dirname,
  "..",
  "build",
  "Release",
  "autogui_native.node"
);

export const native = require(addonPath) as NativeAddon;
