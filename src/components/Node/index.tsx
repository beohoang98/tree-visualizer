import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { TreeNodeProps } from "./props";

const RADIUS = 20;
const DISTANCE = 20;
const HEIGHT = 70;

export const TreeNodeElement: FC<TreeNodeProps> = ({
    node,
    x,
    y,
    onHeightCalculated = () => {},
}) => {
    const [heights, setHeights] = useState([0, 0]);
    const heightCallback = useCallback(
        (index: number) => (h: number[]) => {
            const max = Math.max(...h);
            if (max + 1 <= heights[index]) return;
            heights[index] = max + 1;
            setHeights(heights.slice());
        },
        [heights]
    );

    useEffect(() => {
        if (node) onHeightCalculated(heights);
    }, [onHeightCalculated, node, heights]);

    if (!node) return null;

    const distanceLeft = DISTANCE * Math.pow(2, heights[0]);
    const distanceRight = DISTANCE * Math.pow(2, heights[1]);

    const pathLeft = node.left ? (
        <path d={`M0,0 l${-distanceLeft},${HEIGHT}`} stroke="black" />
    ) : null;
    const pathRight = node.right ? (
        <path d={`M0,0 l${distanceRight},${HEIGHT}`} stroke="black" />
    ) : null;

    return (
        <g transform={`translate(${x}, ${y})`} data-height={heights}>
            {pathLeft}
            <TreeNodeElement
                node={node.left}
                x={-distanceLeft}
                y={HEIGHT}
                onHeightCalculated={heightCallback(0)}
            />
            {pathRight}
            <TreeNodeElement
                node={node.right}
                x={distanceRight}
                y={HEIGHT}
                onHeightCalculated={heightCallback(1)}
            />
            <circle cx="0" cy="0" r={RADIUS} />
            <text x="0" y="0" textAnchor="middle" dominantBaseline="middle">
                {node.value}
            </text>
        </g>
    );
};
