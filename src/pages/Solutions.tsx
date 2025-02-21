
import { Link } from "react-router-dom";
import { Bot, ArrowRight, Phone, Mail, MessageSquare, BarChart3, Clock, DollarSign, Heart, Rocket, Brain } from "lucide-react";

const Solutions = () => {
  return (
    <div className="min-h-screen w-full bg-[#222222]">
      {/* Header with Logo and Nav */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 lg:px-8 py-6">
        {/* Logo */}
        <Link to="/">
          <img 
            src="/lovable-uploads/e8881317-eed8-45df-8a8d-34509d6701c6.png"
            alt="Parlar Logo"
            className="w-[192px] lg:w-[288px] h-auto"
          />
        </Link>

        {/* Navigation */}
        <nav className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
          <ul className="flex items-center space-x-3">
            <li>
              <Link to="/" className="text-white hover:text-accent transition-colors">
                AI Agency
              </Link>
            </li>
            <li className="text-white">|</li>
            <li>
              <Link to="/solutions" className="text-accent transition-colors">
                Solutions
              </Link>
            </li>
            <li className="text-white">|</li>
            <li>
              <Link to="/demo" className="text-white hover:text-accent transition-colors">
                Demos
              </Link>
            </li>
            <li className="text-white">|</li>
            <li>
              <Link to="/contact" className="text-white hover:text-accent transition-colors">
                Contact Us
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Solutions Content */}
      <div className="relative pt-32 pb-16 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-4xl font-bold tracking-tight text-white text-center sm:text-6xl mb-4 animate-fade-in opacity-0" style={{ animationFillMode: 'forwards', animationDelay: '0.2s' }}>
            Custom AI Agent Solutions
          </h1>
          <p className="text-xl text-accent font-medium text-center mb-12 animate-fade-in opacity-0" style={{ animationFillMode: 'forwards', animationDelay: '0.4s' }}>
            Human-like agents built for your business. Quick. Easy. Powerful.
          </p>

          {/* What's an AI Agent Section */}
          <div className="glass-card p-8 rounded-xl mb-12 transform hover:scale-[1.02] transition-all duration-300 animate-fade-in opacity-0" style={{ animationFillMode: 'forwards', animationDelay: '0.6s' }}>
            <div className="flex items-center mb-4">
              <Bot className="text-accent w-8 h-8 mr-3" />
              <h2 className="text-2xl font-bold text-white">What's an AI Agent?</h2>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">
              Think of an AI agent as a super-smart, tireless assistant that handles tasks for you, without the coffee breaks. It's software that listens, learns, and acts, whether it's speaking on the phone with customers, sending emails, or organizing your workflow. No sci-fi jargon here, just practical, custom-built help for your business.
            </p>
          </div>

          {/* When & Where Sections Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* When Section */}
            <div className="glass-card p-8 rounded-xl transform hover:scale-[1.02] transition-all duration-300 animate-fade-in opacity-0" style={{ animationFillMode: 'forwards', animationDelay: '0.8s' }}>
              <div className="flex items-center mb-4">
                <Clock className="text-accent w-8 h-8 mr-3" />
                <h2 className="text-2xl font-bold text-white">When Do You Use Them?</h2>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed">
                Anytime you've got repetitive tasks, customer questions piling up, or processes that eat time, manual labor, and money, AI agents are at work for you 24/7. Even when they're off the clock!
              </p>
            </div>

            {/* Where Section */}
            <div className="glass-card p-8 rounded-xl transform hover:scale-[1.02] transition-all duration-300 animate-fade-in opacity-0" style={{ animationFillMode: 'forwards', animationDelay: '1s' }}>
              <div className="flex items-center mb-4">
                <Brain className="text-accent w-8 h-8 mr-3" />
                <h2 className="text-2xl font-bold text-white">Where Do They Fit?</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Phone className="text-accent w-5 h-5" />
                  <span className="text-gray-300">Voice Calls</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="text-accent w-5 h-5" />
                  <span className="text-gray-300">Email Management</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MessageSquare className="text-accent w-5 h-5" />
                  <span className="text-gray-300">Chat Support</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BarChart3 className="text-accent w-5 h-5" />
                  <span className="text-gray-300">Back Office</span>
                </div>
              </div>
            </div>
          </div>

          {/* How Do They Work Section */}
          <div className="glass-card p-8 rounded-xl mb-12 transform hover:scale-[1.02] transition-all duration-300 animate-fade-in opacity-0" style={{ animationFillMode: 'forwards', animationDelay: '1.2s' }}>
            <div className="flex items-center mb-4">
              <Rocket className="text-accent w-8 h-8 mr-3" />
              <h2 className="text-2xl font-bold text-white">How Do They Work?</h2>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">
              We build them from scratch to match your needs. You tell us your pain points; we craft an AI agent that talks your language, integrates with your tools, and gets stuff done. No tech degree required—just a business ready to grow.
            </p>
          </div>

          {/* Opportunities Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {['Workflow Automation', 'Cost Efficiencies', 'Enhanced Customer Experience', 'New Revenue Paths'].map((title, index) => (
              <div 
                key={title}
                className="glass-card p-6 rounded-xl transform hover:scale-[1.02] transition-all duration-300 animate-fade-in opacity-0" 
                style={{ animationFillMode: 'forwards', animationDelay: `${1.4 + index * 0.2}s` }}
              >
                <h3 className="text-xl font-bold text-white mb-3 flex items-center">
                  <ArrowRight className="text-accent w-5 h-5 mr-2" />
                  {title}
                </h3>
                <p className="text-gray-300">
                  {title === 'Workflow Automation' && "Say goodbye to manual data entry, appointment juggling, or chasing leads. AI agents can manage bookings, track orders, or nudge customers for feedback—all hands-free."}
                  {title === 'Cost Efficiencies' && "Slash labor costs on routine tasks. One AI agent can do the work of many, without overtime or burnout."}
                  {title === 'Enhanced Customer Experience' && "Deliver instant replies, personalized service, and a "wow" factor that keeps people coming back—no matter the hour."}
                  {title === 'New Revenue Paths' && "Upsell through smart conversations, turn inquiries into sales, or launch services like automated support packages your competitors can't touch."}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom Line Section */}
          <div className="glass-card p-8 rounded-xl transform hover:scale-[1.02] transition-all duration-300 animate-fade-in opacity-0" style={{ animationFillMode: 'forwards', animationDelay: '2s' }}>
            <div className="flex items-center mb-4">
              <Heart className="text-accent w-8 h-8 mr-3" />
              <h2 className="text-2xl font-bold text-white">The Bottom Line</h2>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">
              AI agents aren't just tools—they're game-changers. For small to medium-sized businesses, they mean doing more with less, delighting customers, and unlocking growth you didn't think was possible.
            </p>
          </div>
        </div>
        
        {/* Gradient orbs for visual interest */}
        <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl opacity-20" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent/30 blur-3xl opacity-20" />
      </div>
    </div>
  );
};

export default Solutions;
