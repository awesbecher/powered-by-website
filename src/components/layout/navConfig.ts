
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
      { name: "Virtual SE", path: "/virtual-se" },
      { name: "OutboundAI", path: "/outbound-ai" },
    ]
  },
  { name: "Demos", path: "/demo" }, // Changed from /demo-capture to /demo
  { 
    name: "Resources", 
    path: "#",
    children: [
      { name: "AI Research", path: "https://poweredbyagency.ghost.io", isExternal: true },
      { name: "News", path: "/news" },
      { name: "Careers", path: "/careers" },
      { name: "Pricing", path: "/pricing" },
      { name: "Videos", path: "https://www.youtube.com/@Powered_byAgency", isExternal: true },
      { name: "Podcast", path: "https://powered-by-ai-agents.jellypod.ai/", isExternal: true }
    ]
  },
  { name: "About", path: "/about" }
];

export const consultationPaths = ['/', '/ai-agency', '/products', '/demo', '/blog', '/news', '/voice-chat', '/ai-receptionist', '/email-agent', '/about', '/contact', '/text-agent'];
