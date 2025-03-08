
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const InsuranceHeader = () => {
  return (
    <>
      <div className="absolute inset-0 top-32 h-[500px] z-0">
        <img 
          src="/lovable-uploads/e9a419d6-efff-471a-b7fc-fc3f892e736c.png"
          alt="Insurance Coverage"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#222222] via-transparent to-[#222222]"></div>
      </div>

      <Link 
        to="/demo" 
        className="absolute top-16 left-8 flex items-center text-accent hover:text-accent/80 transition-colors"
      >
        <ArrowLeft className="h-6 w-6 mr-2" />
        <span>Back to Demos</span>
      </Link>

      <img 
        src="/lovable-uploads/403d2bfb-bc52-4ca1-937c-64ab85d08216.png"
        alt="Planter's Insurance"
        className="h-16 mx-auto mb-12"
      />
    </>
  );
};

export default InsuranceHeader;
