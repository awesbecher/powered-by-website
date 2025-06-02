
import React from "react";
import { cn } from "@/lib/utils";

/**
 * Simple card for /index site, purely visual.
 */
interface HomeCardProps {
  children: React.ReactNode;
  className?: string;
}

export const HomeCard = ({ children, className }: HomeCardProps) => (
  <div
    className={cn(
      "rounded-2xl shadow-xl glass-card border border-[#442a68]/30 bg-gradient-to-br from-[#24123a]/90 via-[#26143b]/80 to-[#1a0b2e]/85 p-8 md:p-12 mb-8 transition-all duration-500",
      "hover:shadow-2xl hover:border-accent",
      className
    )}
  >
    {children}
  </div>
);

