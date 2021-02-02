import { TreeNode } from "./node";

export class BinaryTree<T = number> {
    serializeID: number = 0;
    root: TreeNode<T> | undefined = undefined;

    insert(value: T): void {
        ++this.serializeID;
        if (!this.root) {
            this.root = new TreeNode(value);
            return;
        }

        let traversalNode: TreeNode<T> | undefined = this.root;
        while (traversalNode) {
            if (value < traversalNode.value) {
                if (!traversalNode.left) {
                    traversalNode.left = new TreeNode(value);
                    break;
                }
                traversalNode = traversalNode.left;
            } else {
                if (!traversalNode.right) {
                    traversalNode.right = new TreeNode(value);
                    break;
                }
                traversalNode = traversalNode.right;
            }
        }
    }

    protected getNode(value: T): TreeNode<T> | undefined {
        let traversalNode = this.root;
        if (!traversalNode) return undefined;
        while (traversalNode) {
            if (traversalNode.value === value) return traversalNode;
            if (value < traversalNode.value) {
                traversalNode = traversalNode.left;
            } else {
                traversalNode = traversalNode.right;
            }
        }
        return undefined;
    }

    contain(value: T): boolean {
        return !!this.getNode(value);
    }

    getValue(value: T): T | undefined {
        return this.getNode(value)?.value;
    }

    /**
     *
     * @returns [node, parent]
     */
    private getMinRight(node: TreeNode<T>): (TreeNode<T> | undefined)[] {
        let parent = node;
        let min = node.right;
        while (min && min.left) {
            parent = min;
            min = min.left;
        }
        return [min, parent];
    }

    delete(value: T): TreeNode<T> | undefined {
        if (!this.root) return undefined;
        // debugger;

        let traversalNode: TreeNode<T> | undefined = this.root;
        let parent: TreeNode<T> = this.root;
        let isLeft = false;

        while (traversalNode && traversalNode.value !== value) {
            parent = traversalNode;
            if (value < traversalNode.value) {
                isLeft = true;
                traversalNode = traversalNode.left;
            } else if (value > traversalNode.value) {
                isLeft = false;
                traversalNode = traversalNode.right;
            }
        }
        if (!traversalNode) return undefined;

        ++this.serializeID;

        if (!traversalNode.left && !traversalNode.right) {
            if (traversalNode === this.root) {
                this.root = undefined;
                return traversalNode;
            }
            if (isLeft) parent.left = undefined;
            else parent.right = undefined;
            return traversalNode;
        }

        if (!traversalNode.left) {
            if (traversalNode === this.root) {
                this.root = traversalNode.right;
                return traversalNode;
            }
            if (isLeft) parent.left = traversalNode.right;
            else parent.right = traversalNode.right;
            return traversalNode;
        }

        if (!traversalNode.right) {
            if (traversalNode === this.root) {
                this.root = traversalNode.left;
                return traversalNode;
            }
            if (isLeft) parent.left = traversalNode.left;
            else parent.right = traversalNode.left;
            return traversalNode;
        }

        // debugger;
        const [minRight, parentMinRight] = this.getMinRight(traversalNode);
        if (!minRight || !parentMinRight) return;

        if (parentMinRight === traversalNode)
            parentMinRight.right = minRight.right;
        else parentMinRight.left = minRight.right;

        minRight.left = traversalNode.left;
        minRight.right = traversalNode.right;

        if (traversalNode === this.root) {
            this.root = minRight;
            return traversalNode;
        }

        if (isLeft) parent.left = minRight;
        else parent.right = minRight;

        return traversalNode;
    }
}
