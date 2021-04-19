import BinarySearchTree from "./binary-search-tree";
import {
    BinarySearchTreePrinterAdapter,
    BinarySearchTreePrinterConsoleAdapter,
    BinarySearchTreePrinterVisualAdapter,
} from "./binary-search-tree-printer-adapter-factory";
import { Loop, X_COEFF, X_START, X_STEP, Y_COEFF, Y_START, Y_STEP } from "./const";
import TreeNode from "./tree-node";

export default class BinarySearchTreePrinter<T> {
    private readonly _tree: BinarySearchTree<T>;
    private readonly _adapter: BinarySearchTreePrinterAdapter<T> | BinarySearchTreePrinterConsoleAdapter<T> | BinarySearchTreePrinterVisualAdapter<T>;

    constructor(tree: BinarySearchTree<T>,
                adapter: BinarySearchTreePrinterAdapter<T> | BinarySearchTreePrinterConsoleAdapter<T> | BinarySearchTreePrinterVisualAdapter<T>) {
        this._tree = tree;
        this._adapter = adapter;
        this._adapter.setTreeDepth(this._tree.maxDepth());
    }

    public getAdapter(): BinarySearchTreePrinterAdapter<T> | BinarySearchTreePrinterConsoleAdapter<T> | BinarySearchTreePrinterVisualAdapter<T> {
        return this._adapter;
    }

    public print(loop: Loop = Loop.InOrder): void {
        if (this._tree) {
            switch (loop) {
                case Loop.PreOrder:
                    this.printPreOrder(this._tree.getRoot());
                    break;
                case Loop.PostOrder:
                    this.printPostOrder(this._tree.getRoot());
                    break;
                default:
                    this.printInOrder(this._tree.getRoot());
                    break;
            }
        }
    }

    private printPreOrder(node: TreeNode<T> | null, x: number = X_START, y: number = Y_START, depth: number = 1): void {
        if (node) {
            this._adapter.print(node._value, x, y, depth);
            this.printPreOrder(node._left, x - X_STEP * depth * X_COEFF, y + Y_STEP * depth * Y_COEFF, depth + 1);
            this.printPreOrder(node._right, x + X_STEP * depth * X_COEFF, y + Y_STEP * depth * Y_COEFF, depth + 1);
        }
    }

    private printInOrder(node: TreeNode<T> | null, x: number = X_START, y: number = Y_START, depth: number = 1): void {
        if (node) {
            this.printInOrder(node._left, x - X_STEP * depth * X_COEFF, y + Y_STEP * depth * Y_COEFF, depth + 1);
            this._adapter.print(node._value, x, y, depth);
            this.printInOrder(node._right, x + X_STEP * depth * X_COEFF, y + Y_STEP * depth * Y_COEFF, depth + 1);
        }
    }

    private printPostOrder(node: TreeNode<T> | null, x: number = X_START, y: number = Y_START, depth: number = 1): void {
        if (node) {
            this.printPostOrder(node._left, x - X_STEP * X_COEFF, y + Y_STEP * depth * Y_COEFF, depth + 1);
            this.printPostOrder(node._right, x + X_STEP * X_COEFF, y + Y_STEP * depth * Y_COEFF, depth + 1);
            this._adapter.print(node._value, x, y, depth);
        }
    }
}
