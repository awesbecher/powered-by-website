import { NavItem } from "./NavLinks";

export interface NavItemWithChildren extends NavItem {
  children?: NavItem[];
}

export const navItems: NavItemWithChildren[] = [
  { 
    name: "Solutions", 
    path: "/products",
    children: [
      { name: "AI Voice Chat", path: "/voice-chat" },
      { name: "AI Receptionist", path: "/ai-receptionist" },
      { name: "Email Agent", path: "/email-agent" },
      { name: "Text Agent", path: "/text-agent" },
      { name: "Virtual SE", path: "https://www.getvirtual.se", isExternal: true },
      { name: "OutboundAI", path: "https://tryoutbound.ai", isExternal: true },
    ]
  },
  { name: "Pricing", path: "/pricing" },
  { 
    name: "Resources", 
    path: "#",
    children: [
      { name: "Demos", path: "/demo" },
      { name: "AI Research", path: "https://poweredbyagency.ghost.io", isExternal: true },
      { name: "News", path: "/news" },
      { name: "Videos", path: "https://www.youtube.com/@Powered_byAgency", isExternal: true },
      { name: "Podcast", path: "https://powered-by-ai-agents.jellypod.ai/", isExternal: true }
    ]
  },
  { name: "About", path: "/about" }
];

export const consultationPaths = ['/', '/ai-agency', '/products', '/demo', '/blog', '/news', '/voice-chat', '/ai-receptionist', '/email-agent', '/about', '/trynow', '/text-agent'];
