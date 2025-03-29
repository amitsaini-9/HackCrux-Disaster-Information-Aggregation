"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEvent } from "@/hooks/use-events";
import {
  AlertTriangle,
  ArrowLeft,
  Clock,
  ExternalLink,
  Flag,
  Globe,
  Link2,
  Loader2,
  LocateFixed,
  MessageSquare,
  Pencil,
  Share2,
  Shield,
  User,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

// Helper functions
const getTypeColor = (type: string) => {
  switch (type) {
    case "flood":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100";
    case "fire":
      return "bg-red-100 text-red-800 hover:bg-red-100";
    case "earthquake":
      return "bg-amber-100 text-amber-800 hover:bg-amber-100";
    case "hurricane":
      return "bg-purple-100 text-purple-800 hover:bg-purple-100";
    case "tornado":
      return "bg-teal-100 text-teal-800 hover:bg-teal-100";
    case "volcano":
      return "bg-orange-100 text-orange-800 hover:bg-orange-100";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100";
  }
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "low":
      return "bg-green-100 text-green-800 hover:bg-green-100";
    case "moderate":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
    case "high":
      return "bg-orange-100 text-orange-800 hover:bg-orange-100";
    case "severe":
      return "bg-red-100 text-red-800 hover:bg-red-100";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-red-100 text-red-800 hover:bg-red-100";
    case "monitoring":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100";
    case "recovery":
      return "bg-green-100 text-green-800 hover:bg-green-100";
    case "resolved":
      return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100";
  }
};

