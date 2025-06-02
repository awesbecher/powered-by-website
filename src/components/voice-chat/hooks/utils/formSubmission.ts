
import { FormData } from "../types/contactFormTypes";
import { ProductInterest } from "../../components/ProductInterestsSection";

export const submitContactForm = async (formData: FormData, productInterests: ProductInterest[]) => {
  const submissionData = {
    ...formData,
    productInterests: productInterests.filter(p => p.selected).map(p => p.name),
    source: "voice-chat"
  };
  
  console.log("Form submission data:", submissionData);
  
  try {
    console.log("Preparing to submit form data");
    
    // First validate the data on the client side
    if (!submissionData.email) {
      throw new Error("Email is required");
    }
    
    if (!submissionData.firstName || !submissionData.lastName) {
      throw new Error("First and last name are required");
    }
    
    if (!submissionData.phoneNumber) {
      throw new Error("Phone number is required");
    }
    
    if (submissionData.productInterests.length === 0) {
      throw new Error("Please select at least one product interest");
    }
    
    // Direct fetch to edge function
    const edgeFunctionUrl = "https://cinohyzbtfzfcdtkgvij.supabase.co/functions/v1/send-team-notification";
    
    console.log("Submitting form data to:", edgeFunctionUrl);
    
    const response = await fetch(edgeFunctionUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(submissionData)
    });
    
    console.log("Response status:", response.status);
    
    // Handle non-200 responses
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server returned error:", response.status, errorText);
      throw new Error(`Server error (${response.status}). Please try again or contact us directly at team@poweredby.agency.`);
    }
    
    // Parse the response
    const responseData = await response.json();
    console.log("Response data:", responseData);
    
    if (!responseData.success) {
      console.error("Function returned error:", responseData.error);
      throw new Error(responseData.error || "Unknown error occurred");
    }
    
    console.log("Form submission successful");
    return responseData;
    
  } catch (error) {
    console.error("Form submission error:", error instanceof Error ? error.message : String(error));
    
    // Provide a user-friendly error message
    let userMessage = "Something went wrong while submitting the form.";
    
    if (error instanceof Error) {
      userMessage = error.message;
    }
    
    throw new Error(userMessage);
  }
};
