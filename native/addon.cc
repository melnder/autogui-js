#include <napi.h>
#include <windows.h>
#include <string>

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

    std::string button = "left";

    if (info.Length() >= 1 && info[0].IsString()) {
        button = info[0].As<Napi::String>().Utf8Value();
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

Napi::Object Init(Napi::Env env, Napi::Object exports) {
    exports.Set("moveTo", Napi::Function::New(env, moveTo));
    exports.Set("click", Napi::Function::New(env, click));
    exports.Set("press", Napi::Function::New(env, press));
    return exports;
}

NODE_API_MODULE(autogui_native, Init)