
import { serviceCardsData } from "@/data/serviceCardsData";

export const ProductIndex = () => {
  const scrollToSection = (index: number) => {
    const element = document.getElementById(`section-${index}`);
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-16">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {serviceCardsData.map((card, index) => (
          <button
            key={index}
            onClick={() => scrollToSection(index)}
            className="relative z-10 p-4 rounded-lg bg-white/5 border border-white/10 hover:border-accent/50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/5 cursor-pointer text-left"
          >
            <div className="flex items-center gap-3 mb-2">
              <card.icon className="h-5 w-5 text-accent" />
              <h3 className="text-sm font-semibold text-white">
                {card.title.main.replace(':', '')}
              </h3>
            </div>
            <p className="text-xs text-gray-400">{card.title.sub}</p>
          </button>
        ))}
      </div>
    </div>
  );
};
