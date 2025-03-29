import { DisasterTrends } from "@/components/analytics/disaster-trends";
import { SeverityDistribution } from "@/components/analytics/severity-distribution";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, ArrowUp, BarChart3, Calendar } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">
          Analytics Dashboard
        </h1>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Data updated: 12 minutes ago
          </span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Active Events
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 inline-flex items-center mr-1">
                <ArrowUp className="h-3 w-3 mr-1" /> 9%
              </span>
              from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Severe Events</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600 inline-flex items-center mr-1">
                <ArrowUp className="h-3 w-3 mr-1" /> 15%
              </span>
              from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              New Events (7d)
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600 inline-flex items-center mr-1">
                <ArrowUp className="h-3 w-3 mr-1" /> 20%
              </span>
              from previous week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Data Sources</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,547</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 inline-flex items-center mr-1">
                <ArrowUp className="h-3 w-3 mr-1" /> 12%
              </span>
              from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="details">Detailed Analysis</TabsTrigger>
          <TabsTrigger value="historical">Historical Data</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <DisasterTrends />
            <SeverityDistribution />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Geographical Distribution</CardTitle>
              <CardDescription>
                Top regions by disaster frequency
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border bg-muted/50 h-[300px] flex items-center justify-center">
                <p className="text-muted-foreground">
                  Geographic visualization will be implemented here
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Analysis</CardTitle>
              <CardDescription>In-depth analytics and metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border bg-muted/50 h-[400px] flex items-center justify-center">
                <p className="text-muted-foreground">
                  Detailed analysis content will be implemented here
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="historical">
          <Card>
            <CardHeader>
              <CardTitle>Historical Data</CardTitle>
              <CardDescription>
                Long-term disaster trends and patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border bg-muted/50 h-[400px] flex items-center justify-center">
                <p className="text-muted-foreground">
                  Historical data visualization will be implemented here
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
