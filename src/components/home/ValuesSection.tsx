
export const ValuesSection = () => {
  const values = [
    {
      title: "Unique AI Agency Model",
      description: "Just as web design agencies once transformed businesses for the web, we're here to revolutionize how SMBs connect, work, and grow without adding more humans or cost overhead."
    },
    {
      title: "Client Obsessed from Day One",
      description: "Think of us as your creative AI partner. We take the time to understand your business, your customers, and your goals, then craft AI agent-enabled workflows that simply work."
    },
    {
      title: "Commitment to Excellence",
      description: "For us, project excellence isn't a choice. It's the foundation of everything we do. From voice automation to systems integration, we're dedicated to delivering exceptional quality, because your success is the measure of ours."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 -mt-48">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
        {values.map((value, index) => (
          <div key={index} className="relative pb-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-[#9b87f5] rounded-sm" />
              <h3 className="text-2xl font-bold text-white">{value.title}</h3>
            </div>
            <p className="text-gray-300 text-base leading-relaxed">
              {value.description}
            </p>
            <div className="absolute -bottom-2 left-0 right-0 h-px bg-white/10" />
          </div>
        ))}
      </div>
    </div>
  );
};
