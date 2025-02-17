
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Car, Home, Key, Bike, Sailboat } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { OrderDialog } from "@/components/order/OrderDialog";
import { formatPhoneNumber } from "@/utils/phoneUtils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Input } from "@/components/ui/input";

const Insurance = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [isPhoneOpen, setIsPhoneOpen] = useState(false);
  const [isCallInProgress, setIsCallInProgress] = useState(false);
  const [callId, setCallId] = useState<string | null>(null);
  const isMobile = useIsMobile();

  const { data: callStatus } = useQuery({
    queryKey: ['callStatus', callId],
    queryFn: async () => {
      if (!callId) return { status: 'pending' };
      try {
        console.log('Fetching call status for ID:', callId);
        const response = await fetch(`https://api.vogent.ai/api/dials/${callId}`, {
          headers: {
            'Authorization': `Bearer ${process.env.VOGENT_API_KEY}`,
          }
        });
        
        if (!response.ok) {
          throw new Error(`Failed to fetch call status: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('Call status response:', data);
        
        const status = data?.dial?.status || data?.status || 'pending';
        console.log('Extracted status:', status);
        
        return { status };
      } catch (error) {
        console.error('Error fetching call status:', error);
        return { status: 'error' };
      }
    },
    enabled: !!callId,
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      return status === 'completed' ? false : 5000;
    },
  });

  useEffect(() => {
    if (!callStatus) return;
    
    console.log('Processing call status:', callStatus);
    
    if (callStatus.status === 'completed') {
      console.log('Call completed, sending SMS...');
      
      sendConfirmationSMS().then((success) => {
        if (success) {
          toast({
            title: "Quote Request Confirmed",
            description: "An insurance agent will process your quote request!",
          });
        }
        setCallId(null);
        setIsCallInProgress(false);
        navigate('/call-confirmation');
      });
    }
  }, [callStatus, navigate]);

  const sendConfirmationSMS = async () => {
    try {
      console.log('Attempting to send SMS to:', phoneNumber);
      const formattedPhone = '+1' + formatPhoneNumber(phoneNumber);
      
      const { data, error } = await supabase.functions.invoke('send-sms', {
        body: {
          to: formattedPhone,
          message: "Thank you for your insurance quote request! An agent will review your information and get back to you shortly.",
        },
      });

      if (error) {
        console.error('SMS error:', error);
        toast({
          variant: "destructive",
          title: "SMS Error",
          description: "Failed to send confirmation SMS",
        });
        return false;
      }

      console.log('SMS sent successfully:', data);
      return true;
    } catch (error) {
      console.error('SMS error:', error);
      toast({
        variant: "destructive",
        title: "SMS Error",
        description: "Failed to send confirmation SMS",
      });
      return false;
    }
  };

  const handleProductSelect = (productId: string) => {
    if (zipCode.length !== 5) return;
    setSelectedProduct(productId);
    setIsPhoneOpen(true);
  };

  const handleCall = async () => {
    if (!phoneNumber || !zipCode || !selectedProduct) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please complete all required information",
      });
      return;
    }

    try {
      const cleanedNumber = formatPhoneNumber(phoneNumber);
      console.log('Initiating call with cleaned number:', cleanedNumber);

      const { data, error } = await supabase.functions.invoke('initiate-call', {
        body: {
          phoneNumber: cleanedNumber,
          type: 'insurance_quote',
          zipCode,
          productType: selectedProduct
        }
      });

      console.log('Call initiation response:', { data, error });

      if (error) {
        console.error('Call initiation error:', error);
        throw error;
      }

      if (!data?.callId) {
        console.error('No call ID in response:', data);
        throw new Error('No call ID received');
      }

      console.log('Call initiated with ID:', data.callId);
      
      toast({
        title: "Call Initiated",
        description: "You will receive a call shortly from our insurance agent.",
      });
      
      setIsCallInProgress(true);
      setCallId(data.callId);
    } catch (error) {
      console.error('Call error:', error);
      setIsCallInProgress(false);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to initiate call. Please try again.",
      });
    }
  };

  const insuranceProducts = [
    { id: 'auto', name: 'Auto', icon: Car },
    { id: 'home', name: 'Homeowners', icon: Home },
    { id: 'renters', name: 'Renters', icon: Key },
    { id: 'motorcycle', name: 'Motorcycle / ATV', icon: Bike },
    { id: 'boat', name: 'Boat', icon: Sailboat },
  ];

  return (
    <div className="min-h-screen w-full bg-neutral-soft px-4 py-16 sm:px-6 lg:px-8">
      {/* Logo */}
      {!isMobile && <div className="absolute top-8 right-8">
        <a href="https://madrone.capital/" target="_blank" rel="noopener noreferrer">
          <img 
            src="/lovable-uploads/335f70ec-aa5b-4954-aa12-c425ddd41fc5.png" 
            alt="Madrone Capital Logo" 
            className="h-48 w-auto"
          />
        </a>
      </div>}

      {/* Back button */}
      <Link 
        to="/" 
        className="absolute top-8 left-8 flex items-center text-accent hover:text-accent/80 transition-colors"
      >
        <ArrowLeft className="h-6 w-6 mr-2" />
        <span>Back to Services</span>
      </Link>

      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl mb-8">
          Insurance Quote
        </h1>
        <div className="bg-white/5 rounded-lg p-8 backdrop-blur-sm">
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-xl text-gray-300">
                Enter your zip code to get started:
              </p>
              <div className="max-w-xs mx-auto">
                <Input
                  type="text"
                  placeholder="Enter zip code"
                  value={zipCode}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 5);
                    setZipCode(value);
                  }}
                  className="text-lg text-center"
                  maxLength={5}
                />
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-xl text-gray-300">
                Select your insurance product:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {insuranceProducts.map((product) => {
                  const Icon = product.icon;
                  return (
                    <button
                      key={product.id}
                      onClick={() => handleProductSelect(product.id)}
                      disabled={zipCode.length !== 5}
                      className={`
                        p-6 rounded-lg flex flex-col items-center justify-center space-y-4 
                        transition-all duration-200
                        ${zipCode.length === 5 
                          ? 'bg-white/10 hover:bg-white/20 cursor-pointer' 
                          : 'bg-white/5 cursor-not-allowed opacity-50'}
                        ${selectedProduct === product.id ? 'ring-2 ring-accent' : ''}
                      `}
                    >
                      <Icon className="h-8 w-8 text-accent" />
                      <span className="text-lg text-gray-300">{product.name}</span>
                    </button>
                  )}
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <OrderDialog
        isOpen={isPhoneOpen}
        isCallInProgress={isCallInProgress}
        onOpenChange={setIsPhoneOpen}
        onSubmit={handleCall}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
      />
    </div>
  );
};

export default Insurance;
