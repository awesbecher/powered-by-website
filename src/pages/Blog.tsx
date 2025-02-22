
import { Clock, User, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  slug: string;
  category: string;
  content: string;
}

export const samplePosts: BlogPost[] = [
  {
    id: "1",
    title: "Voice AI Agents: The New Frontier of Retail Customer Service",
    excerpt: "Customer service has always been the lifeblood of retail—shaped by well-trained staff offering personal attention, rapport, and timely responses. Yet, in today's fast-paced retail world, building on these traditional values requires leveraging innovative technology.",
    author: "Parlar AI",
    date: "December 15, 2024",
    readTime: "12 min read",
    slug: "voice-ai-agents-retail-customer-service",
    category: "AI Innovation",
    content: `Customer service has always been the lifeblood of retail—shaped by well-trained staff offering personal attention, rapport, and timely responses. Yet, in today's fast-paced retail world, building on these traditional values requires leveraging innovative technology. Voice AI agents, powered by the latest advances in artificial intelligence, offer a compelling way for retailers to improve customer interactions, boost revenue, and streamline operations—while preserving the human touch that has always set great stores apart.

<h2 class="text-4xl font-bold mb-4">Embracing a Time-Tested Tradition, Enhanced by Technology</h2>

Retail success has typically hinged on live, friendly interactions. Whether it's greeting a customer at the door or taking a phone order, there's comfort and trust in speaking directly with a knowledgeable representative. By integrating voice AI agents, retail businesses carry forward that tradition of warm, attentive service—except they can now deliver it around the clock, at scale.  

Today's voice AI agents have evolved beyond simplistic phone menus or robotic voices. They can understand nuanced questions, handle complex conversations, and respond in a human-like manner. This means an AI can hold a natural-sounding conversation to book a reservation, offer recommendations on store products, or even provide follow-up service details, all without missing a beat.

<h2 class="text-4xl font-bold mb-4">Key Use Cases for Voice AI in Retail</h2>

1. **Answering Incoming Phone Calls**  
   Voice AI agents can handle a high volume of calls simultaneously, reducing wait times and keeping customers happy. Simple tasks—such as directing a caller to the right department or answering questions on store hours and locations—can happen instantly. For more complex inquiries, the AI can gather information before seamlessly transferring the caller to a human representative, saving time and freeing up staff for higher-value activities.

2. **Handling Reservations and Appointments**  
   Retailers that provide appointments—like electronics repair shops or salons—can use AI voice agents to book and confirm slots. Rather than forcing customers to wait or play phone tag, the agent can respond right away, ensuring your store is well-organized and your employees stay focused on customer interactions that truly need a personal touch.

3. **Providing Product or Service Details**  
   Thanks to advancements in natural language processing, voice AI agents can share detailed product or service information. From confirming if an item is in stock to explaining key features, an AI agent can quickly address the routine questions customers ask every day—giving them faster answers while freeing staff to address more specialized requests.

4. **Assisting with FAQs and Customer Support**  
   Common questions—returns policies, membership points, shipping timelines—can be automated through a voice AI agent. This not only saves staff hours each week; it also ensures that answers are standardized and consistently accurate.

<h2 class="text-4xl font-bold mb-4">Driving New Revenue and Efficiency</h2>

Implementing voice AI agents can generate *both* new revenue opportunities *and* cost efficiencies:

1. **Upselling and Cross-Selling**  
   AI voice agents, when given access to customer purchase history, can make personalized recommendations. Whether it's suggesting complementary products or adding on extended warranties, these targeted offers can boost your average transaction size with minimal additional workload for staff.

2. **Extended Operating Hours**  
   With a voice AI agent, you never truly "close." Even after hours, your store can continue to engage customers—answering queries, scheduling appointments, or taking messages. This heightened accessibility improves overall customer satisfaction and captures more sales opportunities.

3. **Reduced Staffing Costs**  
   By automating repetitive tasks such as answering basic questions, AI voice agents allow your human team members to focus on high-impact services: building rapport on the sales floor, managing complex customer requests, and upholding strong in-store experiences. This balanced approach results in significant savings on labor while preserving the warmth of human interaction where it matters most.

4. **Scalable Resource Allocation**  
   Voice AI agents scale easily to accommodate seasonal demand, promotions, or unexpected spikes in calls. This ensures you can handle the busiest shopping periods seamlessly, without burdening existing staff or hastily hiring and training additional temporary help.

<h2 class="text-4xl font-bold mb-4">The State of the Art in AI Voice</h2>

Historically, robotic-sounding voices and clumsy phone menus deterred retailers from embracing AI for customer service. But those days have passed. Today's advanced AI voice agents can:

- **Engage in Natural, Human-Like Conversations**  
  Thanks to modern natural language processing, the AI's tone, pacing, and flow closely resemble a live service rep.

- **Reason and Make Decisions**  
  These sophisticated agents are not simply following scripts. They use context—like past customer interactions, store policies, and real-time data—to make intelligent decisions that enhance the customer experience.

- **Automate Complex Tasks**  
  Beyond simple call transfers, AI agents can confirm payment information, modify orders, and even troubleshoot issues, all without human intervention.

By deploying a solution that feels authentically human, retailers preserve the friendly, approachable atmosphere they've always valued, while leveraging cutting-edge technology to scale and improve efficiency.

<h2 class="text-4xl font-bold mb-4">Ready to Elevate Your Retail Experience?</h2>

At Parlar AI, we specialize in designing *custom* voice AI solutions tailored to your unique workflows and business needs. Our experienced team understands how to blend forward-thinking innovation with the time-honored principles of great customer service.  

**Interested in seeing how voice AI agents could transform your retail operations?**  
Let's talk! We'd love to learn more about your business and build a bespoke solution that enhances productivity, boosts revenue, and maintains that personal feel your customers know and trust.

[**Contact Parlar AI**](#) to schedule a consultation and see firsthand how a custom voice AI agent can revolutionize your retail customer service. Let us help you continue the tradition of exceptional customer experiences—powered by the best in modern AI.`
  },
  {
    id: "2",
    title: "The Future of Business Automation",
    excerpt: "Discover how modern businesses are leveraging AI to automate routine tasks and boost productivity.",
    author: "John Doe",
    date: "March 14, 2024",
    readTime: "7 min read",
    slug: "future-business-automation",
    category: "Automation",
    content: ""
  },
  {
    id: "3",
    title: "AI Integration Success Stories",
    excerpt: "Real-world examples of successful AI agent implementations in small and medium-sized businesses.",
    author: "Sarah Johnson",
    date: "March 13, 2024",
    readTime: "6 min read",
    slug: "ai-integration-success-stories",
    category: "Case Studies",
    content: ""
  }
];

