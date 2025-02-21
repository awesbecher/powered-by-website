
import { WordAnimation } from "@/components/home/WordAnimation";

const Index = () => {
  return (
    <div className="min-h-screen w-full bg-[#222222]">
      {/* Logo */}
      <div className="absolute top-6 right-6 lg:right-8">
        <img 
          src="/lovable-uploads/e8881317-eed8-45df-8a8d-34509d6701c6.png"
          alt="Parlar Logo"
          className="w-[192px] lg:w-[288px] h-auto"
        />
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden px-6 lg:px-8 pt-24 pb-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
              <WordAnimation />
              Automation{" "}
              <span className="text-white">
                Simplified
              </span>
            </h1>
          </div>
        </div>
        
        {/* Gradient orbs for visual interest */}
        <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl opacity-20" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent/30 blur-3xl opacity-20" />
      </div>
    </div>
  );
};

export default Index;
