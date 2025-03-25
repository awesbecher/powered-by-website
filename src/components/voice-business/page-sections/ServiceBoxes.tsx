
import { useNavigate } from "react-router-dom";

interface ServiceBoxesProps {
  initialLoad: boolean;
  onTryNow?: () => void;
}

export const ServiceBoxes = ({ initialLoad }: ServiceBoxesProps) => {
  const navigate = useNavigate();

  return (
    <div className={`w-full lg:w-1/2 transition-all duration-1000 delay-300 ease-out transform flex flex-col items-start justify-start
      ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
      <div className="grid grid-cols-1 gap-4 w-full">
        {/* Empty container - buttons removed */}
        <div className="p-4"></div>
      </div>
    </div>
  );
}
