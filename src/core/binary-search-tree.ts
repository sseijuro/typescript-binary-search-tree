import TreeNode from "./tree-node";

interface IBinarySearchTree<T> {
    getRoot(): TreeNode<T> | null;

    add(value: T): void;

    delete(value: T): void;

    find(value: T, node: TreeNode<T> | null): TreeNode<T> | null;

    maxDepth(): number;
}

export default class BinarySearchTree<T> implements IBinarySearchTree<T> {
    private _root: TreeNode<T> | null = null;

    public getRoot(): TreeNode<T> | null {
        return this._root;
    }

    public add(value: T): void {
        !this._root ? this._root = new TreeNode<T>(value) : this.addNode(this._root, value);
    }

    public delete(value: T): void {
        this._root = this.deleteNode(this._root, value);
    }

    public find(value: T, node: TreeNode<T> | null = this._root): TreeNode<T> | null {
        if (!node) {
            return null;
        }
        if (value !== node._value) {
            return this.find(value, value < node._value ? node._left : node._right);
        }
        return node;
    }

    public maxDepth(node: TreeNode<T> | null = this._root): number {
        if (!node) {
            return 0;
        }
        const left = this.maxDepth(node._left);
        const right = this.maxDepth(node._right);

        return left > right ? left + 1 : right + 1;
    }

    private addNode(node: TreeNode<T>, value: T): void {
        if (value < node._value) {
            if (!node._left) {
                node._left = new TreeNode<T>(value);
            } else {
                this.addNode(node._left, value);
            }
        } else {
            if (!node._right) {
                node._right = new TreeNode<T>(value);
            } else {
                this.addNode(node._right, value);
            }
        }
    }

    private deleteNode(node: TreeNode<T> | null, value: T): TreeNode<T> | null {
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

    private findMin(node: TreeNode<T>): TreeNode<T> {
        return !node._left ? node : this.findMin(node._left);
    }

}
