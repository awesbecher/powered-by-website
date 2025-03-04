
import { BlogPost } from "@/types/blog";
import { voiceAiCustomerService } from "./voice-ai-customer-service";
import { futureOfAiInteractions } from "./future-of-ai-interactions";
import { aiDrivenPersonalization } from "./ai-driven-personalization";
import { voiceAiRetail } from "./voice-ai-retail";
import { saasCustomerEngagement } from "./saas-customer-engagement";
import { humanLikeAiSecrets } from "./human-like-ai-secrets";
import { understandingAiAgents } from "./understanding-ai-agents";
import { aiTrillionMarket } from "./ai-trillion-market";
import { aiAgentsVsRpa } from "./ai-agents-vs-rpa";
import { aiAgentsEvaluation } from "./ai-agents-evaluation";
import { smbConversationalAgents } from "./smb-conversational-agents";

// Export all blog posts in an array
export const blogPosts: BlogPost[] = [
  voiceAiCustomerService,
  futureOfAiInteractions,
  aiDrivenPersonalization,
  voiceAiRetail,
  saasCustomerEngagement,
  humanLikeAiSecrets,
  understandingAiAgents,
  aiTrillionMarket,
  aiAgentsVsRpa,
  aiAgentsEvaluation,
  smbConversationalAgents
];

// Also export the array as samplePosts to maintain compatibility
export const samplePosts = blogPosts;
