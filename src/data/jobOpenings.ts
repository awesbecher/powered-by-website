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
    title: "Founding Account Executive (AE)",
    location: "Remote",
    type: "Full-time",
    postedDate: "March 22, 2025",
    requirements: [
      "5+ years of experience in machine learning and AI",
      "Expertise in large language models (LLMs)",
      "Strong Python programming skills",
      "Experience with conversational AI systems",
      "Background in NLP and speech recognition"
    ],
    description: "The Founding Account Executive role will be a vital part of Powered_by's mission to democratize access to AI agent technology to SMBs. As the first Account Executive on our team, you will work closely with our founders and solutions design team to help qualify, evangelize, and close new SMB customers. You will need to have a killer instinct for finding new sales opportunities and a genuine intellectual interest in all things AI agents.",
    applyUrl: "https://www.linkedin.com/jobs/view/4187385123/"
  },
  {
    id: "2",
    title: "Forward Deployed Engineer (FDE)",
    location: "Remote",
    type: "Full-time",
    postedDate: "March 18, 2025",
    requirements: [
      "3+ years of experience with React and TypeScript",
      "Experience with backend technologies (Node.js, Python)",
      "Knowledge of REST APIs and web services",
      "Understanding of cloud infrastructure (AWS, Azure, GCP)",
      "Experience with CI/CD pipelines"
    ],
    description: "The Forward Deployed Engineer (FDE) role is a critical part of ensuring our customers' success. You will collaborate directly with customers, swiftly identifying their most pressing challenges and crafting AI agent solutions based on their specific vision and business workflows. In this role, you'll utilize your creativity, problem-solving skills, and technical expertise to empower organizations to harness AI agents to improve customer experiences and increase operational efficiencies. From initial problem identification to solution deployment, you'll play a key role in shaping the AI agent outcomes for our customers.",
    applyUrl: "https://www.linkedin.com/jobs/view/4187385080/"
  }
];
