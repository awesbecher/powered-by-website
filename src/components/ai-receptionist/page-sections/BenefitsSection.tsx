
import { Phone, Clock, MessageCircle, DollarSign, Zap, Shield } from "lucide-react";

const BenefitCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => {
  return (
    <div className="glass-card rounded-xl p-6 text-center border border-gray-800 bg-[#1a1a24]/70 hover:border-[#9b87f5]/40 transition-all duration-300 hover:shadow-lg hover:shadow-[#9b87f5]/10">
      <div className="bg-gradient-to-br from-[#6342ff] to-[#9b87f5] w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
};

export const BenefitsSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl bg-gradient-to-b from-[#121212] via-[#151515] to-[#121212]">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">The Business Benefits of AI Receptionists</h2>
        <p className="text-xl text-gray-300">
          Boost efficiency, reduce costs, and enhance customer satisfaction with our AI Receptionist solution.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <BenefitCard 
          icon={<Phone className="w-8 h-8 text-white" />}
          title="Never Miss a Call"
          description="Your AI receptionist answers every call 24/7, ensuring no opportunity slips through the cracks." 
        />

        <BenefitCard 
          icon={<Clock className="w-8 h-8 text-white" />}
          title="Save 20+ Hours Weekly"
          description="Automate routine inquiries and appointment bookings while your team focuses on high-value tasks." 
        />

        <BenefitCard 
          icon={<MessageCircle className="w-8 h-8 text-white" />}
          title="Natural Conversations"
          description="Powered by advanced AI, our solution delivers natural, engaging conversations that wow customers." 
        />

        <BenefitCard 
          icon={<DollarSign className="w-8 h-8 text-white" />}
          title="Reduce Costs by 60%"
          description="Eliminate the need for full-time receptionists while maintaining exceptional service quality." 
        />
        
        <BenefitCard 
          icon={<Zap className="w-8 h-8 text-white" />}
          title="Instant Qualification"
          description="Qualify leads in real-time and route high-value prospects to your sales team immediately." 
        />
        
        <BenefitCard 
          icon={<Shield className="w-8 h-8 text-white" />}
          title="Enterprise-Grade Security"
          description="All conversations are encrypted and handled with strict privacy controls for complete peace of mind." 
        />
      </div>
      
      <div className="mt-16 text-center">
        <div className="inline-block bg-[#1a0b2e] p-6 rounded-xl border border-[#9b87f5]/20">
          <h3 className="text-2xl font-bold text-white mb-3">ROI at a Glance</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#9b87f5] mb-2">80%</div>
              <p className="text-gray-300 text-sm">Reduction in missed calls</p>
            </div>
            
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#9b87f5] mb-2">60%</div>
              <p className="text-gray-300 text-sm">Cost savings vs. human receptionist</p>
            </div>
            
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#9b87f5] mb-2">24/7</div>
              <p className="text-gray-300 text-sm">Business availability</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
