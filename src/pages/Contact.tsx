import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Contact = () => {
  return (
    <div className="min-h-screen w-full bg-[#222222]">
      {/* Header with Logo and Nav */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 lg:px-8 py-6">
        {/* Logo */}
        <div>
          <Link to="/">
            <img 
              src="/lovable-uploads/e8881317-eed8-45df-8a8d-34509d6701c6.png"
              alt="Parlar Logo"
              className="w-[192px] lg:w-[288px] h-auto"
            />
          </Link>
        </div>

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

      {/* Contact Form Section */}
      <div className="relative overflow-hidden px-6 lg:px-8 pt-24 pb-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
            Get in Touch
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="mt-10 max-w-xl mx-auto">
          <form className="space-y-6">
            <div>
              <Input
                type="text"
                placeholder="Your Name"
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder="Your Email"
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
              />
            </div>
            <div>
              <textarea
                rows={4}
                placeholder="Your Message"
                className="w-full rounded-md bg-white/5 border border-white/10 text-white placeholder:text-gray-400 px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>
            <div>
              <Button className="w-full bg-accent hover:bg-accent-dark text-white transition-colors">
                Send Message
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Gradient orbs for visual interest */}
      <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl opacity-20" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent/30 blur-3xl opacity-20" />
    </div>
  );
};

export default Contact;
