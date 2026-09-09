"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useReducedMotion, Variants } from "framer-motion";
import { useMemo } from "react";

interface BlurFadeTextProps {
  text: string;
  className?: string;
  variant?: {
    hidden: { y: number };
    visible: { y: number };
  };
  duration?: number;
  characterDelay?: number;
  delay?: number;
  yOffset?: number;
  animateByCharacter?: boolean;
  /** Wrapper element for the outer container — use "h1"/"h2" where this text is the page's semantic heading. Defaults to "div". */
  as?: "div" | "h1" | "h2" | "h3" | "span" | "p";
}
const BlurFadeText = ({
  text,
  className,
  variant,
  characterDelay = 0.03,
  delay = 0,
  yOffset = 8,
  animateByCharacter = false,
  as: Wrapper = "div",
}: BlurFadeTextProps) => {
  const shouldReduceMotion = useReducedMotion();
  const defaultVariants: Variants = shouldReduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }
    : {
        hidden: { y: yOffset, opacity: 0, filter: "blur(8px)" },
        visible: { y: -yOffset, opacity: 1, filter: "blur(0px)" },
      };
  const combinedVariants = variant || defaultVariants;
  const characters = useMemo(() => Array.from(text), [text]);

  if (animateByCharacter) {
    return (
      <Wrapper className="flex">
        <AnimatePresence>
          {characters.map((char, i) => (
            <motion.span
              key={i}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={combinedVariants}
              transition={{
                yoyo: Infinity,
                delay: shouldReduceMotion ? 0 : delay + i * characterDelay,
                ease: "easeOut",
              }}
              className={cn("inline-block", className)}
              style={{ width: char.trim() === "" ? "0.2em" : "auto" }}
            >
              {char}
            </motion.span>
          ))}
        </AnimatePresence>
      </Wrapper>
    );
  }

  return (
    <Wrapper className="flex">
      <AnimatePresence>
        <motion.span
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={combinedVariants}
          transition={{
            yoyo: Infinity,
            delay: shouldReduceMotion ? 0 : delay,
            ease: "easeOut",
          }}
          className={cn("inline-block", className)}
        >
          {text}
        </motion.span>
      </AnimatePresence>
    </Wrapper>
  );
};

export default BlurFadeText;
