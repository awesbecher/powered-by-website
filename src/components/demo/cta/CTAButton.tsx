
import React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface CTAButtonProps extends ButtonProps {
  children: React.ReactNode;
  showArrow?: boolean;
  onClick?: () => void;  // Add onClick prop to interface
}

export const CTAButton = ({ children, showArrow = true, onClick, ...props }: CTAButtonProps) => {
  return (
    <Button onClick={onClick} {...props}>
      {children}
      {showArrow && <ArrowRight className="ml-2 h-5 w-5" />}
    </Button>
  );
};
