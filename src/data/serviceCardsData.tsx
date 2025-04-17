import { Car, Hotel, Users2, HeadphonesIcon, Building2, MessageSquare, Globe, Calendar, UtensilsCrossed, DollarSign } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface ServiceCardData {
  title: {
    main: string;
    sub: string;
  };
  icon: LucideIcon;
  description: string;
  features: string[];
  imageSrc?: string;
}

export const serviceCardsData: ServiceCardData[] = [
  {
    title: {
      main: "Auto Dealerships:",
      sub: "Virtual Sales Rep"
    },
    icon: Car,
    description: "Designed for auto dealer websites and social media channels, we provide voice agents to answers questions about vehicle models, financing options, and dealer promotions. It can operate as an in-bound phone agent or as an outbound call sales associate.",
    features: [
      "24/7 Vehicle Information Support",
      "Lead Qualification & Appointment Setting",
      "Voice & Chat Capabilities",
      "Real-time Response System"
    ],
    imageSrc: "/lovable-uploads/6a8593b8-7878-4dd6-b253-c6d4fe69f9c6.png"
  },
  {
    title: {
      main: "Hotels & Hospitality:",
      sub: "Automated Concierge"
    },
    icon: Hotel,
    description: "Ideal for hotel websites, travel booking portals, and messaging apps, this agent offers reservation assistance, pricing quotes, and amenity details. Acting as a voice agent for phone calls or embedded into a chatbot, it can handle multiple inquiries simultaneously, reducing wait times for potential guests.",
    features: [
      "24/7 Reservation Assistance",
      "Multi-Channel Support",
      "Real-time Availability Updates",
      "Instant Response to Guest Inquiries"
    ]
  },
  {
    title: {
      main: "Real Estate Firms:",
      sub: "Virtual Sales Agent"
    },
    icon: Building2,
    description: "With modes for voice, SMS text, or email, this agent fields questions about listings, property details, and pricing. It can also coordinate property viewings by syncing with agents' calendars and sending appointment reminders.",
    features: [
      "Multi-Channel Communication",
      "Automated Appointment Scheduling",
      "24/7 Property Information",
      "Lead Qualification & Follow-up"
    ]
  },
  {
    title: {
      main: "SaaS Companies:",
      sub: "Voice-Enabled Support"
    },
    icon: HeadphonesIcon,
    description: "Deployed through phone lines or even inside your app, this solution helps users troubleshoot issues, run diagnostics, and escalate complex problems. It understands natural speech patterns, making tech support feel more personal and less intimidating.",
    features: [
      "24/7 Technical Support", 
      "Natural Language Understanding",
      "Smart Issue Escalation",
      "In-App Voice Integration"
    ]
  },
  {
    title: {
      main: "B2B Sales:",
      sub: "Inbound Funnel Qualifier"
    },
    icon: Users2,
    description: "Deployed on your website, this agent engages inbound leads, identifies pain points, and routes high-intent prospects to human sales reps. Working as a voice agent, it can deliver the most human-like verbal product overviews, collect important business details, and even auto-generate proposals for rapid follow-up.",
    features: [
      "Intelligent Lead Qualification",
      "Automated Proposal Generation",
      "Real-time Sales Rep Routing",
      "Pain Point Analysis"
    ]
  },
  {
    title: {
      main: "Retail Stores:",
      sub: "Virtual Sales Associate"
    },
    icon: MessageSquare,
    description: "This agent greets customers online (via website chat or mobile app) and assists with product inquiries, personalized recommendations, and real-time inventory checks. Deployed primarily on e-commerce sites or in-store kiosks, it helps shoppers find exactly what they need quickly.",
    features: [
      "Real-time Product Recommendations",
      "Inventory Availability Checks",
      "Voice & Chat Integration",
      "Personalized Shopping Assistance"
    ]
  },
  {
    title: {
      main: "Restaurants:",
      sub: "Virtual Reservation Manager"
    },
    icon: UtensilsCrossed,
    description: "Aimed at restaurants, this agent manages table reservations, waitlist updates, and dietary preference tracking. Deployed on a restaurant's website as a voice agent, it answers frequently asked questions (e.g., hours, menu items), so staff can concentrate on delivering excellent in-person service.",
    features: [
      "Real-time Table Management",
      "Automated Waitlist Updates",
      "Dietary Preference Tracking",
      "Menu & Hours Information"
    ]
  },
  {
    title: {
      main: "Education:",
      sub: "Enrollment Assistant"
    },
    icon: Users2,
    description: "Built for universities and other educational institutions, this agent helps current or prospective students discover relevant courses, understand admission requirements, and schedule campus or virtual tours. It's accessible through institutional websites and student portals, offering instant responses at any hour.",
    features: [
      "24/7 Enrollment Support",
      "Course Discovery & Information",
      "Admission Requirements Guide",
      "Tour Scheduling Automation"
    ]
  },
  {
    title: {
      main: "Finance & Insurance:",
      sub: "Q&A Agent"
    },
    icon: DollarSign,
    description: "Designed for websites or small banks, credit unions, and insurance providers, this solution can field questions about product offerings, policy details, loan eligibility, and more. Acting as a voice or chat agent, it guides customers through self-service forms, reducing bottlenecks in call centers.",
    features: [
      "Secure Data Handling",
      "Policy & Product Information",
      "Loan Eligibility Assessment",
      "Account Setup Assistance"
    ]
  },
  {
    title: {
      main: "Internal HR:",
      sub: "Onboarding & FAQ Agent"
    },
    icon: Users2,
    description: "Perfect for internal company portals and HR communication channels, this agent addresses common new-hire questions about benefits, company policies, and workflows. By automating these routine inquiries, your HR team can focus on strategic initiatives.",
    features: [
      "24/7 HR Policy Support",
      "Benefits Information Access",
      "Automated Onboarding Guidance",
      "Company Knowledge Base"
    ]
  },
  {
    title: {
      main: "Multilingual Support:",
      sub: "Global Customer Agent"
    },
    icon: Globe,
    description: "Designed for businesses with international reach, this agent solution supports multiple languages in real-time, ensuring customers from different regions can communicate seamlessly. It can be deployed on websites, messaging apps, or social media platforms, detecting and switching languages based on user input.",
    features: [
      "Real-time Language Detection",
      "Multi-platform Deployment",
      "Seamless Language Switching",
      "Cross-cultural Communication"
    ]
  },
  {
    title: {
      main: "Events:",
      sub: "Attendee Engagement Bot"
    },
    icon: Calendar,
    description: "Ideal for conference organizers, expo hosts, or virtual events, this agent handles everything from attendee registration and ticket inquiries to session reminders and post-event feedback collection. Deployed on event websites via voice or chat, it provides a personalized experience by recommending relevant sessions or speaker info.",
    features: [
      "Automated Registration Support",
      "Session Recommendations",
      "Event Schedule Management",
      "Post-Event Feedback Collection"
    ]
  }
];
