
import { ElementType } from "react";

export interface AgentType {
  id: string;
  name: string;
  icon: ElementType;
  description: string;
  phoneNumber: string;
  isSelected: boolean;
  assistantId: string;
}
