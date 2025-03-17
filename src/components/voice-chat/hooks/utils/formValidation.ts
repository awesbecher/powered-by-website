
import { FormData, FormErrors, PersonalInfoErrors } from "../types/contactFormTypes";
import { ProductInterest } from "../../components/ProductInterestsSection";
import { isValidEmail } from "@/utils/emailValidation";

export const validatePersonalInfo = (formData: FormData): PersonalInfoErrors => {
  const errors: PersonalInfoErrors = {};
  
  if (!formData.firstName) {
    errors.firstName = "First name is required";
  }
  
  if (!formData.lastName) {
    errors.lastName = "Last name is required";
  }
  
  if (!formData.email) {
    errors.email = "Email is required";
  } else if (!isValidEmail(formData.email)) {
    errors.email = "Invalid email format";
  }
  
  if (!formData.phoneNumber) {
    errors.phoneNumber = "Phone number is required";
  } else if (!/^[\d\(\)\-\+\s]{10,15}$/.test(formData.phoneNumber)) {
    errors.phoneNumber = "Invalid phone number";
  }
  
  if (!formData.jobTitle) {
    errors.jobTitle = "Job title is required";
  }
  
  if (!formData.companyName) {
    errors.companyName = "Company name is required";
  }
  
  return errors;
};

export const validateProductInterests = (productInterests: ProductInterest[]): string | undefined => {
  return productInterests.some(item => item.selected) 
    ? undefined 
    : "Please select at least one product interest";
};

export const validateMessage = (message: string): string | undefined => {
  return (!message || message.trim().length < 10)
    ? "Please enter a detailed message (at least 10 characters)"
    : undefined;
};

export const validateForm = (
  formData: FormData, 
  productInterests: ProductInterest[]
): FormErrors => {
  const newErrors: FormErrors = {
    personalInfo: validatePersonalInfo(formData),
    productInterests: validateProductInterests(productInterests),
    message: validateMessage(formData.message)
  };
  
  return newErrors;
};

export const hasErrors = (errors: FormErrors): boolean => {
  const hasPersonalInfoErrors = Object.keys(errors.personalInfo).length > 0;
  return hasPersonalInfoErrors || !!errors.productInterests || !!errors.message;
};
