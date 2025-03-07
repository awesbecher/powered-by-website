
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="flex-shrink-0">
      <Link to="/">
        <img 
          src="/lovable-uploads/21341be9-b85c-4ea3-b346-3c45080b3810.png" 
          alt="Powered By Agency" 
          className="h-8 w-auto object-contain"
        />
      </Link>
    </div>
  );
};

export default Logo;
