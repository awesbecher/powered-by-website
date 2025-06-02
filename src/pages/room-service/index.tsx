
import { useEffect } from "react";
import RoomService from "./RoomService";

const RoomServiceContainer = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return <RoomService />;
};

export default RoomServiceContainer;
