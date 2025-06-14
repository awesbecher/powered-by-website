
import React from "react";
import { Button } from "@/components/ui/button";

interface FormSubmitSectionProps {
  isSubmitting: boolean;
}

export const FormSubmitSection: React.FC<FormSubmitSectionProps> = ({
  isSubmitting
}) => {
  return (
    <div className="space-y-2">
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-[#8a75e3] to-[#9b87f5] hover:opacity-90 text-white font-medium py-2 text-sm rounded-md transition-all shadow-md"
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
    </div>
  );
};
