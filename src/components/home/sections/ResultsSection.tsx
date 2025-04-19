
export const ResultsSection = () => {
  const stats = [
    { number: "6x", label: "Faster Lead Response" },
    { number: "80%", label: "of Support Automated" },
    { number: "$50k+", label: "Saved in Ops" }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-[#1a1a2e] rounded-2xl p-8 border border-white/10 text-center"
            >
              <div className="text-4xl sm:text-5xl font-bold text-[#8B5CF6] mb-2">
                {stat.number}
              </div>
              <div className="text-lg text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <blockquote className="text-xl text-gray-300 italic max-w-2xl mx-auto">
            "The AI agent has transformed how we handle customer inquiries. It's like having a full-time team member who never sleeps."
          </blockquote>
        </div>
      </div>
    </section>
  );
};
