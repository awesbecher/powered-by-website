
import { Link } from "react-router-dom";
import Navigation from "../../components/Navigation";

const InsuranceDemo = () => {
  return (
    <div className="min-h-screen w-full bg-[#222222]">
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 lg:px-8 py-6">
        <Link to="/">
          <img 
            src="/lovable-uploads/e8881317-eed8-45df-8a8d-34509d6701c6.png"
            alt="Parlar Logo"
            className="w-[192px] lg:w-[288px] h-auto"
          />
        </Link>
        <Navigation />
      </div>

      <div className="relative pt-32 pb-16 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
              Insurance AI Agent Demo
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300 max-w-2xl mx-auto">
              See how our AI handles policy inquiries, claims processing, and customer support.
            </p>
          </div>

          <div className="mt-12 max-w-3xl mx-auto bg-black/50 rounded-xl p-6">
            <div className="text-center text-white">
              Demo interface coming soon...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsuranceDemo;
