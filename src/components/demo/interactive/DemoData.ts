
import { Mic, Car, Hotel, Scissors } from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface DemoOption {
  id: string;
  title: string;
  icon: LucideIcon;
  description: string;
  actionText: string;
  color: string;
  isPopular?: boolean;
  imageSrc: string;
  routePath?: string;
  assistantId: string;
}

export const demoOptions: DemoOption[] = [
  {
    id: "real-estate",
    title: "Real Estate",
    icon: Mic,
    description: "See how AI agents can revolutionize property showings and client interactions",
    actionText: "Start Real Estate Demo",
    color: "bg-purple-600",
    isPopular: true,
    imageSrc: "/lovable-uploads/eb107c51-6535-48bc-9f80-7571dbd064d9.png",
    routePath: "/real-estate",
    assistantId: "c1c80d2e-6b65-4172-9f6b-09177b9e54f1"
  },
  {
    id: "auto-dealer",
    title: "Auto Dealer",
    icon: Car,
    description: "Experience how AI enhances the car buying and service experience",
    actionText: "Start Auto Dealer Demo",
    color: "bg-blue-600",
    imageSrc: "/lovable-uploads/d1983f69-1e5e-4a0c-b197-282aa2fca163.png",
    routePath: "/mercedes-dealer",
    assistantId: "6c02f892-3082-4c68-a3ee-92ca86444331"
  },
  {
    id: "hospitality",
    title: "Hotels & Hospitality",
    icon: Hotel,
    description: "Discover how AI transforms guest services and room service experiences",
    actionText: "Start Hospitality Demo",
    color: "bg-green-600",
    imageSrc: "/lovable-uploads/75ff6e78-9db7-436e-a063-2b5f8c500ee7.png",
    routePath: "/room-service",
    assistantId: "cd922dc9-eea6-4b43-878f-cb5cfd67e005"
  },
  {
    id: "retail",
    title: "Retail Services",
    icon: Scissors,
    description: "See how AI revolutionizes appointment booking and customer service",
    actionText: "Start Retail Demo",
    color: "bg-amber-600",
    imageSrc: "/lovable-uploads/75237bd9-59bf-497d-89fc-9805c49cf84e.png",
    routePath: "/retail-services",
    assistantId: "defa6102-2358-4347-a192-24c6bc23ea4c"
  }
];
