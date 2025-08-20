import { createWorker } from 'tesseract.js';

export interface OCRResult {
  text: string;
  confidence: number;
}

export const extractTextFromImage = async (imageBlob: Blob): Promise<OCRResult> => {
  const worker = await createWorker('eng');
  
  try {
    const { data: { text, confidence } } = await worker.recognize(imageBlob);
    
    return {
      text: text.trim(),
      confidence: Math.round(confidence)
    };
  } finally {
    await worker.terminate();
  }
};

export const analyzeSentiment = (text: string): { 
  sentiment: 'positive' | 'negative' | 'neutral';
  confidence: number;
  summary: string;
} => {
  // Simple sentiment analysis logic (in a real app, you'd use a proper AI service)
  const positiveWords = ['good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic', 'love', 'happy', 'joy', 'perfect', 'best', 'awesome', 'brilliant', 'outstanding', 'superb'];
  const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'sad', 'angry', 'disappointed', 'horrible', 'worst', 'disgusting', 'annoying', 'frustrating', 'poor', 'pathetic', 'useless'];
  
  const words = text.toLowerCase().split(/\s+/);
  let positiveCount = 0;
  let negativeCount = 0;
  
  words.forEach(word => {
    if (positiveWords.some(pw => word.includes(pw))) positiveCount++;
    if (negativeWords.some(nw => word.includes(nw))) negativeCount++;
  });
  
  const totalSentimentWords = positiveCount + negativeCount;
  let sentiment: 'positive' | 'negative' | 'neutral' = 'neutral';
  let confidence = 50;
  
  if (totalSentimentWords > 0) {
    if (positiveCount > negativeCount) {
      sentiment = 'positive';
      confidence = Math.min(95, 60 + (positiveCount / totalSentimentWords) * 35);
    } else if (negativeCount > positiveCount) {
      sentiment = 'negative';
      confidence = Math.min(95, 60 + (negativeCount / totalSentimentWords) * 35);
    }
  }
  
  const getSummary = () => {
    switch (sentiment) {
      case 'positive':
        return `Positive sentiment detected with ${positiveCount} positive indicator${positiveCount !== 1 ? 's' : ''}`;
      case 'negative':
        return `Negative sentiment detected with ${negativeCount} negative indicator${negativeCount !== 1 ? 's' : ''}`;
      default:
        return 'Neutral sentiment - no strong emotional indicators detected';
    }
  };
  
  return {
    sentiment,
    confidence: Math.round(confidence),
    summary: getSummary()
  };
};