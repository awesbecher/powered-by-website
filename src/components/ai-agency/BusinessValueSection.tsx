import React from 'react';

export const BusinessValueSection = () => {
  const metrics = [
    { value: '6×', label: 'Faster customer response' },
    { value: '$50 K+', label: 'Annual support cost saved' },
    { value: '24/7', label: 'Non-stop availability' },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            The Business Value of AI Agents
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#9b87f5] to-[#6342ff] mx-auto mb-6"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {metrics.map((metric, index) => (
            <div key={index} className="text-center">
              <h3 className="text-4xl font-bold text-white mb-2">
                {metric.value}
              </h3>
              <p className="text-sm uppercase tracking-wide text-gray-300">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BusinessValueSection;
