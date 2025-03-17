
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PersonalInfoData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  jobTitle: string;
  companyName: string;
}

interface PersonalInfoSectionProps {
  formData: PersonalInfoData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({
  formData,
  onChange
}) => {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-sm font-medium text-gray-300">First Name*</Label>
          <Input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={onChange}
            placeholder="John"
            className="bg-[#1a1a1a] border-gray-700 hover:border-gray-600 focus:border-purple-500 text-white h-10 rounded-md transition-colors"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-sm font-medium text-gray-300">Last Name*</Label>
          <Input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={onChange}
            placeholder="Doe"
            className="bg-[#1a1a1a] border-gray-700 hover:border-gray-600 focus:border-purple-500 text-white h-10 rounded-md transition-colors"
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-gray-300">Company Email*</Label>
          <Input
            id="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            placeholder="john.doe@company.com"
            type="email"
            className="bg-[#1a1a1a] border-gray-700 hover:border-gray-600 focus:border-purple-500 text-white h-10 rounded-md transition-colors"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phoneNumber" className="text-sm font-medium text-gray-300">Phone Number*</Label>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={onChange}
            placeholder="(555) 123-4567"
            className="bg-[#1a1a1a] border-gray-700 hover:border-gray-600 focus:border-purple-500 text-white h-10 rounded-md transition-colors"
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="jobTitle" className="text-sm font-medium text-gray-300">Job Title*</Label>
          <Input
            id="jobTitle"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={onChange}
            placeholder="Marketing Director"
            className="bg-[#1a1a1a] border-gray-700 hover:border-gray-600 focus:border-purple-500 text-white h-10 rounded-md transition-colors"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="companyName" className="text-sm font-medium text-gray-300">Company Name*</Label>
          <Input
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={onChange}
            placeholder="Acme Inc."
            className="bg-[#1a1a1a] border-gray-700 hover:border-gray-600 focus:border-purple-500 text-white h-10 rounded-md transition-colors"
            required
          />
        </div>
      </div>
    </div>
  );
};
