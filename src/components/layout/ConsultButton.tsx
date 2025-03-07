
import { Link } from "react-router-dom";

interface ConsultButtonProps {
  show: boolean;
}

const ConsultButton = ({ show }: ConsultButtonProps) => {
  if (!show) return null;
  
  return (
    <Link
      to="/contact"
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#9b87f5] hover:bg-[#8b77e5] transition-colors duration-200"
    >
      Book a Free Consultation
    </Link>
  );
};

export default ConsultButton;
