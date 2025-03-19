
import { TallyFormEmbed } from "@/components/voice-chat/TallyFormEmbed";

interface ServiceBoxesProps {
  initialLoad: boolean;
  onTryNow?: () => void;
}

export const ServiceBoxes = ({ initialLoad, onTryNow }: ServiceBoxesProps) => {
  return (
    <div className={`w-full lg:w-1/2 transition-all duration-1000 delay-300 ease-out transform flex flex-col items-start justify-start
      ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
      <div className="grid grid-cols-1 gap-4 w-full">
        <TallyFormEmbed 
          formId="nW1VqP" 
          className="w-full" 
        />
      </div>
    </div>
  );
};
