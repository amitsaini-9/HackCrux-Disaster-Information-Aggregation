"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertTriangle,
  Check,
  Clock,
  Cloud,
  Database,
  Download,
  Loader2,
  Newspaper,
  RefreshCw,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DataCollectionPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Trigger data collection
  const handleCollectData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/data-collection", {
        method: "POST",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to trigger data collection");
      }

      setResults(data);
    } catch (error: any) {
      setError(error.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  // Get source icon
  const getSourceIcon = (sourceType: string) => {
    switch (sourceType) {
      case "twitter":
        return <X className="h-4 w-4 text-blue-500" />;
      case "news":
        return <Newspaper className="h-4 w-4 text-amber-500" />;
      case "weather":
        return <Cloud className="h-4 w-4 text-purple-500" />;
      default:
        return <Database className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Data Collection</h1>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.refresh()}
            disabled={isLoading}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>

          <Button size="sm" onClick={handleCollectData} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Collecting Data...
              </>
            ) : (
              <>
                <Database className="mr-2 h-4 w-4" />
                Collect Data Now
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Last Collection
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3 hours ago</div>
            <p className="text-xs text-muted-foreground">
              Scheduled collection every 6 hours
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Data Sources</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3 active</div>
            <p className="text-xs text-muted-foreground">
              Twitter, News API, Weather Services
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Events Created
            </CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42 today</div>
            <p className="text-xs text-muted-foreground">
              284 this week, 1,247 this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Data Reliability
            </CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.3%</div>
            <p className="text-xs text-muted-foreground">
              Based on source credibility scores
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Results or Error */}
      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {results && (
        <Card>
          <CardHeader>
            <CardTitle>Collection Results</CardTitle>
            <CardDescription>
              Data collection completed at {new Date().toLocaleString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-4">
                <div className="bg-muted rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold">
                    {results.results.reduce(
                      (sum: number, r: any) => sum + r.itemsCollected,
                      0
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Items Collected
                  </div>
                </div>
                <div className="bg-muted rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold">
                    {results.results.reduce(
                      (sum: number, r: any) => sum + r.itemsProcessed,
                      0
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Items Processed
                  </div>
                </div>
                <div className="bg-muted rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold">
                    {results.results.reduce(
                      (sum: number, r: any) => sum + r.eventsCreated,
                      0
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Events Created
                  </div>
                </div>
                <div className="bg-muted rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold">
                    {results.results.reduce(
                      (sum: number, r: any) => sum + r.eventsUpdated,
                      0
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Events Updated
                  </div>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Source</TableHead>
                    <TableHead>Items Collected</TableHead>
                    <TableHead>Events Created</TableHead>
                    <TableHead>Events Updated</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.results.map((result: any, index: number) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getSourceIcon(result.source)}
                          <span className="capitalize">{result.source}</span>
                        </div>
                      </TableCell>
                      <TableCell>{result.itemsCollected}</TableCell>
                      <TableCell>{result.eventsCreated}</TableCell>
                      <TableCell>{result.eventsUpdated}</TableCell>
                      <TableCell>
                        {result.errors && result.errors.length > 0 ? (
                          <Badge
                            variant="outline"
                            className="bg-amber-100 text-amber-800"
                          >
                            <X className="h-3 w-3 mr-1" />
                            {result.errors.length} errors
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="bg-green-100 text-green-800"
                          >
                            <Check className="h-3 w-3 mr-1" />
                            Success
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setResults(null)}
            >
              Clear Results
            </Button>
          </CardFooter>
        </Card>
      )}

      <Tabs defaultValue="history" className="space-y-4">
        <TabsList>
          <TabsTrigger value="history">Collection History</TabsTrigger>
          <TabsTrigger value="settings">Source Settings</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Collection History</CardTitle>
              <CardDescription>
                Record of recent data collection runs and results
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Items Collected</TableHead>
                    <TableHead>Events Created</TableHead>
                    <TableHead>Events Updated</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <TableRow key={i}>
                      <TableCell>
                        {new Date(
                          Date.now() - i * 6 * 60 * 60 * 1000
                        ).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {Math.floor(Math.random() * 50) + 10}
                      </TableCell>
                      <TableCell>
                        {Math.floor(Math.random() * 10) + 1}
                      </TableCell>
                      <TableCell>{Math.floor(Math.random() * 5) + 1}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="bg-green-100 text-green-800"
                        >
                          <Check className="h-3 w-3 mr-1" />
                          Success
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Download</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Data Source Settings</CardTitle>
              <CardDescription>
                Configure data sources and collection parameters
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Source settings content */}
              <div className="space-y-4">
                {/* Example source configuration controls */}
                <p className="text-muted-foreground">
                  Source settings would be displayed here
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Schedule Settings</CardTitle>
              <CardDescription>
                Configure automatic data collection schedule
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Schedule settings content */}
              <div className="space-y-4">
                {/* Example schedule configuration controls */}
                <p className="text-muted-foreground">
                  Schedule settings would be displayed here
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
