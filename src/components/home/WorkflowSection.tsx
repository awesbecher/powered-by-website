import { MessageSquare, Bot, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export const WorkflowSection = () => {
  const steps = [
    {
      icon: <MessageSquare className="w-8 h-8 text-[#9b87f5]" />,
      title: "Trigger",
      description: "Customer initiates contact through voice, email, or chat"
    },
    {
      icon: <Bot className="w-8 h-8 text-[#9b87f5]" />,
      title: "AI Agent Responds",
      description: "Advanced AI understands and processes the request"
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-[#9b87f5]" />,
      title: "Outcome",
      description: "Quick resolution or seamless handoff to human team"
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-8 rounded-2xl relative"
            >
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-[#9b87f5]/30" />
              )}
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 p-3 rounded-full bg-[#9b87f5]/10">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
