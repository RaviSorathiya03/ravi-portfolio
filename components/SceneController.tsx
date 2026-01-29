import * as THREE from "three";
import { useRef, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import { Avatar } from "./Avatar";
import { useModelPosition } from "./ModelPositionContext";

export function SceneController({
    phase,
}: {
    phase: "landing" | "skills" | "projects" | "contact";
}) {
    const root = useRef<THREE.Group>(null);
    const { viewport } = useThree();
    const isMobile = viewport.width < 5;
    const { updatePosition, setIsMobile } = useModelPosition();

    // Notify context of isMobile status
    useEffect(() => {
        setIsMobile(isMobile);
    }, [isMobile, setIsMobile]);

    useEffect(() => {
        if (!root.current) return;

        // Kill previous animations to prevent conflicts
        gsap.killTweensOf(root.current.position);
        gsap.killTweensOf(root.current.scale);

        const tl = gsap.timeline({
            onUpdate: () => {
                if (root.current) {
                    updatePosition(
                        root.current.position.x,
                        root.current.position.y,
                        root.current.position.z
                    );
                }
            }
        });

        // Responsive Targets
        const targets = {
            landing: {
                position: isMobile ? [0, 0.1, 0] : [-2, -1, 0],
                scale: isMobile ? 1.0 : 1.5,
            },
            skills: {
                position: isMobile ? [-1, 0, 0] : [-3, -1, 0],
                scale: isMobile ? 0.9 : 1.3,
            },
            projects: {
                position: isMobile ? [0, 0.5, 0] : [0, -2, 1],
                scale: isMobile ? 1.0 : 1.7,
            },
            contact: {
                position: isMobile ? [0, 0.1, 0] : [-6, -2, 0],
                scale: isMobile ? 1.0 : 1.7,
            }
        };

        const target = targets[phase];

        // --- ANIMATION LOGIC ---
        const startPos = phase === "contact"
            ? { x: -15, y: target.position[1], z: target.position[2] }
            : { x: root.current.position.x, y: root.current.position.y, z: root.current.position.z };

        // Explicitly set initial position and notify subscribers immediately
        if (phase === "contact") {
            root.current.position.set(startPos.x, startPos.y, startPos.z);
            updatePosition(startPos.x, startPos.y, startPos.z);
        }

        if (phase === "contact") {
            // == CONTACT PHASE (PUSH EFFECT) ==
            tl.to(root.current.position, {
                x: target.position[0],
                y: target.position[1],
                z: target.position[2],
                duration: 1.5,
                ease: "power3.inOut"
            }, 0);

            tl.to(root.current.scale, {
                x: target.scale,
                y: target.scale,
                z: target.scale,
                duration: 1.5,
                ease: "power3.inOut"
            }, 0);

        } else {
            // == OTHER PHASES (STANDARD TRANSITION) ==
            tl.to(root.current.position, {
                x: target.position[0],
                y: target.position[1],
                z: target.position[2],
                duration: 0.8, // Snappier
                ease: "power2.inOut"
            }, 0);

            tl.to(root.current.scale, {
                x: target.scale,
                y: target.scale,
                z: target.scale,
                duration: 0.8, // Snappier
                ease: "power2.inOut"
            }, 0);
        }

        return () => {
            tl.kill();
        };
    }, [phase, viewport.width, updatePosition, isMobile]);

    return (
        <group ref={root} >
            <Avatar phase={phase} />
        </group>
    );
}

