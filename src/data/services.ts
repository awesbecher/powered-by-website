import { ReactNode } from 'react';

export interface Service {
  title: string;
  description: string;
  icon?: ReactNode;
  iconPath?: string;
  category?: string;
  link?: string;
  buttonText?: string;
  isNew?: boolean;
  isEnterprise?: boolean;
}

export const services: Service[] = [
  {
    title: "Mercedes Dealership",
    description: "Experience our AI agent as a Mercedes dealership representative, helping customers with vehicle information and appointment scheduling.",
    iconPath: "/lovable-uploads/56608f55-255c-4123-83c5-1099d1c40bcb.png",
    category: "Auto Dealer",
    link: "/mercedes-dealer",
    buttonText: "Try Demo",
  },
  {
    title: "Insurance Agency",
    description: "Our AI agent handles insurance inquiries, policy questions, and quote requests as a professional insurance representative.",
    iconPath: "/lovable-uploads/96a0f0e1-5b20-4614-8f86-8d371a6c9b47.png",
    category: "Insurance",
    link: "/insurance",
    buttonText: "Try Demo",
  },
  {
    title: "Real Estate",
    description: "Explore how our AI agent serves as a real estate agent, helping clients with property information and scheduling viewings.",
    iconPath: "/lovable-uploads/eb73b819-4b47-459b-88c4-aa0a3cd864b7.png",
    category: "Real Estate",
    link: "/real-estate",
    buttonText: "Try Demo",
  },
  {
    title: "Hotel Room Service",
    description: "See how our AI agent enhances the guest experience by taking room service orders and handling customer requests.",
    iconPath: "/lovable-uploads/75ff6e78-9db7-436e-a063-2b5f8c500ee7.png",
    category: "Hospitality",
    link: "/room-service",
    buttonText: "Try Demo",
  },
  {
    title: "Retail Services",
    description: "Our AI agent assists customers with product information, appointment booking, and service inquiries for retail businesses.",
    iconPath: "/lovable-uploads/65c7ad96-17cd-4bc0-8a6d-0148a49f3402.png",
    category: "Retail Services",
    link: "/retail-services",
    buttonText: "Try Demo",
  }
];
