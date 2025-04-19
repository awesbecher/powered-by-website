
export const HowItWorksSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#1a0b2e]/50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">How It Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#1a0b2e] rounded-2xl p-6 border border-[#8B5CF6]/20 transform transition-transform hover:scale-105">
            <div className="w-14 h-14 bg-[#8B5CF6]/20 rounded-full flex items-center justify-center text-[#8B5CF6] text-2xl font-bold mb-4">1</div>
            <h3 className="text-xl font-bold text-white mb-3">Trigger</h3>
            <p className="text-gray-300">Customer initiates contact via phone call, website chat, or email to your business.</p>
          </div>
          
          <div className="bg-[#1a0b2e] rounded-2xl p-6 border border-[#8B5CF6]/20 transform transition-transform hover:scale-105">
            <div className="w-14 h-14 bg-[#8B5CF6]/20 rounded-full flex items-center justify-center text-[#8B5CF6] text-2xl font-bold mb-4">2</div>
            <h3 className="text-xl font-bold text-white mb-3">AI Agent Responds</h3>
            <p className="text-gray-300">Custom-trained AI agent engages with natural language, understanding intent and context.</p>
          </div>
          
          <div className="bg-[#1a0b2e] rounded-2xl p-6 border border-[#8B5CF6]/20 transform transition-transform hover:scale-105">
            <div className="w-14 h-14 bg-[#8B5CF6]/20 rounded-full flex items-center justify-center text-[#8B5CF6] text-2xl font-bold mb-4">3</div>
            <h3 className="text-xl font-bold text-white mb-3">Outcome</h3>
            <p className="text-gray-300">Customer inquiries resolved instantly, data captured, and actions taken without human intervention.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
