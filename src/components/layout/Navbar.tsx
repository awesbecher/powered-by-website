import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { name: "AI Agency", path: "/" },
    { name: "Solutions", path: "/products" },
    { name: "Demos", path: "/demo" },
    { name: "Blog", path: "/blog" }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#222222]/80 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img 
              src="/lovable-uploads/e8881317-eed8-45df-8a8d-34509d6701c6.png"
              alt="Parlar Logo"
              className="h-8 w-auto"
            />
          </Link>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    "px-3 py-2 text-sm font-medium relative group",
                    location.pathname === item.path
                      ? "text-accent"
                      : "text-gray-300 hover:text-white",
                    "transition-colors duration-200"
                  )}
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button - We'll keep it simple for now */}
          <div className="md:hidden">
            <button className="text-gray-300 hover:text-white p-2">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
