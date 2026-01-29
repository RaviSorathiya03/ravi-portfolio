"use client";

import { useState } from "react";
import { Experience } from "@/components/Experience";
import Landing from "@/components/Landing";
import Skills from "@/components/Skills";


export default function Page() {
  const [phase, setPhase] = useState<"landing" | "skills">("landing");

  return (
    <>
      <Experience phase={phase} />
      <Landing onEnter={() => setPhase("landing")} />
      <Skills onEnter={() => setPhase("skills")} />
    </>
  );
}
