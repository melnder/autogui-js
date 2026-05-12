import path from "path";

type NativeAddon = {
  moveTo(x: number, y: number): boolean;
  click(button?: string): boolean;
  press(vkCode: number): boolean;
};

const addonPath = path.join(
  __dirname,
  "..",
  "build",
  "Release",
  "autogui_native.node"
);

export const native = require(addonPath) as NativeAddon;