
import React from "react";

const FAQSection = () => {
  return (
    <div className="mt-24">
      <h2 className="text-3xl font-bold text-white mb-12">Frequently Asked Questions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-3">What's included in each plan?</h3>
          <p className="text-gray-300">
            Each plan includes different levels of AI agent access, customization options, and support levels. The number of monthly interactions also varies by plan.
          </p>
        </div>
        
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-3">Can I upgrade or downgrade my plan?</h3>
          <p className="text-gray-300">
            Yes, you can change your plan at any time. When upgrading, the new features will be available immediately. When downgrading, the changes will take effect at the start of your next billing cycle.
          </p>
        </div>
        
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-3">What happens if I exceed my monthly interactions?</h3>
          <p className="text-gray-300">
            If you exceed your monthly interaction limit, additional interactions will be billed at a per-interaction rate. You'll receive notifications as you approach your limit.
          </p>
        </div>
        
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-3">Do you offer custom solutions?</h3>
          <p className="text-gray-300">
            Yes, our Enterprise plan offers custom solutions tailored to your specific business needs. Contact our sales team to discuss your requirements.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
