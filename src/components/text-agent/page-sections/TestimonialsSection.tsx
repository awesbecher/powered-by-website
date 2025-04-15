
import { useState } from "react";
import { ChevronRight, ChevronLeft, Quote } from "lucide-react";

export const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const testimonials = [
    {
      quote: "Text Agent AI has completely transformed our sales process. We've increased our response rates by 280% and cut our follow-up time by 70%.",
      author: "Sarah Johnson",
      position: "VP of Sales, TechCorp",
      image: "/lovable-uploads/ae57b26e-163f-4cf7-bc1a-eab353cf3fae.png"
    },
    {
      quote: "The personalization capabilities are incredible. Our leads think they're talking to a real person, and we're closing deals faster than ever.",
      author: "Michael Chen",
      position: "Sales Director, GrowthX",
      image: "/lovable-uploads/ba7183d3-c2d6-46b1-b51e-afa9de2b5af2.png"
    },
    {
      quote: "We've automated 95% of our initial outreach and follow-ups, allowing our team to focus exclusively on qualified leads. Game-changer!",
      author: "Alex Rivera",
      position: "CEO, SalesPro",
      image: "/lovable-uploads/5304586a-4dc1-4e19-bcaa-8ddc0a81b3dc.png"
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">What Our Clients Say</h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Join hundreds of businesses that have transformed their sales process with AI text agents
        </p>
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Testimonial Card */}
        <div className="bg-gradient-to-r from-[#2a1e43] to-[#1a0b2e] p-8 rounded-2xl border border-[#6342ff]/30">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Image */}
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden flex-shrink-0 mb-4 md:mb-0 border-2 border-[#6342ff]">
              <img 
                src={testimonials[currentIndex].image} 
                alt={testimonials[currentIndex].author}
                className="w-full h-full object-cover" 
              />
            </div>
            
            {/* Quote */}
            <div className="flex-1">
              <div className="mb-4 text-[#9b87f5]">
                <Quote className="w-8 h-8 opacity-50" />
              </div>
              <p className="text-white text-xl mb-4 italic">"{testimonials[currentIndex].quote}"</p>
              <div>
                <p className="text-white font-bold">{testimonials[currentIndex].author}</p>
                <p className="text-gray-400">{testimonials[currentIndex].position}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Navigation buttons */}
        <div className="flex justify-center mt-6 gap-2">
          <button 
            onClick={prevTestimonial}
            className="p-2 rounded-full bg-[#222222] hover:bg-[#6342ff]/50 text-white transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          {/* Dots */}
          <div className="flex items-center gap-2 mx-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? 'bg-[#6342ff] w-4' : 'bg-gray-500'}`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          
          <button 
            onClick={nextTestimonial}
            className="p-2 rounded-full bg-[#222222] hover:bg-[#6342ff]/50 text-white transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
