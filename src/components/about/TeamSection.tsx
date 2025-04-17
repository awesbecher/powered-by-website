
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Linkedin, Github, Mail } from "lucide-react";

interface TeamMember {
  id: number;
  name: string;
  title: string;
  bio: string;
  funFact: string;
  links?: {
    linkedin?: string;
    github?: string;
    email?: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    title: "Founder & CEO",
    bio: "Former SaaS executive with 15+ years building AI solutions for enterprise. Passionate about democratizing technology for businesses of all sizes.",
    funFact: "Favorite AI prediction: Voice interfaces will replace screens for 50% of daily tasks by 2027",
    links: {
      linkedin: "#",
      email: "#"
    }
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "CTO & AI Architect",
    bio: "AI researcher turned entrepreneur with expertise in NLP, speech synthesis, and conversational design. Previously at OpenAI.",
    funFact: "Coffee order: Quad shot espresso, no room for cream",
    links: {
      linkedin: "#",
      github: "#"
    }
  },
  {
    id: 3,
    name: "Priya Patel",
    title: "VP of Customer Success",
    bio: "Expert in helping businesses navigate digital transformation. Passionate about making advanced technology accessible to non-technical teams.",
    funFact: "Productivity hack: 90-minute deep work blocks with no notifications",
    links: {
      linkedin: "#",
      email: "#"
    }
  }
];

interface TeamSectionProps {
  initialLoad: boolean;
}

export const TeamSection = ({ initialLoad }: TeamSectionProps) => {
  const [activeTeamMember, setActiveTeamMember] = useState<number | null>(null);
  
  return (
    <section className={`py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto transition-all duration-1000 delay-300 ease-out transform
      ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
      
      <div className="text-center mb-12">
        <Badge className="mb-3 px-3 py-1 text-sm border-purple-400/30 bg-purple-400/10 text-purple-200">
          Our Team
        </Badge>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Meet The Team Behind Powered_by</h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          A global team of AI experts, engineers, and business strategists committed to bringing cutting-edge AI to SMBs.
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-[#9b87f5] to-[#6342ff] mx-auto mt-6"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        {teamMembers.map((member) => (
          <div 
            key={member.id} 
            className="backdrop-blur-sm bg-[#2a1a47]/30 p-6 rounded-xl border border-[#9b87f5]/20 transition hover:border-[#9b87f5]/40 hover:bg-[#2a1a47]/40 duration-300"
            onMouseEnter={() => setActiveTeamMember(member.id)}
            onMouseLeave={() => setActiveTeamMember(null)}
          >
            <h3 className="text-xl font-bold text-white mb-3">{member.name}</h3>
            <p className="text-[#9b87f5] font-medium mb-4">{member.title}</p>
            
            <div 
              className={`overflow-hidden transition-all duration-300 ${
                activeTeamMember === member.id ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <p className="text-gray-300 text-sm mb-3">{member.bio}</p>
              <p className="text-xs text-gray-400 italic mb-4">{member.funFact}</p>
              
              <div className="flex gap-3">
                {member.links?.linkedin && (
                  <a href={member.links.linkedin} className="text-gray-400 hover:text-[#9b87f5] transition">
                    <Linkedin className="h-5 w-5" />
                  </a>
                )}
                {member.links?.github && (
                  <a href={member.links.github} className="text-gray-400 hover:text-[#9b87f5] transition">
                    <Github className="h-5 w-5" />
                  </a>
                )}
                {member.links?.email && (
                  <a href={member.links.email} className="text-gray-400 hover:text-[#9b87f5] transition">
                    <Mail className="h-5 w-5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
