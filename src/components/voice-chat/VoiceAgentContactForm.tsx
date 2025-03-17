
import React from "react";
import { useContactForm } from "./hooks/useContactForm";
import { PersonalInfoSection } from "./components/PersonalInfoSection";
import { ProductInterestsSection } from "./components/ProductInterestsSection";
import { MessageSection } from "./components/MessageSection";
import { FormSubmitSection } from "./components/FormSubmitSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const VoiceAgentContactForm: React.FC = () => {
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
      <CardHeader className="bg-gradient-to-r from-[#1a1a1a] to-[#222] border-b border-gray-800 pb-4">
        <CardTitle className="text-xl font-semibold text-white">Get Started with AI Voice Solutions</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <PersonalInfoSection 
            formData={formData} 
            onChange={handleInputChange} 
            errors={fieldTouched.personalInfo ? errors.personalInfo : {}}
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
