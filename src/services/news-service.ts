import { NewsItem } from '@/types/news';

// Define a common interface for news items
export async function fetchDisasterNews(query: string = "natural disaster"): Promise<NewsItem[]> {
  // Combine results from multiple sources
  try {
    const [newsApiData, gNewsData, newsDataIoData] = await Promise.allSettled([
      fetchFromNewsApi(query),
      fetchFromGNews(query),
      fetchFromNewsData(query)
    ]);

    // Filter out rejected promises and combine results
    const results: NewsItem[] = [];

    if (newsApiData.status === 'fulfilled') {
      results.push(...newsApiData.value);
    }

    if (gNewsData.status === 'fulfilled') {
      results.push(...gNewsData.value);
    }

    if (newsDataIoData.status === 'fulfilled') {
      results.push(...newsDataIoData.value);
    }

    // Sort by date (newest first) and remove duplicates
    return results
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .filter((item, index, self) =>
        index === self.findIndex(t => t.url === item.url)
      );

  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
}

// NewsAPI
async function fetchFromNewsApi(query: string): Promise<NewsItem[]> {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(query + " India disaster")}&sortBy=publishedAt&language=en&pageSize=10`,
      {
        headers: {
          'X-Api-Key': process.env.NEWSAPI_KEY || ''
        }
      }
    );

    const data = await response.json();

    if (data.status !== 'ok') {
      throw new Error(data.message || 'Failed to fetch from NewsAPI');
    }

    return data.articles.map((article: any) => ({
      title: article.title,
      description: article.description,
      content: article.content,
      url: article.url,
      imageUrl: article.urlToImage,
      source: article.source.name,
      publishedAt: article.publishedAt,
      provider: 'NewsAPI'
    }));
  } catch (error) {
    console.error("NewsAPI error:", error);
    return [];
  }
}

// GNews
async function fetchFromGNews(query: string): Promise<NewsItem[]> {
  try {
    const response = await fetch(
      `https://gnews.io/api/v4/search?q=${encodeURIComponent(query + " India disaster")}&lang=en&country=in&max=10&apikey=${process.env.GNEWS_API_KEY}`
    );

    const data = await response.json();

    if (!data.articles) {
      throw new Error(data.errors?.[0] || 'Failed to fetch from GNews');
    }

    return data.articles.map((article: any) => ({
      title: article.title,
      description: article.description,
      content: article.content,
      url: article.url,
      imageUrl: article.image,
      source: article.source.name,
      publishedAt: article.publishedAt,
      provider: 'GNews'
    }));
  } catch (error) {
    console.error("GNews error:", error);
    return [];
  }
}

// NewsData.io
async function fetchFromNewsData(query: string): Promise<NewsItem[]> {
  try {
    const response = await fetch(
      `https://newsdata.io/api/1/news?apikey=${process.env.NEWSDATA_API_KEY}&q=${encodeURIComponent(query + " India disaster")}&language=en&country=in`
    );

    const data = await response.json();

    if (data.status !== 'success') {
      throw new Error(data.results?.message || 'Failed to fetch from NewsData.io');
    }

    return data.results.map((article: any) => ({
      title: article.title,
      description: article.description,
      content: article.content,
      url: article.link,
      imageUrl: article.image_url,
      source: article.source_id,
      publishedAt: article.pubDate,
      provider: 'NewsData.io'
    }));
  } catch (error) {
    console.error("NewsData.io error:", error);
    return [];
  }
}
// Add to news-service.ts
export function analyzeNewsSentiment(content: string): {
  sentiment: 'positive' | 'neutral' | 'negative' | 'critical';
  score: number;
  keyInsights: string[];
} {
  // Simple sentiment analysis based on keywords
  const positiveWords = ['rescued', 'recovery', 'improving', 'saved', 'safe'];
  const negativeWords = ['damage', 'injured', 'casualties', 'destroyed', 'danger'];
  const criticalWords = ['catastrophic', 'emergency', 'evacuate', 'deadly', 'crisis'];

  // Count occurrences
  const positiveCount = positiveWords.filter(word => content.toLowerCase().includes(word)).length;
  const negativeCount = negativeWords.filter(word => content.toLowerCase().includes(word)).length;
  const criticalCount = criticalWords.filter(word => content.toLowerCase().includes(word)).length;

  // Calculate score
  const totalWords = content.split(' ').length;
  const score = ((positiveCount * 1) - (negativeCount * 1) - (criticalCount * 2)) / totalWords;

  // Extract key insights (for hackathon, identify sentences with important keywords)
  const sentences = content.match(/[^.!?]+[.!?]+/g) || [];
  const keyInsights = sentences
    .filter(sentence =>
      criticalWords.some(word => sentence.toLowerCase().includes(word)) ||
      (sentence.toLowerCase().includes('casualties') && /\d+/.test(sentence))
    )
    .map(sentence => sentence.trim())
    .slice(0, 3);

  // Determine sentiment
  let sentiment: 'positive' | 'neutral' | 'negative' | 'critical' = 'neutral';
  if (score < -0.05 && criticalCount > 0) sentiment = 'critical';
  else if (score < 0) sentiment = 'negative';
  else if (score > 0.02) sentiment = 'positive';

  return { sentiment, score, keyInsights };
}