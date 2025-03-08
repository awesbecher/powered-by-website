
import { Mail, MailCheck, MailPlus, MailQuestion } from "lucide-react";
import { ServiceBox } from "./ServiceBox";

interface ServiceBoxesProps {
  initialLoad: boolean;
}

export const ServiceBoxes = ({ initialLoad }: ServiceBoxesProps) => {
  const services = [
    {
      icon: MailPlus,
      category: "Follow-Up",
      name: "Post-Call Summary",
      description: "Automated follow-up emails with key points from calls"
    },
    {
      icon: MailQuestion,
      category: "Response",
      name: "Inquiry Handling",
      description: "Intelligent replies to customer questions"
    },
    {
      icon: Mail,
      category: "Automation",
      name: "Email Workflow",
      description: "Streamlined email sequences for customer journeys"
    },
    {
      icon: MailCheck,
      category: "Analytics",
      name: "Email Insights",
      description: "Data-driven reporting on email performance"
    }
  ];

  return (
    <div className={`w-full lg:w-1/2 transition-all duration-1000 delay-300 ease-out transform flex flex-col items-start justify-start
      ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
      <div className="text-center w-full mb-4 border border-gray-700/30 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg bg-black/40">
        <h3 className="text-white text-3xl md:text-4xl font-bold mb-2 tracking-tight">
          Autonomous Email Communication
        </h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        {services.map((service, index) => (
          <ServiceBox
            key={index}
            icon={service.icon}
            category={service.category}
            name={service.name}
            description={service.description}
          />
        ))}
      </div>
    </div>
  );
};
