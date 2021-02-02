import React, { useCallback, useState } from "react";
import "./App.css";
import { Control } from "./components/Control";
import { TreeElement } from "./components/Tree";
import { ZoomWrapper } from "./containers/Zoom";
import { BinaryTree } from "./core/tree";

function App() {
    const [tree, setTree] = useState(new BinaryTree());

    const addElement = useCallback(
        (value: number) => {
            console.debug("Add " + value);
            tree.insert(value);
            setTree(
                Object.assign(Object.create(Object.getPrototypeOf(tree)), tree)
            );
        },
        [tree]
    );
    const removeElement = useCallback(
        (value: number) => {
            console.debug("Remove " + value);
            tree.delete(value);
            setTree(
                Object.assign(Object.create(Object.getPrototypeOf(tree)), tree)
            );
        },
        [tree]
    );

    return (
        <div className="app-container">
            <div className="app-svg">
                <ZoomWrapper width={800} height={800}>
                    <defs>
                        <linearGradient
                            id="path-gradient"
                            x1="0%"
                            y1="0%"
                            x2="0%"
                            y2="100%"
                        >
                            <stop offset="0%" stop-color="#22c" />
                            <stop offset="50%" stop-color="#3cf" />
                            <stop offset="100%" stop-color="#22c" />
                        </linearGradient>
                    </defs>
                    <TreeElement tree={tree} x={400} y={100} />
                </ZoomWrapper>
            </div>
            <Control
                onAddElement={addElement}
                onRemoveElement={removeElement}
            />
        </div>
    );
}

export default App;
