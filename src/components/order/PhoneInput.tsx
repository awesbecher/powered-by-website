
import { Input } from "@/components/ui/input";

interface PhoneInputProps {
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
  onSubmit: () => void;
}

export const PhoneInput = ({ phoneNumber, setPhoneNumber, onSubmit }: PhoneInputProps) => {
  return (
    <div className="flex flex-col space-y-4 pt-4">
      <Input
        type="tel"
        placeholder="Enter your phone number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        className="text-lg"
      />
      <button 
        onClick={onSubmit}
        className="w-full bg-accent text-accent-foreground hover:bg-accent/90 px-6 py-3 rounded-md"
      >
        Call Me
      </button>
    </div>
  );
};
