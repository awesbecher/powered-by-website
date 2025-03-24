
import { BlogPost } from "@/types/blog";
import { NewsArticle } from "@/types/news";
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
import { officialLaunchAnnouncement } from "./official-launch-announcement";

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

// News and PR release articles
export const newsArticles: NewsArticle[] = [
  officialLaunchAnnouncement
];

// Combined array of all content (blog posts and news articles)
export const allContent = [...blogPosts, ...newsArticles];

// Also export the array as samplePosts to maintain compatibility
export const samplePosts = blogPosts;
