
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
