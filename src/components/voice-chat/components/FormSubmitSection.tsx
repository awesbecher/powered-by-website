
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { POWERED_BY_STYLE } from "../hooks/types/contactFormTypes";

interface FormSubmitSectionProps {
  isSubmitting: boolean;
}

export const FormSubmitSection: React.FC<FormSubmitSectionProps> = ({
  isSubmitting
}) => {
  return (
    <div className="space-y-0">
      <div className="text-[7px] text-gray-400 mb-0 leading-tight">
        By continuing, you agree to <span className={POWERED_BY_STYLE}>Powered_by</span>'s{" "}
        <Link to="/privacy-statement" className="text-purple-400 hover:text-purple-300 transition-colors">
          Privacy Policy
        </Link>{" "}
        and consent to receive communications from us.
      </div>
      
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-[#8a75e3] to-[#9b87f5] hover:opacity-90 text-white font-medium py-1 h-auto text-sm rounded-md transition-all shadow-md mt-0.5 mb-0"
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-2 h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Submitting...
          </div>
        ) : (
          "Submit"
        )}
      </Button>
      
      {/* Attach the disclaimers directly to the button with negative margin to remove any gap */}
      <div className="w-full bg-[#1a0b2e] py-0 px-4 text-white font-semibold text-left -mt-px border-t border-gray-800/50">
        <p className="text-[7px] my-0 leading-none">*Only business or company email addresses are accepted by this form.</p>
      </div>
      
      <div className="text-[7px] text-gray-200 text-center py-0 px-2 bg-gray-800/60 rounded-b border-t border-gray-700 leading-none -mt-px">
        By using <span className={POWERED_BY_STYLE}>Powered_by</span> you agree to our{" "}
        <Link to="/terms-of-service" className="text-purple-400 hover:text-purple-300 transition-colors">
          Terms of Service
        </Link>
        ,{" "}
        <Link to="/privacy-statement" className="text-purple-400 hover:text-purple-300 transition-colors">
          Privacy
        </Link>
        , and Security policies and practices.
      </div>
    </div>
  );
};
