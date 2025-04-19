
import { Button } from "@/components/ui/button";

export const UseCasesSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4">Use Cases</h2>
        <p className="text-xl text-gray-300 text-center mb-12 max-w-2xl mx-auto">
          Explore how AI agents transform operations across industries
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Auto Dealer", description: "24/7 sales inquiries, appointment scheduling, and follow-ups without adding staff." },
            { title: "SaaS", description: "Technical support, onboarding assistance, and renewal management automated." },
            { title: "Insurance", description: "Claims processing, policy lookups, and lead qualification handled instantly." },
            { title: "Real Estate", description: "Property inquiries, showing scheduling, and tenant communications automated." },
            { title: "Hospitality", description: "Reservation management, guest services, and concierge assistance available 24/7." },
            { title: "Custom", description: "Tailored AI agents built for your unique business needs and workflows." }
          ].map((useCase) => (
            <div key={useCase.title} className="rounded-2xl overflow-hidden bg-gradient-to-br from-[#1a0b2e] to-[#2f1c4a] p-5 border border-[#8B5CF6]/20 hover:border-[#8B5CF6]/60 transition-all">
              <h3 className="text-xl font-bold text-white mb-2">{useCase.title}</h3>
              <p className="text-gray-300 mb-4">{useCase.description}</p>
              <Button variant="outline" className="w-full border-[#8B5CF6] text-[#8B5CF6] hover:bg-[#8B5CF6] hover:text-white">
                Learn More
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
