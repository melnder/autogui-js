"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.native = void 0;
const path_1 = __importDefault(require("path"));
const addonPath = path_1.default.join(__dirname, "..", "build", "Release", "autogui_native.node");
exports.native = require(addonPath);
