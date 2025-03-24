
import { NavItem } from "./NavLinks";

export interface NavItemWithChildren extends NavItem {
  children?: NavItem[];
}

export const navItems: NavItemWithChildren[] = [
  { name: "Solutions", path: "/products" },
  { name: "Demos", path: "/demo" },
  { 
    name: "Resources", 
    path: "#",
    children: [
      { name: "AI Research", path: "https://poweredbyagency.ghost.io", isExternal: true },
      { name: "News", path: "https://poweredbyagency.ghost.io/tag/news/", isExternal: true },
      { name: "Careers", path: "/careers" },
      { name: "Pricing", path: "/pricing" }
    ]
  },
  { name: "About", path: "/about" }
];

export const consultationPaths = ['/', '/ai-agency', '/products', '/demo', '/blog', '/voice-chat', '/ai-receptionist', '/email-agent', '/about', '/contact', '/text-agent'];
