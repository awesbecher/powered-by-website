
import { useState } from "react";

export const useRealEstateCallState = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  return {
    isOpen,
    setIsOpen,
    isScheduleOpen,
    setIsScheduleOpen,
    phoneNumber,
    setPhoneNumber
  };
};
