
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
    console.log("Preparing to call Supabase function: send-team-notification");
    
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
    console.log("Calling Supabase function with data:", JSON.stringify(submissionData));
    
    const response = await supabase.functions.invoke("send-team-notification", {
      body: submissionData,
      headers: {
        "Content-Type": "application/json"
      }
    });
    
    const { data, error } = response;
    
    // Log the full response for debugging
    console.log("Full Supabase function response:", response);
    
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
    
    console.log("Form submission response:", data);
    
    if (!data) {
      console.error("No data returned from function");
      throw new Error("No response data received from server");
    }
    
    if (data.success === false) {
      console.error("Function returned error in data:", data.error || "Unknown error");
      throw new Error(`Server processed request but reported an error: ${data.error || "Unknown error"}`);
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
    
    // Improve error message for user display
    let userMessage = "Something went wrong while submitting the form.";
    
    if (error instanceof Error) {
      // Check for specific error types and provide better messages
      if (error.message.includes("non-2xx status code")) {
        userMessage = "Edge Function returned a non-2xx status code. Please try again or contact us directly at team@poweredby.agency.";
      } else if (error.message.includes("network") || error.message.includes("fetch")) {
        userMessage = "Network error occurred. Please check your internet connection and try again.";
      } else {
        userMessage = `${error.message}. Please try again or contact us directly at team@poweredby.agency.`;
      }
    }
    
    throw new Error(userMessage);
  }
};
