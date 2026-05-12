"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.press = press;
const native_1 = require("./native");
const VK = {
    enter: 0x0d,
    tab: 0x09,
    escape: 0x1b,
    backspace: 0x08,
    space: 0x20,
    left: 0x25,
    up: 0x26,
    right: 0x27,
    down: 0x28,
    a: 0x41,
    b: 0x42,
    c: 0x43,
    d: 0x44,
    e: 0x45,
    f: 0x46,
    g: 0x47,
    h: 0x48,
    i: 0x49,
    j: 0x4a,
    k: 0x4b,
    l: 0x4c,
    m: 0x4d,
    n: 0x4e,
    o: 0x4f,
    p: 0x50,
    q: 0x51,
    r: 0x52,
    s: 0x53,
    t: 0x54,
    u: 0x55,
    v: 0x56,
    w: 0x57,
    x: 0x58,
    y: 0x59,
    z: 0x5a
};
function press(key) {
    const normalized = key.toLowerCase();
    const vkCode = VK[normalized];
    if (vkCode === undefined) {
        throw new Error(`Unsupported key: ${key}`);
    }
    native_1.native.press(vkCode);
}
