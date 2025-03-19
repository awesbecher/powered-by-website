
import { Mic, MessageCircle, Settings, Clock, Shield, Phone, Calendar, User, BarChart, ArrowRightCircle } from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="bg-[#1a1a24] p-6 rounded-xl border border-gray-800 hover:border-[#9b87f5]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#9b87f5]/10">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

export const FeaturesSection = () => {
  return (
    <section className="py-2 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
      {/* Updated title split into two lines */}
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">
          Try an AI Receptionist yourself!
        </h2>
        <h3 className="text-2xl sm:text-3xl font-bold text-white mt-2">
          Make a call to anyone of the businesses below.
        </h3>
      </div>
      
      {/* Business card grid with center aligned content and reduced width - increased font size for business categories */}
      <div className="mb-12 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-[60%] mx-auto sm:max-w-[50%]">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#6342ff] to-[#9b87f5] rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
          <div className="relative bg-[#2a1d45] p-1.5 rounded-lg border border-purple-500/20 shadow-xl text-center">
            <p className="font-semibold text-white text-base sm:text-lg">Auto Dealership</p>
            <p className="text-gray-300 text-xs">Mercedes of Tacoma</p>
            <p className="text-[#9b87f5] text-xs">Call: (732) 638 0513</p>
          </div>
        </div>
        
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#6342ff] to-[#9b87f5] rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
          <div className="relative bg-[#2a1d45] p-1.5 rounded-lg border border-purple-500/20 shadow-xl text-center">
            <p className="font-semibold text-white text-base sm:text-lg">Real Estate Agency</p>
            <p className="text-gray-300 text-xs">Township Real Estate</p>
            <p className="text-[#9b87f5] text-xs">Call: (732) 702 8348</p>
          </div>
        </div>
        
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#6342ff] to-[#9b87f5] rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
          <div className="relative bg-[#2a1d45] p-1.5 rounded-lg border border-purple-500/20 shadow-xl text-center">
            <p className="font-semibold text-white text-base sm:text-lg">Restaurant</p>
            <p className="text-gray-300 text-xs">The Slice House</p>
            <p className="text-[#9b87f5] text-xs">Call: (657) 464 2712</p>
          </div>
        </div>
        
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#6342ff] to-[#9b87f5] rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
          <div className="relative bg-[#2a1d45] p-1.5 rounded-lg border border-purple-500/20 shadow-xl text-center">
            <p className="font-semibold text-white text-base sm:text-lg">Retail Services</p>
            <p className="text-gray-300 text-xs">Flagship Barbers</p>
            <p className="text-[#9b87f5] text-xs">Call: (978) 818 8357</p>
          </div>
        </div>
      </div>

      <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-16 pt-16">
        Remarkably Human-like AI Receptionists for SMBs
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <FeatureCard 
          icon={<Calendar className="w-10 h-10 text-[#9b87f5]" />}
          title="Automate Bookings & Reservations"
          description="Restaurants, salons, and service businesses can schedule appointments with zero hassle, eliminating scheduling conflicts." 
        />
        <FeatureCard 
          icon={<Phone className="w-10 h-10 text-[#9b87f5]" />}
          title="Inbound Call Automation"
          description="Handle high call volumes effortlessly with AI agents that answer calls instantly, reducing wait times and improving customer satisfaction." 
        />
        <FeatureCard 
          icon={<User className="w-10 h-10 text-[#9b87f5]" />}
          title="Answer Customer Questions"
          description="From product details to pricing, your AI receptionist has the answers to common questions, providing immediate assistance 24/7." 
        />
        <FeatureCard 
          icon={<BarChart className="w-10 h-10 text-[#9b87f5]" />}
          title="Pre-Screen Leads & Qualify Clients"
          description="Auto dealerships, loan offices, and professional services can gather key details upfront, ensuring quality leads for your sales team." 
        />
        <FeatureCard 
          icon={<ArrowRightCircle className="w-10 h-10 text-[#9b87f5]" />}
          title="Smart Handoff to Humans"
          description="Seamlessly transfer complex issues to human representatives only when needed, ensuring proper escalation for special cases." 
        />
        <FeatureCard 
          icon={<Shield className="w-10 h-10 text-[#9b87f5]" />}
          title="HIPAA & PCI Compliant"
          description="Enterprise-grade security and compliance for industries with strict data protection requirements." 
        />
      </div>
    </section>
  );
};
