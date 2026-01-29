"use client";

import * as THREE from "three";
import React, { useMemo, useRef, useEffect, useState } from "react";
import { useGraph } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";


type GLTFResult = {
    nodes: {
        avaturn_body: THREE.SkinnedMesh;
        avaturn_hair_0: THREE.SkinnedMesh;
        avaturn_hair_1: THREE.SkinnedMesh;
        avaturn_shoes_0: THREE.SkinnedMesh;
        avaturn_look_0: THREE.SkinnedMesh;
        Hips: THREE.Bone;
    };
    materials: Record<string, THREE.MeshStandardMaterial>;
};

type AvatarPhase = "landing" | "skills" | "projects" | "contact";

export function Avatar({
    phase,
    ...props
}: {
    phase: AvatarPhase;
} & React.ComponentProps<"group">) {
    const group = useRef<THREE.Group>(null);
    const [rotate, setRoatate] = useState(Math.PI / 4)
    /* ================= BASE MODEL (SKELETON SOURCE) ================= */
    const base = useGLTF("/models/model-transformed.glb");

    /* ================= ANIMATION SOURCES ================= */
    const skillsGLTF = useGLTF("/models/model2-transformed.glb");
    const projectsGLTF = useGLTF("/models/model3-transformed.glb");
    const contactGLTF = useGLTF("/models/model4-transformed.glb");

    /* ================= CLONE BASE SCENE ================= */
    const scene = useMemo(() => SkeletonUtils.clone(base.scene), [base.scene]);
    const { nodes, materials } = useGraph(scene) as unknown as GLTFResult;

    /* ================= RETARGET ANIMATIONS ================= */
    const animations = useMemo(() => {
        const idle = base.animations[0].clone();
        idle.name = "Idle";

        const skills = skillsGLTF.animations[0].clone();
        skills.name = "Skills";

        const projects = projectsGLTF.animations[0].clone();
        projects.name = "Projects";

        const contact = contactGLTF.animations[0].clone();
        contact.name = "Contact";

        return [idle, skills, projects, contact];
    }, [base.animations, skillsGLTF.animations, projectsGLTF.animations, contactGLTF.animations]);

    /* ================= ANIMATION MIXER ================= */
    const { actions } = useAnimations(animations, group);

    /* ================= PHASE CONTROL ================= */
    useEffect(() => {
        if (!actions) return;

        const idle = actions.Idle;
        const skills = actions.Skills;
        const projects = actions.Projects;
        const contact = actions.Contact;

        idle?.setLoop(THREE.LoopRepeat, Infinity);
        skills?.setLoop(THREE.LoopOnce, 1);
        skills!.clampWhenFinished = true;
        projects?.setLoop(THREE.LoopRepeat, Infinity);
        contact?.setLoop(THREE.LoopRepeat, Infinity);

        if (phase === "landing") {
            skills?.fadeOut(0.3);
            projects?.fadeOut(0.3);
            contact?.fadeOut(0.3);
            idle?.reset().fadeIn(0.4).play();
        }

        if (phase === "skills") {
            idle?.fadeOut(0.3);
            projects?.fadeOut(0.3);
            contact?.fadeOut(0.3);
            skills?.reset().fadeIn(0.4).play();
        }

        if (phase === "projects") {
            idle?.fadeOut(0.3);
            skills?.fadeOut(0.3);
            contact?.fadeOut(0.3);
            projects?.reset().fadeIn(0.4).play();
        }

        if (phase === "contact") {
            idle?.fadeOut(0.3);
            skills?.fadeOut(0.3);
            projects?.fadeOut(0.3);
            contact?.reset().fadeIn(0.4).play();
            setRoatate(Math.PI / 2);
        }
    }, [phase, actions]);

    /* ================= RENDER ================= */
    return (
        <group ref={group} {...props} dispose={null}>
            <group rotation={[0, rotate, 0]}>
                <primitive object={nodes.Hips} />

                <skinnedMesh geometry={nodes.avaturn_body.geometry} material={materials.avaturn_body_material} skeleton={nodes.avaturn_body.skeleton} />
                <skinnedMesh geometry={nodes.avaturn_hair_0.geometry} material={materials.avaturn_hair_0_material} skeleton={nodes.avaturn_hair_0.skeleton} />
                <skinnedMesh geometry={nodes.avaturn_hair_1.geometry} material={materials.avaturn_hair_1_material} skeleton={nodes.avaturn_hair_1.skeleton} />
                <skinnedMesh geometry={nodes.avaturn_shoes_0.geometry} material={materials.avaturn_shoes_0_material} skeleton={nodes.avaturn_shoes_0.skeleton} />
                <skinnedMesh geometry={nodes.avaturn_look_0.geometry} material={materials.avaturn_look_0_material} skeleton={nodes.avaturn_look_0.skeleton} />
            </group>
        </group>
    );
}

/* ================= PRELOAD ================= */
useGLTF.preload("/models/model-transformed.glb");
useGLTF.preload("/models/model2-transformed.glb");
useGLTF.preload("/models/model3-transformed.glb");
useGLTF.preload("/models/model4-transformed.glb");
