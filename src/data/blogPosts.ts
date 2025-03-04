
import { BlogPost } from "@/types/blog";

// Make sure we're exporting a variable named 'samplePosts' to match the import in BlogSection.tsx
export const samplePosts: BlogPost[] = [
  {
    id: "1",
    slug: "ai-voice-customer-service",
    category: "AI Voice",
    title: "Revolutionizing Customer Service with AI Voice Technology",
    excerpt: "Explore how AI voice technology is transforming customer service, offering personalized and efficient support experiences.",
    date: "March 15, 2024",
    author: "AI Team",
    readTime: "5 min read",
    content: "This is the full content of the blog post about AI voice in customer service.",
  },
  {
    id: "2",
    slug: "future-of-ai-interactions",
    category: "Artificial Intelligence",
    title: "The Future of AI Interactions: Conversational AI and Beyond",
    excerpt: "Discover the latest trends in conversational AI and how they're shaping the future of human-computer interactions.",
    date: "February 28, 2024",
    author: "AI Research",
    readTime: "7 min read",
    content: "This is the full content of the blog post about the future of AI interactions.",
  },
  {
    id: "3",
    slug: "ai-driven-personalization",
    category: "Personalization",
    title: "AI-Driven Personalization: Creating Tailored Customer Experiences",
    excerpt: "Learn how AI algorithms are used to personalize customer experiences, enhancing engagement and satisfaction.",
    date: "January 20, 2024",
    author: "Customer Experience Team",
    readTime: "6 min read",
    content: "This is the full content of the blog post about AI-driven personalization.",
  },
];

// Also export as blogPosts to maintain compatibility with other components
export const blogPosts = samplePosts;
