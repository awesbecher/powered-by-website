
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { isValidEmail } from "@/utils/emailValidation";
import { supabase } from "@/integrations/supabase/client";
import { ProductInterest } from "../components/ProductInterestsSection";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  jobTitle: string;
  companyName: string;
  message: string;
}

export const useContactForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    jobTitle: "",
    companyName: "",
    message: ""
  });
  
  const [productInterests, setProductInterests] = useState<ProductInterest[]>([
    { name: "AI Voicebot", selected: false },
    { name: "AI Voice Assistant", selected: false },
    { name: "Custom AI Agent", selected: false },
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
    
    if (!productInterests.some(item => item.selected)) {
      toast({
        title: "Please select at least one product interest",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const submissionData = {
        ...formData,
        productInterests: productInterests.filter(p => p.selected).map(p => p.name)
      };
      
      console.log("Form submission data:", submissionData);
      
      const { data, error } = await supabase.functions.invoke("send-team-notification", {
        body: submissionData
      });
      
      if (error) {
        console.error("Error sending notification:", error);
        throw new Error("Failed to send team notification");
      }
      
      toast({
        title: "Thank you for your interest!",
        description: "Our team will contact you shortly to discuss how we can help your business.",
        duration: 5000,
      });
      
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

  return {
    formData,
    productInterests,
    isSubmitting,
    handleInputChange,
    handleProductInterestToggle,
    handleSubmit
  };
};
