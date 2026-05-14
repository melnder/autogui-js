import {
  focusWindow,
  moveTo,
  getPixelColor,
  click,
  press,
} from "../dist/index.js"

export async function waitForColorAndClick(
  color,
  coords,
  timeout_ms = 5000,
  deviation = 10,
) {
  await moveTo(coords.x, coords.y)
  const start_time = Date.now()
  while (Date.now() - start_time < timeout_ms) {
    const pixel_color = await getPixelColor(coords.x, coords.y)
    if (
      Math.abs(pixel_color.r - color.r) < deviation &&
      Math.abs(pixel_color.g - color.g) < deviation &&
      Math.abs(pixel_color.b - color.b) < deviation
    ) {
      await click(coords.x, coords.y)
      return true
    }
  }
  return false
}

focusWindow("Star Wars: Galaxy of Heroes")
press("t")
waitForColorAndClick({ r: 35, g: 200, b: 245 }, { x: 118, y: 318 })
