"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, AdaptiveDpr, Preload } from "@react-three/drei";
import { SceneController } from "./SceneController";
import { Suspense } from "react";

type ScenePhase = "landing" | "skills" | "projects" | "contact";

export function Experience({
    phase,
}: {
    phase: ScenePhase;
}) {
    return (
        <Canvas
            camera={{
                position: [0, 0, 6],
                fov: 42,
                near: 0.1,
                far: 100,
            }}
            shadows
            dpr={[1.5, 2]} // Force higher DPI for sharpness
            gl={{
                antialias: true,
                alpha: true,
                powerPreference: "high-performance",
                toneMapping: 0, // LinearToneMapping (No tone mapping) or ACESFilmic
                toneMappingExposure: 0
            }}
            style={{
                position: "fixed",
                inset: 0,
                zIndex: phase === "projects" ? 50 : -1,
                pointerEvents: "none", // Allow clicks to pass through to DOM
            }}
        >
            <Suspense fallback={null}>
                <Preload all />

                {/* === LIGHTING === */}
                <ambientLight intensity={1} />
                <directionalLight
                    position={[4, 5, 5]}
                    intensity={1.5}
                    castShadow
                    shadow-mapSize={[1024, 1024]}
                />
                <directionalLight
                    position={[-4, 3, 4]}
                    intensity={0.8}
                />

                {/* === ENVIRONMENT === */}
                <Environment preset="warehouse" />

                {/* === CHARACTER & SCENE LOGIC === */}
                <SceneController phase={phase} />

                {/* === CONTROLS (LOCKED) === */}
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    enableRotate={true}
                    minPolarAngle={Math.PI / 2.2}
                    maxPolarAngle={Math.PI / 1.8}
                />
            </Suspense>
        </Canvas>
    );
}
