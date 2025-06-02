
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface PersonalInfoData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  jobTitle: string;
  companyName: string;
}

interface Errors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  jobTitle?: string;
  companyName?: string;
}

interface PersonalInfoSectionProps {
  formData: PersonalInfoData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors?: Errors;
  firstNameInputRef?: React.RefObject<HTMLInputElement>;
}

export const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({
  formData,
  onChange,
  errors = {},
  firstNameInputRef
}) => {
  const renderFieldWithValidation = (
    id: keyof PersonalInfoData,
    label: string,
    placeholder: string,
    type: string = "text",
    ref?: React.RefObject<HTMLInputElement>
  ) => {
    const value = formData[id];
    const error = errors[id];
    const isValid = value && !error;
    
    return (
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <Label htmlFor={id} className="text-xs font-medium text-gray-300">{label}*</Label>
          {value && (
            isValid ? (
              <span className="text-green-500 flex items-center gap-1 text-[10px]">
                <CheckCircle2 className="h-2.5 w-2.5" /> Valid
              </span>
            ) : error ? (
              <span className="text-red-500 flex items-center gap-1 text-[10px]">
                <AlertCircle className="h-2.5 w-2.5" /> Invalid
              </span>
            ) : null
          )}
        </div>
        <Input
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          type={type}
          className={`bg-[#1a1a1a] border-gray-700 hover:border-gray-600 ${error ? 'border-red-500 focus:border-red-500' : isValid ? 'border-green-500 focus:border-green-500' : 'focus:border-purple-500'} text-white h-8 rounded-md transition-colors text-sm`}
          required
          ref={ref}
        />
        {error && <p className="text-[10px] text-red-500">{error}</p>}
      </div>
    );
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {renderFieldWithValidation("firstName", "First Name", "John", "text", firstNameInputRef)}
        {renderFieldWithValidation("lastName", "Last Name", "Doe")}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {renderFieldWithValidation("email", "Company Email", "john.doe@company.com", "email")}
        {renderFieldWithValidation("phoneNumber", "Phone Number", "(555) 123-4567")}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {renderFieldWithValidation("jobTitle", "Job Title", "Marketing Director")}
        {renderFieldWithValidation("companyName", "Company Name", "Acme Inc.")}
      </div>
    </div>
  );
};
