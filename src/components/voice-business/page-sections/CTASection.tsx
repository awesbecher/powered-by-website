
import { Button } from "@/components/ui/button";

interface CTASectionProps {
  handleContact: () => void;
}

export const CTASection = ({ handleContact }: CTASectionProps) => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
      <div className="relative overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-[#6342ff] to-[#a87cff] opacity-90"></div>
        <div className="relative z-10 px-8 py-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Curious About Adding an AI Receptionist to Your Business?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Book a free consultation with the <span className="bg-white text-[#6342ff] font-bold px-2 py-0.5 rounded-md">Powered_by</span> solutions team to learn how we could quickly and frictionlessly deliver you a receptionist that is remarkably human-like, lightning-fast, and always on.
          </p>
          <Button 
            className="bg-white hover:bg-gray-100 text-[#6342ff] font-bold px-8 py-6 text-lg rounded-md"
            onClick={handleContact}
          >
            Schedule Your Free Consultation
          </Button>
        </div>
      </div>
    </section>
  );
};
