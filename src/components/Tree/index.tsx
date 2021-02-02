import React, { FC } from "react";
import { BinaryTree } from "../../core/tree";
import { TreeNodeElement } from "../Node";
import "./tree.scss";
export interface TreeProps {
    tree: BinaryTree<number>;
    x: number;
    y: number;
}

export const TreeElement: FC<TreeProps> = ({ tree, x, y }) => {
    return (
        <g>
            <TreeNodeElement node={tree.root} x={x} y={y} />
        </g>
    );
};
