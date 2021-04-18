"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAX_VISUAL_DEPTH = exports.METHOD_ALLOWED_IN_BROWSER = exports.NOT_IMPLEMENTED_METHOD = exports.Loop = exports.AdapterType = void 0;
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
exports.MAX_VISUAL_DEPTH = 200;
