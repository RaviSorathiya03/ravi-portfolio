import { useRef, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useModelPosition } from "./ModelPositionContext";

gsap.registerPlugin(ScrollTrigger);

const Contact = ({ onEnter }: { onEnter: () => void }) => {
    const container = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLDivElement>(null);
    const { subscribe, isMobile } = useModelPosition();

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (container.current) {
                ScrollTrigger.create({
                    trigger: container.current,
                    start: "top center",
                    end: "bottom center",
                    onEnter: () => onEnter(),
                    onEnterBack: () => onEnter(),
                });
            }
        }, container);

        // Subscription for value-based animation
        const unsubscribe = subscribe((pos) => {
            if (formRef.current) {
                // Tracking range: Model X -15 -> Target
                // Target is -6 on desktop, 0 on mobile (matching SceneController)
                const startX = -15;
                const endX = isMobile ? 0 : -6;

                // Calculate progress based on model position
                let progress = (pos.x - startX) / (endX - startX);

                // Clamp progress to [0, 1]
                progress = Math.max(0, Math.min(1, progress));

                // Apply styles directly to the DOM for performance
                // Translate: -150vw (hidden far left) to 0 (visible)
                const translateX = -150 + (progress * 150);
                const opacity = progress;
                const scale = 0.8 + (progress * 0.2); // 0.8 -> 1.0

                formRef.current.style.transform = `translateX(${translateX}vw) scale(${scale})`;
                formRef.current.style.opacity = `${opacity}`;
            }
        });

        return () => {
            ctx.revert();
            unsubscribe();
        };
    }, [onEnter, subscribe, isMobile]);

    return (
        <section
            ref={container}
            className="min-h-screen relative overflow-hidden py-24 flex flex-col justify-center"
        >
            {/* Background Gradients */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[20%] right-[10%] w-120 h-120 bg-indigo-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-[20%] left-[10%] w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl" />
            </div>

            <div className="mx-auto max-w-7xl w-full px-6 relative z-10">
                {/* Header */}
                <div className="mb-12 md:mb-20">
                    <h2
                        className="text-4xl md:text-6xl font-bold text-center bg-clip-text text-transparent bg-linear-to-b from-neutral-200 to-neutral-600 dark:from-neutral-100 dark:to-neutral-500"
                    >
                        Contact Us
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                    {/* LEFT: EMPTY SPACE FOR MODEL */}
                    <div className="relative w-full h-[400px] md:h-[600px]" />

                    {/* RIGHT: CONTACT FORM */}
                    <div className="w-full max-w-md mx-auto">
                        <div
                            ref={formRef}
                            className="rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 relative group overflow-hidden"
                            style={{ transform: "translateX(-100vw)", opacity: 0 }}
                        >
                            {/* Hover Gradient Effect */}
                            <div className="absolute inset-0 bg-linear-to-r from-transparent via-neutral-100/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />

                            <h3 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                                Get in Touch
                            </h3>
                            <p className="text-neutral-600 text-sm mt-2 dark:text-neutral-300">
                                I&apos;m currently available for freelance work and open to new opportunities.
                            </p>

                            <form className="my-8" onSubmit={(e) => e.preventDefault()}>
                                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                                    <LabelInputContainer>
                                        <Label htmlFor="firstname">First name</Label>
                                        <Input id="firstname" placeholder="Ravi" type="text" />
                                    </LabelInputContainer>
                                    <LabelInputContainer>
                                        <Label htmlFor="lastname">Last name</Label>
                                        <Input id="lastname" placeholder="Sorathiya" type="text" />
                                    </LabelInputContainer>
                                </div>
                                <LabelInputContainer className="mb-4">
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input id="email" placeholder="project@ravi.com" type="email" />
                                </LabelInputContainer>
                                <LabelInputContainer className="mb-4">
                                    <Label htmlFor="subject">Subject</Label>
                                    <Input id="subject" placeholder="Project Inquiry" type="text" />
                                </LabelInputContainer>

                                <LabelInputContainer className="mb-8">
                                    <Label htmlFor="message">Message</Label>
                                    <textarea
                                        id="message"
                                        placeholder="Tell me about your project..."
                                        className="flex min-h-[120px] w-full border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm  placeholder:text-neutral-400 dark:placeholder-text-neutral-600 focus-visible:outline-none focus-visible:ring-2  focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600 disabled:cursor-not-allowed disabled:opacity-50 dark:shadow-[0px_0px_1px_1px_var(--neutral-700)] group-hover/input:shadow-none transition duration-400 resize-none"
                                    />
                                </LabelInputContainer>

                                <button
                                    className="bg-linear-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                                    type="submit"
                                >
                                    Send Message &rarr;
                                    <BottomGradient />
                                </button>

                                <div className="bg-linear-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-px w-full" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-linear-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-linear-to-r from-transparent via-indigo-500 to-transparent" />
        </>
    );
};

const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};

export default Contact;
