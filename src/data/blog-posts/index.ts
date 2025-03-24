
import { BlogPost } from "@/types/blog";
import { NewsArticle } from "@/types/news";

// Blog Posts
import { understandingAiAgents } from "./understanding-ai-agents";
import { aiTrillionMarket } from "./ai-trillion-market";
import { voiceAiRetail } from "./voice-ai-retail";
import { openaiAnthropicSmb } from "./openai-anthropic-smb";
import { aiAgentsEvaluation } from "./ai-agents-evaluation";
import { saasCustomerEngagement } from "./saas-customer-engagement";
import { humanLikeAi } from "./human-like-ai";
import { smbConversationalAgents } from "./smb-conversational-agents";
import { customerServiceEvolution } from "./customer-service-evolution";
import { aiFearsSMB } from "./ai-fears-smb";
import { aiVoiceCustomerService } from "./ai-voice-customer-service";
import { futureOfAIInteractions } from "./future-of-ai-interactions";
import { aiDrivenPersonalization } from "./ai-driven-personalization";

// News Articles & PR Releases
import { officialLaunchAnnouncement } from "./official-launch-announcement";

// Combined list of blog posts
export const blogPosts: BlogPost[] = [
  understandingAiAgents,
  aiTrillionMarket,
  voiceAiRetail,
  openaiAnthropicSmb,
  aiAgentsEvaluation,
  saasCustomerEngagement,
  humanLikeAi,
  smbConversationalAgents,
  customerServiceEvolution,
  aiFearsSMB,
];

// Sample posts for testing (subset of all posts)
export const samplePosts: BlogPost[] = [
  understandingAiAgents,
  aiTrillionMarket,
  voiceAiRetail,
];

// News articles and PR releases
export const newsArticles: NewsArticle[] = [
  officialLaunchAnnouncement,
  aiVoiceCustomerService,
  futureOfAIInteractions,
  aiDrivenPersonalization
];

// Combined content for all posts (blog posts and news articles)
export const allContent = [...blogPosts, ...newsArticles];
