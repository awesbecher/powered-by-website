
import React from "react";
import { useContactForm } from "./hooks/useContactForm";
import { PersonalInfoSection } from "./components/PersonalInfoSection";
import { ProductInterestsSection } from "./components/ProductInterestsSection";
import { MessageSection } from "./components/MessageSection";
import { FormSubmitSection } from "./components/FormSubmitSection";

export const VoiceAgentContactForm: React.FC = () => {
  const {
    formData,
    productInterests,
    isSubmitting,
    handleInputChange,
    handleProductInterestToggle,
    handleSubmit
  } = useContactForm();

  return (
    <div className="bg-[#121212]/90 p-6 rounded-lg backdrop-blur-sm border border-gray-800">
      <form onSubmit={handleSubmit} className="space-y-5">
        <PersonalInfoSection formData={formData} onChange={handleInputChange} />
        
        <ProductInterestsSection 
          productInterests={productInterests} 
          onProductInterestToggle={handleProductInterestToggle} 
        />
        
        <MessageSection message={formData.message} onChange={handleInputChange} />
        
        <FormSubmitSection isSubmitting={isSubmitting} />
      </form>
    </div>
  );
};
