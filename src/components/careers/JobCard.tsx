
import React from "react";
import { ArrowUpRight, MapPin, Calendar, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { JobOpening } from "@/data/jobOpenings";

interface JobCardProps {
  job: JobOpening;
}

export const JobCard = ({ job }: JobCardProps) => {
  return (
    <Card className="bg-gradient-to-br from-[#9b87f5] to-[#6342ff] text-white h-full flex flex-col border-none shadow-lg">
      <CardHeader className="pb-2 pt-4">
        <CardTitle className="text-xl font-bold">{job.title}</CardTitle>
        <CardDescription className="text-white/90 flex items-center gap-1 mt-1">
          <MapPin className="h-4 w-4" /> {job.location}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow py-2">
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-white/80" />
              <span className="text-sm text-white/90">{job.type}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-white/80" />
              <span className="text-sm text-white/90">Posted {job.postedDate}</span>
            </div>
          </div>
          
          <div className="mt-1">
            <h4 className="text-sm font-semibold text-white mb-1">Role Summary:</h4>
            <p className="text-sm text-white/90 leading-relaxed line-clamp-3">{job.description}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 pb-4 border-t border-white/20">
        <Button variant="secondary" className="w-full bg-white/20 hover:bg-white/30 text-white" asChild>
          <a href={job.applyUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
            Apply Now <ArrowUpRight className="ml-1 h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};
