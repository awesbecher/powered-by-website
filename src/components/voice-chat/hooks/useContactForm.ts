
import { useState, useEffect } from "react";
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

interface PersonalInfoErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  jobTitle?: string;
  companyName?: string;
}

interface FormErrors {
  personalInfo: PersonalInfoErrors;
  productInterests?: string;
  message?: string;
}

interface FieldTouched {
  personalInfo: boolean;
  productInterests: boolean;
  message: boolean;
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
    { name: "OutboundAI", selected: false },
    { name: "Other", selected: false }
  ]);

  const [errors, setErrors] = useState<FormErrors>({
    personalInfo: {},
    productInterests: undefined,
    message: undefined
  });

  const [fieldTouched, setFieldTouched] = useState<FieldTouched>({
    personalInfo: false,
    productInterests: false,
    message: false
  });

  // Validate the form data
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      personalInfo: {},
      productInterests: undefined,
      message: undefined
    };
    
    // Validate personal info fields
    if (!formData.firstName) {
      newErrors.personalInfo.firstName = "First name is required";
    }
    
    if (!formData.lastName) {
      newErrors.personalInfo.lastName = "Last name is required";
    }
    
    if (!formData.email) {
      newErrors.personalInfo.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      newErrors.personalInfo.email = "Invalid email format";
    }
    
    if (!formData.phoneNumber) {
      newErrors.personalInfo.phoneNumber = "Phone number is required";
    } else if (!/^[\d\(\)\-\+\s]{10,15}$/.test(formData.phoneNumber)) {
      newErrors.personalInfo.phoneNumber = "Invalid phone number";
    }
    
    if (!formData.jobTitle) {
      newErrors.personalInfo.jobTitle = "Job title is required";
    }
    
    if (!formData.companyName) {
      newErrors.personalInfo.companyName = "Company name is required";
    }
    
    // Validate product interests
    if (!productInterests.some(item => item.selected)) {
      newErrors.productInterests = "Please select at least one product interest";
    }
    
    // Validate message
    if (!formData.message || formData.message.trim().length < 10) {
      newErrors.message = "Please enter a detailed message (at least 10 characters)";
    }
    
    setErrors(newErrors);
    setFieldTouched({
      personalInfo: true,
      productInterests: true,
      message: true
    });
    
    // Check if there are any errors
    const hasPersonalInfoErrors = Object.keys(newErrors.personalInfo).length > 0;
    return !(hasPersonalInfoErrors || newErrors.productInterests || newErrors.message);
  };

  // Validate specific fields when they change
  useEffect(() => {
    if (fieldTouched.personalInfo) {
      const personalInfoErrors: PersonalInfoErrors = {};
      
      if (!formData.firstName) {
        personalInfoErrors.firstName = "First name is required";
      }
      
      if (!formData.lastName) {
        personalInfoErrors.lastName = "Last name is required";
      }
      
      if (!formData.email) {
        personalInfoErrors.email = "Email is required";
      } else if (!isValidEmail(formData.email)) {
        personalInfoErrors.email = "Invalid email format";
      }
      
      if (!formData.phoneNumber) {
        personalInfoErrors.phoneNumber = "Phone number is required";
      } else if (!/^[\d\(\)\-\+\s]{10,15}$/.test(formData.phoneNumber)) {
        personalInfoErrors.phoneNumber = "Invalid phone number";
      }
      
      if (!formData.jobTitle) {
        personalInfoErrors.jobTitle = "Job title is required";
      }
      
      if (!formData.companyName) {
        personalInfoErrors.companyName = "Company name is required";
      }
      
      setErrors(prev => ({
        ...prev,
        personalInfo: personalInfoErrors
      }));
    }
    
    if (fieldTouched.productInterests) {
      setErrors(prev => ({
        ...prev,
        productInterests: productInterests.some(item => item.selected) 
          ? undefined 
          : "Please select at least one product interest"
      }));
    }
    
    if (fieldTouched.message) {
      setErrors(prev => ({
        ...prev,
        message: (!formData.message || formData.message.trim().length < 10)
          ? "Please enter a detailed message (at least 10 characters)"
          : undefined
      }));
    }
  }, [formData, productInterests, fieldTouched]);

  const handleProductInterestToggle = (index: number) => {
    setFieldTouched(prev => ({ ...prev, productInterests: true }));
    const updatedInterests = [...productInterests];
    updatedInterests[index].selected = !updatedInterests[index].selected;
    setProductInterests(updatedInterests);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Mark the appropriate field as touched
    if (name === "message") {
      setFieldTouched(prev => ({ ...prev, message: true }));
    } else {
      setFieldTouched(prev => ({ ...prev, personalInfo: true }));
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate the form before submission
    if (!validateForm()) {
      toast({
        title: "Please fix the errors",
        description: "There are validation errors in the form.",
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
      
      // Reset field touched state
      setFieldTouched({
        personalInfo: false,
        productInterests: false,
        message: false
      });
      
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
    errors,
    fieldTouched,
    handleInputChange,
    handleProductInterestToggle,
    handleSubmit
  };
};
