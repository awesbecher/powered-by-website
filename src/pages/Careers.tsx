
import React, { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import JobCard from "@/components/careers/JobCard";

// Missing components definition
const CareersHero = () => (
  <div className="py-16 text-center">
    <h1 className="text-4xl font-bold">Careers</h1>
    <p className="mt-4">Join our team and make a difference</p>
  </div>
);

// Mock data (replace with actual data or fetch from API)
const jobOpenings = [
  {
    id: "1",
    title: "Frontend Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time"
  },
  {
    id: "2",
    title: "AI Specialist",
    department: "Research",
    location: "New York",
    type: "Full-time"
  }
];

const Careers = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e] text-white">
      <Navbar />
      <CareersHero />
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobOpenings.map((job) => (
            <JobCard job={job} key={job.id} />
          ))}
        </div>
        
        {jobOpenings.length === 0 && (
          <p className="text-center py-12 text-gray-400">
            No open positions at the moment. Check back soon!
          </p>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Careers;
