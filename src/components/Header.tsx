
import { Link } from "react-router-dom";
import Navigation from "./Navigation";

const Header = () => {
  return (
    <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 lg:px-8 py-6">
      <div>
        <Link to="/">
          <img 
            src="/lovable-uploads/e8881317-eed8-45df-8a8d-34509d6701c6.png"
            alt="Parlar Logo"
            className="w-[192px] lg:w-[288px] h-auto"
          />
        </Link>
      </div>
      <Navigation />
    </div>
  );
};

export default Header;
