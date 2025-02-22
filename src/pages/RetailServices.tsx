
import { Clock, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef } from "react";

const services = [
  {
    name: "Classic Haircut",
    description: "Precision cut with attention to detail and style preferences",
    price: "$35",
    duration: "30 min"
  },
  {
    name: "Beard Trim & Shape",
    description: "Professional beard grooming and styling",
    price: "$25",
    duration: "20 min"
  },
  {
    name: "Premium Package",
    description: "Haircut, beard trim, hot towel treatment & styling",
    price: "$65",
    duration: "60 min"
  },
  {
    name: "Hot Towel Shave",
    description: "Traditional straight razor shave with hot towel treatment",
    price: "$40",
    duration: "45 min"
  },
  {
    name: "Kids Haircut",
    description: "Gentle haircut for children under 12",
    price: "$25",
    duration: "30 min"
  },
  {
    name: "Hair & Scalp Treatment",
    description: "Deep conditioning treatment with scalp massage",
    price: "$45",
    duration: "40 min"
  }
];

const RetailServices = () => {
  const chatRef = useRef<HTMLDivElement>(null);

  const handleChatClick = () => {
    chatRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#222222] text-white">
      {/* Logo */}
      <div className="absolute top-24 right-8 z-10">
        <img 
          src="/lovable-uploads/07f82a95-cea8-417e-96f0-5d8ef95f0200.png"
          alt="Flagship Barbers Logo"
          className="h-12 w-auto"
        />
      </div>

      {/* Hero Section */}
      <div className="relative min-h-[80vh] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/lovable-uploads/dac317cc-0dbe-4fbd-9e8b-8f3e4e1ef731.png"
            alt="Professional Barbershop Interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
        </div>

        {/* Content */}
        <div className="relative w-full pt-24 px-4 lg:px-8">
          <Link to="/" className="absolute top-8 left-8 text-gray-400 hover:text-white transition-colors">
            ← Back
          </Link>
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-4 text-white">
              Welcome to Flagship Barbers
            </h1>
            <p className="text-gray-200 max-w-2xl mx-auto text-lg mb-8">
              Flagship Barbers has been serving the Tacoma public for 25 years. We specialize in classic barbershop style and fades. Select which services you'd like and then click on Chat with Us below to book an appointment.
            </p>
            <button 
              className="bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white px-6 py-3 rounded-md font-semibold transition-colors inline-flex items-center gap-2"
              onClick={handleChatClick}
            >
              <MessageSquare className="w-5 h-5" />
              Chat with Us
            </button>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div 
              key={service.name}
              className="bg-black/50 rounded-lg p-6 backdrop-blur-sm border border-white/10 hover:border-accent/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">{service.name}</h3>
                <span className="text-accent font-bold">{service.price}</span>
              </div>
              <p className="text-gray-400 mb-4">{service.description}</p>
              <div className="flex items-center text-gray-500 text-sm">
                <Clock className="w-4 h-4 mr-1" />
                <span>{service.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat CTA Section */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 pb-12">
        <div className="bg-accent/10 rounded-lg p-8 text-center border border-accent/20">
          <h2 className="text-2xl font-bold mb-4">Ready to Book Your Appointment?</h2>
          <p className="text-gray-400 mb-6">
            Our booking specialists are ready to assist you in scheduling your next visit.
          </p>
          <button 
            className="bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white px-6 py-3 rounded-md font-semibold transition-colors inline-flex items-center gap-2"
            onClick={handleChatClick}
          >
            <MessageSquare className="w-5 h-5" />
            Chat with Us
          </button>
        </div>
      </div>

      {/* Chat Iframe */}
      <div ref={chatRef} className="max-w-7xl mx-auto px-4 lg:px-8 pb-12">
        <div className="bg-accent/10 rounded-lg p-8 border border-accent/20">
          <h2 className="text-2xl font-bold mb-4 text-center">Chat with Us to Book Your Appointment</h2>
          <iframe
            src="https://www.chatbase.co/chatbot-iframe/E3xjnZ-H-sl1mXJ_y7Hza"
            width="100%"
            style={{ height: '700px' }}
            frameBorder="0"
            title="Chatbase Booking Assistant"
          />
        </div>
      </div>
    </div>
  );
};

export default RetailServices;
