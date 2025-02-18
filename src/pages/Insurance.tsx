
import { Link } from "react-router-dom";
import { ArrowLeft, Car, Home, Key, Bike, Sailboat } from "lucide-react";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Input } from "@/components/ui/input";
import { InsuranceProductCard } from "@/components/insurance/InsuranceProductCard";
import { PhoneInputSection } from "@/components/insurance/PhoneInputSection";
import { useInsuranceCall } from "@/hooks/useInsuranceCall";

const Insurance = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const isMobile = useIsMobile();
  const { 
    isCallInProgress, 
    callStatus, 
    initiateCall, 
    sendConfirmationSMS,
    setCallId,
    setIsCallInProgress
  } = useInsuranceCall();

  useEffect(() => {
    if (!callStatus) return;
    
    console.log('Processing call status:', callStatus);
    
    if (callStatus.status === 'completed') {
      console.log('Call completed, sending SMS...');
      
      sendConfirmationSMS(phoneNumber).then((success) => {
        if (success) {
          setCallId(null);
          setIsCallInProgress(false);
          window.location.href = '/call-confirmation';
        }
      });
    }
  }, [callStatus]);

  const handleProductSelect = (productId: string) => {
    if (zipCode.length !== 5) return;
    setSelectedProducts(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
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
      <Link 
        to="/" 
        className="absolute top-8 left-8 flex items-center text-accent hover:text-accent/80 transition-colors"
      >
        <ArrowLeft className="h-6 w-6 mr-2" />
        <span>Back to Services</span>
      </Link>

      <div className="mx-auto max-w-3xl text-center">
        <div className="bg-white/5 rounded-lg p-8 backdrop-blur-sm">
          <h1 className="text-4xl font-bold text-white mb-8">Online Insurance Quote</h1>
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-xl text-gray-300">
                Welcome to Planter's Insurance. Speak to our insurance agent to get a quote tailored to your needs.
              </p>
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
                Select your insurance products:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {insuranceProducts.map((product) => (
                  <InsuranceProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    icon={product.icon}
                    isSelected={selectedProducts.includes(product.id)}
                    isEnabled={zipCode.length === 5}
                    onSelect={handleProductSelect}
                  />
                ))}
              </div>
            </div>

            {selectedProducts.length > 0 && (
              <PhoneInputSection
                phoneNumber={phoneNumber}
                isCallInProgress={isCallInProgress}
                onPhoneNumberChange={setPhoneNumber}
                onCall={() => initiateCall(phoneNumber, zipCode, selectedProducts)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insurance;
