"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Landing({ onEnter }: { onEnter: () => void }) {
    const container = useRef(null);
    const title = useRef(null);
    const subtitle = useRef(null);
    const desc = useRef(null);
    const btn = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            tl.from(subtitle.current, {
                y: 20,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
                delay: 0.2
            })
                .from(title.current, {
                    y: 30,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out"
                }, "-=0.6")
                .from(desc.current, {
                    y: 20,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out"
                }, "-=0.6")
                .from(btn.current, {
                    y: 20,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out"
                }, "-=0.6");

        }, container);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={container}
            className="min-h-screen flex items-center relative overflow-hidden"
            onMouseEnter={onEnter}
        >
            <div className="mx-auto max-w-7xl w-full px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">

                {/* LEFT: EMPTY SPACE FOR MODEL */}
                <div className="relative w-full h-[50vh] md:h-[85vh]" />

                {/* RIGHT: CONTENT */}
                <div className="space-y-8">
                    <p ref={subtitle} className="text-sm uppercase tracking-[0.25em] text-indigo-600 font-bold">
                        About Me
                    </p>

                    <h1 ref={title} className="text-5xl md:text-7xl font-bold">
                        Ravi Sorathiya <br />
                        <span className="text-indigo-500">
                            Full-Stack Engineer
                        </span>
                    </h1>

                    <p ref={desc} className="text-lg text-gray-600 max-w-lg">
                        I build scalable, high-performance web applications with a strong
                        focus on system design and modern user experiences.
                    </p>

                    {/* CTA */}
                    <div ref={btn} className="flex gap-4 pt-4">
                        <a
                            href="https://github.com/RaviSorathiya03"
                            target="_blank"
                            className="px-8 py-4 rounded-xl bg-black text-white font-semibold hover:scale-105 transition-transform"
                        >
                            View GitHub
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
