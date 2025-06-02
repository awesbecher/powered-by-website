
export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: "News" | "PR Release";
  slug: string;
  content: string;
}

export interface PressArticle {
  id: string;
  title: string;
  publication: string;
  date: string;
  excerpt: string;
  imageUrl?: string;
  externalUrl: string;
}
