import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { isValidEmail } from "@/utils/emailValidation";
import { supabase } from "@/integrations/supabase/client";

interface ProductInterest {
  name: string;
  selected: boolean;
}

export const VoiceAgentContactForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    jobTitle: "",
    companyName: "",
    message: ""
  });
  
  const [productInterests, setProductInterests] = useState<ProductInterest[]>([
    { name: "Speech-to-text", selected: false },
    { name: "Text-to-speech", selected: false },
    { name: "Voice Agent API", selected: false },
    { name: "Speech Analytics", selected: false },
    { name: "Other", selected: false }
  ]);

  const handleProductInterestToggle = (index: number) => {
    const updatedInterests = [...productInterests];
    updatedInterests[index].selected = !updatedInterests[index].selected;
    setProductInterests(updatedInterests);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.firstName || !formData.lastName || !formData.email || 
        !formData.phoneNumber || !formData.jobTitle || !formData.companyName) {
      toast({
        title: "Please fill in all required fields",
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
    
    // Check if at least one product interest is selected
    if (!productInterests.some(item => item.selected)) {
      toast({
        title: "Please select at least one product interest",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Prepare data for submission
      const submissionData = {
        ...formData,
        productInterests: productInterests.filter(p => p.selected).map(p => p.name)
      };
      
      console.log("Form submission data:", submissionData);
      
      // Send notification to team via Edge Function
      const { data, error } = await supabase.functions.invoke("send-team-notification", {
        body: submissionData
      });
      
      if (error) {
        console.error("Error sending notification:", error);
        throw new Error("Failed to send team notification");
      }
      
      // Show success message
      toast({
        title: "Thank you for your interest!",
        description: "Our team will contact you shortly to discuss how we can help your business.",
        duration: 5000,
      });
      
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        jobTitle: "",
        companyName: "",
        message: ""
      });
      
      setProductInterests(productInterests.map(p => ({ ...p, selected: false })));
      
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again later or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#121212]/90 p-6 rounded-lg backdrop-blur-sm border border-gray-800">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <Input
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="First Name*"
              className="bg-[#1a1a1a] border-gray-800 text-white h-12"
              required
            />
          </div>
          <div>
            <Input
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Last Name*"
              className="bg-[#1a1a1a] border-gray-800 text-white h-12"
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <Input
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Company Email*"
              type="email"
              className="bg-[#1a1a1a] border-gray-800 text-white h-12"
              required
            />
          </div>
          <div>
            <Input
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Phone Number*"
              className="bg-[#1a1a1a] border-gray-800 text-white h-12"
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <Input
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleInputChange}
              placeholder="Job Title*"
              className="bg-[#1a1a1a] border-gray-800 text-white h-12"
              required
            />
          </div>
          <div>
            <Input
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              placeholder="Company Name*"
              className="bg-[#1a1a1a] border-gray-800 text-white h-12"
              required
            />
          </div>
        </div>
        
        <div>
          <p className="text-gray-300 mb-3">Which Powered_by solution(s) are you interested in?*</p>
          <div className="flex flex-wrap gap-3">
            {productInterests.map((product, index) => (
              <button
                key={product.name}
                type="button"
                onClick={() => handleProductInterestToggle(index)}
                className={`px-4 py-2 rounded-full border transition-colors ${
                  product.selected 
                    ? "bg-purple-600 border-purple-500 text-white" 
                    : "bg-[#1a1a1a] border-gray-700 text-gray-300 hover:border-gray-500"
                }`}
              >
                {product.name}
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <Textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="How can we help?*"
            className="min-h-[120px] bg-[#1a1a1a] border-gray-800 text-white resize-none"
            required
          />
        </div>
        
        <div className="text-sm text-gray-400">
          By continuing, you agree to Deepgram's{" "}
          <a href="/privacy-statement" className="text-blue-400 hover:underline">
            Privacy Policy
          </a>{" "}
          and consent to receive communications from us.
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-white hover:bg-gray-100 text-black font-medium py-3 px-4 rounded transition-colors"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};
