
import { DollarSign, Car, Pizza, House } from "lucide-react";
import { AgentType } from "./types";

export const defaultAgents: AgentType[] = [
  {
    id: "insurance-quote",
    name: "Insurance: Get a Quote",
    icon: DollarSign,
    description: "AI agent for handling insurance quote requests",
    phoneNumber: "(575) 305 9390",
    isSelected: true,
    assistantId: "df42b616-337e-4877-8e9b-44fb0b5a0225"
  },
  {
    id: "auto-dealership",
    name: "Auto Dealership: Take a Test Drive",
    icon: Car,
    description: "Schedule a test drive with our dealership",
    phoneNumber: "+1 (732) 638-0513",
    isSelected: false,
    assistantId: "6c02f892-3082-4c68-a3ee-92ca86444331"
  },
  {
    id: "restaurant-order",
    name: "Restaurant: Order a Pizza",
    icon: Pizza,
    description: "Order delicious pizza for delivery or pickup",
    phoneNumber: "(657) 464 2712",
    isSelected: false,
    assistantId: "23a2ccf0-044e-4340-8c88-850b272e2abf"
  },
  {
    id: "real-estate",
    name: "Real Estate: Find a House",
    icon: House,
    description: "Find your dream home with our AI assistant",
    phoneNumber: "+1 (657) 464-2712",
    isSelected: false,
    assistantId: "f8131f3d-58aa-4c81-a79e-1bf758803775"
  }
];
