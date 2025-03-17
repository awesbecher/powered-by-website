
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
  
  try {
    console.log("Calling Supabase function: send-team-notification");
    console.log("Submission timestamp:", new Date().toISOString());
    
    const { data, error } = await supabase.functions.invoke("send-team-notification", {
      body: submissionData
    });
    
    if (error) {
      console.error("Error invoking Supabase function:", error);
      console.error("Error details:", {
        message: error.message,
        name: error.name,
        code: error.code,
        details: error.details,
      });
      throw new Error(`Failed to send team notification: ${error.message}`);
    }
    
    console.log("Form submission response:", data);
    return data;
  } catch (error) {
    console.error("Form submission error:", error instanceof Error ? error.message : error);
    if (error instanceof Error) {
      console.error("Error stack:", error.stack);
    }
    throw error;
  }
};
