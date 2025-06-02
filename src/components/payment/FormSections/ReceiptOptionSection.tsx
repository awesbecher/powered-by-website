
import React from 'react';
import { FormField, FormItem, FormControl, FormLabel } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
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

interface ReceiptOptionSectionProps {
  form: UseFormReturn<FormData>;
}

const ReceiptOptionSection: React.FC<ReceiptOptionSectionProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="receiveReceipt"
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-2">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              className="data-[state=checked]:bg-[#6342ff]"
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel className="text-white text-sm font-normal">
              Send receipt email after payment
            </FormLabel>
          </div>
        </FormItem>
      )}
    />
  );
};

export default ReceiptOptionSection;
