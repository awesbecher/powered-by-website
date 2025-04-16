
import { Zap, Clock, Users, DollarSign, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

export const KeyBenefitsSection = () => {
  const benefits = [
    {
      icon: Zap,
      title: "Instant Responses",
      description: "AI agents respond to customer inquiries in real-time, 24/7/365, eliminating wait times",
      color: "bg-[#9b87f5]/20",
      iconColor: "text-[#9b87f5]",
      delay: 0.1
    },
    {
      icon: Clock,
      title: "Time Savings",
      description: "Reduce response times from hours to seconds with always-ready AI agents",
      color: "bg-blue-500/20",
      iconColor: "text-blue-500",
      delay: 0.2
    },
    {
      icon: Users,
      title: "Enhanced CX",
      description: "Provide consistent, personalized experiences across all customer touchpoints",
      color: "bg-purple-500/20",
      iconColor: "text-purple-500",
      delay: 0.3
    },
    {
      icon: DollarSign,
      title: "Cost Reduction",
      description: "Lower operational costs by automating routine interactions and inquiries",
      color: "bg-green-500/20",
      iconColor: "text-green-500",
      delay: 0.4
    },
    {
      icon: BarChart3,
      title: "Data Insights",
      description: "Gather valuable customer interaction data to inform business decisions",
      color: "bg-amber-500/20",
      iconColor: "text-amber-500",
      delay: 0.5
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0612]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
          >
            Key Benefits of AI Agents
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Transform your business operations with cutting-edge AI technology that delivers measurable results.
          </motion.p>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {benefits.map((benefit, index) => (
            <motion.div 
              key={index}
              variants={item}
              className="bg-gradient-to-br from-gray-900 to-[#1a0f2e] rounded-2xl border border-gray-800 p-8 hover:shadow-2xl hover:shadow-[#6342ff]/10 transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`${benefit.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6`}>
                <benefit.icon className={`h-8 w-8 ${benefit.iconColor}`} />
              </div>
              
              <h3 className="text-2xl font-bold mb-4 text-white">
                {benefit.title}
              </h3>
              
              <p className="text-gray-300">
                {benefit.description}
              </p>
              
              <div className="mt-6 pt-6 border-t border-gray-800">
                <div className="flex items-center">
                  <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-[#6342ff] to-[#9b87f5] h-full rounded-full"
                      style={{ width: `${85 + (index * 3)}%` }}
                    ></div>
                  </div>
                  <span className="ml-4 text-white font-bold">
                    {85 + (index * 3)}%
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
