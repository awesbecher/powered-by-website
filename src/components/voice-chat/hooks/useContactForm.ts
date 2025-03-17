
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { FormData, FormErrors, FieldTouched } from "./types/contactFormTypes";
import { ProductInterest } from "../components/ProductInterestsSection";
import { validateForm, validatePersonalInfo, validateProductInterests, validateMessage, hasErrors } from "./utils/formValidation";
import { submitContactForm } from "./utils/formSubmission";

export const useContactForm = () => {
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
    
    // Validate product interests
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
      
      // Validate message if touched
      if (fieldTouched.message) {
        setErrors(prev => ({
          ...prev,
          message: validateMessage(value)
        }));
      }
    } else {
      setFieldTouched(prev => ({ ...prev, personalInfo: true }));
      setFormData(prev => ({ ...prev, [name]: value }));
      
      // Validate personal info if touched
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
      await submitContactForm(formData, productInterests);
      
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
