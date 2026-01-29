"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FRONTEND = ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux"];
const BACKEND = ["Node.js", "Express", "NestJS", "PostgreSQL", "MongoDB", "Redis"];
const WEB3 = ["Solidity", "Ethereum", "Solana", "Rust"];
const DEVOPS = ["Docker", "AWS", "Kubernetes", "GitHub Actions"];

function SkillPill({ label }: { label: string }) {
    return (
        <span
            className="
        group relative
        px-5 py-2 rounded-full
        text-sm font-medium
        text-gray-900 dark:text-gray-100
        bg-white/70 dark:bg-white/5
        backdrop-blur-xl
        border border-gray-200/60 dark:border-white/10
        shadow-sm
        hover:shadow-lg
        hover:-translate-y-0.5
        transition-all duration-300
        cursor-default
      "
        >
            {/* glow */}
            <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition bg-linear-to-r from-indigo-500/20 to-pink-500/20 blur-md" />
            <span className="relative z-10">{label}</span>
        </span>
    );
}

function SkillBlock({
    title,
    skills,
}: {
    title: string;
    skills: string[];
}) {
    return (
        <div className="skill-block p-6 rounded-3xl bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-gray-200/60 dark:border-white/10 shadow-md hover:shadow-xl transition-all opacity-0 translate-y-8">
            <h3 className="text-xl font-semibold mb-5 text-gray-900 dark:text-white tracking-tight">
                {title}
            </h3>
            <div className="flex flex-wrap gap-3">
                {skills.map((skill) => (
                    <SkillPill key={skill} label={skill} />
                ))}
            </div>
        </div>
    );
}

export default function Skills({ onEnter }: { onEnter: () => void }) {
    const container = useRef(null);
    const headerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate Header
            gsap.from(headerRef.current, {
                scrollTrigger: {
                    trigger: headerRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                },
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });

            // Animate Skill Blocks Stagger
            gsap.to(".skill-block", {
                scrollTrigger: {
                    trigger: ".space-y-10", // Target the container of blocks
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: "back.out(1.7)"
            });

        }, container);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="skills"
            ref={container}
            onMouseEnter={onEnter}
            className="relative min-h-screen flex items-center overflow-hidden"
        >
            <div className="relative z-10 mx-auto max-w-7xl w-full px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

                {/* LEFT — SPACE FOR 3D */}
                <div className="hidden md:block h-[70vh]" />

                {/* RIGHT — CONTENT */}
                <div>

                    {/* Header */}
                    <div ref={headerRef} className="mb-16 max-w-xl">
                        <p className="text-sm uppercase tracking-[0.35em] text-indigo-600 dark:text-indigo-400 font-semibold">
                            Skills
                        </p>

                        <h2 className="mt-4 text-4xl md:text-6xl font-display font-bold leading-tight text-gray-900 dark:text-white">
                            Tech I Use to <br />
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-pink-600 dark:from-indigo-400 dark:to-pink-400">
                                Build & Scale
                            </span>
                        </h2>

                        <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                            A modern, production-focused stack crafted for performance,
                            scalability, and developer happiness — spanning full-stack,
                            Web3, and DevOps.
                        </p>
                    </div>

                    {/* Skill Blocks */}
                    <div className="space-y-10">
                        <SkillBlock title="Frontend" skills={FRONTEND} />
                        <SkillBlock title="Backend" skills={BACKEND} />
                        <SkillBlock title="Web3 & Blockchain" skills={WEB3} />
                        <SkillBlock title="DevOps & Tooling" skills={DEVOPS} />
                    </div>

                    {/* Footer Note */}
                    <div className="mt-16 text-sm text-gray-600 dark:text-gray-400 max-w-md">
                        <p>
                            Currently leveling up in
                            <span className="mx-1 font-medium text-indigo-600 dark:text-indigo-400">
                                Rust
                            </span>
                            and
                            <span className="mx-1 font-medium text-pink-600 dark:text-pink-400">
                                Solana
                            </span>
                            — while exploring large-scale system design.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}
