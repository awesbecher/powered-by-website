
import { Package2, Users, HeadphonesIcon, Building2 } from "lucide-react";

const Products = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-6">RightBloom Products & Pricing</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Choose the perfect AI solution package for your business needs
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {/* Essential Package */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 hover:border-purple-400/50 transition-all">
            <Package2 className="w-12 h-12 text-purple-400 mb-6" />
            <h2 className="text-2xl font-bold text-white mb-4">Essential Package</h2>
            <div className="text-gray-300 space-y-4">
              <p>Perfect for small businesses starting their AI journey</p>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Basic AI agent capabilities</li>
                <li>Standard customer support</li>
                <li>Essential analytics</li>
              </ul>
            </div>
          </div>

          {/* Sales Professional Package */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 hover:border-purple-400/50 transition-all">
            <Users className="w-12 h-12 text-blue-400 mb-6" />
            <h2 className="text-2xl font-bold text-white mb-4">Sales Professional Package</h2>
            <div className="text-gray-300 space-y-4">
              <p>Optimized for sales teams and growth</p>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Advanced sales automation</li>
                <li>Lead qualification AI</li>
                <li>Sales performance analytics</li>
              </ul>
            </div>
          </div>

          {/* Service Package */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 hover:border-purple-400/50 transition-all">
            <HeadphonesIcon className="w-12 h-12 text-green-400 mb-6" />
            <h2 className="text-2xl font-bold text-white mb-4">Service Package</h2>
            <div className="text-gray-300 space-y-4">
              <p>Enhanced customer service capabilities</p>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>24/7 AI customer support</li>
                <li>Multi-channel integration</li>
                <li>Customer satisfaction tracking</li>
              </ul>
            </div>
          </div>

          {/* Enterprise Package */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 hover:border-purple-400/50 transition-all">
            <Building2 className="w-12 h-12 text-pink-400 mb-6" />
            <h2 className="text-2xl font-bold text-white mb-4">Enterprise Package</h2>
            <div className="text-gray-300 space-y-4">
              <p>Complete solution for large organizations</p>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Custom AI development</li>
                <li>Enterprise-grade security</li>
                <li>Dedicated support team</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
