"use client";

import { useState, useRef } from "react";
import { Experience } from "@/components/Experience";
import Landing from "@/components/Landing";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import { ModelPositionProvider } from "@/components/ModelPositionContext";

export default function Page() {
  const [phase, setPhase] = useState<"landing" | "skills" | "projects" | "contact">("landing");

  return (
    <ModelPositionProvider>
      <Experience phase={phase} />
      <Landing onEnter={() => setPhase("landing")} />
      <Skills onEnter={() => setPhase("skills")} />
      <Projects onEnter={() => setPhase("projects")} />
      <Contact onEnter={() => setPhase("contact")} />
    </ModelPositionProvider>
  );
}
