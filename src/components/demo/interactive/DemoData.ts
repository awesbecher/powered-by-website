
import { Mic, Phone, MessageSquare, Mail, LucideIcon } from "lucide-react";

export interface DemoOption {
  id: string;
  title: string;
  icon: LucideIcon;
  description: string;
  actionText: string;
  color: string;
  isPopular?: boolean;
  imageSrc: string;
}

export const demoOptions: DemoOption[] = [
  {
    id: "voice",
    title: "Voice AI",
    icon: Mic,
    description: "Experience natural conversations with our AI voice agent",
    actionText: "Start Voice Chat",
    color: "bg-purple-600",
    isPopular: true,
    imageSrc: "/lovable-uploads/bd9e9055-ba23-4fcc-9c2a-4fda4b9dd627.png"
  },
  {
    id: "phone",
    title: "Phone AI",
    icon: Phone,
    description: "See how our AI handles customer service calls",
    actionText: "Watch Call Demo",
    color: "bg-blue-600",
    imageSrc: "/lovable-uploads/a895d546-c44f-4953-843b-945b3573a24d.png"
  },
  {
    id: "chat",
    title: "Chat AI",
    icon: MessageSquare,
    description: "Engage with our text-based AI assistant",
    actionText: "Start Chat",
    color: "bg-green-600",
    imageSrc: "/lovable-uploads/1a963891-b5e5-4c4c-85fd-e5ec489343bd.png"
  },
  {
    id: "email",
    title: "Email AI",
    icon: Mail,
    description: "Discover AI-powered email response automation",
    actionText: "View Email Demo",
    color: "bg-amber-600",
    imageSrc: "/lovable-uploads/6c3f7264-17ad-411e-a2f3-69970fa1948a.png"
  }
];
