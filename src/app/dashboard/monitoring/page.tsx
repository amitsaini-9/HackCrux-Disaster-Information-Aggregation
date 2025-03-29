"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  dataCollectionList,
  dbServiceList,
  ProcessingEngineList,
} from "@/constant/Monitoring";
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  BarChart,
  Bell,
  CheckCircle,
  Radio,
  RefreshCw,
} from "lucide-react";
import { useState } from "react";

export default function MonitoringPage() {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">System Monitoring</h1>

        <Button
          onClick={handleRefresh}
          variant="outline"
          size="sm"
          disabled={refreshing}
        >
          <RefreshCw
            className={`mr-2 h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
          />
          Refresh Status
        </Button>
      </div>

      {/* System Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Data Collection
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent className="mt-auto">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-2xl font-bold">99.8%</p>
                <p className="text-xs text-muted-foreground">
                  Last 24 hours uptime
                </p>
              </div>
              <div className="text-xs text-green-600 flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                2.1%
              </div>
            </div>
            <Progress value={99.8} className="h-1 mt-2" />
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Processing Engine
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent className="mt-auto">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-2xl font-bold">100%</p>
                <p className="text-xs text-muted-foreground">
                  Last 24 hours uptime
                </p>
              </div>
              <div className="text-xs text-green-600 flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                1.2%
              </div>
            </div>
            <Progress value={100} className="h-1 mt-2" />
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Alert System</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent className="mt-auto">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-2xl font-bold">97.9%</p>
                <p className="text-xs text-muted-foreground">
                  Last 24 hours uptime
                </p>
              </div>
              <div className="text-xs text-amber-600 flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" rotate={180} />
                0.8%
              </div>
            </div>
            <Progress value={97.9} className="h-1 mt-2" />
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Database</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent className="mt-auto">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-2xl font-bold">92.3%</p>
                <p className="text-xs text-muted-foreground">
                  Last 24 hours uptime
                </p>
              </div>
              <div className="text-xs text-red-600 flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" rotate={180} />
                4.2%
              </div>
            </div>
            <Progress value={92.3} className="h-1 mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Active Monitoring Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">
            <Activity className="h-4 w-4 mr-2" />
            System Overview
          </TabsTrigger>
          <TabsTrigger value="signals">
            <Radio className="h-4 w-4 mr-2" />
            Data Signals
          </TabsTrigger>
          <TabsTrigger value="alerts">
            <Bell className="h-4 w-4 mr-2" />
            System Alerts
          </TabsTrigger>
          <TabsTrigger value="metrics">
            <BarChart className="h-4 w-4 mr-2" />
            Performance Metrics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Health Overview</CardTitle>
              <CardDescription>
                Current status of all system components and services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {/* Data Collection Subsystem */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-lg font-medium">
                      Data Collection Subsystem
                    </h3>
                    <Badge className="bg-green-100 text-green-800">
                      Healthy
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {dataCollectionList.map((service, index) => (
                      <Card
                        key={index}
                        className="border-0 shadow-none bg-muted/50"
                      >
                        <CardContent className="p-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-sm">
                                {service.name}
                              </p>
                              <div className="flex items-center mt-1">
                                {service.status === "Operational" ? (
                                  <Badge className="bg-green-100 text-green-800 text-xs">
                                    Operational
                                  </Badge>
                                ) : (
                                  <Badge className="bg-amber-100 text-amber-800 text-xs">
                                    Degraded
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium">
                                {service.load}%
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Current Load
                              </div>
                            </div>
                          </div>
                          <div className="mt-3">
                            <div className="text-xs text-muted-foreground mb-1 flex justify-between">
                              <span>Response Time</span>
                              <span>{service.response}</span>
                            </div>
                            <Progress
                              value={
                                service.response === "0.6s"
                                  ? 30
                                  : service.response === "0.8s"
                                  ? 40
                                  : service.response === "1.2s"
                                  ? 60
                                  : service.response === "1.5s"
                                  ? 75
                                  : service.response === "2.3s"
                                  ? 85
                                  : 95
                              }
                              className="h-1"
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Processing Engine */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-lg font-medium">Processing Engine</h3>
                    <Badge className="bg-green-100 text-green-800">
                      Healthy
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {ProcessingEngineList.map((service, index) => (
                      <Card
                        key={index}
                        className="border-0 shadow-none bg-muted/50"
                      >
                        <CardContent className="p-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-sm">
                                {service.name}
                              </p>
                              <div className="flex items-center mt-1">
                                <Badge className="bg-green-100 text-green-800 text-xs">
                                  Operational
                                </Badge>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium">
                                {service.load}%
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Current Load
                              </div>
                            </div>
                          </div>
                          <div className="mt-3">
                            <div className="text-xs text-muted-foreground mb-1 flex justify-between">
                              <span>Processing Time</span>
                              <span>{service.response}</span>
                            </div>
                            <Progress
                              value={
                                service.response === "0.4s"
                                  ? 20
                                  : service.response === "0.5s"
                                  ? 25
                                  : service.response === "0.6s"
                                  ? 30
                                  : service.response === "0.7s"
                                  ? 35
                                  : service.response === "0.9s"
                                  ? 45
                                  : 55
                              }
                              className="h-1"
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Database System */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-lg font-medium">Database System</h3>
                    <Badge className="bg-amber-100 text-amber-800">
                      Degraded
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {dbServiceList.map((service, index) => (
                      <Card
                        key={index}
                        className="border-0 shadow-none bg-muted/50"
                      >
                        <CardContent className="p-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-sm">
                                {service.name}
                              </p>
                              <div className="flex items-center mt-1">
                                {service.status === "Operational" ? (
                                  <Badge className="bg-green-100 text-green-800 text-xs">
                                    Operational
                                  </Badge>
                                ) : (
                                  <Badge className="bg-amber-100 text-amber-800 text-xs">
                                    Degraded
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <div className="text-right">
                              <div
                                className={`text-sm font-medium ${
                                  service.load > 80 ? "text-red-600" : ""
                                }`}
                              >
                                {service.load}%
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Current Load
                              </div>
                            </div>
                          </div>
                          <div className="mt-3">
                            <div className="text-xs text-muted-foreground mb-1 flex justify-between">
                              <span>Response Time</span>
                              <span
                                className={
                                  service.status === "Degraded"
                                    ? "text-red-600"
                                    : ""
                                }
                              >
                                {service.response}
                              </span>
                            </div>
                            <Progress
                              value={
                                service.response === "0.3s"
                                  ? 15
                                  : service.response === "0.5s"
                                  ? 25
                                  : service.response === "0.7s"
                                  ? 35
                                  : service.response === "1.5s"
                                  ? 75
                                  : service.response === "1.8s"
                                  ? 90
                                  : 100
                              }
                              className={`h-1 ${
                                service.status === "Degraded"
                                  ? "bg-red-200"
                                  : ""
                              }`}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="signals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Data Signal Strength</CardTitle>
              <CardDescription>
                Monitor incoming data signal strength and quality by source
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-20">
                <p className="text-muted-foreground">
                  Data signals monitoring panel would be displayed here
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Alerts</CardTitle>
              <CardDescription>
                Recent system alerts and notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-20">
                <p className="text-muted-foreground">
                  System alerts would be displayed here
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>
                System performance metrics and trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-20">
                <p className="text-muted-foreground">
                  Performance metrics would be displayed here
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
