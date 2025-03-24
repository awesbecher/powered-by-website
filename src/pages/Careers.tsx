
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { JobCard } from "@/components/careers/JobCard";
import { CareersHero } from "@/components/careers/CareersHero";
import { jobOpenings } from "@/data/jobOpenings";

const Careers = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <div className="sticky top-0 z-50 w-full">
        <Navbar />
      </div>

      <div className="container mx-auto px-4 py-8">
        <CareersHero />
        
        <div className="mt-12">
          <div className="grid grid-cols-1 gap-5 max-w-3xl mx-auto">
            {jobOpenings.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
          
          {jobOpenings.length === 0 && (
            <p className="text-white/80 text-center py-8">
              There are no open positions at the moment. Please check back later.
            </p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Careers;
