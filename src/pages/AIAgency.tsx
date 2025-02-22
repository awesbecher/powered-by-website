
import { Bot } from "lucide-react";

const AIAgency = () => {
  const capabilities = [
    {
      title: "Exploration & Discovery",
      color: "from-[#1a0f4d] to-[#2a1f6d]",
      textColor: "text-white",
      points: [
        "Data cleaning & enrichment",
        "Conversational analytics & Ad-hoc Analysis",
        "Hypothesis generation/testing"
      ]
    },
    {
      title: "Pattern Recognition",
      color: "from-[#6952e9] to-[#8975ff]",
      textColor: "text-white",
      points: [
        "Automated insights generation",
        "Anomaly detection",
        "Root Cause Analysis"
      ]
    },
    {
      title: "Advanced Analytics",
      color: "from-[#2dd4bf] to-[#5eead4]",
      textColor: "text-gray-800",
      points: [
        "Real-time analytics",
        "Predictive analytics",
        "Prescriptive / What-If Scenario planning"
      ]
    },
    {
      title: "Augmentation & Automation",
      color: "from-[#fb923c] to-[#fdba74]",
      textColor: "text-gray-800",
      points: [
        "Automated report generation",
        "Automated Narratives/Summaries",
        "Multistep complex analysis workflows"
      ]
    },
    {
      title: "Hyper Personalization",
      color: "from-[#4b5563] to-[#6b7280]",
      textColor: "text-white",
      points: [
        "Individual user profiling",
        "Behavioral analytics",
        "Personalized recommendations"
      ]
    }
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e] pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto relative">
        {/* Center Circle with Robot */}
        <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] mx-auto mb-8">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 shadow-lg flex flex-col items-center justify-center p-8">
            <Bot className="w-24 h-24 md:w-32 md:h-32 text-[#9b87f5] mb-4" />
            <h1 className="text-2xl md:text-4xl font-bold text-white text-center mb-2">AI Agents for Analytics</h1>
            <div className="text-sm md:text-base text-gray-300 text-center">
              Goals | Planning | Memory
              <br />
              Tools | Learning | Workflows
              <br />
              Multi-agent Collaboration
            </div>
          </div>
        </div>

        {/* Capability Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {capabilities.map((capability, index) => (
            <div
              key={index}
              className={`rounded-2xl p-6 bg-gradient-to-br ${capability.color} shadow-lg transform transition-transform hover:scale-105`}
            >
              <h3 className={`text-xl font-bold mb-4 ${capability.textColor}`}>
                {capability.title}
              </h3>
              <ul className={`space-y-2 ${capability.textColor}`}>
                {capability.points.map((point, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Left Side Labels */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 space-y-4 hidden lg:block">
          <div className="bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-lg text-white">DATA</div>
          <div className="bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-lg text-white">MODELS</div>
          <div className="bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-lg text-white">PLATFORM</div>
        </div>
      </div>
    </div>
  );
};

export default AIAgency;
