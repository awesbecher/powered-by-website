
export interface Whitepaper {
  id: string;
  title: string;
  description: string | null;
  filename: string;
  file_path: string;
  published_at: string;
  downloads: number;
}
