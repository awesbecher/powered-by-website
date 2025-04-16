
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Quote } from "lucide-react";

interface Testimonial {
  quote: string;
  author: string;
  position: string;
  company: string;
}

export const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  const testimonials: Testimonial[] = [
    {
      quote: "The AI Receptionist transformed our small business. We're saving $2,800 monthly on staffing while providing 24/7 customer support. Our customers are impressed with how natural the conversations feel.",
      author: "Michael Reynolds",
      position: "CEO",
      company: "Reynolds Consulting"
    },
    {
      quote: "As a medical practice, we were skeptical about using AI for patient calls. But this solution has decreased our missed appointments by 35% and freed up our front desk staff to focus on patients in the office.",
      author: "Dr. Sarah Chen",
      position: "Practice Manager",
      company: "Westside Medical"
    },
    {
      quote: "Implementation was surprisingly easy. Within a day, our AI Receptionist was handling dozens of calls, scheduling appointments and capturing lead information. The ROI was immediate and substantial.",
      author: "Kevin Thompson",
      position: "Operations Director",
      company: "Vertex Solutions"
    }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);
  
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
      <div className="bg-gradient-to-br from-[#1f1235] to-[#2a1d45] p-12 rounded-2xl border border-[#9b87f5]/20 shadow-xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">What Our Customers Say</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Businesses of all sizes are transforming their operations with our AI Receptionist
          </p>
        </div>

        <div className="relative h-64 sm:h-56">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`absolute top-0 left-0 w-full transition-all duration-1000 ease-in-out ${
                currentTestimonial === index
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-20 pointer-events-none"
              }`}
            >
              <div className="flex justify-center mb-6">
                <div className="bg-[#6342ff]/20 rounded-full p-3">
                  <Quote className="h-8 w-8 text-[#9b87f5]" />
                </div>
              </div>
              
              <blockquote className="text-xl text-center text-white max-w-3xl mx-auto mb-6">
                "{testimonial.quote}"
              </blockquote>
              
              <div className="text-center">
                <p className="font-semibold text-[#9b87f5]">{testimonial.author}</p>
                <p className="text-gray-400 text-sm">{testimonial.position}, {testimonial.company}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-6 gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${
                currentTestimonial === index
                  ? "bg-[#9b87f5]"
                  : "bg-gray-600"
              }`}
              onClick={() => setCurrentTestimonial(index)}
              aria-label={`View testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-[#1a1a24]/70 backdrop-blur-lg rounded-xl border border-gray-800 p-6 text-center">
          <h3 className="text-3xl font-bold text-white mb-2">98%</h3>
          <p className="text-gray-300">Customer satisfaction rate</p>
        </div>
        
        <div className="bg-[#1a1a24]/70 backdrop-blur-lg rounded-xl border border-gray-800 p-6 text-center">
          <h3 className="text-3xl font-bold text-white mb-2">30%</h3>
          <p className="text-gray-300">Average increase in lead capture</p>
        </div>
        
        <div className="bg-[#1a1a24]/70 backdrop-blur-lg rounded-xl border border-gray-800 p-6 text-center">
          <h3 className="text-3xl font-bold text-white mb-2">24/7</h3>
          <p className="text-gray-300">Availability with zero downtime</p>
        </div>
      </div>
    </section>
  );
};
