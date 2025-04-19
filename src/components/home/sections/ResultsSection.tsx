
export const ResultsSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#1a0b2e]/50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4">Results That Matter</h2>
        <p className="text-xl text-gray-300 text-center mb-12 max-w-2xl mx-auto">
          Businesses using our AI agents see dramatic improvements
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              stat: "6x",
              title: "Faster Response",
              description: "Customers get immediate answers without waiting on hold or for email replies."
            },
            {
              stat: "80%",
              title: "Ticket Automation",
              description: "Most common customer inquiries resolved without human intervention."
            },
            {
              stat: "$50k+",
              title: "Saved in Ops",
              description: "Reduced staffing costs while improving customer satisfaction scores."
            }
          ].map((result) => (
            <div key={result.title} className="bg-gradient-to-br from-[#1a0b2e] to-[#2f1c4a] rounded-2xl p-8 text-center transform transition-transform hover:scale-105">
              <div className="text-5xl font-bold text-[#8B5CF6] mb-2">{result.stat}</div>
              <h3 className="text-2xl font-bold text-white mb-4">{result.title}</h3>
              <p className="text-gray-300">{result.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
