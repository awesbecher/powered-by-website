
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { formatPhoneNumber } from "@/utils/phoneUtils";
import { Send } from "lucide-react";

interface ContactInfoFormProps {
  initialLoad: boolean;
}

interface InfoFormData {
  referralSource: string;
  email: string;
  phone?: string;
}

export const ContactInfoForm = ({ initialLoad }: ContactInfoFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<InfoFormData>({
    referralSource: "",
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Basic validation
      if (!formData.referralSource) {
        throw new Error("Please select how you heard about us");
      }
      
      if (!formData.email) {
        throw new Error("Please enter your email address");
      }
      
      // Format phone if provided
      let formattedPhone = "";
      if (formData.phone) {
        try {
          formattedPhone = formatPhoneNumber(formData.phone);
        } catch (error) {
          throw new Error("Please enter a valid 10-digit phone number");
        }
      }
      
      // Log the form submission (this would typically be sent to a backend)
      console.log("Submitting contact info:", {
        ...formData,
        phone: formattedPhone || formData.phone
      });

      // Show success toast
      toast({
        title: "Information received!",
        description: "Thank you for providing your contact information.",
      });

      // Reset form data
      setFormData({
        referralSource: "",
        email: "",
        phone: "",
      });
      
    } catch (error: any) {
      console.error("Form submission error:", error);
      toast({
        title: "Error",
        description: error.message || "There was an error submitting your information",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className={`bg-neutral-900/50 p-8 rounded-xl backdrop-blur transition-all duration-1000 ease-out
        ${initialLoad ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
    >
      <h2 className="text-xl text-white font-semibold mb-6">
        Thanks for your interest! Please provide a bit more information to schedule your Free Consultation.
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="referralSource" className="block text-sm font-medium text-gray-300 mb-2">
            How did you hear about Powered_by?
          </label>
          <Select 
            value={formData.referralSource} 
            onValueChange={(value) => setFormData({...formData, referralSource: value})}
          >
            <SelectTrigger className="w-full bg-neutral-800 border-neutral-700 text-white">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent className="bg-neutral-800 border-neutral-700 text-white">
              <SelectItem value="google">Google</SelectItem>
              <SelectItem value="chatgpt">ChatGPT</SelectItem>
              <SelectItem value="social">LinkedIn or X</SelectItem>
              <SelectItem value="referral">Referral</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
            Reconfirm your email address for the Meeting Invite
          </label>
          <Input 
            id="email" 
            type="email" 
            value={formData.email} 
            onChange={(e) => setFormData({...formData, email: e.target.value})} 
            className="bg-neutral-800 border-neutral-700 text-white" 
            required
          />
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
            Please enter your phone # (optional)
          </label>
          <Input 
            id="phone" 
            type="tel" 
            value={formData.phone} 
            onChange={(e) => setFormData({...formData, phone: e.target.value})} 
            className="bg-neutral-800 border-neutral-700 text-white" 
            placeholder="(123) 456-7890"
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-accent hover:bg-accent-dark text-white py-6"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            "Sending..."
          ) : (
            <>
              Send Message
              <Send className="ml-2 h-5 w-5" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
};
