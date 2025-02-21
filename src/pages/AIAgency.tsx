import { Link } from "react-router-dom";

const AIAgency = () => {
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
              <Link to="/ai-agency" className="text-accent transition-colors">
                AI Agency
              </Link>
            </li>
            <li className="text-white">|</li>
            <li>
              <Link to="/solutions" className="text-white hover:text-accent transition-colors">
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

      {/* AI Agency Content */}
      <div className="relative pt-32 pb-16 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-center space-y-4">
            {/* Split hero text into characters for staggered animation */}
            <h1 className="text-4xl font-bold tracking-tight text-center sm:text-6xl mb-4 overflow-hidden">
              {"The World's First AI Agency".split('').map((char, i) => (
                <span 
                  key={i} 
                  className="inline-block text-white opacity-0 animate-fade-in"
                  style={{ 
                    animationFillMode: 'forwards',
                    animationDelay: `${0.05 * i}s`,
                    transform: 'translateY(20px)'
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </h1>
            <p 
              className="relative text-xl text-accent font-medium opacity-0 animate-fade-in"
              style={{ 
                animationFillMode: 'forwards',
                animationDelay: '1.2s',
                animation: 'fade-in 0.6s ease-out forwards'
              }}
            >
              Human-like agents built for your business. Quick. Easy. Powerful.
            </p>
          </div>

          {/* Fancy Text Block */}
          <div className="relative mt-16 max-w-4xl mx-auto">
            {/* Background decorative elements */}
            <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#9b87f5]/20 rounded-full blur-[100px]"></div>
            <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#1EAEDB]/20 rounded-full blur-[100px]"></div>
            
            {/* Content sections with glass effect */}
            <div className="relative space-y-6">
              <div className="glass-card p-10 rounded-3xl animate-fade-in opacity-0" style={{ animationFillMode: 'forwards', animationDelay: '0.6s' }}>
                <p className="text-lg text-white/90 leading-relaxed">
                  Remember when having a website set you apart from the crowd? Back then, web agencies were the go-to partners for bringing businesses online. Today, AI is shaping the new frontier of customer experience while giving you unprecedented cost efficiencies.
                </p>
              </div>

              <div className="glass-card p-10 rounded-3xl animate-fade-in opacity-0" style={{ animationFillMode: 'forwards', animationDelay: '0.8s' }}>
                <p className="text-lg text-white/90 leading-relaxed">
                  Enter <span className="text-accent font-semibold">Parlar</span>. We're the world's first "AI Agency" crafting custom solutions for small to medium-sized businesses that want to harness the power of AI without the need of hiring teams of AI specialists and full stack engineers.
                </p>
              </div>

              <div className="glass-card p-10 rounded-3xl animate-fade-in opacity-0" style={{ animationFillMode: 'forwards', animationDelay: '1s' }}>
                <p className="text-lg text-white/90 leading-relaxed">
                  We specialize in <span className="text-accent">AI agents</span> that work seamlessly across voice, email, SMS, chat, Slack, and more to automate and enhance how you interact with your audience.
                </p>
              </div>

              <div className="glass-card p-10 rounded-3xl animate-fade-in opacity-0" style={{ animationFillMode: 'forwards', animationDelay: '1.2s' }}>
                <p className="text-lg text-white/90 leading-relaxed">
                  Just as the classic web design agency would build you a website from scratch, we build custom AI agent solutions from the ground up. Our agents are designed to streamline customer conversations, reduce response times, and free up your team to focus on what you do best. We believe cutting-edge technology should be accessible to every business, not just Silicon Valley.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAgency;
