
import { Phone, Bot, Calendar, BarChart } from "lucide-react";

const StepCard = ({ 
  number, 
  icon, 
  title, 
  description 
}: { 
  number: number; 
  icon: React.ReactNode;
  title: string; 
  description: string;
}) => {
  return (
    <div className="relative">
      {/* Connecting line between steps */}
      {number < 4 && (
        <div className="hidden lg:block absolute top-16 left-[50%] w-full h-0.5 bg-gradient-to-r from-[#9b87f5] to-transparent"></div>
      )}
      
      <div className="flex flex-col items-center text-center relative z-10">
        <div className="bg-[#1a1a24] border-2 border-[#9b87f5] w-12 h-12 rounded-full flex items-center justify-center mb-2">
          <span className="text-lg font-bold text-white">{number}</span>
        </div>
        <div className="bg-[#1a1a24]/80 p-6 rounded-xl border border-gray-800 w-full">
          <div className="bg-gradient-to-br from-[#6342ff]/20 to-[#9b87f5]/20 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
            {icon}
          </div>
          <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
          <p className="text-gray-300 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};

export const HowItWorksSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl relative">
      {/* Background gradients */}
      <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-64 h-64 rounded-full bg-[#6342ff]/10 blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-64 h-64 rounded-full bg-[#9b87f5]/10 blur-3xl"></div>
      </div>
      
      <div className="relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-xl text-gray-300">
            Our AI Receptionist seamlessly handles your calls from greeting to completion
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 gap-y-12">
          <StepCard 
            number={1}
            icon={<Phone className="w-8 h-8 text-[#9b87f5]" />}
            title="Customer Calls"
            description="A customer calls your business line, which is connected to our AI system."
          />
          
          <StepCard 
            number={2}
            icon={<Bot className="w-8 h-8 text-[#9b87f5]" />}
            title="AI Answers & Qualifies"
            description="Our AI Receptionist greets the caller and determines their needs through natural conversation."
          />
          
          <StepCard 
            number={3}
            icon={<Calendar className="w-8 h-8 text-[#9b87f5]" />}
            title="Schedule or Route"
            description="Based on the conversation, the AI schedules appointments or transfers to the right team member."
          />
          
          <StepCard 
            number={4}
            icon={<BarChart className="w-8 h-8 text-[#9b87f5]" />}
            title="Analytics & Insights"
            description="Gain valuable data on call volume, types of inquiries, and conversion rates."
          />
        </div>
        
        <div className="mt-20 text-center">
          <div className="inline-block bg-[#1a0b2e] p-6 rounded-xl border border-[#9b87f5]/20">
            <h3 className="text-2xl font-bold text-white mb-3">Implementation Timeline</h3>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:divide-x divide-gray-700">
              <div className="px-6">
                <div className="text-2xl font-bold text-[#9b87f5]">1 Day</div>
                <p className="text-gray-300 text-sm">Average setup time</p>
              </div>
              
              <div className="px-6">
                <div className="text-2xl font-bold text-[#9b87f5]">Zero</div>
                <p className="text-gray-300 text-sm">Technical knowledge required</p>
              </div>
              
              <div className="px-6">
                <div className="text-2xl font-bold text-[#9b87f5]">Immediate</div>
                <p className="text-gray-300 text-sm">Results after activation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
