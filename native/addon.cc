#include <napi.h>
#include <windows.h>
#include <fstream>
#include <string>
#include <vector>

Napi::Value moveTo(const Napi::CallbackInfo& info) { 
    Napi::Env env = info.Env();

    if (info.Length() < 2 || !info[0].IsNumber() || !info[1].IsNumber()) {
        Napi::TypeError::New(env, "moveTo(x, y) requires two numbers").ThrowAsJavaScriptException();
        return env.Null();
    }

    int x = info[0].As<Napi::Number>().Int32Value();
    int y = info[1].As<Napi::Number>().Int32Value();

    BOOL ok = SetCursorPos(x, y);

    if (!ok) {
        Napi::Error::New(env, "SetCursorPos failed").ThrowAsJavaScriptException();
        return env.Null();
    }

    return Napi::Boolean::New(env, true);
}

DWORD ButtonDownFlag(const std::string& button) {
    if (button == "right") return MOUSEEVENTF_RIGHTDOWN;
    if (button == "middle") return MOUSEEVENTF_MIDDLEDOWN;
    return MOUSEEVENTF_LEFTDOWN;
}

DWORD ButtonUpFlag(const std::string& button) {
    if (button == "right") return MOUSEEVENTF_RIGHTUP;
    if (button == "middle") return MOUSEEVENTF_MIDDLEUP;
    return MOUSEEVENTF_LEFTUP;
}

Napi::Value click(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();

    int x = info[0].As<Napi::Number>().Int32Value();
    int y = info[1].As<Napi::Number>().Int32Value();
    std::string button = info[2].As<Napi::String>().Utf8Value();

    if(x == -1) {
        POINT cursorPos;
        GetCursorPos(&cursorPos);
        x = cursorPos.x;
    }
    if(y == -1) {
        POINT cursorPos;
        GetCursorPos(&cursorPos);
        y = cursorPos.y;
    }

    BOOL ok = SetCursorPos(x, y);
    if (!ok) {
        Napi::Error::New(env, "SetCursorPos failed").ThrowAsJavaScriptException();
        return env.Null();
    }

    INPUT inputs[2] = {};
    inputs[0].type = INPUT_MOUSE;
    inputs[0].mi.dwFlags = ButtonDownFlag(button);

    inputs[1].type = INPUT_MOUSE;
    inputs[1].mi.dwFlags = ButtonUpFlag(button);

    UINT sent = SendInput(2, inputs, sizeof(INPUT));

    if (sent != 2) {
        Napi::Error::New(env, "SendInput mouse click failed").ThrowAsJavaScriptException();
        return env.Null();
    }

    return Napi::Boolean::New(env, true);
}

Napi::Value scroll(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();

    if (info.Length() < 2 || !info[0].IsNumber() || !info[1].IsString()) {
        Napi::TypeError::New(env, "scroll(steps, direction) requires a number and a direction string").ThrowAsJavaScriptException();
        return env.Null();
    }

    int steps = info[0].As<Napi::Number>().Int32Value();
    std::string direction = info[1].As<Napi::String>().Utf8Value();

    if (steps < 0) {
        Napi::RangeError::New(env, "scroll steps must be greater than or equal to zero").ThrowAsJavaScriptException();
        return env.Null();
    }

    int directionMultiplier = 0;
    if (direction == "up") {
        directionMultiplier = 1;
    } else if (direction == "down") {
        directionMultiplier = -1;
    } else {
        Napi::TypeError::New(env, "scroll direction must be \"up\" or \"down\"").ThrowAsJavaScriptException();
        return env.Null();
    }

    if (steps == 0) {
        return Napi::Boolean::New(env, true);
    }

    INPUT input = {};
    input.type = INPUT_MOUSE;
    input.mi.dwFlags = MOUSEEVENTF_WHEEL;
    input.mi.mouseData = WHEEL_DELTA * steps * directionMultiplier;

    UINT sent = SendInput(1, &input, sizeof(INPUT));

    if (sent != 1) {
        Napi::Error::New(env, "SendInput mouse scroll failed").ThrowAsJavaScriptException();
        return env.Null();
    }

    return Napi::Boolean::New(env, true);
}

Napi::Value press(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();

    if (info.Length() < 1 || !info[0].IsNumber()) {
        Napi::TypeError::New(env, "press(vkCode) requires a number").ThrowAsJavaScriptException();
        return env.Null();
    }

    WORD vk = static_cast<WORD>(info[0].As<Napi::Number>().Uint32Value());

    INPUT inputs[2] = {};

    inputs[0].type = INPUT_KEYBOARD;
    inputs[0].ki.wVk = vk;

    inputs[1].type = INPUT_KEYBOARD;
    inputs[1].ki.wVk = vk;
    inputs[1].ki.dwFlags = KEYEVENTF_KEYUP;

    UINT sent = SendInput(2, inputs, sizeof(INPUT));

    if (sent != 2) {
        Napi::Error::New(env, "SendInput key tap failed").ThrowAsJavaScriptException();
        return env.Null();
    }

    return Napi::Boolean::New(env, true);
}

