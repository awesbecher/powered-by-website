import React from 'react';
import Navbar from "./Navbar";
import Footer from "./Footer";

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e] text-white">
      <div className="sticky top-0 z-50 w-full">
        <Navbar />
      </div>
      {children}
      <Footer />
    </div>
  );
};

export default PageLayout;
