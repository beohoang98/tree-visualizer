import React, { FC, useCallback, useEffect, useRef, useState } from "react";

export interface ZoomWrapperProps {
    width: number;
    height: number;
}

export const ZoomWrapper: FC<ZoomWrapperProps> = ({
    children,
    width,
    height,
}) => {
    const [scale, setScale] = useState(1);
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [mPos, setMPos] = useState({ x: 0, y: 0 });
    const [size, setSize] = useState({ w: width, h: height });
    const wrapperRef = useRef<SVGSVGElement>(null);

    const onScroll = useCallback(
        (ev: React.WheelEvent) => {
            // console.debug(`[Scroll] ${ev.deltaY}`);
            const newScaleFactor = Math.pow(1.001, -ev.deltaY);
            const dx = (mPos.x - pos.x) * (1 - newScaleFactor);
            const dy = (mPos.y - pos.y) * (1 - newScaleFactor);
            setScale(scale * newScaleFactor);
            setPos({ x: pos.x - dx, y: pos.y - dy });
        },
        [scale, mPos.x, mPos.y, pos.x, pos.y]
    );
    const onMouseMove = useCallback(
        (ev: React.MouseEvent) => {
            // console.debug(`[Mouse] ${ev.clientX} ${ev.clientY}`);
            const realX = ev.clientX / scale + pos.x;
            const realY = ev.clientY / scale + pos.y;
            setMPos({ x: realX, y: realY });
        },
        [pos.x, pos.y, scale]
    );

    const onResize = useCallback(() => {
        if (wrapperRef.current) {
            const { width = 0, height = 0 } =
                wrapperRef.current?.getBoundingClientRect() || {};
            setSize({ w: width, h: height });
        }
    }, []);

    useEffect(() => {
        onResize();
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, [onResize]);

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            ref={wrapperRef}
            preserveAspectRatio="true"
            onWheel={onScroll}
            onMouseMove={onMouseMove}
            onMouseOver={onMouseMove}
            style={{ width: "100%", height: "100%" }}
            viewBox={`${pos.x} ${pos.y} ${size.w / scale} ${size.h / scale}`}
        >
            <circle className="pointer" cx={mPos.x} cy={mPos.y} r="10" />
            {children}
        </svg>
    );
};
