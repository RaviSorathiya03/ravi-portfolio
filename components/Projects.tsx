"use client";

import React, { useRef, useEffect } from "react";
import { projects } from "@/lib/data";
import { ProjectCard } from "@/components/Card";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ProjectsProps {
    onEnter: () => void;
}

export default function Projects({ onEnter }: ProjectsProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top center",
                end: "bottom center",
                onEnter: () => onEnter(),
                onEnterBack: () => onEnter(),
            });

            // Animate heading
            gsap.from(headingRef.current, {
                opacity: 0,
                y: 50,
                duration: 1,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                }
            });

            // Horizontal Scroll Animation (Marquee)
            if (scrollContainerRef.current) {

                // Duplicate content for seamless loop is handled in JSX by rendering twice
                // We just need to animate the translateX

                gsap.to(scrollContainerRef.current, {
                    x: "-50%", // Move half the width (since we doubled content)
                    ease: "none",
                    duration: 120, // Adjust speed (slower)
                    repeat: -1,
                    onHover: {
                        pause: true // Optional: Pause on hover if desired (requires Logic)
                    }
                });
            }

        }, containerRef);

        return () => ctx.revert();
    }, [onEnter]);

    return (
        <section ref={containerRef} className="min-h-screen py-24 relative z-10 overflow-hidden flex flex-col justify-end pb-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-12">
                <div className="text-center">
                    <h2
                        ref={headingRef}
                        className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-linear-to-b from-neutral-200 to-neutral-600 dark:from-neutral-100 dark:to-neutral-400 font-display"
                    >
                        Selected Works
                    </h2>
                    <p className="mt-4 text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto">
                        Explore my latest creations in a continuous stream.
                    </p>
                </div>
            </div>

            {/* Infinite Scroll Container */}
            <div className="relative w-full overflow-hidden">
                {/* Masking gradients */}
                <div className="absolute left-0 top-0 bottom-0 w-24 z-20 bg-linear-to-r from-gray-50 dark:from-black to-transparent pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-24 z-20 bg-linear-to-l from-gray-50 dark:from-black to-transparent pointer-events-none" />

                <div
                    ref={scrollContainerRef}
                    className="flex gap-8 w-max px-8"
                >
                    {/* First copy of projects */}
                    {projects.map((project) => (
                        <div key={`orig-${project.id}`} className="project-card shrink-0 w-[400px]">
                            <ProjectCard project={project} />
                        </div>
                    ))}
                    {/* Duplicate copy for seamless loop */}
                    {projects.map((project) => (
                        <div key={`dup-${project.id}`} className="project-card shrink-0 w-[400px]">
                            <ProjectCard project={project} />
                        </div>
                    ))}
                </div>
            </div>

        </section>
    );
}
