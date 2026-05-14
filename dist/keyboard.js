import { native } from "./native.js";
export var Key;
(function (Key) {
    Key[Key["enter"] = 13] = "enter";
    Key[Key["tab"] = 9] = "tab";
    Key[Key["escape"] = 27] = "escape";
    Key[Key["backspace"] = 8] = "backspace";
    Key[Key["space"] = 32] = "space";
    Key[Key["alt"] = 18] = "alt";
    Key[Key["left"] = 37] = "left";
    Key[Key["up"] = 38] = "up";
    Key[Key["right"] = 39] = "right";
    Key[Key["down"] = 40] = "down";
    Key[Key["insert"] = 45] = "insert";
    Key[Key["delete"] = 46] = "delete";
    Key[Key["home"] = 36] = "home";
    Key[Key["end"] = 35] = "end";
    Key[Key["pageup"] = 33] = "pageup";
    Key[Key["pagedown"] = 34] = "pagedown";
    Key[Key["f1"] = 112] = "f1";
    Key[Key["f2"] = 113] = "f2";
    Key[Key["f3"] = 114] = "f3";
    Key[Key["f4"] = 115] = "f4";
    Key[Key["f5"] = 116] = "f5";
    Key[Key["f6"] = 117] = "f6";
    Key[Key["f7"] = 118] = "f7";
    Key[Key["f8"] = 119] = "f8";
    Key[Key["f9"] = 120] = "f9";
    Key[Key["f10"] = 121] = "f10";
    Key[Key["f11"] = 122] = "f11";
    Key[Key["f12"] = 123] = "f12";
    Key[Key["a"] = 65] = "a";
    Key[Key["b"] = 66] = "b";
    Key[Key["c"] = 67] = "c";
    Key[Key["d"] = 68] = "d";
    Key[Key["e"] = 69] = "e";
    Key[Key["f"] = 70] = "f";
    Key[Key["g"] = 71] = "g";
    Key[Key["h"] = 72] = "h";
    Key[Key["i"] = 73] = "i";
    Key[Key["j"] = 74] = "j";
    Key[Key["k"] = 75] = "k";
    Key[Key["l"] = 76] = "l";
    Key[Key["m"] = 77] = "m";
    Key[Key["n"] = 78] = "n";
    Key[Key["o"] = 79] = "o";
    Key[Key["p"] = 80] = "p";
    Key[Key["q"] = 81] = "q";
    Key[Key["r"] = 82] = "r";
    Key[Key["s"] = 83] = "s";
    Key[Key["t"] = 84] = "t";
    Key[Key["u"] = 85] = "u";
    Key[Key["v"] = 86] = "v";
    Key[Key["w"] = 87] = "w";
    Key[Key["x"] = 88] = "x";
    Key[Key["y"] = 89] = "y";
    Key[Key["z"] = 90] = "z";
})(Key || (Key = {}));
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
    insert: 0x2d,
    delete: 0x2e,
    home: 0x24,
    end: 0x23,
    pageup: 0x21,
    pagedown: 0x22,
    f1: 0x70,
    f2: 0x71,
    f3: 0x72,
    f4: 0x73,
    f5: 0x74,
    f6: 0x75,
    f7: 0x76,
    f8: 0x77,
    f9: 0x78,
    f10: 0x79,
    f11: 0x7a,
    f12: 0x7b,
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
    z: 0x5a,
};
export function press(key) {
    const vkCode = typeof key === "string" ? VK[key.toLowerCase()] : key;
    if (vkCode === undefined) {
        throw new Error(`Unsupported key: ${key} (${vkCode})`);
    }
    native.press(vkCode);
}
