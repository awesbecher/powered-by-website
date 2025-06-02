import * as React from "react"
import { ArrowUp } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn(
          "hidden border-r bg-secondary text-secondary-foreground sm:block",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Sidebar.displayName = "Sidebar"

export { Sidebar }
