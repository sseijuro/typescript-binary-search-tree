"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const const_1 = require("./const");
class BinarySearchTreePrinter {
    constructor(tree, adapter) {
        this._tree = tree;
        this._adapter = adapter;
        this._adapter.setTreeDepth(this._tree.maxDepth());
    }
    getAdapter() {
        return this._adapter;
    }
    print(loop = const_1.Loop.InOrder) {
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
    }
    printPreOrder(node, x = const_1.X_START, y = const_1.Y_START, prevX = 0, prevY = 0, depth = 1) {
        if (node) {
            this._adapter.print(node._value, x, y, prevX, prevY, depth);
            this.printPreOrder(node._left, x - const_1.STEP * depth, y + const_1.STEP * depth, x, y, depth + 1);
            this.printPreOrder(node._right, x + const_1.STEP * depth, y + const_1.STEP * depth, x, y, depth + 1);
        }
    }
    printInOrder(node, x = const_1.X_START, y = const_1.Y_START, prevX = 0, prevY = 0, depth = 1) {
        if (node) {
            this.printInOrder(node._left, x - const_1.STEP * depth, y + const_1.STEP * depth, x, y, depth + 1);
            this._adapter.print(node._value, x, y, prevX, prevY, depth);
            this.printInOrder(node._right, x + const_1.STEP * depth, y + const_1.STEP * depth, x, y, depth + 1);
        }
    }
    printPostOrder(node, x = const_1.X_START, y = const_1.Y_START, prevX = 0, prevY = 0, depth = 1) {
        if (node) {
            this.printPostOrder(node._left, x - const_1.STEP * depth, y + const_1.STEP * depth, x, y, depth + 1);
            this.printPostOrder(node._right, x + const_1.STEP * depth, y + const_1.STEP * depth, x, y, depth + 1);
            this._adapter.print(node._value, x, y, prevX, prevY, depth);
        }
    }
}
exports.default = BinarySearchTreePrinter;
