
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { ClosingCTA } from "@/components/home/ClosingCTA";

const NotFound = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <Navbar />
      <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center min-h-[70vh]">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-8xl md:text-9xl font-bold text-white mb-6">404</h1>
          <h2 className="text-3xl md:text-4xl font-semibold text-purple-400 mb-6">Page Not Found</h2>
          <p className="text-gray-300 text-xl mb-12">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button size="lg" className="w-full sm:w-auto bg-white text-purple-900 hover:bg-gray-100">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <Link to="/blog">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white/10">
                Visit Our Blog
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <ClosingCTA />
    </div>
  );
};

export default NotFound;
