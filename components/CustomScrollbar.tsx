"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export default function CustomScrollbar() {
    const { scrollYProgress } = useScroll();
    const [scrollHeight, setScrollHeight] = useState(0);
    const [viewportHeight, setViewportHeight] = useState(0);

    useEffect(() => {
        const updateDimensions = () => {
            setScrollHeight(document.documentElement.scrollHeight);
            setViewportHeight(window.innerHeight);
        };

        updateDimensions();
        window.addEventListener("resize", updateDimensions);
        // Also update on mutation potentially, but let's stick to resize for now + regular intervals?
        const interval = setInterval(updateDimensions, 1000); // Poll for dynamic content changes

        return () => {
            window.removeEventListener("resize", updateDimensions);
            clearInterval(interval);
        };
    }, []);

    // Calculate thumb height proportionally
    const thumbHeight = viewportHeight > 0 && scrollHeight > 0
        ? Math.max((viewportHeight / scrollHeight) * viewportHeight, 50)
        : 50;

    // Use a spring for smooth thumb movement
    const y = useSpring(useTransform(scrollYProgress, [0, 1], [0, viewportHeight - thumbHeight]), {
        stiffness: 200,
        damping: 30,
        restDelta: 0.001
    });

    // Hide if content fits screen
    if (scrollHeight <= viewportHeight) return null;

    return (
        <div className="fixed right-1 top-0 bottom-0 w-1.5 z-[9999] pointer-events-none mix-blend-difference">
            {/* Track */}
            <div className="absolute inset-0 bg-white/5 rounded-full opacity-0 hover:opacity-20 transition-opacity" />

            {/* Thumb */}
            <motion.div
                style={{ y, height: thumbHeight }}
                className="absolute top-0 w-full rounded-full bg-indigo-500 dark:bg-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.6)] backdrop-blur-md"
            />
        </div>
    );
}
