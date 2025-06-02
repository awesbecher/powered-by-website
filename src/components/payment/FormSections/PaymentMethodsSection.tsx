
import React from 'react';
import { FormField, FormItem, FormLabel } from "@/components/ui/form";
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

interface PaymentMethodsSectionProps {
  form: UseFormReturn<FormData>;
}

const PaymentMethodsSection: React.FC<PaymentMethodsSectionProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="paymentMethods"
      render={() => (
        <FormItem>
          <FormLabel className="text-white">Payment Methods</FormLabel>
          <div className="bg-white/10 p-3 rounded-md text-sm text-white/80">
            All major payment methods are supported including credit/debit cards, Apple Pay, Google Pay, and more.
          </div>
        </FormItem>
      )}
    />
  );
};

export default PaymentMethodsSection;
