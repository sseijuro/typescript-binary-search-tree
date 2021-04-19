"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.BinarySearchTreePrinterVisualAdapter = exports.BinarySearchTreePrinterConsoleAdapter = exports.BinarySearchTreePrinterAdapter = exports.BinarySearchTreePrinterAdapterFactory = void 0;
var const_1 = require("./const");
var BinarySearchTreePrinterAdapterFactory = /** @class */ (function () {
    function BinarySearchTreePrinterAdapterFactory() {
    }
    BinarySearchTreePrinterAdapterFactory.prototype.create = function (adapterType) {
        var adapter;
        switch (adapterType) {
            case const_1.AdapterType.ConsoleAdapter:
                adapter = this.createConsoleAdapter();
                break;
            case const_1.AdapterType.VisualAdapter:
                adapter = this.createVisualAdapter();
                break;
            default:
                adapter = null;
                break;
        }
        return adapter;
    };
    BinarySearchTreePrinterAdapterFactory.prototype.createConsoleAdapter = function () {
        return new BinarySearchTreePrinterConsoleAdapter();
    };
    BinarySearchTreePrinterAdapterFactory.prototype.createVisualAdapter = function () {
        return new BinarySearchTreePrinterVisualAdapter();
    };
    return BinarySearchTreePrinterAdapterFactory;
}());
exports.BinarySearchTreePrinterAdapterFactory = BinarySearchTreePrinterAdapterFactory;
var BinarySearchTreePrinterAdapter = /** @class */ (function () {
    function BinarySearchTreePrinterAdapter(_type) {
        this._type = _type;
        this._treeDepth = 0;
    }
    BinarySearchTreePrinterAdapter.prototype.setTreeDepth = function (treeDepth) {
        this._treeDepth = treeDepth;
    };
    BinarySearchTreePrinterAdapter.prototype.getTreeDepth = function () {
        return this._treeDepth;
    };
    BinarySearchTreePrinterAdapter.prototype.print = function () {
        throw new Error(const_1.NOT_IMPLEMENTED_METHOD);
    };
    BinarySearchTreePrinterAdapter.prototype.removeContainer = function () {
        throw new Error(const_1.NOT_IMPLEMENTED_METHOD);
    };
    return BinarySearchTreePrinterAdapter;
}());
exports.BinarySearchTreePrinterAdapter = BinarySearchTreePrinterAdapter;
var BinarySearchTreePrinterConsoleAdapter = /** @class */ (function (_super) {
    __extends(BinarySearchTreePrinterConsoleAdapter, _super);
    function BinarySearchTreePrinterConsoleAdapter() {
        return _super.call(this, const_1.AdapterType.ConsoleAdapter) || this;
    }
    BinarySearchTreePrinterConsoleAdapter.prototype.print = function (value, x, y) {
        if (value === void 0) { value = null; }
        if (x === void 0) { x = const_1.X_START; }
        if (y === void 0) { y = const_1.Y_START; }
        console.log("Value=" + value + ", x=" + x + ", y=" + y);
    };
    return BinarySearchTreePrinterConsoleAdapter;
}(BinarySearchTreePrinterAdapter));
exports.BinarySearchTreePrinterConsoleAdapter = BinarySearchTreePrinterConsoleAdapter;
var BinarySearchTreePrinterVisualAdapter = /** @class */ (function (_super) {
    __extends(BinarySearchTreePrinterVisualAdapter, _super);
    function BinarySearchTreePrinterVisualAdapter() {
        var _this = _super.call(this, const_1.AdapterType.VisualAdapter) || this;
        _this._ctx = _this.setupContext();
        _this._maxWidth = 0;
        _this._maxHeight = 0;
        if (!window) {
            throw new Error(const_1.METHOD_ALLOWED_IN_BROWSER);
        }
        return _this;
    }
    BinarySearchTreePrinterVisualAdapter.prototype.setupContext = function () {
        var canvas = document.getElementsByTagName("canvas")[0];
        if (!canvas) {
            canvas = document.createElement("canvas");
            document.body.append(canvas);
        }
        this._maxWidth = canvas.width;
        this._maxHeight = canvas.height;
        return canvas.getContext("2d");
    };
    BinarySearchTreePrinterVisualAdapter.prototype.removeContainer = function () {
        if (this._ctx) {
            this._ctx.clearRect(0, 0, this._maxWidth, this._maxHeight);
        }
    };
    BinarySearchTreePrinterVisualAdapter.prototype.print = function (value, x, y) {
        if (value === void 0) { value = null; }
        if (x === void 0) { x = const_1.X_START; }
        if (y === void 0) { y = const_1.Y_START; }
        if (this._ctx) {
            this._ctx.font = "10px serif";
            this._ctx.fillText("" + value, x, y, const_1.MAX_WIDTH);
        }
    };
    return BinarySearchTreePrinterVisualAdapter;
}(BinarySearchTreePrinterAdapter));
exports.BinarySearchTreePrinterVisualAdapter = BinarySearchTreePrinterVisualAdapter;
