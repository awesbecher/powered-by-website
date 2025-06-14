
import { Mail, Clock, MessageSquare, DollarSign } from "lucide-react";
import { PoweredByText } from "@/components/shared/PoweredByText";

export const BenefitsSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl bg-gradient-to-b from-[#121212] via-[#151515] to-[#121212]">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">The Business Benefits of AI Email Agents</h2>
        <p className="text-xl text-gray-300">
          Transform your customer communications, streamline workflows, and increase conversion rates with a <PoweredByText /> AI Email Agent.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Benefit 1 */}
        <div className="glass-card rounded-xl p-6 text-center">
          <div className="bg-gradient-to-br from-[#6342ff] to-[#9b87f5] w-14 h-14 flex items-center justify-center rounded-full mx-auto mb-4">
            <Mail className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">24/7 Email Management</h3>
          <p className="text-gray-300">Your AI agent handles customer emails round-the-clock, ensuring no communication is missed or delayed.</p>
        </div>

        {/* Benefit 2 */}
        <div className="glass-card rounded-xl p-6 text-center">
          <div className="bg-gradient-to-br from-[#6342ff] to-[#9b87f5] w-14 h-14 flex items-center justify-center rounded-full mx-auto mb-4">
            <Clock className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Time Savings</h3>
          <p className="text-gray-300">Reclaim hours spent on email management while maintaining high-quality customer communication.</p>
        </div>

        {/* Benefit 3 */}
        <div className="glass-card rounded-xl p-6 text-center">
          <div className="bg-gradient-to-br from-[#6342ff] to-[#9b87f5] w-14 h-14 flex items-center justify-center rounded-full mx-auto mb-4">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Improved Conversion</h3>
          <p className="text-gray-300">Timely follow-ups and personalized communications lead to higher customer conversion rates.</p>
        </div>

        {/* Benefit 4 */}
        <div className="glass-card rounded-xl p-6 text-center">
          <div className="bg-gradient-to-br from-[#6342ff] to-[#9b87f5] w-14 h-14 flex items-center justify-center rounded-full mx-auto mb-4">
            <DollarSign className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Cost Effective</h3>
          <p className="text-gray-300">Eliminate the need for dedicated email staff while maintaining exceptional communication quality.</p>
        </div>
      </div>
    </section>
  );
};
