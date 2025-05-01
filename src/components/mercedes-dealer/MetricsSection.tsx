import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

export const MetricsSection = () => {
  const metricsRef = useRef<HTMLDivElement>(null);
  const countersInitialized = useRef(false);

  const metrics = [
    { value: 35, label: "Lead Conversion", prefix: "+", suffix: "%" },
    { value: 100, label: "Uptime", suffix: "%" },
    { value: 500, label: "Dealer Integrations", prefix: "", suffix: "+" }
  ];

  useEffect(() => {
    const animateValue = (start: number, end: number, duration: number, element: HTMLElement) => {
      let startTimestamp: number | null = null;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        element.textContent = current.toString();
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !countersInitialized.current) {
            const counters = metricsRef.current?.querySelectorAll('.metric-value');
            counters?.forEach((counter, index) => {
              animateValue(0, metrics[index].value, 2000, counter as HTMLElement);
            });
            countersInitialized.current = true;
          }
        });
      },
      { threshold: 0.5 }
    );

    if (metricsRef.current) {
      observer.observe(metricsRef.current);
    }

    return () => {
      if (metricsRef.current) {
        observer.unobserve(metricsRef.current);
      }
    };
  }, []);

  return (
    <section className="py-20 bg-[#F3E8FF]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Metrics */}
        <div 
          ref={metricsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {metrics.map((metric, index) => (
            <div 
              key={index}
              className="text-center p-6 rounded-2xl bg-white/50 backdrop-blur-sm
                transform hover:-translate-y-1 transition-all duration-200"
            >
              <div className="text-4xl font-bold text-[#8B5CF6] mb-2">
                {metric.prefix}<span className="metric-value">0</span>{metric.suffix}
              </div>
              <div className="text-gray-700 font-medium">{metric.label}</div>
            </div>
          ))}
        </div>

        {/* Secondary CTA */}
        <div className="text-center">
          <button
            data-cal-link="team-powered-by-dfbtbb/get-started-today"
            data-cal-config='{"layout":"column_view","theme":"dark"}'
            className="inline-flex items-center px-8 py-4 text-lg font-semibold 
              text-[#8B5CF6] bg-transparent border-2 border-[#8B5CF6] rounded-2xl 
              hover:bg-[#8B5CF6] hover:text-white transform hover:-translate-y-0.5 
              transition-all duration-200 ease-out"
          >
            Talk to an AI Agent Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
