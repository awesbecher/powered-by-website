
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { isValidEmail } from "@/utils/emailValidation";
import { Send } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ContactForm2Props {
  initialLoad: boolean;
}

interface FormData {
  referralSource: string;
  email: string;
  phone: string;
}

export const ContactForm2 = ({ initialLoad }: ContactForm2Props) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    referralSource: "",
    email: "",
    phone: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.referralSource) {
      toast({
        title: "Please select how you heard about us",
        variant: "destructive"
      });
      return;
    }
    
    if (!formData.email) {
      toast({
        title: "Email is required",
        variant: "destructive"
      });
      return;
    }

    if (!isValidEmail(formData.email)) {
      toast({
        title: "Invalid email format",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Log the form data (you can implement actual submission logic later)
      console.log("Form submitted:", formData);
      
      // Show success toast with extended message
      toast({
        title: "Thank you for your interest in Powered_by!",
        description: "We're excited to meet and help you learn more about AI agents and Powered_by Agency potential. Our Solutions Design Experts team will get back to you in less than 24 hours. If your request is urgent, you can email us directly: team@poweredby.agency",
        duration: 8000, // Longer duration to allow user to read the message
      });
      
      // Reset form
      setFormData({
        referralSource: "",
        email: "",
        phone: ""
      });
      
      // Navigate to home page after a delay to allow the user to see the toast
      setTimeout(() => {
        navigate("/");
      }, 2000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error sending information",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-neutral-900/50 p-8 rounded-xl backdrop-blur mb-10">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="referralSource" className="block text-sm font-medium text-gray-300 mb-2">
            How did you hear about Powered_by?
          </label>
          <Select 
            value={formData.referralSource} 
            onValueChange={(value) => setFormData({...formData, referralSource: value})}
          >
            <SelectTrigger className="bg-neutral-800 border-neutral-700 text-white">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent className="bg-neutral-800 border-neutral-700 text-white">
              <SelectItem value="Google" className="focus:bg-purple-800 focus:text-white">Google</SelectItem>
              <SelectItem value="ChatGPT" className="focus:bg-purple-800 focus:text-white">ChatGPT</SelectItem>
              <SelectItem value="LinkedIn or X" className="focus:bg-purple-800 focus:text-white">LinkedIn or X</SelectItem>
              <SelectItem value="Referral" className="focus:bg-purple-800 focus:text-white">Referral</SelectItem>
              <SelectItem value="Other" className="focus:bg-purple-800 focus:text-white">Other</SelectItem>
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
            onChange={e => setFormData({...formData, email: e.target.value})} 
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
            onChange={e => setFormData({...formData, phone: e.target.value})} 
            className="bg-neutral-800 border-neutral-700 text-white" 
            placeholder="(123) 456-7890"
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-accent hover:bg-accent-dark text-white py-6"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : (
            <span className="flex items-center justify-center gap-2">
              Send Message <Send size={18} />
            </span>
          )}
        </Button>
      </form>
    </div>
  );
};
