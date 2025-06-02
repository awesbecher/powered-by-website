
import { MessageSquare, ArrowUpRight } from "lucide-react";

export const CaseStudySection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl" id="case-study">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left side - Case study content */}
        <div>
          <div className="inline-block px-3 py-1 mb-6 bg-[#9b87f5]/10 rounded-full border border-[#9b87f5]/20">
            <p className="text-sm text-[#9b87f5] font-medium">Success Story</p>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            How TechSpark Transformed Customer Communications
          </h2>
          
          <div className="space-y-6 text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">The Challenge</h3>
              <p>
                TechSpark, an e-commerce electronics retailer, was struggling with a 12+ hour response time to customer inquiries, leading to lost sales and frustrated customers. With over 200 emails daily, their small team was overwhelmed.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">The Solution</h3>
              <p>
                We deployed a custom AI Email Agent that integrated with their existing systems. The agent was trained on their product catalog, policies, and communication style over a two-week period.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">The Results</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-[#9b87f5] mr-2">•</span>
                  <span>Response time dropped from 12+ hours to under 3 minutes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#9b87f5] mr-2">•</span>
                  <span>Customer satisfaction scores increased by 32%</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#9b87f5] mr-2">•</span>
                  <span>Sales conversion from email inquiries rose by 28%</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#9b87f5] mr-2">•</span>
                  <span>Staff reallocated to higher-value customer service tasks</span>
                </li>
              </ul>
            </div>
            
            <div className="pt-2">
              <blockquote className="italic border-l-4 border-[#9b87f5] pl-4">
                "The AI Email Agent completely transformed our customer communications. We're providing better service with less overhead, and our team can focus on complex customer needs rather than routine email responses."
              </blockquote>
              <p className="mt-2 font-semibold text-white">— Sarah Chen, Customer Experience Director at TechSpark</p>
            </div>
          </div>
        </div>
        
        {/* Right side - Visual representation */}
        <div className="relative">
          <div className="bg-gradient-to-br from-[#1a0b2e] to-[#16151d] rounded-xl p-6 border border-gray-700 overflow-hidden">
            {/* Before/After comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Before */}
              <div className="p-5 bg-[#1a1a2e] rounded-lg border border-red-500/30">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-lg font-semibold text-white">Before</h4>
                  <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded">12+ hours</span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <div className="mt-1 flex-shrink-0">
                      <div className="w-6 h-6 rounded-full bg-gray-700"></div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">8:42 AM</p>
                      <div className="p-2 bg-gray-800 rounded text-sm text-gray-300 mt-1">
                        Hello, I'd like to know if the XPS 15 is in stock?
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 justify-end">
                    <div className="text-right">
                      <p className="text-sm text-gray-400">9:15 PM</p>
                      <div className="p-2 bg-gray-700 rounded text-sm text-gray-300 mt-1">
                        Hi there, yes we do have the XPS 15 in stock currently. Would you like to place an order?
                      </div>
                    </div>
                    <div className="mt-1 flex-shrink-0">
                      <div className="w-6 h-6 rounded-full bg-blue-700"></div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 text-xs text-gray-500 text-center">Customer already purchased elsewhere</div>
              </div>
              
              {/* After */}
              <div className="p-5 bg-[#1a1a2e] rounded-lg border border-green-500/30">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-lg font-semibold text-white">After</h4>
                  <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">3 mins</span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <div className="mt-1 flex-shrink-0">
                      <div className="w-6 h-6 rounded-full bg-gray-700"></div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">8:42 AM</p>
                      <div className="p-2 bg-gray-800 rounded text-sm text-gray-300 mt-1">
                        Hello, I'd like to know if the XPS 15 is in stock?
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 justify-end">
                    <div className="text-right">
                      <p className="text-sm text-gray-400">8:45 AM</p>
                      <div className="p-2 bg-[#9b87f5]/20 rounded text-sm text-gray-300 mt-1 border border-[#9b87f5]/30">
                        Hi there! Yes, we have the XPS 15 in stock and ready to ship today. Would you like me to reserve one for you or answer any questions about specifications?
                      </div>
                    </div>
                    <div className="mt-1 flex-shrink-0">
                      <div className="w-6 h-6 rounded-full bg-[#9b87f5] flex items-center justify-center">
                        <MessageSquare className="w-3 h-3 text-white" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <div className="mt-1 flex-shrink-0">
                      <div className="w-6 h-6 rounded-full bg-gray-700"></div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">8:47 AM</p>
                      <div className="p-2 bg-gray-800 rounded text-sm text-gray-300 mt-1">
                        Great! What's the price with the student discount?
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 text-xs text-green-500 text-center">Converted to sale same day</div>
              </div>
            </div>
            
            {/* Metrics */}
            <div className="mt-6 grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-[#9b87f5]">32%</p>
                <p className="text-xs text-gray-400">Customer Satisfaction</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#9b87f5]">28%</p>
                <p className="text-xs text-gray-400">Conversion Rate</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#9b87f5]">99.6%</p>
                <p className="text-xs text-gray-400">Response Accuracy</p>
              </div>
            </div>
          </div>
          
          {/* Decorative element */}
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#9b87f5]/10 rounded-full blur-xl z-0"></div>
        </div>
      </div>
    </section>
  );
};
