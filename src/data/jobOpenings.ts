
export interface JobOpening {
  id: string;
  title: string;
  location: string;
  type: string;
  postedDate: string;
  requirements: string[];
  description: string;
  applyUrl: string;
}

export const jobOpenings: JobOpening[] = [
  {
    id: "1",
    title: "Senior AI Engineer",
    location: "Remote",
    type: "Full-time",
    postedDate: "July 10, 2023",
    requirements: [
      "5+ years of experience in machine learning and AI",
      "Expertise in large language models (LLMs)",
      "Strong Python programming skills",
      "Experience with conversational AI systems",
      "Background in NLP and speech recognition"
    ],
    description: "We're looking for a Senior AI Engineer to help us build and improve our AI agent technology. You'll be working on cutting-edge language models and voice technology to create natural, intelligent interactions for our customers.",
    applyUrl: "https://www.linkedin.com/jobs/view/senior-ai-engineer-at-poweredby-agency"
  },
  {
    id: "2",
    title: "Full Stack Developer",
    location: "Remote",
    type: "Full-time",
    postedDate: "July 12, 2023",
    requirements: [
      "3+ years of experience with React and TypeScript",
      "Experience with backend technologies (Node.js, Python)",
      "Knowledge of REST APIs and web services",
      "Understanding of cloud infrastructure (AWS, Azure, GCP)",
      "Experience with CI/CD pipelines"
    ],
    description: "We're seeking a talented Full Stack Developer to join our growing team. You'll be responsible for building and maintaining the web applications and APIs that power our AI agent platform.",
    applyUrl: "https://www.linkedin.com/jobs/view/full-stack-developer-at-poweredby-agency"
  }
];
