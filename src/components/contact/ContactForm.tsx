import React from 'react';
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ContactFormFields } from "./ContactFormFields";
import { FormData } from "./types";
import { isPersonalEmail, isValidEmail } from "@/utils/emailValidation";
import { useNavigate } from "react-router-dom";

export const ContactForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    title: "",
    company: "",
    reason: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionError(null);

    if (!isValidEmail(formData.email)) {
      toast({
        title: "Invalid email format",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    if (isPersonalEmail(formData.email)) {
      toast({
        title: "Invalid email domain",
        description: "Please use your corporate email address. Personal email domains are not accepted.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("Submitting form data:", formData);
      
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: { ...formData }
      });

      if (error) {
        console.error("Supabase function error:", error);
        throw new Error(`Function error: ${error.message}`);
      }

      console.log('Form submission response:', data);

      if (!data.success) {
        throw new Error(data.error || "Unknown error occurred");
      }

      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible."
      });

      setFormData({
        name: "",
        email: "",
        title: "",
        company: "",
        reason: "",
        message: ""
      });
      
      // Redirect to thank-you page after showing the success toast
      setTimeout(() => {
        navigate('/thank-you');
      }, 1500); // Short delay to ensure toast is visible
      
    } catch (error: any) {
      console.error('Error sending message:', error);
      setSubmissionError(error.message);
      toast({
        title: "Error sending message",
        description: error.message || "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-8 bg-neutral-900/50 p-8 rounded-xl backdrop-blur">
      <form onSubmit={handleSubmit} className="space-y-6">
        <ContactFormFields formData={formData} setFormData={setFormData} />
        
        {submissionError && (
          <div className="p-3 bg-red-900/50 border border-red-700 rounded-md text-white text-sm">
            <p className="font-semibold">Error sending message:</p>
            <p>{submissionError}</p>
          </div>
        )}
        
        <Button 
          type="submit" 
          className="w-full bg-accent hover:bg-accent-dark text-white py-6"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </div>
  );
};
