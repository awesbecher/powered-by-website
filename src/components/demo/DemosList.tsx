
import React from 'react';
import ServiceCard from "@/components/demo/ServiceCard";

interface ServiceProps {
  title: string;
  description: string;
  logo: string;
  category: string;
  link: string;
}

const demoServices: ServiceProps[] = [
  {
    title: "AI Receptionist",
    description: "Automate your front desk with an AI receptionist that answers calls, schedules appointments, and more.",
    logo: "/assets/images/0919959b-793f-4f4a-a907-946965759547.png",
    category: "Voice",
    link: "/ai-receptionist"
  },
  {
    title: "AI Insurance Agent",
    description: "Provide instant insurance quotes and policy information with an AI agent.",
    logo: "/assets/images/4999a95f-899d-4419-bca9-998544ca899b.png",
    category: "Voice",
    link: "/insurance"
  },
  {
    title: "AI Real Estate Agent",
    description: "Help customers find their dream home with an AI real estate agent.",
    logo: "/assets/images/182eda36-d0bd-4c57-88b7-2f0dd4938f61.png",
    category: "Chat",
    link: "/real-estate"
  },
  {
    title: "AI Restaurant Agent",
    description: "Take orders, answer questions, and provide recommendations with an AI restaurant agent.",
    logo: "/assets/images/21341be9-b85c-4ea3-b346-3c45080b3810.png",
    category: "Chat",
    link: "/restaurant"
  },
];

export const DemosList = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {demoServices.map((service) => (
        <ServiceCard
          key={service.title}
          title={service.title}
          description={service.description}
          logo={service.logo}
          category={service.category}
          link={service.link}
        />
      ))}
    </div>
  );
};
