import { WordAnimation } from "@/components/home/WordAnimation";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, Bot, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Index = () => {
  const [animate, setAnimate] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    setInitialLoad(false);
  }, []);

  const handleClick = () => {
    setAnimate(false);
    setTimeout(() => setAnimate(true), 10);
  };

  const features = [
    {
      icon: Building2,
      title: "Built for SMBs",
      description: "AI Agents tailored to businesses with 1 to 1,000 employees"
    },
    {
      icon: Bot,
      title: "Experts in AI Agents",
      description: "Deep mastery of automation agents for simple to the most complex tasks"
    },
    {
      icon: Phone,
      title: "Multi-Channel Agents",
      description: "Delivering agents for voice, email, SMS, Slack, chat, and document automation"
    }
  ];

  const values = [
    {
      title: "Unique AI Agency Model",
      description: "Just as web design agencies once transformed businesses for the web, we're here to revolutionize how SMBs connect, work, and grow without adding more humans or cost overhead."
    },
    {
      title: "Client Obsessed from Day One",
      description: "Think of us as your creative AI partner. We take the time to understand your business, your customers, and your goals, then craft AI agent-enabled workflows that simply work."
    },
    {
      title: "Commitment to Excellence",
      description: "For us, project excellence isn't a choice. It's the foundation of everything we do. From voice automation to systems integration, we're dedicated to delivering exceptional quality, because your success is the measure of ours."
    }
  ];

  const blogPosts = [
    {
      number: "22",
      title: "How AI Agents Transform Customer Service Operations",
      description: "Discover how modern businesses are leveraging AI agents to revolutionize their customer service operations, improve response times, and boost customer satisfaction.",
      image: "/lovable-uploads/9e09baaf-e32a-4572-a3d5-f8973b60299f.png",
      link: "/blog/ai-agents-customer-service"
    },
    {
      number: "22",
      title: "Why AI Integration is Critical for Modern Businesses",
      description: "Learn how AI integration is becoming the cornerstone of business evolution, enabling organizations to streamline operations and stay competitive in today's market.",
      image: "/lovable-uploads/9e09baaf-e32a-4572-a3d5-f8973b60299f.png",
      link: "/blog/ai-integration-importance"
    },
    {
      number: "22",
      title: "The Future of Business Automation with AI Agents",
      description: "Explore how AI agents are reshaping the landscape of business automation, from simple task management to complex decision-making processes.",
      image: "/lovable-uploads/9e09baaf-e32a-4572-a3d5-f8973b60299f.png",
      link: "/blog/future-business-automation"
    },
    {
      number: "22",
      title: "Implementing AI Agents: A Step-by-Step Guide",
      description: "A comprehensive guide for businesses looking to implement AI agents, from initial planning to successful deployment and optimization.",
      image: "/lovable-uploads/9e09baaf-e32a-4572-a3d5-f8973b60299f.png",
      link: "/blog/implementing-ai-agents"
    },
    {
      number: "22",
      title: "ROI of AI Agents: Measuring Business Impact",
      description: "Understanding the return on investment when implementing AI agents in your business operations, with real-world case studies and metrics.",
      image: "/lovable-uploads/9e09baaf-e32a-4572-a3d5-f8973b60299f.png",
      link: "/blog/ai-agents-roi"
    },
    {
      number: "22",
      title: "AI Agents vs Traditional Automation",
      description: "A detailed comparison of AI agents and traditional automation solutions, helping businesses make informed decisions about their automation strategy.",
      image: "/lovable-uploads/9e09baaf-e32a-4572-a3d5-f8973b60299f.png",
      link: "/blog/ai-vs-traditional-automation"
    }
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]" onClick={handleClick}>
      <div className="absolute top-6 left-6 lg:left-8">
        <img 
          src="/lovable-uploads/e8881317-eed8-45df-8a8d-34509d6701c6.png"
          alt="Parlar Logo"
          className="w-[192px] lg:w-[288px] h-auto"
        />
      </div>

      <div className="relative overflow-hidden px-6 lg:px-8 pt-36 pb-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h1 
              className={`text-4xl font-bold tracking-tight text-white sm:text-6xl mb-4 transition-all duration-1000 ease-out transform
                ${initialLoad ? 'opacity-0 translate-x-8 -translate-y-8' : 'opacity-100 translate-x-0 translate-y-0'}`}
            >
              Why should those Silicon Valley <span className="font-extrabold text-purple-400">nerds</span> have all the fancy AI toys?
            </h1>
            
            <p 
              className={`mt-4 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-bold transition-all duration-1000 delay-300 ease-out transform
                ${initialLoad ? 'opacity-0 translate-x-8 -translate-y-8' : 'opacity-100 translate-x-0 translate-y-0'}`}
            >
              We're the world's first <Link to="/ai-agency" className="border-b-2 border-purple-400 hover:text-purple-400 transition-colors">AI agency</Link> delivering custom AI agent solutions to SMBs. Just like a web design firm, we build you AI agents custom, quickly, and cost effective.
            </p>
            
            <div className={`mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 delay-500 ease-out transform
              ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
              <Link to="/contact">
                <Button className="bg-accent hover:bg-accent-dark text-white px-8 py-6 text-lg rounded-lg transition-all duration-300 transform hover:scale-105 w-full sm:w-auto">
                  Book a Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button className="bg-white hover:bg-gray-100 text-accent px-8 py-6 text-lg rounded-lg transition-all duration-300 transform hover:scale-105 w-full sm:w-auto">
                Talk to an AI Agent Now
                <Phone className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="glass-card p-6 rounded-xl text-center transform transition-transform duration-300 hover:scale-105"
            >
              <feature.icon className="w-12 h-12 mx-auto mb-4 text-accent" />
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-20 max-w-4xl mx-auto leading-[1.1]">
            Custom AI Agent Solutions Built for you.{" "}
            <span className="text-[#9b87f5] block mt-4">Quick. Easy. Powerful.</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {values.map((value, index) => (
              <div key={index} className="relative">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-[#9b87f5] rounded-sm" />
                  <h3 className="text-2xl font-bold text-white">{value.title}</h3>
                </div>
                <p className="text-gray-300 text-base leading-relaxed">
                  {value.description}
                </p>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-32 max-w-7xl mx-auto px-4">
          <h2 className="text-5xl font-bold text-white mb-16 whitespace-nowrap">Thought Leadership in AI Agents for SMBs</h2>
          
          <div className="relative overflow-x-auto pb-4">
            <div className="flex space-x-8 w-max">
              {blogPosts.map((post, index) => (
                <Link key={index} to={post.link} className="group w-[384px] flex-none">
                  <div className="relative overflow-hidden rounded-xl bg-[#1a1a1a] transition-transform duration-300 group-hover:scale-[1.02]">
                    <div className="aspect-[16/9] relative">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1a1a1a]/90 z-10" />
                      <div className="absolute top-4 left-4 text-6xl font-bold text-[#9b87f5] z-20">
                        {post.number}
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#9b87f5] transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-400 text-sm line-clamp-3">
                        {post.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        
        <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl opacity-20" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent/30 blur-3xl opacity-20" />
      </div>
    </div>
  );
};

export default Index;
