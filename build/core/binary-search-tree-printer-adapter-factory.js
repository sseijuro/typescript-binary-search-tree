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
    BinarySearchTreePrinterConsoleAdapter.prototype.print = function (value, depth, parent) {
        if (value === void 0) { value = null; }
        if (depth === void 0) { depth = 0; }
        if (parent === void 0) { parent = null; }
        console.log("Value=" + value + ", depth=" + depth + ", parent=" + parent);
    };
    return BinarySearchTreePrinterConsoleAdapter;
}(BinarySearchTreePrinterAdapter));
exports.BinarySearchTreePrinterConsoleAdapter = BinarySearchTreePrinterConsoleAdapter;
var BinarySearchTreePrinterVisualAdapter = /** @class */ (function (_super) {
    __extends(BinarySearchTreePrinterVisualAdapter, _super);
    function BinarySearchTreePrinterVisualAdapter() {
        var _this = _super.call(this, const_1.AdapterType.VisualAdapter) || this;
        _this._container = null;
        _this._containerInstance = false;
        _this._depthRow = [];
        if (!window) {
            throw new Error(const_1.METHOD_ALLOWED_IN_BROWSER);
        }
        return _this;
    }
    BinarySearchTreePrinterVisualAdapter.prototype.removeContainer = function () {
        if (this._container) {
            this._container = null;
            this._depthRow = [];
            this._containerInstance = false;
            var visual = document.getElementById("app");
            if (visual) {
                visual.innerHTML = "";
            }
        }
    };
    BinarySearchTreePrinterVisualAdapter.prototype.print = function (value, depth, parent) {
        var _a, _b, _c;
        if (value === void 0) { value = null; }
        if (depth === void 0) { depth = 0; }
        if (parent === void 0) { parent = null; }
        if (!this._containerInstance) {
            this._containerInstance = true;
            this._container = document.createElement("section");
            (_a = document.getElementById("app")) === null || _a === void 0 ? void 0 : _a.append(this._container);
            for (var i = 0; i <= const_1.MAX_VISUAL_DEPTH; i++) {
                this._depthRow.push(document.createElement("div"));
                this._depthRow[i].setAttribute("data-depth", i.toString());
                this._container.append(this._depthRow[i]);
            }
        }
        var p = document.createElement("p");
        p.setAttribute("parent", "" + parent);
        p.setAttribute("value", "" + value);
        var spanValue = document.createElement("span");
        spanValue.classList.add("span-value");
        if (value) {
            spanValue.innerText = (_b = p.getAttribute("value")) !== null && _b !== void 0 ? _b : "x";
        }
        var bParent = document.createElement("b");
        bParent.classList.add("b-parent");
        bParent.innerText = (_c = p.getAttribute("parent")) !== null && _c !== void 0 ? _c : "null";
        p.append(spanValue);
        p.append(bParent);
        this._depthRow[depth].append(p);
    };
    return BinarySearchTreePrinterVisualAdapter;
}(BinarySearchTreePrinterAdapter));
exports.BinarySearchTreePrinterVisualAdapter = BinarySearchTreePrinterVisualAdapter;
