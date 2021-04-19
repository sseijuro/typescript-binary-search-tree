"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var const_1 = require("./const");
var BinarySearchTreePrinter = /** @class */ (function () {
    function BinarySearchTreePrinter(tree, adapter) {
        this._tree = tree;
        this._adapter = adapter;
        this._adapter.setTreeDepth(this._tree.maxDepth());
    }
    BinarySearchTreePrinter.prototype.getAdapter = function () {
        return this._adapter;
    };
    BinarySearchTreePrinter.prototype.print = function (loop) {
        if (loop === void 0) { loop = const_1.Loop.InOrder; }
        if (this._tree) {
            switch (loop) {
                case const_1.Loop.PreOrder:
                    this.printPreOrder(this._tree.getRoot());
                    break;
                case const_1.Loop.PostOrder:
                    this.printPostOrder(this._tree.getRoot());
                    break;
                default:
                    this.printInOrder(this._tree.getRoot());
                    break;
            }
        }
    };
    BinarySearchTreePrinter.prototype.printPreOrder = function (node, x, y) {
        if (x === void 0) { x = const_1.X_START; }
        if (y === void 0) { y = const_1.Y_START; }
        if (node) {
            this._adapter.print(node._value, x, y);
            this.printPreOrder(node._left, x - const_1.STEP, y - const_1.STEP);
            this.printPreOrder(node._right, x + const_1.STEP, y - const_1.STEP);
        }
    };
    BinarySearchTreePrinter.prototype.printInOrder = function (node, x, y) {
        if (x === void 0) { x = const_1.X_START; }
        if (y === void 0) { y = const_1.Y_START; }
        if (node) {
            this.printInOrder(node._left, x - const_1.STEP, y - const_1.STEP);
            this._adapter.print(node._value, x, y);
            this.printInOrder(node._right, x + const_1.STEP, y - const_1.STEP);
        }
    };
    BinarySearchTreePrinter.prototype.printPostOrder = function (node, x, y) {
        if (x === void 0) { x = const_1.X_START; }
        if (y === void 0) { y = const_1.Y_START; }
        if (node) {
            this.printPostOrder(node._left, x - const_1.STEP, y - const_1.STEP);
            this.printPostOrder(node._right, x + const_1.STEP, y - const_1.STEP);
            this._adapter.print(node._value, x, y);
        }
    };
    return BinarySearchTreePrinter;
}());
exports.default = BinarySearchTreePrinter;
