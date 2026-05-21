import { screenshot, ScreenshotImage } from "./system.js";
const TEMPLATE_WIDTH = 12;
const TEMPLATE_HEIGHT = 16;
const DIGIT_TEMPLATES = {
    "0": [
        "01111110",
        "11111111",
        "11000011",
        "11000011",
        "11000011",
        "11000011",
        "11000011",
        "11000011",
        "11000011",
        "11000011",
        "11000011",
        "11000011",
        "11000011",
        "11111111",
        "01111110",
        "00111100",
    ],
    "1": [
        "00011000",
        "00111000",
        "01111000",
        "00011000",
        "00011000",
        "00011000",
        "00011000",
        "00011000",
        "00011000",
        "00011000",
        "00011000",
        "00011000",
        "00011000",
        "01111110",
        "01111110",
        "01111110",
    ],
    "2": [
        "01111100",
        "11111110",
        "11000110",
        "00000110",
        "00000110",
        "00001100",
        "00011000",
        "00110000",
        "01100000",
        "11000000",
        "11000000",
        "11000000",
        "11000000",
        "11111110",
        "11111110",
        "11111110",
    ],
    "3": [
        "01111100",
        "11111110",
        "11000110",
        "00000110",
        "00000110",
        "00001100",
        "00111100",
        "00111100",
        "00001100",
        "00000110",
        "00000110",
        "00000110",
        "11000110",
        "11111110",
        "01111100",
        "00111000",
    ],
    "4": [
        "00001100",
        "00011100",
        "00111100",
        "01101100",
        "11001100",
        "11001100",
        "11001100",
        "11001100",
        "11111111",
        "11111111",
        "00001100",
        "00001100",
        "00001100",
        "00001100",
        "00001100",
        "00001100",
    ],
    "5": [
        "11111110",
        "11111110",
        "11000000",
        "11000000",
        "11000000",
        "11111100",
        "11111110",
        "00000110",
        "00000110",
        "00000110",
        "00000110",
        "00000110",
        "11000110",
        "11111110",
        "01111100",
        "00111000",
    ],
    "6": [
        "00111100",
        "01111110",
        "11000000",
        "11000000",
        "11000000",
        "11111100",
        "11111110",
        "11000110",
        "11000110",
        "11000110",
        "11000110",
        "11000110",
        "11000110",
        "11111110",
        "01111100",
        "00111000",
    ],
    "7": [
        "11111110",
        "11111110",
        "00000110",
        "00000110",
        "00001100",
        "00001100",
        "00011000",
        "00011000",
        "00110000",
        "00110000",
        "01100000",
        "01100000",
        "11000000",
        "11000000",
        "11000000",
        "11000000",
    ],
    "8": [
        "01111100",
        "11111110",
        "11000110",
        "11000110",
        "11000110",
        "11111110",
        "01111100",
        "11111110",
        "11000110",
        "11000110",
        "11000110",
        "11000110",
        "11000110",
        "11111110",
        "01111100",
        "00111000",
    ],
    "9": [
        "01111100",
        "11111110",
        "11000110",
        "11000110",
        "11000110",
        "11000110",
        "11000110",
        "11111110",
        "01111110",
        "00000110",
        "00000110",
        "00000110",
        "00000110",
        "11111110",
        "01111100",
        "00111000",
    ],
};
const EXTRA_DIGIT_TEMPLATES = {
    "1": [[
            "......######",
            "..##########",
            "############",
            "......######",
            "......######",
            "......######",
            "......######",
            "......######",
            "......######",
            "......######",
            "......######",
            "......######",
            "......######",
            "......######",
            "......######",
            "......######",
        ], [
            "........####",
            "...#########",
            "############",
            "......######",
            "........####",
            "........####",
            "........####",
            "........####",
            "........####",
            "........####",
            "........####",
            "........####",
            "........####",
            "........####",
            "........####",
            "........####",
        ]],
    "2": [[
            "...######...",
            "..##########",
            ".###....####",
            "####....####",
            "####....####",
            "........####",
            ".......#####",
            ".......####.",
            "......###...",
            ".....####...",
            "....####....",
            "...####.....",
            "..####......",
            ".####.......",
            "############",
            "############",
        ], [
            "...#######..",
            ".###########",
            "#####...####",
            "####.....###",
            "####.....###",
            "........####",
            ".......#####",
            "......#####.",
            "......####..",
            ".....####...",
            "....####....",
            "...####.....",
            "..####......",
            "#####.......",
            "############",
            "############",
        ]],
    "3": [[
            "...#######..",
            ".###########",
            ".####...####",
            "####.....###",
            ".........###",
            "........####",
            ".....#######",
            ".....#####..",
            ".....######.",
            "........####",
            ".........###",
            ".........###",
            "####.....###",
            "#####....###",
            ".###########",
            "..#########.",
        ], [
            "...######...",
            ".##########.",
            "####....####",
            "####....####",
            "........####",
            "........####",
            ".....######.",
            ".....#####..",
            ".....######.",
            ".......#####",
            "........####",
            ".........###",
            "####.....###",
            "####....####",
            "############",
            "..########..",
        ]],
    "4": [[
            ".......###..",
            "......####..",
            ".....#####..",
            ".....#####..",
            "....##.###..",
            "...###.###..",
            "..###..###..",
            "..##...###..",
            "..##...###..",
            ".##....###..",
            "###...#####.",
            "############",
            ".......####.",
            ".......###..",
            ".......###..",
            ".......###..",
        ], [
            ".......####.",
            "......#####.",
            ".....######.",
            "....#######.",
            "....##.####.",
            "...###.####.",
            "...##..####.",
            "..##...####.",
            ".###...####.",
            "###....####.",
            "####...#####",
            "############",
            ".......####.",
            ".......####.",
            ".......####.",
            ".......####.",
        ]],
    "5": [[
            ".##########.",
            ".##########.",
            ".###........",
            ".###........",
            ".###........",
            ".###.######.",
            ".###########",
            ".###....####",
            "........####",
            "........####",
            "........####",
            "........####",
            "####....####",
            ".###....####",
            ".###########",
            "..########..",
        ], [
            ".###########",
            ".###########",
            ".###........",
            ".###........",
            ".###........",
            ".##########.",
            ".###########",
            ".###....####",
            ".........###",
            ".........###",
            ".........###",
            ".........###",
            "####.....###",
            "####....####",
            ".###########",
            "..#########.",
        ]],
    "6": [[
            "...######...",
            ".##########.",
            ".###...#####",
            "####....####",
            "####........",
            "####........",
            "####..####..",
            "############",
            "#####..#####",
            "####....####",
            "####....####",
            "####....####",
            "####....####",
            "####....####",
            ".###########",
            "..########..",
        ], [
            "...#######..",
            ".##########.",
            "#####...####",
            "####.....###",
            "####........",
            "####........",
            "####.#####..",
            "############",
            "#####...####",
            "####.....###",
            "####.....###",
            "####.....###",
            "####.....###",
            "####.....###",
            ".###########",
            "..#########.",
        ]],
    "7": [[
            "############",
            "############",
            "........####",
            "........####",
            ".......#####",
            ".......####.",
            ".......####.",
            "......####..",
            "......####..",
            ".....#####..",
            ".....####...",
            "....#####...",
            "....####....",
            "....####....",
            "...####.....",
            "...####.....",
        ], [
            "############",
            "############",
            ".........###",
            ".........###",
            "........####",
            "........####",
            ".......####.",
            ".......####.",
            ".......###..",
            "......####..",
            "......####..",
            ".....####...",
            ".....####...",
            "....####....",
            "....####....",
            "...####.....",
        ]],
    "8": [[
            "...######...",
            "..#########.",
            ".###...#####",
            ".###....####",
            ".###....####",
            ".###....####",
            "..#########.",
            "...#######..",
            "..#########.",
            ".###...#####",
            "####....####",
            "####.....###",
            "####....####",
            ".###....####",
            ".###########",
            "...#######..",
        ], [
            "...#######..",
            ".##########.",
            ".####...####",
            "####.....###",
            "####.....###",
            ".###....####",
            ".##########.",
            "..########..",
            ".##########.",
            ".####...####",
            "####.....###",
            "####.....###",
            "####.....###",
            "####....####",
            ".###########",
            "..#########.",
        ]],
    "9": [[
            "...#######..",
            ".###########",
            ".###....####",
            "####....####",
            "####....####",
            "####....####",
            "####....####",
            "#####..#####",
            ".###########",
            "..##########",
            "........####",
            "........####",
            ".###....####",
            ".###....####",
            ".###########",
            "...########.",
        ], [
            "...#######..",
            ".###########",
            "#####...####",
            "####.....###",
            "####.....###",
            "####.....###",
            "####.....###",
            "######.#####",
            ".###########",
            ".######.####",
            ".........###",
            ".........###",
            ".###.....###",
            ".###.....###",
            ".###########",
            "..#########.",
        ]],
    "0": [[
            "...#######..",
            ".###########",
            "#####...####",
            "####.....###",
            "####.....###",
            "####.....###",
            "####.....###",
            "####.....###",
            "####.....###",
            "####.....###",
            "####.....###",
            "####.....###",
            "####.....###",
            "####.....###",
            ".###########",
            "..#########.",
        ]],
};
const NORMALIZED_TEMPLATES = Object.fromEntries(Object.entries(DIGIT_TEMPLATES).map(([digit, rows]) => [
    digit,
    [
        normalizeTemplate(rows),
        ...(EXTRA_DIGIT_TEMPLATES[digit] ?? []).map((extraRows) => normalizeTemplate(extraRows)),
    ],
]));
function isTemplateTextPixel(value) {
    return value === "1" || value === "#";
}
function normalizeTemplate(rows) {
    const data = new Uint8Array(TEMPLATE_WIDTH * TEMPLATE_HEIGHT);
    let minX = rows[0].length;
    let minY = rows.length;
    let maxX = -1;
    let maxY = -1;
    for (let y = 0; y < rows.length; y += 1) {
        for (let x = 0; x < rows[y].length; x += 1) {
            if (isTemplateTextPixel(rows[y][x])) {
                minX = Math.min(minX, x);
                minY = Math.min(minY, y);
                maxX = Math.max(maxX, x);
                maxY = Math.max(maxY, y);
            }
        }
    }
    const sourceHeight = maxY - minY + 1;
    const sourceWidth = maxX - minX + 1;
    for (let y = 0; y < TEMPLATE_HEIGHT; y += 1) {
        const sourceY = minY + Math.min(sourceHeight - 1, Math.floor(y * sourceHeight / TEMPLATE_HEIGHT));
        for (let x = 0; x < TEMPLATE_WIDTH; x += 1) {
            const sourceX = minX + Math.min(sourceWidth - 1, Math.floor(x * sourceWidth / TEMPLATE_WIDTH));
            data[y * TEMPLATE_WIDTH + x] = isTemplateTextPixel(rows[sourceY][sourceX]) ? 1 : 0;
        }
    }
    return data;
}
function isTextPixel(image, offset, threshold, invert, textColor) {
    const r = image.data[offset];
    const g = image.data[offset + 1];
    const b = image.data[offset + 2];
    if (invert) {
        return Math.max(r, g, b) <= 255 - threshold;
    }
    if (textColor === "white") {
        return Math.min(r, g, b) >= threshold;
    }
    return Math.max(r, g, b) >= threshold;
}
function createMask(image, threshold, invert, textColor) {
    const mask = new Uint8Array(image.width * image.height);
    for (let y = 0; y < image.height; y += 1) {
        for (let x = 0; x < image.width; x += 1) {
            const pixelOffset = (y * image.width + x) * 4;
            mask[y * image.width + x] = isTextPixel(image, pixelOffset, threshold, invert, textColor) ? 1 : 0;
        }
    }
    return mask;
}
function findGlyphBounds(mask, width, height, maxGlyphGap, minGlyphWidth, minGlyphHeight) {
    const columnHasText = new Uint8Array(width);
    for (let x = 0; x < width; x += 1) {
        for (let y = 0; y < height; y += 1) {
            if (mask[y * width + x] === 1) {
                columnHasText[x] = 1;
                break;
            }
        }
    }
    const bounds = [];
    let startX = -1;
    let emptyColumns = 0;
    for (let x = 0; x <= width; x += 1) {
        const hasText = x < width && columnHasText[x] === 1;
        if (hasText && startX === -1) {
            startX = x;
            emptyColumns = 0;
            continue;
        }
        if (hasText) {
            emptyColumns = 0;
            continue;
        }
        if (startX === -1) {
            continue;
        }
        emptyColumns += 1;
        if (emptyColumns <= maxGlyphGap && x < width) {
            continue;
        }
        const endX = x - emptyColumns;
        let minY = height;
        let maxY = -1;
        for (let gx = startX; gx <= endX; gx += 1) {
            for (let y = 0; y < height; y += 1) {
                if (mask[y * width + gx] === 1) {
                    minY = Math.min(minY, y);
                    maxY = Math.max(maxY, y);
                }
            }
        }
        const glyphWidth = endX - startX + 1;
        const glyphHeight = maxY - minY + 1;
        if (glyphWidth >= minGlyphWidth && glyphHeight >= minGlyphHeight) {
            bounds.push({ x: startX, y: minY, width: glyphWidth, height: glyphHeight });
        }
        startX = -1;
        emptyColumns = 0;
    }
    return bounds;
}
function normalizeGlyph(mask, imageWidth, bounds) {
    const normalized = new Uint8Array(TEMPLATE_WIDTH * TEMPLATE_HEIGHT);
    for (let y = 0; y < TEMPLATE_HEIGHT; y += 1) {
        const sourceYStart = bounds.y + Math.floor(y * bounds.height / TEMPLATE_HEIGHT);
        const sourceYEnd = bounds.y + Math.max(Math.floor((y + 1) * bounds.height / TEMPLATE_HEIGHT), Math.floor(y * bounds.height / TEMPLATE_HEIGHT) + 1);
        for (let x = 0; x < TEMPLATE_WIDTH; x += 1) {
            const sourceXStart = bounds.x + Math.floor(x * bounds.width / TEMPLATE_WIDTH);
            const sourceXEnd = bounds.x + Math.max(Math.floor((x + 1) * bounds.width / TEMPLATE_WIDTH), Math.floor(x * bounds.width / TEMPLATE_WIDTH) + 1);
            let hasText = false;
            for (let sourceY = sourceYStart; sourceY < bounds.y + bounds.height && sourceY < sourceYEnd; sourceY += 1) {
                for (let sourceX = sourceXStart; sourceX < bounds.x + bounds.width && sourceX < sourceXEnd; sourceX += 1) {
                    if (mask[sourceY * imageWidth + sourceX] === 1) {
                        hasText = true;
                        break;
                    }
                }
                if (hasText) {
                    break;
                }
            }
            normalized[y * TEMPLATE_WIDTH + x] = hasText ? 1 : 0;
        }
    }
    return normalized;
}
function templateConfidence(glyph, template) {
    let matches = 0;
    for (let i = 0; i < glyph.length; i += 1) {
        if (glyph[i] === template[i]) {
            matches += 1;
        }
    }
    return matches / glyph.length;
}
function recognizeDigit(glyph) {
    let bestText = "";
    let bestConfidence = 0;
    for (const [digit, templates] of Object.entries(NORMALIZED_TEMPLATES)) {
        for (const template of templates) {
            const confidence = templateConfidence(glyph, template);
            if (confidence > bestConfidence) {
                bestText = digit;
                bestConfidence = confidence;
            }
        }
    }
    return { text: bestText, confidence: bestConfidence };
}
function clampThreshold(threshold) {
    if (!Number.isFinite(threshold)) {
        throw new TypeError("OCR threshold must be a finite number");
    }
    return Math.max(0, Math.min(255, Math.round(threshold)));
}
function averageConfidence(chars) {
    if (chars.length === 0) {
        return 0;
    }
    return chars.reduce((sum, char) => sum + char.confidence, 0) / chars.length;
}
export function readDigits(image, options = {}) {
    const threshold = clampThreshold(options.threshold ?? 220);
    const invert = options.invert ?? false;
    const textColor = options.textColor ?? "bright";
    const minGlyphWidth = options.minGlyphWidth ?? 2;
    const minGlyphHeight = options.minGlyphHeight ?? Math.max(5, Math.floor(image.height * 0.25));
    const maxGlyphGap = options.maxGlyphGap ?? 1;
    const minConfidence = options.minConfidence ?? 0.55;
    if (!(image instanceof ScreenshotImage)) {
        throw new TypeError("readDigits(image) requires a ScreenshotImage");
    }
    const mask = createMask(image, threshold, invert, textColor);
    const bounds = findGlyphBounds(mask, image.width, image.height, maxGlyphGap, minGlyphWidth, minGlyphHeight);
    const chars = bounds.map((bound) => {
        const glyph = normalizeGlyph(mask, image.width, bound);
        const match = recognizeDigit(glyph);
        return {
            text: match.confidence >= minConfidence ? match.text : "?",
            x: bound.x,
            y: bound.y,
            width: bound.width,
            height: bound.height,
            confidence: match.confidence,
        };
    });
    return {
        text: chars.map((char) => char.text).join(""),
        confidence: averageConfidence(chars),
        chars,
    };
}
export function readDigitsOnScreen(regionOrX, yOrOptions = {}, width, height, options = {}) {
    if (typeof regionOrX === "number") {
        if (typeof yOrOptions !== "number") {
            throw new TypeError("readDigitsOnScreen(x, y, width, height, options?) requires numeric region values");
        }
        return readDigits(screenshot(regionOrX, yOrOptions, width, height), options);
    }
    return readDigits(screenshot(regionOrX), yOrOptions);
}
