
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
        Please find a time to meet using the calendar below.
      </p>
    </div>
  );
};
