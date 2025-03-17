
import React from "react";
import { Input } from "@/components/ui/input";

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
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <Input
            name="firstName"
            value={formData.firstName}
            onChange={onChange}
            placeholder="First Name*"
            className="bg-[#1a1a1a] border-gray-800 text-white h-12"
            required
          />
        </div>
        <div>
          <Input
            name="lastName"
            value={formData.lastName}
            onChange={onChange}
            placeholder="Last Name*"
            className="bg-[#1a1a1a] border-gray-800 text-white h-12"
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <Input
            name="email"
            value={formData.email}
            onChange={onChange}
            placeholder="Company Email*"
            type="email"
            className="bg-[#1a1a1a] border-gray-800 text-white h-12"
            required
          />
        </div>
        <div>
          <Input
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={onChange}
            placeholder="Phone Number*"
            className="bg-[#1a1a1a] border-gray-800 text-white h-12"
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <Input
            name="jobTitle"
            value={formData.jobTitle}
            onChange={onChange}
            placeholder="Job Title*"
            className="bg-[#1a1a1a] border-gray-800 text-white h-12"
            required
          />
        </div>
        <div>
          <Input
            name="companyName"
            value={formData.companyName}
            onChange={onChange}
            placeholder="Company Name*"
            className="bg-[#1a1a1a] border-gray-800 text-white h-12"
            required
          />
        </div>
      </div>
    </>
  );
};
