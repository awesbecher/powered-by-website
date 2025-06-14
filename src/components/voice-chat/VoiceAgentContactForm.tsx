
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContactForm } from "./hooks/useContactForm";
import { PersonalInfoSection } from "./components/PersonalInfoSection";
import { ProductInterestsSection } from "./components/ProductInterestsSection";
import { MessageSection } from "./components/MessageSection";
import { FormSubmitSection } from "./components/FormSubmitSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, AlertTriangle } from "lucide-react";
import { PoweredByText } from "@/components/shared/PoweredByText";

interface VoiceAgentContactFormProps {
  firstNameInputRef?: React.RefObject<HTMLInputElement>;
}

export const VoiceAgentContactForm: React.FC<VoiceAgentContactFormProps> = ({ firstNameInputRef }) => {
  const navigate = useNavigate();
  const {
    formData,
    productInterests,
    isSubmitting,
    errors,
    fieldTouched,
    handleInputChange,
    handleProductInterestToggle,
    handleSubmit,
    isSubmitted,
    submitError
  } = useContactForm();

  useEffect(() => {
    let redirectTimer: NodeJS.Timeout;
    
    if (isSubmitted) {
      // Set a timer to redirect to the thank-you page after 1 second
      redirectTimer = setTimeout(() => {
        navigate("/thank-you");
      }, 1000);
    }
    
    // Clean up the timer if component unmounts
    return () => {
      if (redirectTimer) {
        clearTimeout(redirectTimer);
      }
    };
  }, [isSubmitted, navigate]);

  return (
    <Card className="bg-[#121212] border-gray-800 shadow-xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-[#1a1a1a] to-[#222] border-b border-gray-800 py-3">
        <CardTitle className="text-lg font-semibold text-white">Get Started Today</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {isSubmitted ? (
          <div className="py-16 px-4 text-center">
            <h3 className="text-xl font-semibold text-white mb-4">
              Thanks for your interest in <PoweredByText /> Voice AI.
            </h3>
            <p className="text-gray-300">
              Our team will be back in touch shortly to help you get started.
            </p>
            <p className="text-gray-400 text-sm mt-4">
              Redirecting you to our resources page...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {submitError && (
              <Alert variant="destructive" className="bg-red-900/30 border-red-800 text-white">
                <AlertTriangle className="h-4 w-4" />
                <div>
                  <AlertTitle>Error Submitting Form</AlertTitle>
                  <AlertDescription>
                    {submitError}. Please try again or contact us directly at team@poweredby.agency.
                  </AlertDescription>
                </div>
              </Alert>
            )}
            
            <PersonalInfoSection 
              formData={formData} 
              onChange={handleInputChange} 
              errors={fieldTouched.personalInfo ? errors.personalInfo : {}}
              firstNameInputRef={firstNameInputRef}
            />
            
            <ProductInterestsSection 
              productInterests={productInterests} 
              onProductInterestToggle={handleProductInterestToggle} 
              error={fieldTouched.productInterests ? errors.productInterests : undefined}
            />
            
            <MessageSection 
              message={formData.message} 
              onChange={handleInputChange} 
              error={fieldTouched.message ? errors.message : undefined}
            />
            
            <FormSubmitSection isSubmitting={isSubmitting} />
          </form>
        )}
      </CardContent>
    </Card>
  );
};
