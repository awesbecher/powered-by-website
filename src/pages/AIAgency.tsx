import { useState, useEffect } from "react";
const AIAgency = () => {
  const [initialLoad, setInitialLoad] = useState(true);
  useEffect(() => {
    setInitialLoad(false);
  }, []);
  return <div className="min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e] pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden px-6 lg:px-8 pt-12 pb-8">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <h1 className={`text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6 transition-all duration-1000 ease-out transform
                  ${initialLoad ? 'opacity-0 translate-x-8 -translate-y-8' : 'opacity-100 translate-x-0 translate-y-0'}`}>
                Just Like a Web Design Firm. But with <span className="text-[#9b87f5]">much cooler tech</span>.
              </h1>
              
              <p className={`mt-4 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-bold transition-all duration-1000 delay-300 ease-out transform
                  ${initialLoad ? 'opacity-0 translate-x-8 -translate-y-8' : 'opacity-100 translate-x-0 translate-y-0'}`}>
                For mom-and-pop shops to mid-sized corporates, you think of a workflow to automate or a task to agent-enable and we'll build it.
              </p>
            </div>
          </div>
          
          <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl opacity-20" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent/30 blur-3xl opacity-20" />
        </div>

        <div className="relative mt-8 px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className={`text-left transition-all duration-1000 delay-500 ease-out transform
                ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
              <h2 className="text-5xl font-bold text-white mb-8 whitespace-nowrap bg-gradient-to-r from-purple-500/20 to-purple-400/20 inline-block px-4 py-2 rounded-lg hover:bg-gradient-to-r hover:from-purple-500/30 hover:to-purple-400/30 transition-all">
                We're the world's first AI agency.
              </h2>
              
              <div className="space-y-8 text-lg text-gray-300 leading-relaxed text-justify mt-4">
                <p>We design and deploy intelligent agents tailored from the ground up to fit your unique needs—whether it's voice-driven phone assistants, email automation bots, text-based support, Slack integrations, or chatbots that speak and communicate as human-like as possible. Our mission? To automate the repetitive, amplify the human, and supercharge your workflows with AI that feels like it was made just for you—because it was.</p>
                
                <p className="font-medium text-white">
                  Think of us as your creative AI partner. We take the time to understand your business, your customers, and your goals, then craft AI agent-enabled workflows that simply work.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mt-12 px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <hr className="border-t-2 border-gray-600/70 mb-8" />
            <div className={`text-left transition-all duration-1000 delay-700 ease-out transform
                ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
              <h2 className="text-5xl font-bold text-white mb-8 whitespace-nowrap bg-gradient-to-r from-purple-500/20 to-purple-400/20 inline-block px-4 py-2 rounded-lg hover:bg-gradient-to-r hover:from-purple-500/30 hover:to-purple-400/30 transition-all">
                What's an AI Agent?
              </h2>
              
              <div className="space-y-8 text-lg text-gray-300 leading-relaxed text-justify">
                <p>Think of an AI agent as a super-smart, tireless assistant that handles tasks for you, without the coffee breaks. Companies like OpenAI &amp; Anthropic are at the forefront of innovating AI agents to be state of the art. We bring these capabilities to SMBs who may not have the budget or resources to build agent solutions themselves. We deliver agent software that listens, learns, and acts, whether it's speaking on the phone with customers, sending emails, or organizing your workflow. No sci-fi jargon here, just practical, custom-built help for your business. </p>
                
                <p className="font-medium text-white">
                  The best part? They work 24/7, never take vacations, and can handle multiple tasks simultaneously. It's like having a tireless team member who's always ready to help.
                </p>
                <hr className="border-t-2 border-gray-600/70 mt-8" />
              </div>
            </div>
          </div>
        </div>

        <div className="relative mt-12 px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className={`text-left transition-all duration-1000 delay-900 ease-out transform
                ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
              <h2 className="text-5xl font-bold text-white mb-8 whitespace-nowrap bg-gradient-to-r from-purple-500/20 to-purple-400/20 inline-block px-4 py-2 rounded-lg hover:bg-gradient-to-r hover:from-purple-500/30 hover:to-purple-400/30 transition-all">
                Where Do They Fit?
              </h2>
              
              <div className="space-y-8 text-lg text-gray-300 leading-relaxed">
                <p className="text-justify">Everywhere your business touches customers or requires tireless manual work:</p>
                
                <ul className="space-y-4 list-none pl-4">
                  <li className="flex items-start">
                    <span className="font-medium text-white mr-2">Voice:</span>
                    Answer calls with a friendly, human-like vibe.
                  </li>
                  <li className="flex items-start">
                    <span className="font-medium text-white mr-2">Email:</span>
                    Sort, respond, and follow up automatically.
                  </li>
                  <li className="flex items-start">
                    <span className="font-medium text-white mr-2">Text/Slack/Chatbots:</span>
                    Handle inquiries on the spot.
                  </li>
                  <li className="flex items-start">
                    <span className="font-medium text-white mr-2">Back office:</span>
                    Streamline scheduling, invoicing, or inventory.
                  </li>
                </ul>
                <hr className="border-t-2 border-gray-600/70 mt-8" />
              </div>
            </div>
          </div>
        </div>

        <div className="relative mt-12 px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className={`text-left transition-all duration-1000 delay-1100 ease-out transform
                ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
              <h2 className="text-5xl font-bold text-white mb-8 whitespace-nowrap bg-gradient-to-r from-purple-500/20 to-purple-400/20 inline-block px-4 py-2 rounded-lg hover:bg-gradient-to-r hover:from-purple-500/30 hover:to-purple-400/30 transition-all">
                How Do They Work?
              </h2>
              
              <div className="space-y-8 text-lg text-gray-300 leading-relaxed text-justify">
                <p>We build them from scratch to match your needs. You tell us your pain points; we craft an AI agent that talks your language, integrates with your tools, and gets stuff done. No tech degree required—just a business ready to grow.</p>
                <hr className="border-t-2 border-gray-600/70 mt-8" />
              </div>
            </div>
          </div>
        </div>

        <div className="relative mt-12 px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className={`text-left transition-all duration-1000 delay-1300 ease-out transform
                ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
              <h2 className="text-5xl font-bold text-white mb-8 whitespace-nowrap bg-gradient-to-r from-purple-500/20 to-purple-400/20 inline-block px-4 py-2 rounded-lg hover:bg-gradient-to-r hover:from-purple-500/30 hover:to-purple-400/30 transition-all">
                What New Opportunities are Unleashed?
              </h2>
              
              <div className="space-y-8 text-lg text-gray-300 leading-relaxed">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Workflow Automation</h3>
                    <p className="text-justify">Say goodbye to manual data entry, appointment juggling, or chasing leads. AI agents can manage bookings, track orders, or nudge customers for feedback—all hands-free.</p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Cost Efficiencies</h3>
                    <p className="text-justify">Slash labor costs on routine tasks. One AI agent can do the work of many, without overtime or burnout.</p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Enhanced Customer Experience</h3>
                    <p className="text-justify">Deliver instant replies, personalized service, and a "wow" factor that keeps people coming back—no matter the hour.</p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">New Revenue Paths</h3>
                    <p className="text-justify">Upsell through smart conversations, turn inquiries into sales, or launch services like automated support packages your competitors can't touch.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default AIAgency;
