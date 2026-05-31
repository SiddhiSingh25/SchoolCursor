"use client";

import * as React from "react";
import { motion, type MotionProps } from "framer-motion";

import { cn } from "@/lib/utils";

type RevealProps = MotionProps & {
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
  delay?: number;
};

export function Reveal({
  as: Comp = "div",
  className,
  children,
  delay = 0,
  ...props
}: RevealProps) {
  const MotionComp = motion.create(Comp);

  return (
    <MotionComp
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
      className={cn(className)}
      {...props}
    >
      {children}
    </MotionComp>
  );
}

