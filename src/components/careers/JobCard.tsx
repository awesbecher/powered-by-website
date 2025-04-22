
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowRight, MapPin, Clock } from "lucide-react";

interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
}

interface JobCardProps {
  job: JobOpening;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all">
      <CardContent className="pt-6">
        <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
        <p className="text-gray-400 mb-4">{job.department}</p>
        
        <div className="flex items-center gap-4 text-sm text-gray-300">
          <div className="flex items-center gap-1">
            <MapPin size={14} />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{job.type}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 group">
          View Position
          <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JobCard;
