"use client"

import { motion } from "framer-motion"
import { ClientAnimationProps } from "@/lib/types"

export function ClientAnimation({ children, index = 0, animation = "fade", className = "" }: ClientAnimationProps) {
  // Animation variants based on the type
  const getAnimationProps = () => {
    switch (animation) {
      case "scale":
        return {
          initial: { opacity: 0, scale: 0.9 },
          whileInView: { opacity: 1, scale: 1 },
          transition: { duration: 0.5, delay: index * 0.1 },
        };
      case "slide":
        return {
          initial: { opacity: 0, x: 20 },
          whileInView: { opacity: 1, x: 0 },
          transition: { duration: 0.5, delay: index * 0.1 },
        };
      case "fade":
      default:
        return {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay: index * 0.1 },
        };
    }
  };

  return (
    <motion.div
      className={className}
      viewport={{ once: true }}
      {...getAnimationProps()}
    >
      {children}
    </motion.div>
  );
}