
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

interface PaymentDetailsSectionProps {
  form: UseFormReturn<FormData>;
  defaultAmount: number;
}

const PaymentDetailsSection: React.FC<PaymentDetailsSectionProps> = ({ form, defaultAmount }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="amount"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">Amount</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                placeholder={defaultAmount.toString()} 
                {...field} 
                readOnly={true}
                className="bg-gray-700 cursor-not-allowed"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="currency"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">Currency</FormLabel>
            <Select 
              defaultValue={field.value} 
              onValueChange={field.onChange}
              disabled={true}
            >
              <FormControl>
                <SelectTrigger className="bg-gray-700 cursor-not-allowed">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="usd">USD ($)</SelectItem>
                <SelectItem value="eur">EUR (€)</SelectItem>
                <SelectItem value="gbp">GBP (£)</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default PaymentDetailsSection;
