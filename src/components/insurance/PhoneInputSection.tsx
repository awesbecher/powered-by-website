
import { Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface PhoneInputSectionProps {
  phoneNumber: string;
  isCallInProgress: boolean;
  onPhoneNumberChange: (value: string) => void;
  onCall: () => void;
}

export const PhoneInputSection = ({
  phoneNumber,
  isCallInProgress,
  onPhoneNumberChange,
  onCall,
}: PhoneInputSectionProps) => {
  return (
    <div className="space-y-2">
      <p className="text-xl text-gray-300">
        Enter your phone to speak to an agent:
      </p>
      <div className="max-w-xs mx-auto space-y-1">
        <Input
          type="tel"
          placeholder="(555) 555-5555"
          value={phoneNumber}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, '').slice(0, 10);
            onPhoneNumberChange(value);
          }}
          className="text-lg text-center"
          maxLength={14}
        />
        <div className="space-y-1">
          <Button 
            onClick={onCall}
            disabled={phoneNumber.length !== 10 || isCallInProgress}
            className="w-full bg-accent hover:bg-accent/90 text-white"
            variant="outline"
          >
            <Phone className="mr-2" />
            Click here to talk to Insurance Agent
          </Button>
          <Button 
            onClick={onCall}
            disabled={phoneNumber.length !== 10 || isCallInProgress}
            className="w-full"
            variant="default"
          >
            {isCallInProgress ? 'Call in Progress...' : 'Get Quotes'}
          </Button>
        </div>
      </div>
    </div>
  );
};
