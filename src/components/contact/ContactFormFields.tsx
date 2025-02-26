
import { Input } from "@/components/ui/input";
import { FormData } from "./types";

interface ContactFormFieldsProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
}

export const ContactFormFields = ({ formData, setFormData }: ContactFormFieldsProps) => {
  return (
    <>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
          Name
        </label>
        <Input 
          id="name" 
          value={formData.name} 
          onChange={e => setFormData({
            ...formData,
            name: e.target.value
          })} 
          className="bg-neutral-800 border-neutral-700 text-white" 
          required 
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
          Email
        </label>
        <Input 
          id="email" 
          type="email" 
          value={formData.email} 
          onChange={e => setFormData({
            ...formData,
            email: e.target.value
          })} 
          className="bg-neutral-800 border-neutral-700 text-white" 
          required 
          placeholder="your-email@company.com"
        />
        <p className="text-sm text-gray-400 mt-1">Please use your corporate email address</p>
      </div>
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
          Title
        </label>
        <Input 
          id="title" 
          value={formData.title} 
          onChange={e => setFormData({
            ...formData,
            title: e.target.value
          })} 
          className="bg-neutral-800 border-neutral-700 text-white" 
          required 
          placeholder="e.g. CEO, CTO, Product Manager"
        />
      </div>
      <div>
        <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
          Company
        </label>
        <Input 
          id="company" 
          value={formData.company} 
          onChange={e => setFormData({
            ...formData,
            company: e.target.value
          })} 
          className="bg-neutral-800 border-neutral-700 text-white" 
        />
      </div>
      <div>
        <label htmlFor="reason" className="block text-sm font-medium text-gray-300 mb-2">
          Reason for Scheduling Meeting?
        </label>
        <select
          id="reason"
          value={formData.reason}
          onChange={e => setFormData({
            ...formData,
            reason: e.target.value
          })}
          className="w-full rounded-md bg-neutral-800 border-neutral-700 text-white p-3"
          required
        >
          <option value="">Select a reason</option>
          <option value="specific">I have a specific AI project need</option>
          <option value="curious">I'm curious about AI agents - Just educating myself</option>
          <option value="other">Something else</option>
        </select>
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
          What's your vision? How would you like to use AI agents in your business?
        </label>
        <textarea 
          id="message" 
          rows={4} 
          value={formData.message} 
          onChange={e => setFormData({
            ...formData,
            message: e.target.value
          })} 
          className="w-full rounded-md bg-neutral-800 border-neutral-700 text-white p-3" 
          required 
        />
      </div>
    </>
  );
};
