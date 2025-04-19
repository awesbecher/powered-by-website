
import { Building, Briefcase, Home, Hospital, Auto, Users } from "lucide-react";

export const UseCaseGrid = () => {
  const cases = [
    { icon: Auto, title: "Auto", description: "Qualify leads and schedule test drives 24/7" },
    { icon: Building, title: "SaaS", description: "Handle product inquiries and support requests" },
    { icon: Hospital, title: "Insurance", description: "Process claims and answer policy questions" },
    { icon: Home, title: "Real Estate", description: "Schedule viewings and qualify buyers" },
    { icon: Briefcase, title: "Hospitality", description: "Manage bookings and guest services" },
    { icon: Users, title: "Custom", description: "Tailored to your unique business needs" }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12">
          Use Cases
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((case_, index) => (
            <div 
              key={index}
              className="bg-[#1a1a2e] rounded-2xl p-6 border border-white/10 hover:border-[#8B5CF6]/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              <case_.icon className="w-8 h-8 text-[#8B5CF6] mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">{case_.title}</h3>
              <p className="text-gray-300">{case_.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
