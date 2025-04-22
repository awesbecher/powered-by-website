import * as React from "react"
import { ArrowLeft, ArrowRight, Arrow } from "lucide-react"
import {
  Navigation,
  NavigationItem,
  NavigationLink,
} from "@/components/ui/navigation"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { Slot } from "@radix-ui/react-slot"

interface SidebarContextProps {
  collapsed: boolean
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}

const SidebarContext = React.createContext<SidebarContextProps>({
  collapsed: false,
  setCollapsed: () => null,
})

function useSidebarContext() {
  return React.useContext(SidebarContext)
}

interface SidebarProps extends React.PropsWithChildren {
  defaultCollapsed?: boolean
}

function Sidebar({ children, defaultCollapsed }: SidebarProps) {
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed || false)
  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      {children}
    </SidebarContext.Provider>
  )
}

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { collapsed } = useSidebarContext()
  return (
    <aside
      ref={ref}
      className={cn(
        "group/sidebar flex h-full min-h-screen flex-col border-r bg-background transition-all duration-300",
        collapsed ? "w-16" : "w-64",
        className
      )}
      {...props}
    >
      {children}
    </aside>
  )
})
SidebarContent.displayName = "SidebarContent"

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { collapsed } = useSidebarContext()
  return (
    <div
      ref={ref}
      className={cn(
        "flex h-20 items-center justify-between px-4 py-2",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})
SidebarHeader.displayName = "SidebarHeader"

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { collapsed } = useSidebarContext()
  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-center gap-4 border-t p-3 transition-all duration-300",
        collapsed ? "px-2" : "px-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})
SidebarFooter.displayName = "SidebarFooter"

const SidebarMenu = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { collapsed } = useSidebarContext()
  return (
    <div
      ref={ref}
      className={cn("flex-1", collapsed ? "px-2" : "px-4", className)}
      {...props}
    >
      <ScrollArea className="h-full">{children}</ScrollArea>
    </div>
  )
})
SidebarMenu.displayName = "SidebarMenu"

const SidebarCollapse = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
  const { collapsed, setCollapsed } = useSidebarContext()
  return (
    <Button
      variant="ghost"
      size="icon"
      ref={ref}
      className={cn(
        "h-8 w-8 rounded-md p-0 hover:bg-accent hover:text-accent-foreground",
        className
      )}
      onClick={() => setCollapsed(!collapsed)}
      {...props}
    >
      {collapsed ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
      <span className="sr-only">Toggle sidebar</span>
    </Button>
  )
})
SidebarCollapse.displayName = "SidebarCollapse"

const SidebarCollapseButton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("relative hidden data-[hide=true]:hidden", className)}
      {...props}
    >
      {children}
    </div>
  )
})
SidebarCollapseButton.displayName = "SidebarCollapseButton"

const SidebarClose = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentPropsWithoutRef<typeof Button> & {
    asChild?: boolean
  }
>(({ asChild = false, className, children, ...props }, ref) => {
  const { collapsed, setCollapsed } = useSidebarContext()

  const Comp = asChild ? Slot : Button

  return (
    <SidebarCollapseButton className="hidden md:flex">
      <Comp
        variant="outline"
        size="sm"
        ref={ref}
        className={cn(
          "h-8 w-8 p-0 hover:bg-accent hover:text-accent-foreground",
          className
        )}
        onClick={() => setCollapsed(!collapsed)}
        {...props}
      >
        <Arrow size={16} />
        <span className="sr-only">Toggle sidebar</span>
      </Comp>
    </SidebarCollapseButton>
  )
})
SidebarClose.displayName = "SidebarClose"

export {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarCollapse,
  SidebarClose,
  SidebarCollapseButton,
}
