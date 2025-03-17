
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { FormData, FormErrors, FieldTouched } from "./types/contactFormTypes";
import { ProductInterest } from "../components/ProductInterestsSection";
import { validateForm, validatePersonalInfo, validateProductInterests, validateMessage, hasErrors } from "./utils/formValidation";
import { submitContactForm } from "./utils/formSubmission";

export const useContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
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
    { name: "Virtual SE", selected: false }
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

  const validateFullForm = (): boolean => {
    const newErrors = validateForm(formData, productInterests);
    
    setErrors(newErrors);
    setFieldTouched({
      personalInfo: true,
      productInterests: true,
      message: true
    });
    
    return !hasErrors(newErrors);
  };

  const handleProductInterestToggle = (index: number) => {
    setFieldTouched(prev => ({ ...prev, productInterests: true }));
    const updatedInterests = [...productInterests];
    updatedInterests[index].selected = !updatedInterests[index].selected;
    setProductInterests(updatedInterests);
    
    if (fieldTouched.productInterests) {
      setErrors(prev => ({
        ...prev,
        productInterests: validateProductInterests(updatedInterests)
      }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === "message") {
      setFieldTouched(prev => ({ ...prev, message: true }));
      setFormData(prev => ({ ...prev, [name]: value }));
      
      if (fieldTouched.message) {
        setErrors(prev => ({
          ...prev,
          message: validateMessage(value)
        }));
      }
    } else {
      setFieldTouched(prev => ({ ...prev, personalInfo: true }));
      setFormData(prev => ({ ...prev, [name]: value }));
      
      if (fieldTouched.personalInfo) {
        const updatedFormData = { ...formData, [name]: value };
        const personalInfoErrors = validatePersonalInfo(updatedFormData);
        setErrors(prev => ({
          ...prev,
          personalInfo: personalInfoErrors
        }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    
    if (!validateFullForm()) {
      toast({
        title: "Please fix the errors",
        description: "There are validation errors in the form.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      console.log("Starting form submission process...");
      const response = await submitContactForm(formData, productInterests);
      console.log("Form submission completed successfully:", response);
      
      setIsSubmitted(true);
      
      toast({
        title: "Form submitted successfully",
        description: "Thank you for your interest. We'll be in touch soon.",
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
      
      setFieldTouched({
        personalInfo: false,
        productInterests: false,
        message: false
      });
      
    } catch (error) {
      console.error("Form submission error:", error);
      
      // Set detailed error message
      setSubmitError(error instanceof Error 
        ? `Error: ${error.message}` 
        : "An unexpected error occurred while submitting your form");
      
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
    isSubmitted,
    submitError,
    errors,
    fieldTouched,
    handleInputChange,
    handleProductInterestToggle,
    handleSubmit
  };
};
