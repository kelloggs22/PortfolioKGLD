"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { cn } from "@/utils/cn";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const direction = current - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        setVisible(false);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 1, y: -100 }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
        // Removi as bordas e sombras do pai para não "duplicar" o container
        className={cn(
          "flex fixed z-[5000] top-10 inset-x-0 mx-auto px-4 items-center justify-center pointer-events-none",
          className
        )}
      >
        {/* Este é o ÚNICO container visível agora */}
        <div className="flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/80 px-4 py-2 shadow-xl backdrop-blur-md dark:bg-black/80 pointer-events-auto">
          <div className="flex items-center gap-1">
            {navItems.map((navItem, idx: number) => (
              <a
                key={`link-${idx}`}
                href={navItem.link}
                className={cn(
                  "relative flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-neutral-600 transition-all hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-white/10 dark:hover:text-white"
                )}
              >
                <span className="block sm:hidden">{navItem.icon}</span>
                <span className="text-sm cursor-pointer">{navItem.name}</span>
              </a>
            ))}
          </div>

          {/* Opcional: Se quiser um botão de ação extra após o divisor, pode colocar aqui */}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};