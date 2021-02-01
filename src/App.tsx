import "./App.css";

import React, { useCallback, useState } from "react";

import { TreeElement } from "./components/Tree";
import { BinaryTree } from "./core/tree";

function App() {
    const [newElement, setNewElement] = useState<number>();
    const [elements, setElements] = useState<number[]>([]);
    const [tree, setTree] = useState(new BinaryTree());

    const addElement = useCallback(
        (ev: React.FormEvent) => {
            ev.preventDefault();
            if (newElement && !isNaN(newElement)) {
                setElements([...elements, newElement]);
                tree.insert(newElement);
                setTree(tree);
            }
        },
        [elements, setElements, newElement, tree]
    );

    return (
        <div className="app-container">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="app-svg"
                viewBox="0 0 800 800"
            >
                <TreeElement tree={tree} x={400} y={100} />
            </svg>
            <div className="app-input">
                <div className="app-input-control">
                    <form onSubmit={addElement}>
                        <input
                            type="number"
                            value={newElement}
                            onChange={(ev) => setNewElement(+ev.target.value)}
                        />
                        <button type="submit">Add</button>
                    </form>
                </div>
                <ul>
                    {elements.map((el) => (
                        <li>{el}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default App;
