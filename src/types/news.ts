
export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: "News" | "PR Release";
  slug: string;
  content: string;
}
