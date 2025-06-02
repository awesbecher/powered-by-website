
import React from 'react';
import { Button } from "@/components/ui/button";
import { accessCustomerPortal } from "../utils/portalAccess";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

// Form schema from parent
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  amount: z.coerce.number().min(1, { message: "Amount must be at least 1." }),
  receiveReceipt: z.boolean().default(true),
  paymentMethods: z.array(z.string()).default(["card"]),
  currency: z.string().default("usd")
});

type FormData = z.infer<typeof formSchema>;

interface FormActionsProps {
  form: UseFormReturn<FormData>;
  loading: boolean;
  onPortalAccess: () => void;
}

const FormActions: React.FC<FormActionsProps> = ({ form, loading, onPortalAccess }) => {
  return (
    <>
      <Button 
        type="submit" 
        className="w-full bg-[#6342ff] hover:bg-[#7e5fff] font-bold text-white" 
        disabled={loading}
      >
        {loading ? "Processing..." : "Proceed to Payment"}
      </Button>
      
      <div className="mt-4 text-center">
        <button
          type="button"
          onClick={onPortalAccess}
          className="text-[#a87cff] hover:text-white text-xs underline transition-colors"
        >
          Access customer portal for existing payments
        </button>
      </div>
      
      <div className="mt-2 text-center flex justify-center items-center space-x-2">
        <span className="text-white/50 text-xs">Secured by</span>
        <svg className="h-4" viewBox="0 0 60 25" xmlns="http://www.w3.org/2000/svg">
          <path d="M60 10.4267C60 4.65992 55.6133 0 50.0859 0C44.5535 0 40.172 4.65992 40.172 10.4267C40.172 16.1883 44.5535 20.8483 50.0859 20.8483C55.6133 20.8483 60 16.1883 60 10.4267ZM7.95117 1.25975H12.7578V14.5113H7.95117V1.25975ZM38.4141 6.43061L37.5791 2.71729L33.4922 2.72099V14.5113H38.0859V6.96358C39.3268 6.0918 40.1641 6.6866 40.3711 8.31259H44.7571C44.8633 5.11972 42.0012 3.60062 38.4141 6.43061ZM30.9961 5.89394C30.0236 4.76332 28.7383 4.16059 27.2461 4.16059C26.1769 4.16059 25.2038 4.45966 24.3281 5.0622C23.4551 5.66493 22.7758 6.53058 22.2969 7.66121H22.207C21.9141 6.5677 21.4117 5.71573 20.7031 5.0622C19.9943 4.40867 19.0572 4.08519 17.8906 4.08519C16.9828 4.08519 16.1846 4.33894 15.4961 4.84275C14.8066 5.34656 14.2858 6.03936 13.9219 6.91862V4.39076H9.42968V14.5113H14.1943V9.6347C14.1943 8.90232 14.3962 8.32659 14.7969 7.90949C15.1978 7.4924 15.6926 7.28385 16.2695 7.28385C16.8242 7.28385 17.2734 7.49979 17.6094 7.93797C17.9453 8.36986 18.1172 8.91654 18.1172 9.57748V14.5113H22.9336V9.6347C22.9336 8.90232 23.1224 8.32659 23.5 7.90949C23.8779 7.4924 24.366 7.28385 24.9648 7.28385C25.5195 7.28385 25.9661 7.49979 26.3047 7.93797C26.6432 8.37725 26.8125 8.92394 26.8125 9.57748V14.5113H31.5107V8.54034C31.5107 7.43334 31.0107 6.30272 30.9961 5.89394V5.89394ZM3.50391 10.4267C3.50391 11.1137 3.39256 11.8118 3.17383 12.5263C2.95313 13.2372 2.60677 13.9466 2.13086 14.6487L0 17.3158H4.44531C5.23631 15.9842 5.5 14.6487 5.5 11.4559C5.5 10.3819 6.14811 9.57748 7.26172 9.45977C6.99416 4.50108 5.26758 1.25975 0 1.25975H0V5.7904C2.33204 5.7904 3.50391 7.30949 3.50391 10.4267V10.4267Z" fill="white"/>
        </svg>
      </div>
    </>
  );
};

export default FormActions;
