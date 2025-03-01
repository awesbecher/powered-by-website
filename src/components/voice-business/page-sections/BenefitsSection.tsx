
interface BenefitItemProps {
  number: string;
  title: string;
  description: string;
}

const BenefitItem = ({ number, title, description }: BenefitItemProps) => {
  return (
    <div className="flex gap-4">
      <div className="text-3xl font-bold text-[#9b87f5]">{number}</div>
      <div>
        <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </div>
  );
};

export const BenefitsSection = () => {
  return (
    <section className="py-10 bg-[#121218] px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-4">
          Business Benefits of AI Receptionist
        </h2>
        <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto mb-12">
          Say goodbye to missed calls and missed opportunities. By staying available around the clock, our AI Receptionist ensures your business captures every lead, books every appointment, and fields every customer query—no matter the time of day.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <BenefitItem 
              number="01"
              title="Reduce Operational Costs"
              description="Hiring, training, and managing receptionist staff costs time and money. Our AI Receptionist seamlessly plugs into your existing phone system to reduce overhead and keep your attention where it belongs: growing your business."
            />
            <BenefitItem 
              number="02"
              title="Eliminate Hold Times"
              description="Answer every call on the first ring, even during peak hours, reducing abandonment rates by up to 90%."
            />
            <BenefitItem 
              number="03"
              title="Data-Driven Insights"
              description="Gain valuable business intelligence from every customer interaction through comprehensive call analytics."
            />
          </div>
          <div className="space-y-8">
            <BenefitItem 
              number="04"
              title="Consistent Customer Experience"
              description="Deliver the same high-quality service to every caller, regardless of time, day, or call volume."
            />
            <BenefitItem 
              number="05"
              title="Improve Agent Satisfaction"
              description="Free your human agents from repetitive calls, allowing them to focus on complex, high-value interactions."
            />
            <BenefitItem 
              number="06"
              title="Scale Without Hiring"
              description="Expand your business operations without the need to hire, train, and manage additional call center staff."
            />
          </div>
        </div>
      </div>
    </section>
  );
};
