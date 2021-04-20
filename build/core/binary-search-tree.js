"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tree_node_1 = __importDefault(require("./tree-node"));
class BinarySearchTree {
    constructor() {
        this._root = null;
    }
    getRoot() {
        return this._root;
    }
    add(value) {
        !this._root ? this._root = new tree_node_1.default(value) : this.addNode(this._root, value);
    }
    delete(value) {
        this._root = this.deleteNode(this._root, value);
    }
    find(value, node = this._root) {
        if (!node) {
            return null;
        }
        if (value !== node._value) {
            return this.find(value, value < node._value ? node._left : node._right);
        }
        return node;
    }
    maxDepth(node = this._root) {
        if (!node) {
            return 0;
        }
        const left = this.maxDepth(node._left);
        const right = this.maxDepth(node._right);
        return left > right ? left + 1 : right + 1;
    }
    addNode(node, value) {
        if (this.find(value)) {
            return;
        }
        if (value < node._value) {
            if (!node._left) {
                node._left = new tree_node_1.default(value);
            }
            else {
                this.addNode(node._left, value);
            }
        }
        else {
            if (!node._right) {
                node._right = new tree_node_1.default(value);
            }
            else {
                this.addNode(node._right, value);
            }
        }
    }
    deleteNode(node, value) {
        if (!node) {
            return null;
        }
        if (value < node._value) {
            node._left = this.deleteNode(node._left, value);
            return node;
        }
        if (value > node._value) {
            node._right = this.deleteNode(node._right, value);
            return node;
        }
        if (!node._left && !node._right) {
            node = null;
            return node;
        }
        if (!node._left) {
            node = node._right;
            return node;
        }
        if (!node._right) {
            node = node._left;
            return node;
        }
        const minNode = this.findMin(node._right);
        node._value = minNode._value;
        node._right = this.deleteNode(node._right, minNode._value);
        return node;
    }
    findMin(node) {
        return !node._left ? node : this.findMin(node._left);
    }
}
exports.default = BinarySearchTree;
