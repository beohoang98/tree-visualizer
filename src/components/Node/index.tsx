import React, { FC, useCallback, useEffect, useState } from "react";
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
            if (h[1 - index] + 1 <= heights[index]) return;
            heights[index] = h[1 - index] + 1;
            setHeights(heights.slice());
        },
        [heights]
    );

    useEffect(() => {
        if (node) {
            onHeightCalculated([node.left ? 1 : 0, node.right ? 1 : 0]);
        }
    }, [onHeightCalculated, node]);

    if (!node) return null;

    const distanceLeft = DISTANCE * Math.pow(2, heights[0]);
    const distanceRight = DISTANCE * Math.pow(2, heights[1]);

    const pathLeft = node.left ? (
        <path
            d={`M0,0 q0,${HEIGHT / 2},${-distanceLeft / 2},${HEIGHT / 2} t${
                -distanceLeft / 2
            },${HEIGHT / 2}`}
            stroke="black"
        />
    ) : null;
    const pathRight = node.right ? (
        <path
            d={`M0,0 q0,${HEIGHT / 2},${distanceRight / 2},${HEIGHT / 2} t${
                distanceRight / 2
            },${HEIGHT / 2}`}
            stroke="black"
        />
    ) : null;

    return (
        <g transform={`translate(${x}, ${y})`} data-height={heights}>
            {pathLeft}
            <TreeNodeElement
                key={node.left?.value}
                node={node.left}
                x={-distanceLeft}
                y={HEIGHT}
                onHeightCalculated={heightCallback(0)}
            />
            {pathRight}
            <TreeNodeElement
                key={node.right?.value}
                node={node.right}
                x={distanceRight}
                y={HEIGHT}
                onHeightCalculated={heightCallback(1)}
            />
            <g className="node">
                <circle cx="0" cy="0" r={RADIUS} />
                <text x="0" y="0" textAnchor="middle" dominantBaseline="middle">
                    {node.value}
                </text>
            </g>
        </g>
    );
};
