
import { LucideIcon, Phone } from "lucide-react";

interface ServiceBoxProps {
  icon: LucideIcon;
  category: string;
  businessName: string;
  phoneNumber: string;
}

export const ServiceBox = ({ icon: Icon, category, businessName, phoneNumber }: ServiceBoxProps) => {
  return (
    <div className="relative group cursor-pointer">
      <div className="absolute -inset-1 bg-gradient-to-r from-[#6342ff] to-[#9b87f5] rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
      <div className="relative backdrop-blur-sm bg-gray-900/80 p-6 rounded-xl border border-purple-500/20 shadow-xl h-full flex flex-col justify-between hover:translate-y-[-4px] transition-transform duration-300">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Icon className="text-[#9b87f5] text-xl" />
            <h3 className="font-sans text-lg font-bold text-white leading-tight tracking-wide">
              {category}
            </h3>
          </div>
          <div className="my-2 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          <div className="flex items-center text-xs text-gray-300 mt-3">
            <Phone className="h-3 w-3 mr-1 text-[#9b87f5]" />
            <span className="text-gray-400 font-medium">Call</span>
          </div>
          <div className="font-sans text-sm font-semibold text-[#9b87f5] mb-1">{businessName}</div>
          <div className="text-white font-mono text-sm tracking-wide font-bold">{phoneNumber}</div>
        </div>
      </div>
    </div>
  );
};
