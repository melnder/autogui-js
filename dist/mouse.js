"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moveTo = moveTo;
exports.click = click;
const native_1 = require("./native");
function moveTo(x, y) {
    if (!Number.isFinite(x) || !Number.isFinite(y)) {
        throw new TypeError("moveTo(x, y) requires finite numbers");
    }
    native_1.native.moveTo(Math.round(x), Math.round(y));
}
function click(button = "left") {
    native_1.native.click(button);
}
