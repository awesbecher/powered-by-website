
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
      <div className="w-full">
        {/* Tally form embed */}
        <div className="border border-white rounded-3xl p-5 overflow-hidden">
          <iframe
            src="https://tally.so/embed/3y14y0?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
            width="100%"
            height="500"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            title="Contact Form"
            data-tally-src="https://tally.so/embed/3y14y0?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
          ></iframe>
        </div>
      </div>
    </div>
  );
};
