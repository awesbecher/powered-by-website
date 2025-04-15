
import { Phone, Clock, MessageCircle, DollarSign } from "lucide-react";

export const BenefitsSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl bg-gradient-to-b from-[#121212] via-[#151515] to-[#121212]">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">The Business Benefits of AI Receptionists</h2>
        <p className="text-xl text-gray-300">
          Boost efficiency, reduce wait times, and enhance customer satisfaction—all with the power of a <span className="bg-white text-[#6342ff] font-bold px-2 py-0.5 rounded-md">Powered_by</span> AI Receptionist.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="glass-card rounded-xl p-6 text-center border border-gray-800 bg-[#1a1a24]/70">
          <div className="bg-gradient-to-br from-[#6342ff] to-[#9b87f5] w-14 h-14 flex items-center justify-center rounded-full mx-auto mb-4">
            <Phone className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Never Miss a Call</h3>
          <p className="text-gray-300">Your AI receptionist answers every call 24/7, ensuring no opportunity slips through the cracks.</p>
        </div>

        <div className="glass-card rounded-xl p-6 text-center border border-gray-800 bg-[#1a1a24]/70">
          <div className="bg-gradient-to-br from-[#6342ff] to-[#9b87f5] w-14 h-14 flex items-center justify-center rounded-full mx-auto mb-4">
            <Clock className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Save Hours Daily</h3>
          <p className="text-gray-300">Automate routine inquiries and appointment bookings while your team focuses on high-value tasks.</p>
        </div>

        <div className="glass-card rounded-xl p-6 text-center border border-gray-800 bg-[#1a1a24]/70">
          <div className="bg-gradient-to-br from-[#6342ff] to-[#9b87f5] w-14 h-14 flex items-center justify-center rounded-full mx-auto mb-4">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Consistent Experience</h3>
          <p className="text-gray-300">Deliver the same high-quality professional greeting and service to every caller, every time.</p>
        </div>

        <div className="glass-card rounded-xl p-6 text-center border border-gray-800 bg-[#1a1a24]/70">
          <div className="bg-gradient-to-br from-[#6342ff] to-[#9b87f5] w-14 h-14 flex items-center justify-center rounded-full mx-auto mb-4">
            <DollarSign className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Cost Effective</h3>
          <p className="text-gray-300">Reduce the need for multiple receptionists while maintaining exceptional service quality.</p>
        </div>
      </div>
    </section>
  );
};
