"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { NewsItem } from "@/types/news";
import NewsCard from "@/components/news-card";
import LoadingState from "@/components/ui/loading-spinner";
import { Search } from "lucide-react";
import { toast } from "sonner";

export default function NewsFeed() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("disaster India");
  const [searchInput, setSearchInput] = useState("disaster India");

  const fetchNews = async (query: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/news?query=${encodeURIComponent(query)}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch news");
      }

      const data = await response.json();
      setNews(data.news);
    } catch (error) {
      console.error("Error fetching news:", error);
      toast({
        title: "Error",
        description: "Failed to fetch news. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(searchQuery);
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchInput);
  };

  if (loading) {
    return <LoadingState text="Fetching latest news..." />;
  }

  return (
    <div className="space-y-6">
      <Card className="p-4">
        <CardContent className="p-0">
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              placeholder="Search disaster news..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="flex-1"
            />
            <Button type="submit">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </form>
        </CardContent>
      </Card>

      {news.length === 0 ? (
        <Card className="p-6">
          <p className="text-center text-muted-foreground">
            No news found for "{searchQuery}". Try a different search term.
          </p>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {news.map((item, index) => (
            <NewsCard key={`${item.url}-${index}`} news={item} />
          ))}
        </div>
      )}
    </div>
  );
}
