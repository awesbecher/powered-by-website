
import { Package2, Users, HeadphonesIcon, Building2, Check, Mail, Phone, MessageSquare, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-20">
      <div className="container mx-auto px-4">
        {/* Logo */}
        <div className="absolute top-8 right-8 z-20">
          <img 
            src="/lovable-uploads/8505af38-6a90-44dc-b6bc-554d254475ea.png"
            alt="RightBloom"
            className="h-12 w-auto"
          />
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-300 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-6">RightBloom Products & Pricing</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Choose the perfect AI solution package for your business needs
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Essential Package */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:border-purple-400/50 transition-all">
            <Package2 className="w-10 h-10 text-purple-400 mb-4" />
            <h2 className="text-xl font-bold text-white mb-3">Essential Package</h2>
            <div className="text-2xl font-bold text-white mb-4">$25<span className="text-sm font-normal text-gray-400">/user/month</span></div>
            <div className="text-gray-300 space-y-4">
              <p className="font-medium text-sm">Perfect for small businesses starting their AI journey</p>
              <div>
                <h3 className="text-white font-semibold mb-2 text-sm">Core Features:</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                    <span>Basic sales automation capabilities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                    <span>AI-driven copywriting & personalization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                    <span>Multi-channel outreach (Email, LinkedIn, SMS)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                    <span>Basic CRM integration</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2 text-sm">Support:</h3>
                <p className="text-sm">Documentation access only</p>
              </div>
            </div>
          </div>

          {/* Sales Professional Package */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:border-blue-400/50 transition-all">
            <Users className="w-10 h-10 text-blue-400 mb-4" />
            <h2 className="text-xl font-bold text-white mb-3">Sales Package</h2>
            <div className="text-2xl font-bold text-white mb-4">$75<span className="text-sm font-normal text-gray-400">/user/month</span></div>
            <div className="text-gray-300 space-y-4">
              <p className="font-medium text-sm">Optimized for small to medium sales teams</p>
              <div>
                <h3 className="text-white font-semibold mb-2 text-sm">Advanced Features:</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                    <span>Full sales automation suite</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                    <span>Advanced reporting & analytics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                    <span>Extended integrations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                    <span>Higher user limits</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2 text-sm">Support:</h3>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-400" />
                  <span className="text-sm">Priority email support</span>
                </div>
              </div>
            </div>
          </div>

          {/* Service Package */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:border-green-400/50 transition-all">
            <HeadphonesIcon className="w-10 h-10 text-green-400 mb-4" />
            <h2 className="text-xl font-bold text-white mb-3">Service Package</h2>
            <div className="text-2xl font-bold text-white mb-4">$125<span className="text-sm font-normal text-gray-400">/user/month</span></div>
            <div className="text-gray-300 space-y-4">
              <p className="font-medium text-sm">Complete customer service automation</p>
              <div>
                <h3 className="text-white font-semibold mb-2 text-sm">Premium Features:</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                    <span>All Sales Package features</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                    <span>Customer service automation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                    <span>Support forum integration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                    <span>In-app chatbot capabilities</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2 text-sm">Support:</h3>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-green-400" />
                    <span className="text-sm">8am-5pm PT phone support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-green-400" />
                    <span className="text-sm">Email, Slack & chatbot support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enterprise Package */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:border-pink-400/50 transition-all">
            <Building2 className="w-10 h-10 text-pink-400 mb-4" />
            <h2 className="text-xl font-bold text-white mb-3">Enterprise Package</h2>
            <div className="text-2xl font-bold text-white mb-4">$165<span className="text-sm font-normal text-gray-400">/user/month</span></div>
            <div className="text-gray-300 space-y-4">
              <p className="font-medium text-sm">Ultimate solution for large organizations</p>
              <div>
                <h3 className="text-white font-semibold mb-2 text-sm">Enterprise Features:</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                    <span>All Sales & Service features</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                    <span>Unlimited API integrations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                    <span>Custom AI development</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                    <span>Advanced security features</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2 text-sm">Support:</h3>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-pink-400" />
                    <span className="text-sm">24/7 phone support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-pink-400" />
                    <span className="text-sm">Priority support on all channels</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
