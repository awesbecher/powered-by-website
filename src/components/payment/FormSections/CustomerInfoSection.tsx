
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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

interface CustomerInfoSectionProps {
  form: UseFormReturn<FormData>;
}

const CustomerInfoSection: React.FC<CustomerInfoSectionProps> = ({ form }) => {
  return (
    <>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">Name</FormLabel>
            <FormControl>
              <Input placeholder="Your full name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">Email for Invoice</FormLabel>
            <FormControl>
              <Input type="email" placeholder="your@email.com" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default CustomerInfoSection;
