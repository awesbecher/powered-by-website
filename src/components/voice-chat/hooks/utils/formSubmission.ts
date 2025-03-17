
import { FormData } from "../types/contactFormTypes";
import { ProductInterest } from "../../components/ProductInterestsSection";
import { supabase } from "@/integrations/supabase/client";

export const submitContactForm = async (formData: FormData, productInterests: ProductInterest[]) => {
  const submissionData = {
    ...formData,
    productInterests: productInterests.filter(p => p.selected).map(p => p.name),
    source: "voice-chat"
  };
  
  console.log("Form submission data:", submissionData);
  console.log("Submission timestamp:", new Date().toISOString());
  
  try {
    console.log("Calling Supabase function: send-team-notification");
    
    // First validate the data on the client side before sending
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
    
    // All validation passed, calling the edge function
    const { data, error } = await supabase.functions.invoke("send-team-notification", {
      body: submissionData,
      headers: {
        "Content-Type": "application/json"
      }
    });
    
    if (error) {
      console.error("Error invoking Supabase function:", error);
      console.error("Error details:", {
        message: error.message,
        name: error.name,
        code: error.code,
        details: error.details,
      });
      
      // Additional diagnostic information
      console.error("Request context:", {
        timestamp: new Date().toISOString(),
        formDataKeys: Object.keys(submissionData),
        formDataSize: JSON.stringify(submissionData).length
      });
      
      throw new Error(`Failed to send team notification: ${error.message}`);
    }
    
    console.log("Form submission successful response:", data);
    
    if (!data || data.success === false) {
      console.error("Function returned error in data:", data?.error || "Unknown error");
      throw new Error(`Server processed request but reported an error: ${data?.error || "Unknown error"}`);
    }
    
    return data;
  } catch (error) {
    console.error("Form submission error:", error instanceof Error ? error.message : error);
    
    if (error instanceof Error) {
      console.error("Error stack:", error.stack);
      console.error("Is network error:", error.message.includes("network") || error.message.includes("fetch"));
    }
    
    // Additional diagnostic logging
    console.error("Browser information:", navigator.userAgent);
    console.error("Current page:", window.location.href);
    
    throw error;
  }
};
