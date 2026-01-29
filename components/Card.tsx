"use client";

import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Link from "next/link";
import { Github, ExternalLink, Activity } from "lucide-react";

interface ProjectProps {
    id: string;
    title: string;
    description: string;
    techStack: string[];
    liveUrl: string | null;
    githubUrl: string;
    category: string;
    color?: string; // Optional for safety, though added to all
}

export function ProjectCard({ project }: { project: ProjectProps }) {
    return (
        <CardContainer className="inter-var w-full h-full">
            <CardBody
                className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-[550px] rounded-xl p-6 border flex flex-col justify-between"
                style={{ "--project-color": project.color || "#10b981" } as React.CSSProperties}
            >

                {/* Header Section */}
                <div>
                    <div className="flex justify-between items-start mb-4">
                        <CardItem
                            translateZ="50"
                            className="text-xl font-bold text-neutral-600 dark:text-white"
                        >
                            {project.title}
                        </CardItem>
                        <CardItem
                            translateZ="40"
                            className="px-2 py-1 rounded-full text-[10px] font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-300"
                        >
                            {project.category}
                        </CardItem>
                    </div>

                    <CardItem
                        as="p"
                        translateZ="60"
                        className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300 line-clamp-3"
                    >
                        {project.description}
                    </CardItem>

                    {/* Tech Stack Badges */}
                    <CardItem translateZ="80" className="flex flex-wrap gap-2 mt-4">
                        {project.techStack.map((tech, idx) => (
                            <span
                                key={idx}
                                className="px-2 py-1 text-xs rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700"
                            >
                                {tech}
                            </span>
                        ))}
                    </CardItem>
                </div>

                {/* Decorative / "Image" Placeholder Area 
                    Since we don't have images in data.ts, we'll make a cool abstract visualization or code snippet visual
                */}
                <CardItem
                    translateZ="100"
                    className="w-full mt-4 grow flex items-center justify-center rounded-xl border border-dashed border-neutral-200 dark:border-neutral-700 relative overflow-hidden group"
                    style={{
                        background: `linear-gradient(to bottom right, ${project.color || "#8b5cf6"}20, ${project.color || "#d946ef"}05)`
                    }}
                >
                    <div className="absolute inset-0 bg-white/5 bg-size-[20px_20px]" />
                    <Activity className="w-16 h-16 text-neutral-300 dark:text-neutral-700 group-hover:text-[var(--project-color)] transition-colors duration-500" />
                </CardItem>

                {/* Footer / Actions */}
                <div className="flex justify-between items-center mt-8">
                    {project.liveUrl ? (
                        <CardItem
                            translateZ={20}
                            as={Link}
                            href={project.liveUrl}
                            target="__blank"
                            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-normal dark:text-white hover:text-[var(--project-color)] transition-colors"
                        >
                            <ExternalLink className="w-4 h-4" />
                            Live Demo
                        </CardItem>
                    ) : (
                        <CardItem
                            translateZ={20}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-normal text-neutral-400 cursor-not-allowed"
                        >
                            <ExternalLink className="w-4 h-4" />
                            In Development
                        </CardItem>
                    )}

                    <CardItem
                        translateZ={20}
                        as={Link}
                        href={project.githubUrl}
                        target="__blank"
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
                    >
                        <Github className="w-4 h-4" />
                        GitHub
                    </CardItem>
                </div>
            </CardBody>
        </CardContainer>
    );
}
