
import React, { ForwardedRef } from "react";
import { useContactForm } from "./hooks/useContactForm";
import { PersonalInfoSection } from "./components/PersonalInfoSection";
import { ProductInterestsSection } from "./components/ProductInterestsSection";
import { MessageSection } from "./components/MessageSection";
import { FormSubmitSection } from "./components/FormSubmitSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { POWERED_BY_STYLE } from "./hooks/types/contactFormTypes";

interface VoiceAgentContactFormProps {
  firstNameInputRef?: React.RefObject<HTMLInputElement>;
}

export const VoiceAgentContactForm: React.FC<VoiceAgentContactFormProps> = ({ firstNameInputRef }) => {
  const {
    formData,
    productInterests,
    isSubmitting,
    errors,
    fieldTouched,
    handleInputChange,
    handleProductInterestToggle,
    handleSubmit
  } = useContactForm();

  return (
    <Card className="bg-[#121212] border-gray-800 shadow-xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-[#1a1a1a] to-[#222] border-b border-gray-800 py-3">
        <CardTitle className="text-lg font-semibold text-white">Get Started Today</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          
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
      </CardContent>
    </Card>
  );
};
