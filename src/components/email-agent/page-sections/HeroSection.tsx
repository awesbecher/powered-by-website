
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { HeroContent } from "./HeroContent";

interface HeroSectionProps {
  initialLoad: boolean;
  handleContact: () => void;
}

export const HeroSection = ({ initialLoad, handleContact }: HeroSectionProps) => {
  const { toast } = useToast();

  return (
    <section className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
      <div className="flex justify-center">
        <HeroContent initialLoad={initialLoad} handleContact={handleContact} />
      </div>
    </section>
  );
};
