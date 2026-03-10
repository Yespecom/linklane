"use client";

import { useRef, useState, MouseEvent } from "react";

interface SpotlightCardProps {
    children: React.ReactNode;
    className?: string;
}

export default function SpotlightCard({ children, className = "" }: SpotlightCardProps) {
    const divRef = useRef<HTMLDivElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!divRef.current || isFocused) return;

        const div = divRef.current;
        const rect = div.getBoundingClientRect();

        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleMouseEnter = () => {
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`relative overflow-hidden ${className}`}
            style={{
                "--mouse-x": `${position.x}px`,
                "--mouse-y": `${position.y}px`,
            } as React.CSSProperties}
        >
            <div
                className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-500"
                style={{
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255, 255, 255, 0.06), transparent 40%)`,
                    opacity: opacity,
                }}
            />
            {children}
        </div>
    );
}
