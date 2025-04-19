
import React from 'react';
import { HeroSection } from './sections/HeroSection';
import { HowItWorksSection } from './sections/HowItWorksSection';
import { UseCasesSection } from './sections/UseCasesSection';
import { ResultsSection } from './sections/ResultsSection';
import { AudioDemoSection } from './sections/AudioDemoSection';
import { FinalCTASection } from './sections/FinalCTASection';

const MainContent: React.FC = () => {
  return (
    <main className="w-full overflow-x-hidden">
      <HeroSection />
      <HowItWorksSection />
      <UseCasesSection />
      <ResultsSection />
      <AudioDemoSection />
      <FinalCTASection />
    </main>
  );
};

export default MainContent;
