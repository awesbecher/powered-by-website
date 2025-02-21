
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
      <ul className="flex items-center space-x-3">
        <li>
          <Link to="/" className="text-white hover:text-accent transition-colors">
            AI Agency
          </Link>
        </li>
        <li className="text-white">|</li>
        <li>
          <Link to="/solutions" className="text-white hover:text-accent transition-colors">
            Solutions
          </Link>
        </li>
        <li className="text-white">|</li>
        <li>
          <Link to="/demo" className="text-white hover:text-accent transition-colors">
            Demos
          </Link>
        </li>
        <li className="text-white">|</li>
        <li>
          <Link to="/contact" className="text-white hover:text-accent transition-colors">
            Contact Us
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
