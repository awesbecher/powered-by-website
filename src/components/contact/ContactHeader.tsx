
interface ContactHeaderProps {
  initialLoad: boolean;
}

export const ContactHeader = ({ initialLoad }: ContactHeaderProps) => {
  return (
    <div 
      className={`transition-all duration-1000 ease-out
        ${initialLoad ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
    >
      <h1 className="text-6xl font-bold text-white text-center mb-10">
        <span className="text-[#9b87f5]">Get Started</span> Today
      </h1>
      <p className="text-xl text-white text-center mb-8">
        Ready to put AI agents to work? Want to find a good use case? Book a <span className="text-[#9b87f5] font-bold">Free</span><br />
        Consultation with the <span className="bg-white text-[#6342ff] font-bold px-2 py-0.5 rounded-md">Powered_by</span> Solutions Design Team to get started!
      </p>
    </div>
  );
};
