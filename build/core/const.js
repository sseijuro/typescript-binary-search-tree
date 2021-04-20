"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LINE_WIDTH = exports.Y_COEFF = exports.X_COEFF = exports.MAX_WIDTH = exports.STEP = exports.Y_START = exports.X_START = exports.RECT_SIZE = exports.RECT_COLOR = exports.FONT_SIZE = exports.MAX_CANVAS_HEIGHT = exports.MAX_CANVAS_WIDTH = exports.CANVAS_NOT_SPECIFIED = exports.METHOD_ALLOWED_IN_BROWSER = exports.NOT_IMPLEMENTED_METHOD = exports.Loop = exports.AdapterType = void 0;
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
exports.NOT_IMPLEMENTED_METHOD = "Method not implemented";
exports.METHOD_ALLOWED_IN_BROWSER = "This method allowed in browser";
exports.CANVAS_NOT_SPECIFIED = "Missing canvas property at BinarySearchTreePrinterVisualAdapterZoom constructor";
exports.MAX_CANVAS_WIDTH = 1920;
exports.MAX_CANVAS_HEIGHT = 1280;
exports.FONT_SIZE = 16;
exports.RECT_COLOR = "#95a5a655";
exports.RECT_SIZE = exports.FONT_SIZE * 2;
exports.X_START = exports.MAX_CANVAS_WIDTH / 2;
exports.Y_START = 0;
exports.STEP = exports.RECT_SIZE;
exports.MAX_WIDTH = 25;
exports.X_COEFF = 1;
exports.Y_COEFF = 1;
exports.LINE_WIDTH = .5;
