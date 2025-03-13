
import React from 'react';
import { InfoCard } from "@/components/ai-agency/InfoCard";
import { MessageSquare, Phone, Cpu, ShieldCheck, Smartphone } from "lucide-react";

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
              Super-charge your outbound calls with AI agents
            </h2>
            
            <div className="space-y-8">
              <InfoCard 
                title="Why OutboundAI?" 
                icon={Phone}
                gradientFrom="blue-600"
                gradientTo="purple-600"
              >
                <div className="space-y-4">
                  <p>OutboundAI addresses the fundamental challenges of outbound calling - volume, consistency, and conversion. Our AI agents can make hundreds of calls simultaneously, following your exact script and sales methodology, while adapting to each conversation naturally. This leads to more meetings booked, more demos scheduled, and ultimately more sales - all while reducing the cost and stress of traditional outbound calling.</p>
                  
                  <div>
                    <h4 className="text-xl font-semibold text-[#9b87f5] mb-2">Key Advantages</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Scale call volume without increasing headcount or burnout</li>
                      <li>Eliminate call reluctance and rejection fatigue with tireless AI agents</li>
                      <li>Consistent messaging and perfect script adherence on every single call</li>
                      <li>Real-time adaptation based on prospect responses and objections</li>
                      <li>100% call recording, transcription and CRM integration</li>
                    </ul>
                  </div>
                </div>
              </InfoCard>

              <InfoCard 
                title="How It Works" 
                icon={Cpu}
                gradientFrom="purple-600"
                gradientTo="pink-600"
              >
                <div className="space-y-4">
                  <p>OutboundAI turns your best sales scripts, talk tracks, and methodologies into an army of natural-sounding AI agents that can scale your outbound operation exponentially. The system integrates with your existing CRM and sales tools, connects to your prospect lists, and begins making calls immediately. Each conversation is unique, personalized, and responsive to the specific prospect and situation.</p>
                  
                  <div>
                    <h4 className="text-xl font-semibold text-[#9b87f5] mb-2">Deployment Steps</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Configure your AI agents with your specific scripts, objection handlers, and call flow</li>
                      <li>Connect to your CRM and prospect data sources</li>
                      <li>Define call scheduling, volume limits, and targeting criteria</li>
                      <li>Monitor performance in real-time through our intuitive dashboard</li>
                      <li>Continuous optimization based on call outcomes and conversion metrics</li>
                    </ul>
                  </div>
                </div>
              </InfoCard>

              <InfoCard 
                title="Industry Use Cases" 
                icon={MessageSquare}
                gradientFrom="green-600"
                gradientTo="blue-600"
              >
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xl font-semibold text-[#9b87f5] mb-2">SaaS Sales</h4>
                    <p>OutboundAI helps SaaS companies efficiently target and qualify prospects at scale, booking more demos and discovery calls while ensuring consistent messaging about product features and benefits.</p>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-semibold text-[#9b87f5] mb-2">Real Estate</h4>
                    <p>For real estate agencies, OutboundAI can handle lead qualification, appointment setting, and follow-ups with potential buyers and sellers, freeing agents to focus on high-value activities like showings and closings.</p>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-semibold text-[#9b87f5] mb-2">Financial Services</h4>
                    <p>OutboundAI enables financial advisors and insurance agents to reach more potential clients, conduct initial qualification calls, and schedule consultations while maintaining compliance with industry regulations.</p>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-semibold text-[#9b87f5] mb-2">Healthcare</h4>
                    <p>For healthcare providers, OutboundAI can handle appointment scheduling, follow-ups, and patient outreach campaigns, ensuring timely care while reducing administrative burden on staff.</p>
                  </div>
                </div>
              </InfoCard>

              <InfoCard 
                title="Compliance Built In" 
                icon={ShieldCheck}
                gradientFrom="yellow-600"
                gradientTo="green-600"
              >
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xl font-semibold text-[#9b87f5] mb-2">TCPA Compliance</h4>
                    <p>OutboundAI is built from the ground up with TCPA compliance in mind. Our system includes automatic do-not-call list checking, call time restrictions by region, and proper disclosure that the call is being made by an AI assistant. All calls comply with federal and state telemarketing regulations.</p>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-semibold text-[#9b87f5] mb-2">Data Security</h4>
                    <p>We maintain SOC 2 compliance and implement bank-level encryption for all data. Your prospect information and call recordings are secured with enterprise-grade protection, ensuring your sensitive business data remains confidential.</p>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-semibold text-[#9b87f5] mb-2">Transparent AI Use</h4>
                    <p>Our AI agents always identify themselves as AI assistants at the beginning of calls, maintaining transparency and building trust with prospects. This approach not only ensures ethical AI use but has been shown to increase engagement and curiosity from prospects.</p>
                  </div>
                </div>
              </InfoCard>

              <InfoCard 
                title="Multi-Channel Integration" 
                icon={Smartphone}
                gradientFrom="red-600"
                gradientTo="orange-600"
              >
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xl font-semibold text-[#9b87f5] mb-2">CRM Integration</h4>
                    <p>OutboundAI seamlessly connects with popular CRM platforms including Salesforce, HubSpot, and Pipedrive. All call activities, outcomes, and follow-up tasks are automatically logged, ensuring your sales data remains complete and up-to-date.</p>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-semibold text-[#9b87f5] mb-2">Calendar Scheduling</h4>
                    <p>Integration with Calendly, Google Calendar, and Microsoft Outlook allows our AI agents to book meetings directly into your sales team's calendars, eliminating the back-and-forth of scheduling.</p>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-semibold text-[#9b87f5] mb-2">Omnichannel Follow-up</h4>
                    <p>After calls, OutboundAI can trigger automated follow-up sequences across email, SMS, and LinkedIn, ensuring prospects receive timely, relevant communication through their preferred channels.</p>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-semibold text-[#9b87f5] mb-2">Analytics & Reporting</h4>
                    <p>Comprehensive reporting and analytics provide insights into call performance, conversion rates, and optimization opportunities. Dashboards can be customized to track the KPIs most important to your business.</p>
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
