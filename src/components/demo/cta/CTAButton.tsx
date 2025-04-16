
import React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface CTAButtonProps extends ButtonProps {
  children: React.ReactNode;
  showArrow?: boolean;
}

export const CTAButton = ({ children, showArrow = true, ...props }: CTAButtonProps) => {
  return (
    <Button {...props}>
      {children}
      {showArrow && <ArrowRight className="ml-2 h-5 w-5" />}
    </Button>
  );
};
