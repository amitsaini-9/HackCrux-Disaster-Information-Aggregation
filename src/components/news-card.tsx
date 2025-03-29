"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { NewsItem } from "@/types/news";
import { AnimatePresence, motion } from "framer-motion";
import { Brain, ExternalLink } from "lucide-react";
import { useState } from "react";
import NewsAnalysisComponent from "./news-analysis";

interface NewsCardProps {
  news: NewsItem;
}

export default function NewsCard({ news }: NewsCardProps) {
  const [showAnalysis, setShowAnalysis] = useState(false);
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Generate a color based on the provider
  const getProviderColor = (provider: string) => {
    switch (provider) {
      case "NewsAPI":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "GNews":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "NewsData.io":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      <a
        href={news.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
      >
        <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
          {news.imageUrl && (
            <div className="relative h-48 w-full overflow-hidden">
              <img
                src={news.imageUrl}
                alt={news.title}
                className="object-cover w-full h-full"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://loremflickr.com/320/240";
                }}
              />
            </div>
          )}

          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-2 mb-2">
              <Badge
                variant="outline"
                className={getProviderColor(news.provider)}
              >
                {news.provider}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {formatDate(news.publishedAt)}
              </span>
            </div>

            <h3 className="font-bold text-lg mb-2 line-clamp-2">
              {news.title}
            </h3>

            {news.description && (
              <p className="text-sm text-muted-foreground mb-2 line-clamp-3">
                {news.description}
              </p>
            )}

            <p className="text-sm">Source: {news.source}</p>
          </CardContent>

          <CardFooter className="p-4 pt-0 flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                setShowAnalysis(!showAnalysis);
              }}
              className="flex items-center"
            >
              <Brain className="h-4 w-4 mr-1" />
              {showAnalysis ? "Hide Analysis" : "AI Analysis"}
            </Button>

            <a
              href={news.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary flex items-center"
              onClick={(e) => e.stopPropagation()}
            >
              Read more <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </CardFooter>
          <AnimatePresence>
            {showAnalysis && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="px-4 pb-4"
              >
                <NewsAnalysisComponent news={news} />
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </a>
    </motion.div>
  );
}
