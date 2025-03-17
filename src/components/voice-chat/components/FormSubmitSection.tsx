
import React from "react";
import { Link } from "react-router-dom";

interface FormSubmitSectionProps {
  isSubmitting: boolean;
}

export const FormSubmitSection: React.FC<FormSubmitSectionProps> = ({
  isSubmitting
}) => {
  return (
    <>
      <div className="text-sm text-gray-400">
        By continuing, you agree to Powered_by's{" "}
        <Link to="/privacy-statement" className="text-blue-400 hover:underline">
          Privacy Policy
        </Link>{" "}
        and consent to receive communications from us.
      </div>
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-white hover:bg-gray-100 text-black font-medium py-3 px-4 rounded transition-colors"
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </>
  );
};
