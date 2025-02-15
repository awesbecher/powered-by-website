
import { Link } from "react-router-dom";
import { ArrowLeft, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DrinksMenu = () => {
  const { toast } = useToast();

  const handleClick = async () => {
    try {
      const response = await fetch('https://api.madrone.ai/call', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'drinks_order'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to initiate call');
      }

      toast({
        title: "Call Initiated",
        description: "You will receive a call shortly to take your drinks order.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to initiate call. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen w-full bg-neutral-soft px-4 py-16 sm:px-6 lg:px-8">
      {/* Back button */}
      <Link 
        to="/room-service" 
        className="absolute top-8 left-8 flex items-center text-accent hover:text-accent/80 transition-colors"
      >
        <ArrowLeft className="h-6 w-6 mr-2" />
        <span>Back to Room Service</span>
      </Link>

      <div className="mx-auto max-w-6xl">
        <div className="flex justify-end mb-8">
          <button 
            onClick={handleClick}
            className="bg-accent text-accent-foreground hover:bg-accent/90 px-6 py-2 rounded-md flex items-center gap-2"
          >
            Start your order
            <Phone className="h-4 w-4" />
          </button>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-lg">
          <img 
            src="/lovable-uploads/3c242d77-29a6-4a56-9fc1-c5a16d164a94.png" 
            alt="Drinks Menu" 
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default DrinksMenu;
