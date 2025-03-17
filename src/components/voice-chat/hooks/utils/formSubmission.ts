
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
  
  const { data, error } = await supabase.functions.invoke("send-team-notification", {
    body: submissionData
  });
  
  if (error) {
    console.error("Error sending notification:", error);
    throw new Error("Failed to send team notification");
  }
  
  return data;
};
