
import { DollarSign, Clock, Users, BarChart } from "lucide-react";

export const ROISection = () => {
  const metrics = [
    {
      icon: <Clock className="h-8 w-8 text-[#9b87f5]" />,
      value: "15+ hrs",
      label: "Saved Weekly",
      description: "Time reclaimed from email management"
    },
    {
      icon: <DollarSign className="h-8 w-8 text-[#9b87f5]" />,
      value: "60%",
      label: "Cost Reduction",
      description: "Compared to hiring additional staff"
    },
    {
      icon: <Users className="h-8 w-8 text-[#9b87f5]" />,
      value: "3x",
      label: "Customer Capacity",
      description: "Handle more inquiries without adding headcount"
    },
    {
      icon: <BarChart className="h-8 w-8 text-[#9b87f5]" />,
      value: "28%",
      label: "Conversion Increase",
      description: "Due to faster response times"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl" id="roi">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Measurable Business Impact</h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          See the tangible return on investment our AI Email Agent delivers for businesses like yours.
        </p>
      </div>
      
      {/* ROI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-[#1a1a2e] border border-gray-700 rounded-xl p-6 text-center">
            <div className="flex justify-center mb-3">
              <div className="w-16 h-16 rounded-full bg-[#9b87f5]/10 flex items-center justify-center">
                {metric.icon}
              </div>
            </div>
            <div className="text-3xl font-bold text-[#9b87f5] mb-1">{metric.value}</div>
            <div className="text-white font-medium mb-2">{metric.label}</div>
            <p className="text-gray-400 text-sm">{metric.description}</p>
          </div>
        ))}
      </div>
      
      {/* Cost Comparison */}
      <div className="mt-16 bg-gradient-to-r from-[#1a0b2e] to-[#13151a] rounded-xl p-8 border border-gray-700">
        <h3 className="text-2xl font-bold text-white mb-6 text-center">Cost Comparison: AI vs. Traditional Solutions</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Traditional Solution */}
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <Users className="h-12 w-12 text-gray-400" />
              <h4 className="text-xl font-semibold text-white ml-3">Traditional Approach</h4>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-red-500 mr-2">✕</span>
                <span className="text-gray-300">$4,000+ monthly for dedicated email staff</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">✕</span>
                <span className="text-gray-300">Limited to business hours availability</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">✕</span>
                <span className="text-gray-300">Inconsistent response quality</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">✕</span>
                <span className="text-gray-300">No automatic scaling capacity</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">✕</span>
                <span className="text-gray-300">Manual data entry into CRM systems</span>
              </li>
            </ul>
          </div>
          
          {/* AI Solution */}
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <Bot className="h-12 w-12 text-[#9b87f5]" />
              <h4 className="text-xl font-semibold text-white ml-3">AI Email Agent</h4>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-gray-300">Fraction of the cost of dedicated staff</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-gray-300">24/7/365 availability without overtime costs</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-gray-300">Consistently on-brand communication</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-gray-300">Instant scaling for busy periods</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-gray-300">Automatic system updates and integrations</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

// For Lucide icon imports
import { Bot } from "lucide-react";
