
import React from "react";
import { ArrowUpRight, MapPin, Calendar, Briefcase, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { JobOpening } from "@/data/jobOpenings";

interface JobCardProps {
  job: JobOpening;
}

export const JobCard = ({ job }: JobCardProps) => {
  return (
    <Card className="glass-card border-white/10 text-white h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl md:text-2xl font-bold">{job.title}</CardTitle>
        <CardDescription className="text-white/70 flex items-center gap-1 mt-1">
          <MapPin className="h-4 w-4" /> {job.location}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-accent" />
              <span className="text-sm text-white/80">{job.type}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-accent" />
              <span className="text-sm text-white/80">Posted {job.postedDate}</span>
            </div>
          </div>
          
          <div className="mt-2">
            <h4 className="text-sm font-semibold text-white/90 mb-2">Requirements:</h4>
            <ul className="list-disc pl-5 text-sm text-white/80 space-y-1">
              {job.requirements.slice(0, 3).map((req, index) => (
                <li key={index}>{req}</li>
              ))}
              {job.requirements.length > 3 && (
                <li>... and more</li>
              )}
            </ul>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-4 border-t border-white/10">
        <Button variant="gradient" className="w-full" asChild>
          <a href={job.applyUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
            Apply Now <ArrowUpRight className="ml-1 h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};
