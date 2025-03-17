
import { ProductInterest } from "../../components/ProductInterestsSection";

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  jobTitle: string;
  companyName: string;
  message: string;
}

export interface PersonalInfoErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  jobTitle?: string;
  companyName?: string;
}

export interface FormErrors {
  personalInfo: PersonalInfoErrors;
  productInterests?: string;
  message?: string;
}

export interface FieldTouched {
  personalInfo: boolean;
  productInterests: boolean;
  message: boolean;
}

// Style constant for Powered_by branding
export const POWERED_BY_STYLE = "bg-white text-[#6342ff] font-bold px-2 py-0.5 rounded-md";