const getSourceTypeIcon = (type: string) => {
  switch (type) {
    case "twitter":
      return <MessageSquare className="h-4 w-4 text-blue-500" />;
    case "news":
      return <ExternalLink className="h-4 w-4 text-amber-500" />;
    case "government":
      return <Shield className="h-4 w-4 text-green-500" />;
    case "sensor":
      return <Globe className="h-4 w-4 text-purple-500" />;
    default:
      return <Link2 className="h-4 w-4 text-gray-500" />;
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(date);
};

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  // Fetch event data
  const { data: event, isLoading, error } = useEvent(id as string);

  // Fallback if event not found or error
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px]">
        <Loader2 className="h-12 w-12 text-muted-foreground animate-spin mb-4" />
        <p className="text-muted-foreground">Loading event details...</p>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px]">
        <AlertTriangle className="h-12 w-12 text-yellow-500 mb-4" />
        <h2 className="text-xl font-bold mb-2">Event Not Found</h2>
        <p className="text-muted-foreground mb-4">
          The disaster event you're looking for doesn't exist or has been
          removed.
        </p>
        <Button onClick={() => router.push("/dashboard/events")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Events
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => router.push("/dashboard/events")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Events
        </Button>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Link href={`/dashboard/events/${event.id}/edit`}>
            <Button size="sm">
              <Pencil className="mr-2 h-4 w-4" />
              Edit Event
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-2xl">{event.title}</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge className={getTypeColor(event.disasterType)}>
                      {event.disasterType.charAt(0).toUpperCase() +
                        event.disasterType.slice(1)}
                    </Badge>
                    <Badge className={getSeverityColor(event.severity)}>
                      {event.severity.charAt(0).toUpperCase() +
                        event.severity.slice(1)}
                    </Badge>
                    <Badge className={getStatusColor(event.status)}>
                      {event.status.charAt(0).toUpperCase() +
                        event.status.slice(1)}
                    </Badge>
                  </div>
                </div>

                <div className="text-right text-sm text-muted-foreground">
                  <div className="flex items-center justify-end">
                    <Clock className="mr-1 h-3 w-3" />
                    <span>
                      Reported: {formatDate(event.timestamp.toString())}
                    </span>
                  </div>
                  <div className="flex items-center justify-end mt-1">
                    <Clock className="mr-1 h-3 w-3" />
                    <span>
                      Updated: {formatDate(event.updatedAt.toString())}
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {event.description || "No description provided."}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">
                      Location Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start">
                        <LocateFixed className="mr-2 h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <div className="font-medium">
                            {event.location.name}
                          </div>
                          <div className="text-muted-foreground">
                            {event.location.region &&
                              `${event.location.region}, `}
                            {event.location.country}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Globe className="mr-2 h-4 w-4 text-muted-foreground" />
                        <div>
                          Coordinates: {event.location.latitude.toFixed(4)},{" "}
                          {event.location.longitude.toFixed(4)}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Event Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Type:</span>
                        <span className="font-medium">
                          {event.disasterType}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Severity:</span>
                        <span className="font-medium">{event.severity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status:</span>
                        <span className="font-medium">{event.status}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Sources:</span>
                        <span className="font-medium">
                          {event.sources.length}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Tabs defaultValue="sources" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="sources">Sources</TabsTrigger>
                  <TabsTrigger value="updates">Updates</TabsTrigger>
                </TabsList>

                <TabsContent value="sources" className="space-y-4">
                  <div className="mt-4">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Source</TableHead>
                          <TableHead>Content</TableHead>
                          <TableHead>Time</TableHead>
                          <TableHead>Credibility</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {event.sources.length > 0 ? (
                          event.sources.map((source) => (
                            <TableRow key={source.id}>
                              <TableCell>
                                <div className="flex items-center space-x-2">
                                  {getSourceTypeIcon(source.sourceType)}
                                  <div>
                                    <div className="font-medium">
                                      {source.author || "Unknown"}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                      {source.sourceType}
                                    </div>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="max-w-[300px]">
                                  <p className="text-sm truncate">
                                    {source.content || "No content available"}
                                  </p>
                                  {source.url && (
                                    <a
                                      href={source.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-xs text-blue-500 hover:underline flex items-center mt-1"
                                    >
                                      View Source
                                      <ExternalLink className="ml-1 h-3 w-3" />
                                    </a>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="text-xs">
                                  {formatDate(source.timestamp.toString())}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <div
                                    className="h-2 rounded-full mr-2"
                                    style={{
                                      width: `${source.credibility * 50}px`,
                                      backgroundColor:
                                        source.credibility > 0.8
                                          ? "rgb(34, 197, 94)"
                                          : source.credibility > 0.6
                                          ? "rgb(234, 179, 8)"
                                          : "rgb(239, 68, 68)",
                                    }}
                                  ></div>
                                  <span className="text-xs">
                                    {(source.credibility * 100).toFixed(0)}%
                                  </span>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={4} className="text-center py-4">
                              <p className="text-sm text-muted-foreground">
                                No sources available for this event.
                              </p>
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>

                <TabsContent value="updates" className="space-y-4">
                  <div className="flex items-center justify-center h-40 border rounded-md bg-muted/10">
                    <p className="text-sm text-muted-foreground">
                      No additional updates available for this event.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Response Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full">
                <Flag className="mr-2 h-4 w-4" />
                Request Relief Support
              </Button>
              <Button variant="outline" className="w-full">
                <User className="mr-2 h-4 w-4" />
                Assign Responders
              </Button>
              <Button variant="outline" className="w-full">
                <Shield className="mr-2 h-4 w-4" />
                Update Advisory
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Risk Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs">Severity Potential</span>
                    <span className="text-xs font-medium">
                      {event.severity === "severe"
                        ? "Very High"
                        : event.severity === "high"
                        ? "High"
                        : event.severity === "moderate"
                        ? "Medium"
                        : "Low"}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-orange-500"
                      style={{
                        width:
                          event.severity === "severe"
                            ? "90%"
                            : event.severity === "high"
                            ? "75%"
                            : event.severity === "moderate"
                            ? "50%"
                            : "25%",
                        backgroundColor:
                          event.severity === "severe"
                            ? "rgb(239, 68, 68)"
                            : event.severity === "high"
                            ? "rgb(249, 115, 22)"
                            : event.severity === "moderate"
                            ? "rgb(234, 179, 8)"
                            : "rgb(34, 197, 94)",
                      }}
                    ></div>
                  </div>
                </div>

                {/* Other risk assessment elements similarly constructed based on the event data */}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Event Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex">
                  <div className="flex flex-col items-center mr-4">
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                    <div className="w-[1px] h-full bg-border"></div>
                  </div>
                  <div className="pb-4">
                    <p className="text-sm font-medium">Event Reported</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(event.createdAt.toString())}
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex flex-col items-center mr-4">
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                    <div className="w-[1px] h-full bg-border"></div>
                  </div>
                  <div className="pb-4">
                    <p className="text-sm font-medium">Last Updated</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(event.updatedAt.toString())}
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex flex-col items-center mr-4">
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      Current Status:{" "}
                      {event.status.charAt(0).toUpperCase() +
                        event.status.slice(1)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Status is being continuously monitored
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
