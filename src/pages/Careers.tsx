import React from 'react';

const JobCard = ({ job }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-2">{job.title}</h2>
      <p className="text-gray-600 mb-4">{job.description}</p>
      <p className="text-gray-600 mb-4">Location: {job.location}</p>
      <p className="text-gray-600 mb-4">Salary: {job.salary}</p>
      <p className="text-gray-600 mb-4">Posted: {job.posted}</p>
    </div>
  );
};

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
            {jobOpenings.map((job, index) => (
              <JobCard key={index} job={job} />
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
