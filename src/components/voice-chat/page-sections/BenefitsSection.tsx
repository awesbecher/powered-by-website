
interface BenefitItemProps {
  number: string;
  title: string;
  description: string;
}

const BenefitItem = ({ number, title, description }: BenefitItemProps) => {
  return (
    <div className="flex gap-6">
      <div className="text-3xl font-bold text-[#9b87f5]">{number}</div>
      <div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </div>
  );
};

export const BenefitsSection = () => {
  return (
    <section className="py-16 bg-[#121218] px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-16">
          Why Businesses Choose Our Voice AI
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-12">
            <BenefitItem 
              number="01"
              title="Reduce Support Costs"
              description="Cut customer service costs by up to 60% while improving service quality and availability."
            />
            <BenefitItem 
              number="02"
              title="Increase Conversion Rates"
              description="Engage website visitors with interactive voice experiences that convert up to 30% better than static forms."
            />
            <BenefitItem 
              number="03"
              title="Gather Rich Customer Data"
              description="Collect actionable insights from voice conversations to improve your products and services."
            />
          </div>
          <div className="space-y-12">
            <BenefitItem 
              number="04"
              title="Scale Your Team Instantly"
              description="Handle peak demand periods without hiring additional staff. Your AI assistant scales with your business."
            />
            <BenefitItem 
              number="05"
              title="Enhance Customer Experience"
              description="Create memorable interactions that build trust and loyalty with your brand."
            />
            <BenefitItem 
              number="06"
              title="Automate Routine Tasks"
              description="Free your human team to focus on complex problems while AI handles frequent inquiries."
            />
          </div>
        </div>
      </div>
    </section>
  );
};
