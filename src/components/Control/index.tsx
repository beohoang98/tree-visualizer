import React, { FC, useCallback, useState } from "react";
import "./control.scss";

export interface ControlProps {
    initialElements?: number[];
    onAddElement?: (element: number) => void;
    onRemoveElement?: (element: number) => void;
}

export const Control: FC<ControlProps> = ({
    initialElements = [],
    onAddElement = () => {},
    onRemoveElement = () => {},
}) => {
    const [elements, setElements] = useState<number[]>(initialElements);
    const [newElement, setNewElement] = useState<string | undefined>();

    const handleInputChange = useCallback(
        (ev: React.ChangeEvent<HTMLInputElement>) => {
            const val = ev.target.value;
            setNewElement(val);
            if (val && !isNaN(+val)) {
                ev.target.classList.remove("error");
            } else {
                ev.target.classList.add("error");
            }
        },
        []
    );

    const handleSubmit = useCallback(
        (ev: React.FormEvent) => {
            ev.preventDefault();
            if (!newElement || isNaN(+newElement)) return;
            setElements([...elements, +newElement]);
            setNewElement("");
            onAddElement(+newElement);
        },
        [elements, newElement, onAddElement]
    );

    const handleRemoveElement = useCallback(
        (ev: React.MouseEvent<HTMLElement>) => {
            const index = ev.currentTarget.getAttribute("data-index");
            if (!index || isNaN(+index)) return;
            const value = elements[+index];
            elements.splice(+index, 1);
            setElements([...elements]);
            onRemoveElement(value);
        },
        [elements, onRemoveElement]
    );

    return (
        <div className="app-control">
            <form
                className="app-control-input"
                action="#"
                onSubmit={handleSubmit}
            >
                <input
                    value={newElement}
                    type="text"
                    onChange={handleInputChange}
                />
                <button type="submit">Add</button>
            </form>
            <ul className="app-control-elements">
                {elements.map((el, idx) => (
                    <li key={idx} className="app-control-elements-item">
                        <div data-role="value">{el}</div>
                        <button
                            data-role="remove"
                            data-index={idx}
                            title="Remove"
                            onClick={handleRemoveElement}
                        >
                            <i className="fas fa-trash"></i>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