COLORREF GetPixelColor(int x, int y) {
    HDC hdc = GetDC(NULL);
    if (hdc == NULL) {
        ReleaseDC(NULL, hdc);
        return CLR_INVALID;
    }
    COLORREF color = GetPixel(hdc, x, y);
    if (color == CLR_INVALID) {
        ReleaseDC(NULL, hdc);
       return CLR_INVALID;
    }
    ReleaseDC(NULL, hdc);
    return color;
}

Napi::Value getPixelColor(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    if (info.Length() < 2 || !info[0].IsNumber() || !info[1].IsNumber()) {
        Napi::TypeError::New(env, "getPixelColor(x, y) requires two numbers").ThrowAsJavaScriptException();
        return env.Null();
    }
    int x = info[0].As<Napi::Number>().Int32Value();
    int y = info[1].As<Napi::Number>().Int32Value();
    COLORREF color = GetPixelColor(x, y);
    if (color == CLR_INVALID) {
        Napi::Error::New(env, "GetPixelColor failed").ThrowAsJavaScriptException();
        return env.Null();
    }

    int r = GetRValue(color);
    int g = GetGValue(color);
    int b = GetBValue(color);

    Napi::Object result = Napi::Object::New(env);
    result.Set("r", r);
    result.Set("g", g);
    result.Set("b", b);
    return result;
}

bool WriteBmp(const std::string& path, int width, int height, const std::vector<unsigned char>& rgba) {
    BITMAPFILEHEADER fileHeader = {};
    BITMAPINFOHEADER infoHeader = {};

    const DWORD pixelBytes = static_cast<DWORD>(width * height * 4);
    const DWORD headerBytes = sizeof(BITMAPFILEHEADER) + sizeof(BITMAPINFOHEADER);

    fileHeader.bfType = 0x4D42;
    fileHeader.bfOffBits = headerBytes;
    fileHeader.bfSize = headerBytes + pixelBytes;

    infoHeader.biSize = sizeof(BITMAPINFOHEADER);
    infoHeader.biWidth = width;
    infoHeader.biHeight = -height;
    infoHeader.biPlanes = 1;
    infoHeader.biBitCount = 32;
    infoHeader.biCompression = BI_RGB;
    infoHeader.biSizeImage = pixelBytes;

    std::ofstream file(path, std::ios::binary);
    if (!file) {
        return false;
    }

    file.write(reinterpret_cast<const char*>(&fileHeader), sizeof(fileHeader));
    file.write(reinterpret_cast<const char*>(&infoHeader), sizeof(infoHeader));

    std::vector<unsigned char> bgra(rgba.size());
    for (size_t i = 0; i < rgba.size(); i += 4) {
        bgra[i] = rgba[i + 2];
        bgra[i + 1] = rgba[i + 1];
        bgra[i + 2] = rgba[i];
        bgra[i + 3] = rgba[i + 3];
    }

    file.write(reinterpret_cast<const char*>(bgra.data()), bgra.size());
    return file.good();
}

