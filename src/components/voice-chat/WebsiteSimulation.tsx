import React from 'react';
import { useState, useEffect } from "react";
import { WebsiteHeader } from "./WebsiteHeader";
import WebsiteContent from "./WebsiteContent";
import { LoadingState } from "./LoadingState";
import { CallInProgress } from "./CallInProgress";
import { useCursorAnimation } from "./hooks/useCursorAnimation";
import { useIsMobile } from "@/hooks/use-mobile";
import { forcePrefetchImages, addCSSImagePreloading } from "./utils/imageUtils";
import "./CursorAnimation.css";

// Sample properties data with realistic details
const properties = [
  {
    id: "1",
    name: "Modern Desert Oasis",
    description: "Stunning contemporary home with mountain views, gourmet kitchen, and resort-style backyard.",
    imageUrl: "/assets/images/02977ad8-a831-4b23-909d-7010d4bb02b6.png",
    price: 1295000,
    beds: 4,
    baths: 3.5,
    sqft: 3200,
    address: "5678 N Desert View Dr, Phoenix, AZ 85018"
  },
  {
    id: "2",
    name: "Luxury Biltmore Estate",
    description: "Elegant Spanish Colonial Revival with chef's kitchen, wine cellar, and private courtyard.",
    imageUrl: "/assets/images/0329e783-725b-4bdb-be40-cec650c1f627.png",
    price: 2450000,
    beds: 5,
    baths: 4.5,
    sqft: 4800,
    address: "4321 E Camelback Rd, Phoenix, AZ 85018"
  },
  {
    id: "3",
    name: "Downtown High-Rise Penthouse",
    description: "Spectacular penthouse with floor-to-ceiling windows, private terrace, and panoramic city views.",
    imageUrl: "/assets/images/03b82838-fbc0-4056-8cec-062f897f47dd.png",
    price: 1850000,
    beds: 3,
    baths: 3,
    sqft: 2800,
    address: "1234 N Central Ave #3001, Phoenix, AZ 85004"
  }
];

// Immediately preload all images when this module is imported
const propertyImages = properties.map(property => property.imageUrl);
const headerImages = [
  "/assets/images/314cb21d-7fdb-4cdd-a44e-da8af003a7f9.png", // Phoenix Realty logo
];
const allImagesToPreload = [...propertyImages, ...headerImages];
forcePrefetchImages(allImagesToPreload);
addCSSImagePreloading(allImagesToPreload);

export const WebsiteSimulation = () => {
  const [simState, setSimState] = useState<"website" | "loading" | "call">("website");
  const [isMuted, setIsMuted] = useState(false);
  const [initialRender, setInitialRender] = useState(false);
  const animationSpeed = "2s";
  
  // Check if on mobile device
  const isMobile = useIsMobile();
  
  // Set images as already loaded
  const [imagesLoaded, setImagesLoaded] = useState(true);
  
  // Skip initial render
  useEffect(() => {
    setInitialRender(false);
    setImagesLoaded(true);
  }, []);
  
  // Use our custom hooks with predetermined loaded state
  const { cursorRef } = useCursorAnimation(simState, setSimState, true, true, animationSpeed);

  // Handle manual state transitions
  const handleStartCall = () => {
    setSimState("loading");
  };

  const handleRestart = () => {
    setSimState("website");
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto rounded-lg shadow-2xl overflow-hidden bg-white">
      {/* Cursor animation overlay */}
      <div 
        ref={cursorRef}
        className="cursor-dot"
        style={{ display: simState === "website" ? "block" : "none" }}
      />

      {/* Website simulation */}
      <div className={`${simState !== "website" ? "hidden" : ""}`}>
        <WebsiteHeader />
        <WebsiteContent 
          properties={properties} 
          onStartCall={handleStartCall}
          autoSimulate={false}
        />
      </div>

      {/* Loading state */}
      {simState === "loading" && (
        <LoadingState onComplete={() => setSimState("call")} />
      )}

      {/* Call in progress */}
      {simState === "call" && (
        <CallInProgress 
          isMuted={isMuted} 
          onMuteToggle={handleMuteToggle}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
};
