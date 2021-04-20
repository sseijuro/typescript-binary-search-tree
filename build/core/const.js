"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LINE_WIDTH = exports.Y_COEFF = exports.X_COEFF = exports.MAX_WIDTH = exports.Y_STEP = exports.X_STEP = exports.Y_START = exports.X_START = exports.FONT_SIZE = exports.MAX_CANVAS_HEIGHT = exports.MAX_CANVAS_WIDTH = exports.METHOD_ALLOWED_IN_BROWSER = exports.NOT_IMPLEMENTED_METHOD = exports.PathType = exports.Loop = exports.AdapterType = void 0;
var AdapterType;
(function (AdapterType) {
    AdapterType[AdapterType["ConsoleAdapter"] = 0] = "ConsoleAdapter";
    AdapterType[AdapterType["VisualAdapter"] = 1] = "VisualAdapter";
})(AdapterType = exports.AdapterType || (exports.AdapterType = {}));
var Loop;
(function (Loop) {
    Loop[Loop["InOrder"] = 0] = "InOrder";
    Loop[Loop["PreOrder"] = 1] = "PreOrder";
    Loop[Loop["PostOrder"] = 2] = "PostOrder";
})(Loop = exports.Loop || (exports.Loop = {}));
var PathType;
(function (PathType) {
    PathType[PathType["Left"] = 0] = "Left";
    PathType[PathType["Right"] = 1] = "Right";
})(PathType = exports.PathType || (exports.PathType = {}));
exports.NOT_IMPLEMENTED_METHOD = "Method not implemented";
exports.METHOD_ALLOWED_IN_BROWSER = "This method allowed in browser";
exports.MAX_CANVAS_WIDTH = 4000;
exports.MAX_CANVAS_HEIGHT = 4000;
exports.FONT_SIZE = 16;
exports.X_START = 200;
exports.Y_START = 50;
exports.X_STEP = exports.FONT_SIZE * 2.5;
exports.Y_STEP = exports.FONT_SIZE;
exports.MAX_WIDTH = 25;
exports.X_COEFF = .5;
exports.Y_COEFF = 1.5;
exports.LINE_WIDTH = .5;
