
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
}

export const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({
  formData,
  onChange,
  errors = {}
}) => {
  const renderFieldWithValidation = (
    id: keyof PersonalInfoData,
    label: string,
    placeholder: string,
    type: string = "text"
  ) => {
    const value = formData[id];
    const error = errors[id];
    const isValid = value && !error;
    
    return (
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label htmlFor={id} className="text-sm font-medium text-gray-300">{label}*</Label>
          {value && (
            isValid ? (
              <span className="text-green-500 flex items-center gap-1 text-xs">
                <CheckCircle2 className="h-3 w-3" /> Valid
              </span>
            ) : error ? (
              <span className="text-red-500 flex items-center gap-1 text-xs">
                <AlertCircle className="h-3 w-3" /> Invalid
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
          className={`bg-[#1a1a1a] border-gray-700 hover:border-gray-600 ${error ? 'border-red-500 focus:border-red-500' : isValid ? 'border-green-500 focus:border-green-500' : 'focus:border-purple-500'} text-white h-10 rounded-md transition-colors`}
          required
        />
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      </div>
    );
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {renderFieldWithValidation("firstName", "First Name", "John")}
        {renderFieldWithValidation("lastName", "Last Name", "Doe")}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {renderFieldWithValidation("email", "Company Email", "john.doe@company.com", "email")}
        {renderFieldWithValidation("phoneNumber", "Phone Number", "(555) 123-4567")}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {renderFieldWithValidation("jobTitle", "Job Title", "Marketing Director")}
        {renderFieldWithValidation("companyName", "Company Name", "Acme Inc.")}
      </div>
    </div>
  );
};
