import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const addonPath = path.join(__dirname, "..", "build", "Release", "autogui_native.node");
export const native = require(addonPath);
