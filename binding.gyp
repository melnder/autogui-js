{
  "targets": [
    {
      "target_name": "autogui_native",
      "sources": ["native/addon.cc"],
      "include_dirs": [
        "<!@(node -p \"require('node-addon-api').include\")"
      ],
      "dependencies": [
        "<!(node -p \"require('node-addon-api').gyp\")"
      ],
      "defines": ["NAPI_DISABLE_CPP_EXCEPTIONS"],
      "conditions": [
        [
          "OS=='win'",
          {
            "libraries": ["user32.lib", "gdi32.lib"]
          }
        ]
      ]
    }
  ]
}