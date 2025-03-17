
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
    
    const { data, error } = await supabase.functions.invoke("send-team-notification", {
      body: submissionData,
    });
    
    // Log the full response for debugging
    console.log("Full Supabase function response:", { data, error });
    
    if (error) {
      console.error("Error invoking Supabase function:", error);
      throw new Error(`Edge Function returned a non-2xx status code. Please try again or contact us directly at team@poweredby.agency.`);
    }
    
    if (!data) {
      console.error("No data returned from function");
      throw new Error("No response data received from server");
    }
    
    if (data.success === false) {
      console.error("Function returned error in data:", data.error);
      throw new Error(`Server processed request but reported an error: ${data.error || "Unknown error"}`);
    }
    
    console.log("Form submission successful:", data);
    return data;
  } catch (error) {
    console.error("Form submission error:", error instanceof Error ? error.message : error);
    
    // Determine if this is a network error or a server response error
    let userMessage = "Something went wrong while submitting the form.";
    
    if (error instanceof Error) {
      if (error.message.includes("non-2xx status code")) {
        userMessage = "Please try again or contact us directly at team@poweredby.agency.";
      } else if (error.message.includes("network") || error.message.includes("fetch")) {
        userMessage = "Network error occurred. Please check your internet connection and try again.";
      } else {
        userMessage = `${error.message}. Please try again or contact us directly at team@poweredby.agency.`;
      }
    }
    
    throw new Error(userMessage);
  }
};
