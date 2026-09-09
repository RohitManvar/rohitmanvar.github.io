"use client";

import { Badge } from "@/components/ui/badge";
import BlurFade from "@/components/magicui/blur-fade";
import { DATA } from "@/data/resume";

interface SkillsGroupedProps {
  delay?: number;
}

export function SkillsGrouped({ delay = 0 }: SkillsGroupedProps) {
  const groups = DATA.skillGroups as unknown as { category: string; skills: string[] }[];

  return (
    <div className="space-y-content-md">
      <BlurFade delay={delay}>
        <h2 className="text-xl font-bold">Skills</h2>
      </BlurFade>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {groups.map((group, id) => (
          <BlurFade key={group.category} delay={delay + 0.05 * (id + 1)}>
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-foreground">{group.category}</h3>
              <div className="flex flex-wrap gap-1.5">
                {group.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs font-normal">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </BlurFade>
        ))}
      </div>
    </div>
  );
}
