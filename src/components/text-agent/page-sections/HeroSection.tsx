
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { HeroContent } from "./HeroContent";
import { ServiceBoxes } from "./ServiceBoxes";

interface HeroSectionProps {
  initialLoad: boolean;
  handleContact: () => void;
}

export const HeroSection = ({ initialLoad, handleContact }: HeroSectionProps) => {
  const { toast } = useToast();

  return (
    <section className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
      <div className="flex flex-col-reverse lg:flex-row items-center lg:items-start gap-8">
        <HeroContent initialLoad={initialLoad} handleContact={handleContact} />
        <ServiceBoxes initialLoad={initialLoad} />
      </div>
    </section>
  );
};
