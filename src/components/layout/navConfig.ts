import { NavItem } from "./NavLinks";

export interface NavItemWithChildren {
  name: string;
  path: string;
  isExternal?: boolean;
  children?: NavItem[];
}

interface NavItem {
  name: string;
  path: string;
  isExternal?: boolean;
}

export const navItems: NavItemWithChildren[] = [
  {
    name: "Products",
    path: "/products",
    children: [
      { name: "AI Voice Chat", path: "/voice-chat" },
      { name: "AI Receptionist", path: "/ai-receptionist" },
      { name: "Email Agent", path: "/email-agent" },
      { name: "Text Agent", path: "/text-agent" },
      { name: "Agent GPT", path: "/agent-gpt" },
      { name: "OutboundAI", path: "https://tryoutbound.ai", isExternal: true }
    ]
  },
  {
    name: "Resources",
    path: "/demo",
    children: [
      { name: "Demos", path: "/demo" },
      { name: "Agent Marketplace", path: "/agent-marketplace" },
      { name: "AI Research", path: "https://poweredbyagency.ghost.io", isExternal: true },
      { name: "News", path: "/news" },
      { name: "Videos", path: "https://www.youtube.com/@Powered_byAgency", isExternal: true },
      { name: "Podcast", path: "https://powered-by-ai-agents.jellypod.ai/", isExternal: true }
    ]
  },
  {
    name: "Pricing",
    path: "/pricing",
  },
  {
    name: "Contact",
    path: "/contact",
  }
];

export const consultationPaths = ['/', '/ai-agency', '/products', '/demo', '/blog', '/news', '/voice-chat', '/ai-receptionist', '/email-agent', '/about', '/trynow', '/text-agent'];
