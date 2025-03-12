
interface ContactHeaderProps {
  initialLoad: boolean;
}

export const ContactHeader = ({ initialLoad }: ContactHeaderProps) => {
  return (
    <div className="text-center">
      <h1 className="text-xl font-bold tracking-tight text-white sm:text-3xl mb-1">
        Book a <span className="text-accent">Free</span> Consultation
      </h1>
      
      <p className="text-xs md:text-sm text-gray-300 max-w-4xl mx-auto leading-tight font-bold">
        Ready to put AI agents to work? Book a meeting with <span className="bg-white text-[#6342ff] font-bold px-1 py-0.5 rounded-md">Powered_by</span> Solutions Design Leader.
      </p>
    </div>
  );
};
