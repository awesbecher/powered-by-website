
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { ClosingCTA } from "@/components/home/ClosingCTA";

const NotFound = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <Navbar />
      <div className="container mx-auto px-4 pt-36 pb-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">404</h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-purple-400 mb-6">Page Not Found</h2>
          <p className="text-gray-300 mb-10">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button size="lg" className="w-full sm:w-auto">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <Link to="/mercedes-dealer">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Mercedes Dealer Page
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
