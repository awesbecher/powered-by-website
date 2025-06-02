
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import CustomGPT from "./CustomGPT";

const ChatRedirect = () => {
  useEffect(() => {
    // Log to confirm this component loaded
    console.log("ChatRedirect component mounted");
    
    // Add additional debugging for production environments
    if (process.env.NODE_ENV === "production") {
      console.log("Running in production environment");
    }
  }, []);
  
  // If this component loaded, render the actual CustomGPT component
  return <CustomGPT />;
};

export default ChatRedirect;
