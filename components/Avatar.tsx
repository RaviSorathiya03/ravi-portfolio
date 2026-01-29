"use client";

import * as THREE from "three";
import React, { useMemo, useRef, useEffect } from "react";
import { useGraph } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { SkeletonUtils } from "three-stdlib";

type GLTFResult = GLTF & {
    nodes: {
        avaturn_body: THREE.SkinnedMesh;
        avaturn_hair_0: THREE.SkinnedMesh;
        avaturn_hair_1: THREE.SkinnedMesh;
        avaturn_shoes_0: THREE.SkinnedMesh;
        avaturn_look_0: THREE.SkinnedMesh;
        Hips: THREE.Bone;
    };
    materials: {
        avaturn_body_material: THREE.MeshStandardMaterial;
        avaturn_hair_0_material: THREE.MeshStandardMaterial;
        avaturn_hair_1_material: THREE.MeshStandardMaterial;
        avaturn_shoes_0_material: THREE.MeshStandardMaterial;
        avaturn_look_0_material: THREE.MeshStandardMaterial;
    };
};

type GroupProps = React.ComponentProps<"group">;

interface AvatarProps extends GroupProps {
    phase: "landing" | "skills";
}

export function Avatar({ phase, ...props }: AvatarProps) {
    const group = useRef<THREE.Group>(null);

    // Load Base Model (Idle)
    const { scene: scene1, animations: anim1 } = useGLTF("/models/model-transformed.glb");

    // Load Second Model (Skill Animation)
    // We only need the animations from this one
    const { animations: anim2 } = useGLTF("/models/model2-transformed.glb");

    // Merge animations
    const animations = useMemo(() => {
        const idleAnim = anim1[0].clone();
        idleAnim.name = "Idle";

        const skillAnim = anim2[0].clone();
        skillAnim.name = "Skill";

        return [idleAnim, skillAnim];
    }, [anim1, anim2]);

    const clone = useMemo(() => SkeletonUtils.clone(scene1), [scene1]);
    const { nodes, materials } = useGraph(clone) as unknown as GLTFResult;

    const { actions, mixer } = useAnimations(animations, group);

    useEffect(() => {
        if (!actions) return;

        const idle = actions["Idle"];
        const skill = actions["Skill"];

        if (!idle || !skill) return;

        // Reset behaviors defaults
        idle.setLoop(THREE.LoopRepeat, Infinity);
        idle.clampWhenFinished = false;

        skill.setLoop(THREE.LoopOnce, 1);
        skill.clampWhenFinished = true;

        if (phase === "landing") {
            // TRANSITION TO IDLE
            // Use explicit fade out/in to avoid stuck states
            skill.fadeOut(0.5);
            idle.reset().fadeIn(0.5).play();

        } else if (phase === "skills") {
            // TRANSITION TO SKILL
            idle.fadeOut(0.5);
            skill.reset().fadeIn(0.5).play();
        }

        return () => {
            // Optional cleanup
        };
    }, [phase, actions]);


    return (
        <group ref={group} {...props} dispose={null}>
            {/* Rotation to face forward */}
            <group name="Scene" rotation={[0, Math.PI / 4, 0]}>
                <group name="Armature">
                    <primitive object={nodes.Hips} />
                </group>

                <skinnedMesh geometry={nodes.avaturn_body.geometry} material={materials.avaturn_body_material} skeleton={nodes.avaturn_body.skeleton} />
                <skinnedMesh geometry={nodes.avaturn_hair_0.geometry} material={materials.avaturn_hair_0_material} skeleton={nodes.avaturn_hair_0.skeleton} />
                <skinnedMesh geometry={nodes.avaturn_hair_1.geometry} material={materials.avaturn_hair_1_material} skeleton={nodes.avaturn_hair_1.skeleton} />
                <skinnedMesh geometry={nodes.avaturn_shoes_0.geometry} material={materials.avaturn_shoes_0_material} skeleton={nodes.avaturn_shoes_0.skeleton} />
                <skinnedMesh geometry={nodes.avaturn_look_0.geometry} material={materials.avaturn_look_0_material} skeleton={nodes.avaturn_look_0.skeleton} />
            </group>
        </group>
    );
}

useGLTF.preload("/models/model-transformed.glb");
useGLTF.preload("/models/model2-transformed.glb");
