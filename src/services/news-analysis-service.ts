import { NewsItem } from '@/types/news';

export interface NewsAnalysis {
  title: string;
  relevanceScore: number; // 0-100
  reliability: 'low' | 'medium' | 'high';
  sentiment: 'positive' | 'negative' | 'neutral';
  keyPoints: string[];
  controversyScore: number; // 0-100
}

export function analyzeNewsArticle(news: NewsItem): NewsAnalysis {

  // Check for disaster-related keywords
  const disasterKeywords = [
    'disaster', 'emergency', 'catastrophe', 'crisis',
    'flood', 'earthquake', 'cyclone', 'tsunami',
    'wildfire', 'landslide', 'casualties', 'evacuation'
  ];

  const content = (news.content || '') + ' ' + (news.description || '');
  const contentLower = content.toLowerCase();

  // Calculate keyword presence
  const keywordMatches = disasterKeywords.filter(word =>
    contentLower.includes(word.toLowerCase())
  ).length;

  // Calculate relevance score based on keyword density
  const words = content.split(/\s+/).length;
  const relevanceScore = Math.min(100, Math.round((keywordMatches / disasterKeywords.length) * 100));

  // Assess reliability based on source and content length
  let reliability: 'low' | 'medium' | 'high' = 'medium';

  const reliableSourceKeywords = ['government', 'official', 'authority', 'ministry', 'department'];
  const unreliableSourceKeywords = ['unconfirmed', 'allegedly', 'sources say', 'rumor', 'claim'];

  const hasReliableIndicators = reliableSourceKeywords.some(word =>
    news.source.toLowerCase().includes(word) || contentLower.includes(word)
  );

  const hasUnreliableIndicators = unreliableSourceKeywords.some(word =>
    contentLower.includes(word)
  );

  if (hasReliableIndicators && !hasUnreliableIndicators) {
    reliability = 'high';
  } else if (hasUnreliableIndicators) {
    reliability = 'low';
  }

  // Sentiment analysis
  const positiveWords = ['rescue', 'saved', 'recover', 'success', 'relief', 'aid'];
  const negativeWords = ['death', 'casualties', 'damage', 'destruction', 'devastation'];

  const positiveCount = positiveWords.filter(word => contentLower.includes(word)).length;
  const negativeCount = negativeWords.filter(word => contentLower.includes(word)).length;

  let sentiment: 'positive' | 'negative' | 'neutral' = 'neutral';
  if (positiveCount > negativeCount) {
    sentiment = 'positive';
  } else if (negativeCount > positiveCount) {
    sentiment = 'negative';
  }

  // Extract key points (use sentences with important keywords)
  const sentences = content.match(/[^.!?]+[.!?]+/g) || [];
  const importantKeywords = ['death toll', 'injured', 'evacuation', 'emergency', 'rescue'];

  const keyPoints = sentences
    .filter(sentence =>
      importantKeywords.some(keyword => sentence.toLowerCase().includes(keyword))
    )
    .map(sentence => sentence.trim())
    .slice(0, 3);

  // Add a random key point if we don't have enough
  if (keyPoints.length < 2 && sentences.length > 0) {
    const randomSentence = sentences[Math.floor(Math.random() * sentences.length)];
    if (!keyPoints.includes(randomSentence)) {
      keyPoints.push(randomSentence.trim());
    }
  }

  // Calculate controversy score
  const controversyKeywords = ['controversy', 'dispute', 'blame', 'criticism', 'failed', 'scandal'];
  const controversyMatches = controversyKeywords.filter(word =>
    contentLower.includes(word.toLowerCase())
  ).length;

  const controversyScore = Math.min(100, Math.round((controversyMatches / controversyKeywords.length) * 100));

  return {
    title: news.title,
    relevanceScore,
    reliability,
    sentiment,
    keyPoints,
    controversyScore
  };
}