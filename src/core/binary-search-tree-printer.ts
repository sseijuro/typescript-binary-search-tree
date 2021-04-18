import BinarySearchTree from "./binary-search-tree";
import {
    BinarySearchTreePrinterAdapter,
    BinarySearchTreePrinterConsoleAdapter,
    BinarySearchTreePrinterVisualAdapter,
} from "./binary-search-tree-printer-adapter-factory";
import { Loop } from "./const";
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

    private printPreOrder(node: TreeNode<T> | null, depth: number = 0, parent: T | null = null, showNullNode: boolean = true): void {
        if (node) {
            this._adapter.print(node._value, depth, parent);
            this.printPreOrder(node._left);
            this.printPreOrder(node._right);
        } else {
            if (showNullNode) {
                this._adapter.print(null, depth, parent);
            }
        }
    }

    private printInOrder(node: TreeNode<T> | null, depth: number = 0, parent: T | null = null, showNullNode: boolean = true): void {
        if (node) {
            this.printInOrder(node._left, depth + 1, node._value);
            this._adapter.print(node._value, depth, parent);
            this.printInOrder(node._right, depth + 1, node._value);
        } else {
            if (showNullNode) {
                this._adapter.print(null, depth, parent);
            }
        }
    }

    private printPostOrder(node: TreeNode<T> | null, depth: number = 0, parent: T | null = null, showNullNode: boolean = true): void {
        if (node) {
            this.printPostOrder(node._left);
            this.printPostOrder(node._right);
            this._adapter.print(node._value, depth, parent);
        } else {
            if (showNullNode) {
                this._adapter.print(null, depth, parent);
            }
        }
    }
}
