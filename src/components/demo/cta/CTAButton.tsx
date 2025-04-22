
import React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface CTAButtonProps extends ButtonProps {
  children: React.ReactNode;
  showArrow?: boolean;
  onClick?: () => void;
  className?: string;  // Add className prop to interface
}

export const CTAButton = ({ children, showArrow = true, onClick, className, ...props }: CTAButtonProps) => {
  return (
    <Button onClick={onClick} className={className} {...props}>
      {children}
      {showArrow && <ArrowRight className="ml-2 h-5 w-5" />}
    </Button>
  );
};