const BlogPostCard = ({
  post,
  featured = false
}: {
  post: BlogPost;
  featured?: boolean;
}) => (
  <Link 
    to={`/blog/${post.slug}`}
    className="block group"
  >
    <div className={cn(
      "bg-white/5 rounded-lg overflow-hidden group-hover:bg-white/10 transition-colors",
      featured ? "col-span-full lg:col-span-2" : ""
    )}>
      <div className="p-6">
        <h2 className={cn(
          "font-bold text-white mb-3 group-hover:text-[#9b87f5] transition-colors",
          featured ? "text-3xl" : "text-xl"
        )}>
          {post.title}
        </h2>
        <p className={cn(
          "text-gray-400 mb-4",
          featured ? "line-clamp-3" : "line-clamp-2"
        )}>
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{post.readTime}</span>
            </div>
            <div 
              className="flex items-center gap-1 text-[#9b87f5] group-hover:text-[#8b77e5] transition-colors"
            >
              Read more
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Link>
);

const Blog = () => {
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    setInitialLoad(false);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e] pt-36">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden px-6 lg:px-8 pb-8">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <h1 
                className={`text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6 transition-all duration-1000 ease-out transform
                  ${initialLoad ? 'opacity-0 translate-x-8 -translate-y-8' : 'opacity-100 translate-x-0 translate-y-0'}`}
              >
                Delivering the state of the art in <span className="text-[#9b87f5]">AI agents</span> to SMBs.
              </h1>
              <p 
                className={`mt-4 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-bold transition-all duration-1000 delay-300 ease-out transform
                  ${initialLoad ? 'opacity-0 translate-x-8 -translate-y-8' : 'opacity-100 translate-x-0 translate-y-0'}`}
              >
                AI agents aren't just tools—<span className="border-b-2 border-[#9b87f5]">they're game-changers</span>. For small to medium-sized businesses, they mean doing more with less, delighting customers, and unlocking growth you didn't think was possible. Read our latest insights here:
              </p>
            </div>
          </div>
          
          <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl opacity-20" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent/30 blur-3xl opacity-20" />
        </div>

        <div className="max-w-7xl mx-auto mt-16 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <BlogPostCard post={samplePosts[0]} featured={true} />
            {samplePosts.slice(1).map(post => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
