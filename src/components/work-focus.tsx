"use client";

import { CheckCircle2Icon } from "lucide-react";
import BlurFade from "@/components/magicui/blur-fade";
import { DATA } from "@/data/resume";

interface WorkFocusProps {
  delay?: number;
}

export function WhatIWorkOn({ delay = 0 }: WorkFocusProps) {
  return (
    <BlurFade delay={delay}>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {DATA.whatIWorkOn.map((item) => (
          <span
            key={item}
            className="px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-muted text-foreground"
          >
            {item}
          </span>
        ))}
      </div>
    </BlurFade>
  );
}

export function WhyHireMe({ delay = 0 }: WorkFocusProps) {
  return (
    <div className="space-y-content-md">
      <BlurFade delay={delay}>
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Why work with me.
            </h2>
          </div>
        </div>
      </BlurFade>
      <div className="max-w-[600px] mx-auto space-y-3">
        {DATA.whyHireMe.map((reason, id) => (
          <BlurFade key={reason} delay={delay + 0.05 * (id + 1)}>
            <div className="flex items-start gap-3">
              <CheckCircle2Icon className="size-4 text-foreground/70 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-muted-foreground leading-relaxed">{reason}</p>
            </div>
          </BlurFade>
        ))}
      </div>
    </div>
  );
}
