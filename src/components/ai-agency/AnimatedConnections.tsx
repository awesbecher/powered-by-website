
import React from "react";
import { motion } from "framer-motion";

export const AnimatedConnections = () => {
  return (
    <svg 
      className="absolute inset-0 w-full h-full" 
      viewBox="0 0 400 400"
      style={{ zIndex: 1 }}
    >
      {/* Top-left to center */}
      <motion.path
        d="M 80,80 L 200,200"
        stroke="#9b87f5"
        strokeWidth="2"
        strokeDasharray="5,5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.5 }}
        transition={{ duration: 1.5, delay: 0.2 }}
      />
      
      {/* Top-right to center */}
      <motion.path
        d="M 320,80 L 200,200"
        stroke="#9b87f5"
        strokeWidth="2"
        strokeDasharray="5,5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.5 }}
        transition={{ duration: 1.5, delay: 0.4 }}
      />
      
      {/* Bottom-left to center */}
      <motion.path
        d="M 80,320 L 200,200"
        stroke="#9b87f5"
        strokeWidth="2"
        strokeDasharray="5,5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.5 }}
        transition={{ duration: 1.5, delay: 0.6 }}
      />
      
      {/* Bottom-right to center */}
      <motion.path
        d="M 320,320 L 200,200"
        stroke="#9b87f5"
        strokeWidth="2"
        strokeDasharray="5,5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.5 }}
        transition={{ duration: 1.5, delay: 0.8 }}
      />
      
      {/* Middle-left to center */}
      <motion.path
        d="M 40,200 L 180,200"
        stroke="#9b87f5"
        strokeWidth="2"
        strokeDasharray="5,5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.5 }}
        transition={{ duration: 1.5, delay: 1.0 }}
      />
      
      {/* Middle-right to center */}
      <motion.path
        d="M 360,200 L 220,200"
        stroke="#9b87f5"
        strokeWidth="2"
        strokeDasharray="5,5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.5 }}
        transition={{ duration: 1.5, delay: 1.2 }}
      />
      
      {/* Data flow particles */}
      <motion.circle
        cx="0"
        cy="0"
        r="3"
        fill="#ffffff"
        initial={{ cx: 80, cy: 80, opacity: 0 }}
        animate={{ cx: 200, cy: 200, opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
      />
      
      <motion.circle
        cx="0"
        cy="0"
        r="3"
        fill="#ffffff"
        initial={{ cx: 320, cy: 80, opacity: 0 }}
        animate={{ cx: 200, cy: 200, opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, delay: 0.5 }}
      />
      
      <motion.circle
        cx="0"
        cy="0"
        r="3"
        fill="#ffffff"
        initial={{ cx: 80, cy: 320, opacity: 0 }}
        animate={{ cx: 200, cy: 200, opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, delay: 1 }}
      />
      
      <motion.circle
        cx="0"
        cy="0"
        r="3"
        fill="#ffffff"
        initial={{ cx: 320, cy: 320, opacity: 0 }}
        animate={{ cx: 200, cy: 200, opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, delay: 1.5 }}
      />
    </svg>
  );
};
