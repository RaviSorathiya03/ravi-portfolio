"use client";
import { createContext, useContext, useRef, useCallback, useState } from "react";

interface ModelPositionStore {
    subscribe: (callback: (pos: { x: number; y: number; z: number }) => void) => () => void;
    updatePosition: (x: number, y: number, z: number) => void;
    setIsMobile: (isMobile: boolean) => void;
    isMobile: boolean;
}

const ModelPositionContext = createContext<ModelPositionStore | null>(null);

export function ModelPositionProvider({ children }: { children: React.ReactNode }) {
    const subscribers = useRef(new Set<(pos: { x: number; y: number; z: number }) => void>());
    const position = useRef({ x: 0, y: 0, z: 0 });
    const [isMobile, setIsMobile] = useState(false);

    const updatePosition = useCallback((x: number, y: number, z: number) => {
        position.current = { x, y, z };
        subscribers.current.forEach((callback) => callback(position.current));
    }, []);

    const subscribe = useCallback((callback: (pos: { x: number; y: number; z: number }) => void) => {
        subscribers.current.add(callback);
        callback(position.current);
        return () => {
            subscribers.current.delete(callback);
        };
    }, []);

    return (
        <ModelPositionContext.Provider value={{
            subscribe,
            updatePosition,
            setIsMobile,
            isMobile
        }}>
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
