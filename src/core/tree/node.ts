export class TreeNode<T = number> {
    value: T;
    left?: TreeNode<T>;
    right?: TreeNode<T>;

    constructor(value: T) {
        this.value = value;
        this.left = undefined;
        this.right = undefined;
    }
}
