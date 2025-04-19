import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PlusCircle, Trash2, Wand2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AgentTemplatesKey, agentTemplates } from "./components/voice-agent-builder/data/templateData";

// Form schema with zod validation
const formSchema = z.object({
  name: z.string().min(2, { message: "Agent name must be at least 2 characters." }),
  industry: z.string().min(2, { message: "Please select an industry." }),
  voiceStyle: z.string(),
  voiceGender: z.string(),
  prompt: z.string().min(10, { message: "Prompt must be at least 10 characters." }),
  escalationRules: z.boolean(),
  escalationEmail: z.string().email().optional().or(z.literal('')),
  bookingLink: z.string().url().optional().or(z.literal('')),
  temperature: z.number().min(0).max(1),
  faqs: z.array(
    z.object({
      question: z.string().min(3, { message: "Question is required" }),
      answer: z.string().min(3, { message: "Answer is required" })
    })
  )
});

type FormValues = z.infer<typeof formSchema>;

interface VisualAgentBuilderProps {
  templateKey?: AgentTemplatesKey;
}

const VisualAgentBuilder: React.FC<VisualAgentBuilderProps> = ({ templateKey }) => {
  // Initialize with default values or template values if available
  const [initialValues, setInitialValues] = useState<FormValues>({
    name: "",
    industry: "",
    voiceStyle: "professional",
    voiceGender: "female",
    prompt: "",
    escalationRules: false,
    escalationEmail: "",
    bookingLink: "",
    temperature: 0.7,
    faqs: [{ question: "", answer: "" }]
  });

  const [isGenerating, setIsGenerating] = useState(false);
  
  // Get template data if templateKey is provided
  useEffect(() => {
    if (templateKey && agentTemplates[templateKey]) {
      const template = agentTemplates[templateKey];
      setInitialValues(prevState => ({
        ...prevState,
        name: template.name.split(" - ")[0] || "My Agent",
        industry: template.industry || prevState.industry,
        prompt: template.prompt || prevState.prompt,
        // Other fields would be set here based on template data
      }));
    }
  }, [templateKey]);

  // Initialize form with react-hook-form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
    values: initialValues,
  });
  
  // Watch for changes to update preview
  const watchedValues = form.watch();
  
  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data);
    // Here you would handle form submission, e.g. save to database
  };
  
  // Add a new FAQ
  const addFaq = () => {
    const currentFaqs = form.getValues("faqs");
    form.setValue("faqs", [...currentFaqs, { question: "", answer: "" }]);
  };
  
  // Remove an FAQ
  const removeFaq = (index: number) => {
    const currentFaqs = form.getValues("faqs");
    form.setValue("faqs", currentFaqs.filter((_, i) => i !== index));
  };
  
  // Generate content with AI
  const generateWithAI = async (field: keyof FormValues) => {
    setIsGenerating(true);
    
    // Simulate AI generation delay
    setTimeout(() => {
      if (field === "prompt") {
        const industryValue = form.getValues("industry");
        const nameValue = form.getValues("name");
        
        const generatedPrompt = `You are ${nameValue}, an AI assistant specialized in the ${industryValue} industry.
        
Your primary goals are to:
1. Provide helpful and accurate information to users
2. Answer questions about products, services, and pricing
3. Book appointments and schedule meetings when requested
4. Collect contact information for follow-up
5. Transfer to a human agent when unable to handle complex requests

Always be professional, friendly, and concise in your responses. Avoid speculation and admit when you don't know something.`;
        
        form.setValue("prompt", generatedPrompt);
      }
      
      setIsGenerating(false);
    }, 1500);
  };
  
  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Basic Info */}
            <Card className="col-span-1 bg-white/5 backdrop-blur-sm border-white/10 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Basic Information</h3>
                
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Agent Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="E.g., Sales Assistant" 
                            {...field}
                            className="bg-white/5 border-white/20 text-white" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="industry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Industry</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-white/5 border-white/20 text-white">
                              <SelectValue placeholder="Select Industry" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-[#2f1c4a] border-white/20 text-white">
                            <SelectItem value="automotive">Automotive</SelectItem>
                            <SelectItem value="real_estate">Real Estate</SelectItem>
                            <SelectItem value="healthcare">Healthcare</SelectItem>
                            <SelectItem value="hospitality">Hospitality</SelectItem>
                            <SelectItem value="retail">Retail</SelectItem>
                            <SelectItem value="finance">Finance</SelectItem>
                            <SelectItem value="education">Education</SelectItem>
                            <SelectItem value="technology">Technology</SelectItem>
                            <SelectItem value="legal">Legal</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="voiceStyle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Voice Style</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="bg-white/5 border-white/20 text-white">
                                <SelectValue placeholder="Select Style" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-[#2f1c4a] border-white/20 text-white">
                              <SelectItem value="professional">Professional</SelectItem>
                              <SelectItem value="friendly">Friendly</SelectItem>
                              <SelectItem value="casual">Casual</SelectItem>
                              <SelectItem value="formal">Formal</SelectItem>
                              <SelectItem value="excited">Excited</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="voiceGender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Voice Gender</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="bg-white/5 border-white/20 text-white">
                                <SelectValue placeholder="Select Gender" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-[#2f1c4a] border-white/20 text-white">
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="neutral">Neutral</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="temperature"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex justify-between">
                          <FormLabel>Creativity (Temperature)</FormLabel>
                          <span className="text-sm">{field.value.toFixed(1)}</span>
                        </div>
                        <FormControl>
                          <Slider
                            min={0}
                            max={1}
                            step={0.1}
                            value={[field.value]}
                            onValueChange={(vals) => field.onChange(vals[0])}
                            className="py-4"
                          />
                        </FormControl>
                        <FormDescription className="text-gray-400 text-xs">
                          Lower values make responses more consistent, higher values increase creativity.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
            
            {/* Middle Column: Prompt */}
            <Card className="col-span-1 lg:col-span-2 bg-white/5 backdrop-blur-sm border-white/10 shadow-lg">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">Agent Instructions</h3>
                  <Button
                    type="button"
                    variant="outline" 
                    size="sm"
                    onClick={() => generateWithAI("prompt")}
                    disabled={isGenerating}
                    className="flex items-center gap-1 border-[#8B5CF6] text-[#8B5CF6] hover:bg-[#8B5CF6]/10"
                  >
                    {isGenerating ? "Generating..." : (
                      <>
                        <Wand2 size={14} />
                        Generate
                      </>
                    )}
                  </Button>
                </div>
                
                <FormField
                  control={form.control}
                  name="prompt"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Instructions for your AI agent..."
                          className="min-h-[300px] bg-white/5 border-white/20 text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-gray-400 text-xs mt-2">
                        Provide clear instructions to shape your agent's behavior, knowledge, and tone.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            
            {/* FAQs */}
            <Card className="col-span-1 lg:col-span-3 bg-white/5 backdrop-blur-sm border-white/10 shadow-lg">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
                  <Button
                    type="button"
                    onClick={addFaq}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1 border-[#8B5CF6] text-[#8B5CF6] hover:bg-[#8B5CF6]/10"
                  >
                    <PlusCircle size={14} />
                    Add FAQ
                  </Button>
                </div>
                
                <div className="space-y-6">
                  {form.watch("faqs").map((_, index) => (
                    <div key={index} className="p-4 border border-white/10 rounded-lg bg-white/5">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-medium">FAQ #{index + 1}</h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFaq(index)}
                          className="h-8 px-2 text-red-400 hover:text-red-500 hover:bg-red-950/30"
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                      
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name={`faqs.${index}.question`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm">Question</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="E.g., What are your business hours?" 
                                  {...field} 
                                  className="bg-white/5 border-white/20 text-white"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name={`faqs.${index}.answer`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm">Answer</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="E.g., Our business hours are Monday to Friday, 9am to 5pm." 
                                  {...field}
                                  className="bg-white/5 border-white/20 text-white"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Advanced Settings */}
            <Card className="col-span-1 lg:col-span-3 bg-white/5 backdrop-blur-sm border-white/10 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Advanced Settings</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="escalationRules"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between p-4 rounded-lg border border-white/10">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Enable Escalation Rules</FormLabel>
                            <FormDescription className="text-gray-400 text-xs">
                              Allow the agent to escalate complex requests to a human.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="data-[state=checked]:bg-[#8B5CF6]"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    {form.watch("escalationRules") && (
                      <FormField
                        control={form.control}
                        name="escalationEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Escalation Email</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="E.g., support@yourcompany.com" 
                                {...field} 
                                type="email"
                                className="bg-white/5 border-white/20 text-white" 
                              />
                            </FormControl>
                            <FormDescription className="text-gray-400 text-xs">
                              Email address to receive escalated requests.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>
                  
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="bookingLink"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Booking/Calendar Link</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="E.g., https://calendly.com/yourname" 
                              {...field} 
                              className="bg-white/5 border-white/20 text-white" 
                            />
                          </FormControl>
                          <FormDescription className="text-gray-400 text-xs">
                            Link to your booking system (Calendly, Cal.com, etc.)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex justify-end">
            <Button type="submit" className="bg-[#8B5CF6] hover:bg-[#7C3AED]">
              Save Agent Configuration
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default VisualAgentBuilder;
