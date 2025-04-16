
import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

interface Testimonial {
  quote: string;
  author: string;
  position: string;
  company: string;
  stars: number;
  industry?: string;
}

export const TestimonialSection = () => {
  const testimonials: Testimonial[] = [
    {
      quote: "Our customer satisfaction scores increased by 28% within three months of implementing the Powered_by AI solution for our support team. It's been transformative.",
      author: "Sarah Johnson",
      position: "Customer Experience Director",
      company: "TechSupport Inc.",
      stars: 5,
      industry: "SaaS"
    },
    {
      quote: "As a small real estate agency, we couldn't afford an enterprise AI solution. Powered_by delivered a custom agent that handles 65% of client inquiries, letting our agents focus on closing deals.",
      author: "Michael Rodriguez",
      position: "Managing Partner",
      company: "Horizon Properties",
      stars: 5,
      industry: "Real Estate"
    },
    {
      quote: "The AI assistant Powered_by built for us has reduced our response time from hours to minutes. Our customers love the immediate assistance, and we've seen a 22% boost in conversion rates.",
      author: "Jennifer Lee",
      position: "Operations Manager",
      company: "Swift Solutions",
      stars: 5,
      industry: "E-commerce"
    }
  ];

  return (
    <section className="relative py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Results Our Clients Are Seeing
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#9b87f5] to-[#6342ff] mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Don't take our word for it. Here's what businesses like yours have achieved with our AI solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="glass-card p-6 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ translateY: -8, transition: { duration: 0.2 } }}
            >
              {/* Stars */}
              <div className="flex text-yellow-400 mb-4">
                {Array.from({ length: testimonial.stars }).map((_, i) => (
                  <Star key={i} fill="currentColor" size={16} />
                ))}
              </div>
              
              {/* Quote */}
              <div className="relative mb-6">
                <Quote size={24} className="absolute -top-3 -left-3 text-[#9b87f5]/30" />
                <p className="text-gray-300 leading-relaxed italic">"{testimonial.quote}"</p>
              </div>
              
              {/* Author info */}
              <div>
                <p className="text-white font-semibold">{testimonial.author}</p>
                <p className="text-gray-400 text-sm">{testimonial.position}, {testimonial.company}</p>
                {testimonial.industry && (
                  <span className="inline-block mt-2 px-3 py-1 bg-[#9b87f5]/20 text-[#9b87f5] text-xs rounded-full">
                    {testimonial.industry}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <p className="text-white/70 italic">
            Results may vary based on implementation specifics and business context.
            <br />Our team works with you to establish realistic goals and KPIs for your AI project.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