Napi::Value screenshot(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();

    int x = GetSystemMetrics(SM_XVIRTUALSCREEN);
    int y = GetSystemMetrics(SM_YVIRTUALSCREEN);
    int width = GetSystemMetrics(SM_CXVIRTUALSCREEN);
    int height = GetSystemMetrics(SM_CYVIRTUALSCREEN);
    std::string path;

    if (info.Length() == 1 && info[0].IsString()) {
        path = info[0].As<Napi::String>().Utf8Value();
    } else if (info.Length() >= 4) {
        if (!info[0].IsNumber() || !info[1].IsNumber() || !info[2].IsNumber() || !info[3].IsNumber()) {
            Napi::TypeError::New(env, "screenshot(x, y, width, height, path?) requires numeric region values").ThrowAsJavaScriptException();
            return env.Null();
        }
        x = info[0].As<Napi::Number>().Int32Value();
        y = info[1].As<Napi::Number>().Int32Value();
        width = info[2].As<Napi::Number>().Int32Value();
        height = info[3].As<Napi::Number>().Int32Value();
    }

    if (info.Length() >= 5 && !info[4].IsUndefined() && !info[4].IsNull()) {
        if (!info[4].IsString()) {
            Napi::TypeError::New(env, "screenshot path must be a string").ThrowAsJavaScriptException();
            return env.Null();
        }
        path = info[4].As<Napi::String>().Utf8Value();
    } else if (info.Length() > 0 && info.Length() < 4 && path.empty()) {
        Napi::TypeError::New(env, "screenshot(path?) or screenshot(x, y, width, height, path?) expected").ThrowAsJavaScriptException();
        return env.Null();
    }

    if (width <= 0 || height <= 0) {
        Napi::RangeError::New(env, "screenshot region width and height must be greater than zero").ThrowAsJavaScriptException();
        return env.Null();
    }

    HDC screenDc = GetDC(NULL);
    if (screenDc == NULL) {
        Napi::Error::New(env, "GetDC failed").ThrowAsJavaScriptException();
        return env.Null();
    }

    HDC memoryDc = CreateCompatibleDC(screenDc);
    if (memoryDc == NULL) {
        ReleaseDC(NULL, screenDc);
        Napi::Error::New(env, "CreateCompatibleDC failed").ThrowAsJavaScriptException();
        return env.Null();
    }

    BITMAPINFO bmi = {};
    bmi.bmiHeader.biSize = sizeof(BITMAPINFOHEADER);
    bmi.bmiHeader.biWidth = width;
    bmi.bmiHeader.biHeight = -height;
    bmi.bmiHeader.biPlanes = 1;
    bmi.bmiHeader.biBitCount = 32;
    bmi.bmiHeader.biCompression = BI_RGB;

    void* bits = nullptr;
    HBITMAP bitmap = CreateDIBSection(screenDc, &bmi, DIB_RGB_COLORS, &bits, NULL, 0);
    if (bitmap == NULL || bits == nullptr) {
        DeleteDC(memoryDc);
        ReleaseDC(NULL, screenDc);
        Napi::Error::New(env, "CreateDIBSection failed").ThrowAsJavaScriptException();
        return env.Null();
    }

    HGDIOBJ previousBitmap = SelectObject(memoryDc, bitmap);
    BOOL copied = BitBlt(memoryDc, 0, 0, width, height, screenDc, x, y, SRCCOPY | CAPTUREBLT);
    SelectObject(memoryDc, previousBitmap);
    DeleteDC(memoryDc);
    ReleaseDC(NULL, screenDc);

    if (!copied) {
        DeleteObject(bitmap);
        Napi::Error::New(env, "BitBlt screenshot capture failed").ThrowAsJavaScriptException();
        return env.Null();
    }

    const size_t byteLength = static_cast<size_t>(width) * static_cast<size_t>(height) * 4;
    std::vector<unsigned char> rgba(byteLength);
    unsigned char* bgra = static_cast<unsigned char*>(bits);
    for (size_t i = 0; i < byteLength; i += 4) {
        rgba[i] = bgra[i + 2];
        rgba[i + 1] = bgra[i + 1];
        rgba[i + 2] = bgra[i];
        rgba[i + 3] = 255;
    }

    DeleteObject(bitmap);

    if (!path.empty() && !WriteBmp(path, width, height, rgba)) {
        Napi::Error::New(env, "Failed to write screenshot file").ThrowAsJavaScriptException();
        return env.Null();
    }

    Napi::Object result = Napi::Object::New(env);
    result.Set("width", width);
    result.Set("height", height);
    result.Set("data", Napi::Buffer<unsigned char>::Copy(env, rgba.data(), rgba.size()));
    if (!path.empty()) {
        result.Set("path", path);
    }
    return result;
}

Napi::Value focusWindow(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    if (info.Length() < 1 || !info[0].IsString()) {
        Napi::TypeError::New(env, "focusWindow(windowName) requires a string").ThrowAsJavaScriptException();
        return env.Null();
    }
    std::string windowName = info[0].As<Napi::String>().Utf8Value();
    HWND hwnd = FindWindowA(NULL, windowName.c_str());
    if (hwnd == NULL) {
        Napi::Error::New(env, "FindWindowA failed").ThrowAsJavaScriptException();
        return env.Null();
    }

    WORD VK_ALT = 0x12;
    INPUT inputs[2] = {};
    inputs[0].type = INPUT_KEYBOARD;
    inputs[0].ki.wVk = VK_ALT;
    inputs[1].type = INPUT_KEYBOARD;
    inputs[1].ki.wVk = VK_ALT;
    inputs[1].ki.dwFlags = KEYEVENTF_KEYUP;
    SendInput(1, &inputs[0], sizeof(INPUT));
    BOOL ok = SetForegroundWindow(hwnd);
    SendInput(1, &inputs[1], sizeof(INPUT));

    if (!ok) {
        Napi::Error::New(env, "SetForegroundWindow failed").ThrowAsJavaScriptException();
        return env.Null();
    }
    return Napi::Boolean::New(env, true);
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
    exports.Set("moveTo", Napi::Function::New(env, moveTo));
    exports.Set("click", Napi::Function::New(env, click));
    exports.Set("scroll", Napi::Function::New(env, scroll));
    exports.Set("press", Napi::Function::New(env, press));
    exports.Set("getPixelColor", Napi::Function::New(env, getPixelColor));
    exports.Set("screenshot", Napi::Function::New(env, screenshot));
    exports.Set("focusWindow", Napi::Function::New(env, focusWindow));
    return exports;
}

NODE_API_MODULE(autogui_native, Init)
