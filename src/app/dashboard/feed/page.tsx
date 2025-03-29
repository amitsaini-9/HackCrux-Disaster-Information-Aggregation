"use client";

import NewsFeed from "@/components/news-feed";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { demoFeed } from "@/constant/demoFeed";
import {
  Clock,
  ExternalLink,
  Filter,
  Flag,
  LocateFixed,
  MessageSquare,
  RefreshCw,
  Search,
} from "lucide-react";
import { useState } from "react";

// Helper function to get type color
const getTypeColor = (type: string) => {
  switch (type) {
    case "earthquake":
      return "bg-amber-100 text-amber-800";
    case "flood":
      return "bg-blue-100 text-blue-800";
    case "fire":
      return "bg-red-100 text-red-800";
    case "hurricane":
      return "bg-purple-100 text-purple-800";
    case "tornado":
      return "bg-teal-100 text-teal-800";
    case "volcano":
      return "bg-orange-100 text-orange-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function FeedPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const demoTrendingTopics = [
    { tag: "#CaliforniaFires", mentions: 1243 },
    { tag: "#JapanEarthquake", mentions: 982 },
    { tag: "#ThailandFloods", mentions: 756 },
    { tag: "#HurricaneSeason", mentions: 612 },
    { tag: "#EmergencyResponse", mentions: 438 },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Global Feed</h1>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw
              className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
          <Button size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      {/* Feed Interface */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Filter Feed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search feed..." className="pl-8" />
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Source Types</p>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Select source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Sources</SelectItem>
                      <SelectItem value="social">Social Media</SelectItem>
                      <SelectItem value="news">News</SelectItem>
                      <SelectItem value="government">Government</SelectItem>
                      <SelectItem value="scientific">Scientific</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Disaster Types</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant="outline"
                      className="cursor-pointer bg-amber-100 text-amber-800"
                    >
                      Earthquake
                    </Badge>
                    <Badge
                      variant="outline"
                      className="cursor-pointer bg-blue-100 text-blue-800"
                    >
                      Flood
                    </Badge>
                    <Badge
                      variant="outline"
                      className="cursor-pointer bg-red-100 text-red-800"
                    >
                      Fire
                    </Badge>
                    <Badge
                      variant="outline"
                      className="cursor-pointer bg-purple-100 text-purple-800"
                    >
                      Hurricane
                    </Badge>
                    <Badge
                      variant="outline"
                      className="cursor-pointer bg-teal-100 text-teal-800"
                    >
                      Tornado
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Regions</p>
                  <Select defaultValue="global">
                    <SelectTrigger>
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="global">Global</SelectItem>
                      <SelectItem value="asia">Asia</SelectItem>
                      <SelectItem value="europe">Europe</SelectItem>
                      <SelectItem value="north-america">
                        North America
                      </SelectItem>
                      <SelectItem value="south-america">
                        South America
                      </SelectItem>
                      <SelectItem value="africa">Africa</SelectItem>
                      <SelectItem value="oceania">Oceania</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Time Range</p>
                  <Select defaultValue="24h">
                    <SelectTrigger>
                      <SelectValue placeholder="Select time range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1h">Last Hour</SelectItem>
                      <SelectItem value="6h">Last 6 Hours</SelectItem>
                      <SelectItem value="24h">Last 24 Hours</SelectItem>
                      <SelectItem value="7d">Last 7 Days</SelectItem>
                      <SelectItem value="30d">Last 30 Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full">Apply Filters</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Trending Topics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {demoTrendingTopics.map((topic, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-blue-600">{topic.tag}</span>
                    <span className="text-muted-foreground text-xs">
                      {topic.mentions} mentions
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Feed */}
        <div className="md:col-span-2">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="official">Official</TabsTrigger>
              <TabsTrigger value="news">News</TabsTrigger>
              <TabsTrigger value="social">Social</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-4 space-y-4">
              {/* Feed Items */}
              {demoFeed.map((item, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-4">
                      <div className="flex items-start gap-3">
                        <Avatar>
                          <AvatarImage
                            src={`/placeholder-avatars/${index + 1}.jpg`}
                          />
                          <AvatarFallback>
                            {item.source.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 space-y-1">
                          <div className="flex items-center">
                            <span className="font-medium">{item.source}</span>
                            {item.verified && (
                              <Badge
                                variant="outline"
                                className="ml-2 bg-blue-100 text-blue-800"
                              >
                                Verified
                              </Badge>
                            )}
                            <Badge
                              variant="outline"
                              className={`ml-2 ${getTypeColor(
                                item.disasterType
                              )}`}
                            >
                              {item.disasterType.charAt(0).toUpperCase() +
                                item.disasterType.slice(1)}
                            </Badge>
                          </div>
                          <p className="text-sm">{item.content}</p>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="mr-1 h-3 w-3" />
                            <span className="mr-3">{item.time}</span>
                            <LocateFixed className="mr-1 h-3 w-3" />
                            <span>{item.location}</span>
                          </div>
                        </div>
                      </div>

                      {item.hasImage && (
                        <div className="mt-3 bg-muted h-48 w-full rounded-md flex items-center justify-center">
                          <p className="text-sm text-muted-foreground">
                            Event image placeholder
                          </p>
                        </div>
                      )}

                      <div className="mt-3 flex justify-between">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <MessageSquare className="mr-1 h-4 w-4" />
                            Comment
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Flag className="mr-1 h-4 w-4" />
                            Report
                          </Button>
                        </div>

                        <Button variant="ghost" size="sm">
                          <ExternalLink className="mr-1 h-4 w-4" />
                          View Source
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Button variant="outline" className="w-full">
                Load More
              </Button>
            </TabsContent>

            <TabsContent value="official" className="mt-4">
              {/* Similar structure but filtered for official sources */}
              <div className="text-center py-8 text-muted-foreground">
                Official sources feed would be displayed here
              </div>
            </TabsContent>

            <TabsContent value="news" className="mt-4">
              {/* Similar structure but filtered for news sources */}
              <div className="text-center py-8 text-muted-foreground">
                <NewsFeed />
              </div>
            </TabsContent>

            <TabsContent value="social" className="mt-4">
              {/* Similar structure but filtered for social media sources */}
              <div className="text-center py-8 text-muted-foreground">
                Social media feed would be displayed here
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
