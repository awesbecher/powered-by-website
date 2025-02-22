import { WordAnimation } from "@/components/home/WordAnimation";
import { ServiceCard } from "@/components/home/ServiceCard";
import { services, additionalServices } from "@/data/services";
const Demo = () => {
  return <div className="min-h-screen w-full bg-[#222222] pt-24">
      {/* Hero Section */}
      <div className="relative overflow-hidden px-6 lg:px-8 pb-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
              We have <span className="text-[#9b87f5]">demos</span>! Now go have fun.
            </h1>
            <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-bold">Parlar AI's agents can automate and improve even your most complex customer-facing or internal tasks. See our AI agents in action by selecting any of the use cases below.</p>
          </div>
        </div>
        
        {/* Gradient orbs for visual interest */}
        <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl opacity-20" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent/30 blur-3xl opacity-20" />
      </div>

      {/* Services Grid */}
      <div className="relative px-4 lg:px-6 space-y-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            {services.map(service => <ServiceCard key={service.title} {...service} />)}
          </div>
        </div>

        {/* Additional Services Grid */}
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            {additionalServices.map(service => <ServiceCard key={service.title} {...service} />)}
          </div>
        </div>
      </div>
    </div>;
};
export default Demo;