import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import { ThemeProvider } from "@/components/theme-provider";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Toaster } from "@/components/ui/toaster";
import { AnimatePresence } from 'framer-motion';
import { GlobalVoiceChatDialog } from '@/components/GlobalVoiceChatDialog';

// Import essential pages that need to be loaded immediately
import Index from './pages/Index';
import Home from './pages/Home';

// Lazy load other pages
const About = React.lazy(() => import('./pages/About'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Pricing = React.lazy(() => import('./pages/Pricing'));
const Blog = React.lazy(() => import('./pages/Blog'));
const AIReceptionist = React.lazy(() => import('./pages/AIReceptionist'));
const VoiceChat = React.lazy(() => import('./pages/VoiceChat'));
const EmailAgent = React.lazy(() => import('./pages/EmailAgent'));
const TextAgent = React.lazy(() => import('./pages/TextAgent'));
const RealEstate = React.lazy(() => import('./pages/RealEstate'));
const VirtualSE = React.lazy(() => import('./pages/VirtualSE'));
const News = React.lazy(() => import('./pages/News'));
const Demo = React.lazy(() => import('./pages/Demo'));
const Products = React.lazy(() => import('./pages/Products'));
const OutboundAI = React.lazy(() => import('./pages/OutboundAI'));
const License = React.lazy(() => import('./pages/License'));
const AIAgency = React.lazy(() => import('./pages/AIAgency'));
const AgentGPT = React.lazy(() => import('./pages/AgentGPT'));
const AgentGPTBuilder = React.lazy(() => import('./pages/AgentGPTBuilder'));
const MercedesDealer = React.lazy(() => import('./pages/MercedesDealer'));
const RoomService = React.lazy(() => import('./pages/room-service'));
const RetailServices = React.lazy(() => import('./pages/RetailServices'));
const Careers = React.lazy(() => import('./pages/Careers'));
const ProductHunt = React.lazy(() => import('./pages/ProductHunt'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 5 * 60 * 1000, // Data is considered fresh for 5 minutes
      cacheTime: 30 * 60 * 1000, // Cache is kept for 30 minutes
    },
  },
});

// Loading component for suspense fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-pulse text-xl text-gray-400">Loading...</div>
  </div>
);

function App() {
  const location = useLocation();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AnimatePresence mode="wait" initial={false}>
          <Routes key={location.pathname} location={location}>
            {/* Critical routes loaded immediately */}
            <Route path="/" element={<Index />} />
            <Route path="/home" element={<Home />} />
            
            {/* Lazy loaded routes */}
            <Route path="/about" element={
              <Suspense fallback={<PageLoader />}>
                <About />
              </Suspense>
            } />
            <Route path="/trynow" element={
              <Suspense fallback={<PageLoader />}>
                <Contact />
              </Suspense>
            } />
            {/* ... Continue with other lazy loaded routes */}
            <Route path="/pricing" element={
              <Suspense fallback={<PageLoader />}>
                <Pricing />
              </Suspense>
            } />
            <Route path="/blog" element={
              <Suspense fallback={<PageLoader />}>
                <Blog />
              </Suspense>
            } />
            <Route path="/ai-receptionist" element={
              <Suspense fallback={<PageLoader />}>
                <AIReceptionist />
              </Suspense>
            } />
            <Route path="/voice-chat" element={
              <Suspense fallback={<PageLoader />}>
                <VoiceChat />
              </Suspense>
            } />
            <Route path="/email-agent" element={
              <Suspense fallback={<PageLoader />}>
                <EmailAgent />
              </Suspense>
            } />
            <Route path="/text-agent" element={
              <Suspense fallback={<PageLoader />}>
                <TextAgent />
              </Suspense>
            } />
            <Route path="/real-estate" element={
              <Suspense fallback={<PageLoader />}>
                <RealEstate />
              </Suspense>
            } />
            <Route path="/getvirtual-se" element={
              <Suspense fallback={<PageLoader />}>
                <VirtualSE />
              </Suspense>
            } />
            <Route path="/news" element={
              <Suspense fallback={<PageLoader />}>
                <News />
              </Suspense>
            } />
            <Route path="/demo" element={
              <Suspense fallback={<PageLoader />}>
                <Demo />
              </Suspense>
            } />
            <Route path="/products" element={
              <Suspense fallback={<PageLoader />}>
                <Products />
              </Suspense>
            } />
            <Route path="/outbound-ai" element={
              <Suspense fallback={<PageLoader />}>
                <OutboundAI />
              </Suspense>
            } />
            <Route path="/license" element={
              <Suspense fallback={<PageLoader />}>
                <License />
              </Suspense>
            } />
            <Route path="/ai-agency" element={
              <Suspense fallback={<PageLoader />}>
                <AIAgency />
              </Suspense>
            } />
            <Route path="/agent-gpt" element={
              <Suspense fallback={<PageLoader />}>
                <AgentGPT />
              </Suspense>
            } />
            <Route path="/agent-gpt-builder" element={
              <Suspense fallback={<PageLoader />}>
                <AgentGPTBuilder />
              </Suspense>
            } />
            <Route path="/mercedes-dealer" element={
              <Suspense fallback={<PageLoader />}>
                <MercedesDealer />
              </Suspense>
            } />
            <Route path="/room-service" element={
              <Suspense fallback={<PageLoader />}>
                <RoomService />
              </Suspense>
            } />
            <Route path="/retail-services" element={
              <Suspense fallback={<PageLoader />}>
                <RetailServices />
              </Suspense>
            } />
            <Route path="/careers" element={
              <Suspense fallback={<PageLoader />}>
                <Careers />
              </Suspense>
            } />
            <Route path="/launch" element={
              <Suspense fallback={<PageLoader />}>
                <ProductHunt />
              </Suspense>
            } />
          </Routes>
        </AnimatePresence>
        
        <GlobalVoiceChatDialog />
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

function Root() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default Root;
