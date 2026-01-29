"use client";

import * as THREE from "three";
import { useRef, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import { Avatar } from "./Avatar";


export function SceneController({
    phase,
}: {
    phase: "landing" | "skills";
}) {
    const root = useRef<THREE.Group>(null);
    const { viewport } = useThree();
    const isMobile = viewport.width < 5; // Adjust threshold based on FOV

    useEffect(() => {
        if (!root.current) return;

        const tl = gsap.timeline();

        // Responsive Targets
        const targets = {
            landing: {
                position: isMobile ? [0, 0.1, 0] : [-2, -1, 0], // Mobile: Center
                scale: isMobile ? 1.0 : 1.5,
            },
            skills: {
                position: isMobile ? [-1, 0, 0] : [-3, -1, 0], // Mobile: Keep centered
                scale: isMobile ? 0.9 : 1.3,
            }
        };

        if (phase === "landing") {
            tl.to(root.current.position, {
                x: targets.landing.position[0],
                y: targets.landing.position[1],
                z: targets.landing.position[2],
                duration: 1
            }, 0)
                .to(root.current.scale, {
                    x: targets.landing.scale,
                    y: targets.landing.scale,
                    z: targets.landing.scale,
                    duration: 1
                }, 0);
        }

        if (phase === "skills") {
            tl.to(root.current.position, {
                x: targets.skills.position[0],
                y: targets.skills.position[1],
                z: targets.skills.position[2],
                duration: 1
            }, 0)
                .to(root.current.scale, {
                    x: targets.skills.scale,
                    y: targets.skills.scale,
                    z: targets.skills.scale,
                    duration: 1.2
                }, 0);
        }


        return () => {
            tl.kill();
        };
    }, [phase]);

    return (
        <group ref={root} >
            <Avatar phase={phase} />
        </group>
    );
}
