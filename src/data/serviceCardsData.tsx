
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
}

export const serviceCardsData: ServiceCardData[] = [];
