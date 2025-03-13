
import React from 'react';
import { InfoCard } from "@/components/ai-agency/InfoCard";
import { Cpu, FileText, Users, ShieldCheck } from "lucide-react";

interface ContentSectionsProps {
  initialLoad: boolean;
}

const ContentSections = ({ initialLoad }: ContentSectionsProps) => {
  return (
    <section className="py-6 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
      <div className="relative mt-0 px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className={`text-left transition-all duration-1000 delay-500 ease-out transform
              ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
            <h2 className="relative text-4xl font-bold text-white mb-12 transition-colors duration-300 hover:bg-gradient-to-r hover:from-purple-400 hover:to-indigo-400 hover:bg-clip-text hover:text-transparent pt-0 px-4 pb-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-purple-500 after:to-indigo-500">
              SE coverage for ALL of your customer meetings
            </h2>
            
            <div className="space-y-8">
              <InfoCard 
                title="How It Works" 
                icon={Cpu}
                gradientFrom="blue-600"
                gradientTo="purple-600"
              >
                <div className="space-y-4">
                  <p>Virtual SE connects seamlessly to common meeting platforms such as Zoom, Google Meet, and Microsoft Teams in the same way that Gong or Otter.ai plug into your meetings. Once invited to a call, it listens in real time and responds to technical questions with a remarkably human-like voice. Virtual SE draws from your company's existing product documentation, training materials, and messaging to provide on-the-spot technical explanations. It can also automatically log meeting notes and key takeaways to CRM systems like HubSpot or Salesforce.</p>
                  
                  <div>
                    <h4 className="text-xl font-semibold text-[#9b87f5] mb-2">Deployment Options</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Meeting Assistant: Joins Zoom/Google Meet calls alongside your sales reps to provide real-time technical answers</li>
                      <li>Email Copilot: Drafts technical responses to customer emails, ensuring accuracy and consistency</li>
                      <li>Slack Integration: Available 24/7 to answer sales reps' technical questions about your products</li>
                      <li>Demo Automation: Conducts personalized product demos, freeing up your human SEs for complex engagements</li>
                    </ul>
                  </div>
                </div>
              </InfoCard>

              <InfoCard 
                title="Why It Matters" 
                icon={FileText}
                gradientFrom="purple-600"
                gradientTo="pink-600"
              >
                <div className="space-y-4">
                  <p>SE teams are chronically overloaded, often becoming bottlenecks in the sales process. Virtual SE addresses this challenge by ensuring consistent technical support is available for every sales conversation. Force-multiply your SE team coverage and re-allocate your precious human SE resources to the most high value sales activities.</p>
                  
                  <div>
                    <h4 className="text-xl font-semibold text-[#9b87f5] mb-2">Key Benefits</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Scale Your SE Team: Support 10x more sales conversations without expanding headcount</li>
                      <li>Eliminate Scheduling Conflicts: Never miss a sales opportunity due to SE unavailability</li>
                      <li>Consistent Messaging: Ensure accurate technical information across all customer touchpoints</li>
                      <li>Faster Response Times: Reduce deal friction with immediate technical support</li>
                      <li>Data-Driven Insights: Gain visibility into common technical objections and questions</li>
                    </ul>
                  </div>
                </div>
              </InfoCard>

              <InfoCard 
                title="Use Cases" 
                icon={Users}
                gradientFrom="green-600"
                gradientTo="blue-600"
              >
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xl font-semibold text-[#9b87f5] mb-2">Pre-Sales Support</h4>
                    <p>The Virtual SE joins discovery calls alongside sales reps, automatically addressing technical questions while capturing key requirements and pain points. This allows sales reps to focus on relationship-building while ensuring technical accuracy.</p>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-semibold text-[#9b87f5] mb-2">Product Demos</h4>
                    <p>For standard demos, the Virtual SE can lead personalized product tours, highlighting features relevant to each prospect's specific needs. Your human SEs can then focus on complex, high-value opportunities that require their specialized expertise.</p>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-semibold text-[#9b87f5] mb-2">Technical Qualification</h4>
                    <p>The Virtual SE can join BANT or technical qualification calls to assess fit and potential implementation challenges. It identifies technical requirements, potential integrations, and deployment considerations, providing valuable insights to both sales and SE teams.</p>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-semibold text-[#9b87f5] mb-2">After-Hours Support</h4>
                    <p>The Virtual SE remains available 24/7, allowing global sales teams to receive immediate technical support regardless of time zone differences. This ensures your sales process never stalls due to SE unavailability.</p>
                  </div>
                </div>
              </InfoCard>

              <InfoCard 
                title="Privacy & Compliance" 
                icon={ShieldCheck}
                gradientFrom="yellow-600"
                gradientTo="green-600"
              >
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xl font-semibold text-[#9b87f5] mb-2">Data Security</h4>
                    <p>We understand the sensitive nature of sales conversations. All Virtual SE interactions are processed with enterprise-grade security standards, including SOC 2 Type II compliance and end-to-end encryption. Your data remains yours, and we maintain strict access controls.</p>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-semibold text-[#9b87f5] mb-2">Transparency</h4>
                    <p>The Virtual SE is always introduced as an AI assistant during customer interactions, ensuring full transparency. Customers and prospects are made aware they're interacting with an AI-powered system that complements your human team.</p>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-semibold text-[#9b87f5] mb-2">Ethical AI Use</h4>
                    <p>Our platform is designed to augment human SEs, not replace them. The Virtual SE handles routine technical discussions, freeing your human experts to focus on complex problem-solving, relationship building, and high-value activities that require human judgment and creativity.</p>
                  </div>
                </div>
              </InfoCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentSections;
