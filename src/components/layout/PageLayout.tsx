import React from 'react';
import Navbar from "./Navbar";
import Footer from "./Footer";
import { GlobalVoiceChatDialog } from "../shared/GlobalVoiceChatDialog";

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <div className="sticky top-0 z-50 w-full">
        <Navbar />
      </div>
      {children}
      <Footer />
      <GlobalVoiceChatDialog />
    </div>
  );
};

export default PageLayout;
