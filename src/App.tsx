
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Contact from "./pages/Contact";
import Solutions from "./pages/Solutions";
import Demo from "./pages/Demo";
import NotFound from "./pages/NotFound";
import ThankYou from "./pages/ThankYou";
import AIAgency from "./pages/AIAgency";
import RetailDemo from "./pages/demos/RetailDemo";
import InsuranceDemo from "./pages/demos/InsuranceDemo";
import HospitalityDemo from "./pages/demos/HospitalityDemo";
import SaaSDemo from "./pages/demos/SaaSDemo";
import AutoDealerDemo from "./pages/demos/AutoDealerDemo";
import HealthcareDemo from "./pages/demos/HealthcareDemo";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/demo/retail" element={<RetailDemo />} />
        <Route path="/demo/insurance" element={<InsuranceDemo />} />
        <Route path="/demo/hospitality" element={<HospitalityDemo />} />
        <Route path="/demo/saas" element={<SaaSDemo />} />
        <Route path="/demo/auto" element={<AutoDealerDemo />} />
        <Route path="/demo/healthcare" element={<HealthcareDemo />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/ai-agency" element={<AIAgency />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
