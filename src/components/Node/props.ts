import { TreeNode } from "../../core/tree";

export interface TreeNodeProps {
    node?: TreeNode<number>;
    x: number;
    y: number;
    onHeightCalculated?: (heights: number[]) => void;
}
