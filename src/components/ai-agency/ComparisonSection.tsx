
import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, Clock, DollarSign, Code, Users } from 'lucide-react';
import { PoweredByText } from '@/components/shared/PoweredByText';

export const ComparisonSection = () => {
  const categories = [
    {
      title: "Implementation Time",
      icon: <Clock className="text-[#9b87f5]" />,
      poweredBy: "2-4 weeks",
      aiGiants: "3+ months",
      inHouse: "6+ months",
      advantage: "Get to market faster with our streamlined process"
    },
    {
      title: "Cost Efficiency",
      icon: <DollarSign className="text-[#9b87f5]" />,
      poweredBy: "Flexible pricing",
      aiGiants: "Enterprise-level",
      inHouse: "High upfront + ongoing",
      advantage: "Save up to 65% versus building in-house"
    },
    {
      title: "Technical Expertise",
      icon: <Code className="text-[#9b87f5]" />,
      poweredBy: "Handled for you",
      aiGiants: "Significant",
      inHouse: "Required",
      advantage: "No need for AI specialists or developers on your team"
    },
    {
      title: "Ongoing Support",
      icon: <Users className="text-[#9b87f5]" />,
      poweredBy: "Dedicated team",
      aiGiants: "Limited",
      inHouse: "Self-managed",
      advantage: "Your AI solution evolves with your business needs"
    }
  ];

  return (
    <section className="relative py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Why SMBs Choose <PoweredByText className="inline-block mx-1" />
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#9b87f5] to-[#6342ff] mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            See how our approach compares to alternatives for small and medium businesses.
          </p>
        </motion.div>

        <div className="overflow-x-auto">
          <table className="w-full text-white">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-4 py-5 text-left min-w-[180px]">Category</th>
                <th className="px-4 py-5 text-center bg-gradient-to-r from-[#9b87f5]/20 to-[#6342ff]/20 rounded-t-lg">
                  <span className="text-[#9b87f5] font-bold">Powered_by</span>
                </th>
                <th className="px-4 py-5 text-center">AI Giants</th>
                <th className="px-4 py-5 text-center">In-House Build</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <motion.tr 
                  key={index} 
                  className="border-b border-white/10"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <td className="px-4 py-6">
                    <div className="flex items-center gap-3">
                      {category.icon}
                      <span className="font-medium">{category.title}</span>
                    </div>
                  </td>
                  <td className="px-4 py-6 text-center bg-gradient-to-r from-[#9b87f5]/10 to-[#6342ff]/10">
                    <div className="flex flex-col items-center">
                      <span className="font-bold text-[#9b87f5]">{category.poweredBy}</span>
                      <Check size={18} className="text-green-400 mt-1" />
                    </div>
                  </td>
                  <td className="px-4 py-6 text-center">
                    <div className="flex flex-col items-center">
                      <span className="text-gray-400">{category.aiGiants}</span>
                      <div className="mt-1 h-[18px]"></div>
                    </div>
                  </td>
                  <td className="px-4 py-6 text-center">
                    <div className="flex flex-col items-center">
                      <span className="text-gray-400">{category.inHouse}</span>
                      <X size={18} className="text-red-400 mt-1" />
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((category, index) => (
              <motion.div 
                key={index}
                className="glass-card p-6 rounded-lg"
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#9b87f5]/20 flex items-center justify-center flex-shrink-0">
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">{category.advantage}</h3>
                    <p className="text-gray-400 text-sm">With {category.title.toLowerCase()}: <span className="text-[#9b87f5]">{category.poweredBy}</span></p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
