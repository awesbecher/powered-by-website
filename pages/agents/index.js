import { useRouter } from 'next/router';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const agents = [
  {
    name: 'Auto Dealership Assistant',
    industry: 'Automotive',
    description: 'Handles test drive bookings, hours, financing FAQs, and escalations to live sales agents.',
    template: 'auto',
  },
  {
    name: 'Hotel Booking Concierge',
    industry: 'Hospitality',
    description: 'Manages room bookings, amenities FAQs, and routes VIP callers to front desk.',
    template: 'hotel',
  },
  {
    name: 'Real Estate Scheduler',
    industry: 'Real Estate',
    description: 'Answers buyer questions, books showings, and forwards to the listing agent for serious leads.',
    template: 'realestate',
  },
  {
    name: 'Insurance Claims Assistant',
    industry: 'Insurance',
    description: 'Answers coverage FAQs, guides claim submission, and routes urgent cases to live adjusters.',
    template: 'insurance',
  },
  {
    name: 'SaaS Product Demo Bot',
    industry: 'SaaS',
    description: 'Explains product features, handles objections, and books demos with your sales team.',
    template: 'saas',
  },
];

export default function AgentMarketplace() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e] text-white">
      <Navbar />
      <div className="p-8 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-purple-400">Powered_by GPT Agent Marketplace</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent, idx) => (
            <div key={idx} className="bg-gray-900 p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <h2 className="text-xl font-semibold text-purple-300 mb-1">{agent.name}</h2>
              <p className="text-sm text-gray-300 italic mb-2">{agent.industry}</p>
              <p className="text-sm text-gray-100 mb-4">{agent.description}</p>
              <button
                onClick={() => router.push(`/agent-gpt-builder?template=${agent.template}`)}
                className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded text-white"
              >
                View Setup
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
