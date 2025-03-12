
interface ContactHeaderProps {
  initialLoad: boolean;
}

export const ContactHeader = ({ initialLoad }: ContactHeaderProps) => {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl mb-3">
        Book a <span className="text-accent">Free</span> Consultation Meeting
      </h1>
      
      <p className="text-base md:text-lg text-gray-300 max-w-4xl mx-auto leading-snug font-bold">
        Ready to put AI agents to work? Book a Free Consultation with the <span className="bg-white text-[#6342ff] font-bold px-2 py-0.5 rounded-md">Powered_by</span> Solutions Design Leader. In this 30-minute meeting, we'll help you build your AI vision and review your project needs.
      </p>
    </div>
  );
};
