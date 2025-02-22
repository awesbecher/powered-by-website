import { WordAnimation } from "@/components/home/WordAnimation";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, Bot, Phone, ChevronRight, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { samplePosts } from "@/data/blogPosts";

const Index = () => {
  const [animate, setAnimate] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInitialLoad(false);
  }, []);

  const handleClick = () => {
    setAnimate(false);
    setTimeout(() => setAnimate(true), 10);
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 400,
        behavior: 'smooth'
      });
    }
  };

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -400,
        behavior: 'smooth'
      });
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      setCanScrollLeft(scrollContainerRef.current.scrollLeft > 0);
    }
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
              className={`mt-4 text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-tight font-bold transition-all duration-1000 delay-300 ease-out transform
                ${initialLoad ? 'opacity-0 translate-x-8 -translate-y-8' : 'opacity-100 translate-x-0 translate-y-0'}`}
            >
              We're the world's first <Link to="/ai-agency" className="border-b-2 border-purple-400 hover:text-purple-400 transition-colors">AI agency</Link> delivering custom AI agent solutions to SMBs. Just like a web design firm, we build you bespoke AI agents quickly and cost effectively.
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
              <div key={index} className="relative pb-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-[#9b87f5] rounded-sm" />
                  <h3 className="text-2xl font-bold text-white">{value.title}</h3>
                </div>
                <p className="text-gray-300 text-base leading-relaxed">
                  {value.description}
                </p>
                <div className="absolute -bottom-2 left-0 right-0 h-px bg-white/10" />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 max-w-7xl mx-auto px-4">
          <Link to="/blog">
            <h2 className="text-5xl font-bold text-white mb-16 whitespace-nowrap bg-gradient-to-r from-purple-500/20 to-purple-400/20 inline-block px-4 py-2 rounded-lg hover:bg-gradient-to-r hover:from-purple-500/30 hover:to-purple-400/30 transition-all">Our Latest Insights on AI Agents for SMBs:</h2>
          </Link>
          
          <div className="relative">
            <div 
              ref={scrollContainerRef}
              className="relative overflow-x-auto pb-4"
              onScroll={handleScroll}
            >
              <div className="flex space-x-8 w-max">
                {samplePosts.map((post, index) => (
                  <Link key={index} to={`/blog/${post.slug}`} className="group w-[384px] flex-none">
                    <div className="relative overflow-hidden rounded-xl bg-[#1a1a1a] transition-transform duration-300 group-hover:scale-[1.02]">
                      <div className="aspect-[16/9] relative">
                        <img 
                          src={`https://images.unsplash.com/${
                            index === 0 ? 'photo-1679958158879-02ad68720d4c' : // AI company logos (OpenAI, Anthropic)
                            index === 1 ? 'photo-1556745753-b2904692b3cd' : // Retail voice assistant
                            index === 2 ? 'photo-1551288049-bebda4e38f71' : // SaaS automation
                            index === 3 ? 'photo-1535378917042-10a22c95931a' : // Human-like AI
                            index === 4 ? 'photo-1553877522-43269d4ea984' : // SMB conversational agents
                            index === 5 ? 'photo-1517245386807-bb43f82c33c4' : // Customer service evolution
                            'photo-1633555338815-a49a89ba5cbb'   // AI fears SMB
                          }`}
                          alt={post.title}
                          className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity"
                        />
                        <div className="absolute inset-0 bg-[#1a1a1a]/60 mix-blend-overlay" />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1a1a1a] z-10" />
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#9b87f5] transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-400 text-sm line-clamp-3">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            {canScrollLeft && (
              <button
                onClick={handleScrollLeft}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white/70 hover:text-white/90 p-4 rounded-r-xl transition-all duration-300"
                aria-label="Scroll left"
              >
                <ChevronLeft size={32} />
              </button>
            )}
            <button
              onClick={handleScrollRight}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white/70 hover:text-white/90 p-4 rounded-l-xl transition-all duration-300"
              aria-label="Scroll right"
            >
              <ChevronRight size={32} />
            </button>
          </div>
        </div>
        
        <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl opacity-20" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent/30 blur-3xl opacity-20" />
      </div>
    </div>
  );
};

export default Index;
