export default class TreeNode<T> {
    public _left: TreeNode<T> | null = null;
    public _right: TreeNode<T> | null = null;

    constructor(public _value: T) {
    }
}
