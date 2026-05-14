import { existsSync, statSync } from "fs";
import { screenshot } from "../dist/index.js";

const region = { x: 0, y: 0, width: 20, height: 20 };

const fullImage = screenshot();
const fullPixel = fullImage.getPixelColor(0, 0);

console.log("full screenshot", {
  width: fullImage.width,
  height: fullImage.height,
  bytes: fullImage.data.length,
  pixel: fullPixel,
});

const memoryImage = screenshot(region);
const memoryPixel = memoryImage.getPixelColor(0, 0);

console.log("memory screenshot", {
  width: memoryImage.width,
  height: memoryImage.height,
  bytes: memoryImage.data.length,
  pixel: memoryPixel,
});

const filePath = "test/manual-screenshot.bmp";
const fileImage = screenshot({ region, path: filePath });
const filePixel = fileImage.getPixelColor(0, 0);

console.log("file screenshot", {
  width: fileImage.width,
  height: fileImage.height,
  bytes: fileImage.data.length,
  path: fileImage.path,
  fileExists: existsSync(filePath),
  fileBytes: statSync(filePath).size,
  pixel: filePixel,
});
