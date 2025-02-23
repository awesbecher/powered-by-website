
import { LucideIcon } from "lucide-react";

interface InfoCardProps {
  title: string;
  icon: LucideIcon;
  gradientFrom: string;
  gradientTo: string;
  children: React.ReactNode;
}

export const InfoCard = ({ title, icon: Icon, gradientFrom, gradientTo, children }: InfoCardProps) => {
  return (
    <div className="relative group">
      <div className={`absolute -inset-1 bg-gradient-to-r from-${gradientFrom} to-${gradientTo} rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200`} />
      <div className="relative p-6 bg-[#1a0b2e] ring-1 ring-gray-900/5 rounded-lg leading-none">
        <div className="flex items-top justify-start space-x-6">
          <Icon className="w-8 h-8 text-purple-400" />
          <div className="space-y-4 w-full">
            <h3 className="text-3xl font-bold text-[#9b87f5] cursor-pointer hover:opacity-80 transition-opacity">
              {title}
            </h3>
            <div className="text-gray-300 text-left opacity-0 h-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-300 overflow-hidden">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
