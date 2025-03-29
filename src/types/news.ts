export interface NewsItem {
  title: string;
  description: string | null;
  content: string | null;
  url: string;
  imageUrl: string | null;
  source: string;
  publishedAt: string;
  provider: 'NewsAPI' | 'GNews' | 'NewsData.io';
}