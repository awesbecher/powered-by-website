
interface ContactHeaderProps {
  initialLoad: boolean;
}

export const ContactHeader = ({ initialLoad }: ContactHeaderProps) => {
  return (
    <div 
      className={`transition-all duration-1000 ease-out
        ${initialLoad ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
    >
      <h1 className="text-5xl font-bold text-white text-center mb-4">
        <span className="text-[#9b87f5]">Get Started</span> Today
      </h1>
      <p className="text-lg text-white text-center mb-4">
        Ready to put AI agents to work? Book a <span className="text-[#9b87f5] font-bold">Free</span> Consultation with the <span className="bg-white text-[#6342ff] font-bold px-2 py-0.5 rounded-md">Powered_by</span> Team!
      </p>
    </div>
  );
};
