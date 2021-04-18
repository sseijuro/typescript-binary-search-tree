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
    BinarySearchTreePrinter.prototype.printPreOrder = function (node, depth, parent, showNullNode) {
        if (depth === void 0) { depth = 0; }
        if (parent === void 0) { parent = null; }
        if (showNullNode === void 0) { showNullNode = true; }
        if (node) {
            this._adapter.print(node._value, depth, parent);
            this.printPreOrder(node._left);
            this.printPreOrder(node._right);
        }
        else {
            if (showNullNode) {
                this._adapter.print(null, depth, parent);
            }
        }
    };
    BinarySearchTreePrinter.prototype.printInOrder = function (node, depth, parent, showNullNode) {
        if (depth === void 0) { depth = 0; }
        if (parent === void 0) { parent = null; }
        if (showNullNode === void 0) { showNullNode = true; }
        if (node) {
            this.printInOrder(node._left, depth + 1, node._value);
            this._adapter.print(node._value, depth, parent);
            this.printInOrder(node._right, depth + 1, node._value);
        }
        else {
            if (showNullNode) {
                this._adapter.print(null, depth, parent);
            }
        }
    };
    BinarySearchTreePrinter.prototype.printPostOrder = function (node, depth, parent, showNullNode) {
        if (depth === void 0) { depth = 0; }
        if (parent === void 0) { parent = null; }
        if (showNullNode === void 0) { showNullNode = true; }
        if (node) {
            this.printPostOrder(node._left);
            this.printPostOrder(node._right);
            this._adapter.print(node._value, depth, parent);
        }
        else {
            if (showNullNode) {
                this._adapter.print(null, depth, parent);
            }
        }
    };
    return BinarySearchTreePrinter;
}());
exports.default = BinarySearchTreePrinter;
