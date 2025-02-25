
import { Car, DollarSign, Wrench } from "lucide-react";

const ServicesGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
      <div className="bg-black/50 rounded-lg p-4 backdrop-blur-sm border border-white/10">
        <Car className="w-6 h-6 mb-3 text-[#9b87f5]" />
        <h3 className="text-lg font-semibold mb-2 text-white">New Vehicles</h3>
        <p className="text-white text-sm">Explore our full lineup of new Mercedes-Benz vehicles.</p>
      </div>
      <div className="bg-black/50 rounded-lg p-4 backdrop-blur-sm border border-white/10">
        <DollarSign className="w-6 h-6 mb-3 text-[#9b87f5]" />
        <h3 className="text-lg font-semibold mb-2 text-white">Financing</h3>
        <p className="text-white text-sm">Competitive lease and finance options.</p>
      </div>
      <div className="bg-black/50 rounded-lg p-4 backdrop-blur-sm border border-white/10">
        <Wrench className="w-6 h-6 mb-3 text-[#9b87f5]" />
        <h3 className="text-lg font-semibold mb-2 text-white">Service Center</h3>
        <p className="text-white text-sm">Factory-trained technicians and parts.</p>
      </div>
    </div>
  );
};

export default ServicesGrid;
