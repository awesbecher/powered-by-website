
import { Volume2 } from "lucide-react";
import { motion } from "framer-motion";

export const AudioDemoSection = () => {
  return (
    <section className="py-20 px-4">
      <motion.div 
        className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="glass-card p-8 rounded-2xl">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Volume2 className="w-8 h-8 text-[#9b87f5]" />
            <div className="h-1 bg-[#9b87f5] rounded-full w-64" />
          </div>
          <audio
            controls
            className="w-full max-w-md mx-auto"
          >
            <source src="/demo-audio.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      </motion.div>
    </section>
  );
};
