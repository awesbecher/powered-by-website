
import { TallyFormEmbed } from "@/components/voice-chat/TallyFormEmbed";
import { Button } from "@/components/ui/button";

interface DemoFormProps {
  onFormSubmitted: () => void;
}

export const DemoForm = ({ onFormSubmitted }: DemoFormProps) => {
  // Manual form completion handler for testing
  const handleManualFormCompleted = () => {
    console.log("Manual form completion triggered from DemoForm component");
    onFormSubmitted();
  };

  return (
    <>
      <p className="mt-4 text-lg leading-relaxed text-gray-300 max-w-3xl mx-auto font-bold">
        Experience our AI agents right now by viewing our on-demand demos. See how our agent solutions apply to a series of industry-specific use cases. Please fill out the form below to access our demos:
      </p>
      
      <div className="mt-8 max-w-2xl mx-auto bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10">
        <TallyFormEmbed 
          formId="mVNb9y" 
          height={500}
          transparentBackground={true}
          alignLeft={true}
          onSubmit={onFormSubmitted}
        />
        
        <Button 
          onClick={handleManualFormCompleted}
          className="mt-4 px-4 py-2 bg-accent text-white rounded-md"
        >
          Manual Override (Testing)
        </Button>
      </div>
    </>
  );
};
