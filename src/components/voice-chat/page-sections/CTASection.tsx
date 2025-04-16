
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PoweredByText } from "@/components/shared/PoweredByText";

interface CTASectionProps {
  handleContact?: () => void; // Make this prop optional
}

export const CTASection = ({ handleContact }: CTASectionProps) => {
  // This component is no longer used but we're fixing the typing
  return null;
};
