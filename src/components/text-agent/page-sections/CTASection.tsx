
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PoweredByText } from "@/components/shared/PoweredByText";

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
            Ready to Put AI Agents to Work?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Book a free consultation with the <PoweredByText /> solutions team to learn how we could quickly implement an AI Text Agent that handles follow-ups, inquiries, and customer communication with remarkable efficiency.
          </p>
          <Link to="/contact">
            <Button 
              className="bg-white hover:bg-gray-100 text-[#6342ff] font-bold px-8 py-6 text-lg rounded-md"
              onClick={handleContact}
            >
              Schedule Your Free Consultation
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
