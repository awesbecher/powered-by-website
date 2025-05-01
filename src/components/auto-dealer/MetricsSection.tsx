import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { getCalApi } from "@calcom/embed-react";

interface Metric {
  value: number;
  label: string;
  description: string;
  prefix?: string;
  suffix?: string;
}

const metrics: Metric[] = [
  {
    value: 35,
    label: 'Lead Conversion',
    description: 'Increase in qualified leads',
    prefix: '+',
    suffix: '%'
  },
  {
    value: 24,
    label: 'Uptime',
    description: 'Always-on customer service',
    suffix: '/7'
  },
  {
    value: 500,
    label: 'Dealer Integrations',
    description: 'Seamless system connections',
    suffix: '+'
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export const MetricsSection = () => {
  // Initialize Cal.com
  useEffect(() => {
    (async function () {
      try {
        const cal = await getCalApi();
        cal("ui", {
          theme: "dark",
          cssVarsPerTheme: {
            light: {"cal-brand": "#8B5CF6"},
            dark: {"cal-brand": "#8B5CF6"}
          },
          hideEventTypeDetails: false,
          layout: "column_view"
        });
      } catch (error) {
        console.error("Error initializing Cal.com in MetricsSection:", error);
      }
    })();
  }, []);

  return (
    <section className="py-24 bg-[#F3E8FF]">
      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="container mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              variants={item}
              className="text-center"
            >
              <div className="mb-2">
                <span className="text-4xl font-bold text-[#8B5CF6]">
                  {metric.prefix}<span className="metric-value">0</span>{metric.suffix}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">
                {metric.label}
              </h3>
              <p className="text-gray-600">
                {metric.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Secondary CTA */}
        <motion.div 
          variants={item}
          className="text-center"
        >
          <button
            data-cal-link="team-powered-by-dfbtbb/get-started-today"
            data-cal-config='{"layout":"column_view","theme":"dark"}'
            className="inline-flex items-center px-8 py-4 text-lg font-semibold text-[#8B5CF6] 
              border-2 border-[#8B5CF6] rounded-2xl hover:bg-[#8B5CF6] hover:text-white
              transform transition-all duration-200 ease-out hover:-translate-y-0.5
              hover:shadow-lg"
          >
            Talk to an AI Agent Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};
