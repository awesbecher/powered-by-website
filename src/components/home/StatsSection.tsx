
import { motion } from "framer-motion";

export const StatsSection = () => {
  const stats = [
    {
      value: "6x",
      label: "Faster Lead Response",
      description: "Instant AI-powered responses to customer inquiries"
    },
    {
      value: "80%",
      label: "Support Automated",
      description: "Of common customer questions handled automatically"
    },
    {
      value: "$50k+",
      label: "Saved in Operations",
      description: "Annual savings in operational costs"
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-8 rounded-2xl text-center"
            >
              <div className="text-4xl font-bold text-[#9b87f5] mb-2">{stat.value}</div>
              <div className="text-xl font-semibold text-white mb-2">{stat.label}</div>
              <p className="text-gray-400">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
