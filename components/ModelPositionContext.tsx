"use client";

import { createContext, useContext, useRef } from "react";

interface ModelPositionStore {
    position: { x: number; y: number; z: number };
    subscribe: (callback: (pos: { x: number; y: number; z: number }) => void) => () => void;
    updatePosition: (x: number, y: number, z: number) => void;
}

const ModelPositionContext = createContext<ModelPositionStore | null>(null);

export function ModelPositionProvider({ children }: { children: React.ReactNode }) {
    const subscribers = useRef(new Set<(pos: { x: number; y: number; z: number }) => void>());
    const position = useRef({ x: 0, y: 0, z: 0 });

    const updatePosition = (x: number, y: number, z: number) => {
        position.current = { x, y, z };
        subscribers.current.forEach((callback) => callback(position.current));
    };

    const subscribe = (callback: (pos: { x: number; y: number; z: number }) => void) => {
        subscribers.current.add(callback);
        return () => {
            subscribers.current.delete(callback);
        };
    };

    return (
        <ModelPositionContext.Provider value={{ position: position.current, subscribe, updatePosition }}>
            {children}
        </ModelPositionContext.Provider>
    );
}

export const useModelPosition = () => {
    const context = useContext(ModelPositionContext);
    if (!context) {
        throw new Error("useModelPosition must be used within a ModelPositionProvider");
    }
    return context;
};
