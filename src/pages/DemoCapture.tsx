
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DemoCapture = () => {
  const navigate = useNavigate();

  // Simply redirect to the /demo page
  useEffect(() => {
    navigate('/demo', { replace: true });
  }, [navigate]);

  // Return empty div as this is just a redirect component
  return <div className="min-h-screen bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]"></div>;
};

export default DemoCapture;
