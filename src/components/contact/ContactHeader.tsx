
interface ContactHeaderProps {
  initialLoad: boolean;
}

export const ContactHeader = ({ initialLoad }: ContactHeaderProps) => {
  return (
    <div className="text-center">
      <h1 
        className={`text-4xl font-bold tracking-tight text-white sm:text-6xl mb-4 transition-all duration-1000 ease-out transform
          ${initialLoad ? 'opacity-0 translate-x-8 -translate-y-8' : 'opacity-100 translate-x-0 translate-y-0'}`}
      >
        Book a <span className="text-accent">Free</span> Consultation Meeting
      </h1>
      
      <p 
        className={`mt-4 text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-snug font-bold transition-all duration-1000 delay-300 ease-out transform
          ${initialLoad ? 'opacity-0 translate-x-8 -translate-y-8' : 'opacity-100 translate-x-0 translate-y-0'}`}
      >
        Ready to put AI agents to work? Book a Free Consultation with our Solutions Design Leader. In this 30-minute meeting, we'll help you build your AI vision and review your project needs.
      </p>
    </div>
  );
};
