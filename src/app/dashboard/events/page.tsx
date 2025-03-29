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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEvents } from "@/hooks/use-events";
import {
  AlertTriangle,
  ArrowUpDown,
  Download,
  Eye,
  Filter,
  Loader2,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

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

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(date);
};

const formatTimeDiff = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 60) {
    return `${diffMins} min${diffMins !== 1 ? "s" : ""} ago`;
  }

  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) {
    return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
  }

  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
};

export default function EventsPage() {
  const [filters, setFilters] = useState({
    type: "",
    severity: "",
    status: "",
    search: "",
    page: 1,
    limit: 10,
    startDate: "",
  });

  const { data, isLoading, error } = useEvents(filters);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleRefresh = () => {
    setFilters({ ...filters });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Disaster Events</h1>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={handleRefresh}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="mr-2 h-4 w-4" />
            )}
            Refresh
          </Button>
          <Link href="/dashboard/events/new">
            <Button size="sm" variant="default">
              <AlertTriangle className="mr-2 h-4 w-4" />
              Report Event
            </Button>
          </Link>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-5">
          <TabsTrigger
            value="all"
            onClick={() => setFilters({ ...filters, status: "" })}
          >
            All Events
          </TabsTrigger>
          <TabsTrigger
            value="active"
            onClick={() => setFilters({ ...filters, status: "active" })}
          >
            Active
          </TabsTrigger>
          <TabsTrigger
            value="severe"
            onClick={() => setFilters({ ...filters, severity: "severe" })}
          >
            Severe
          </TabsTrigger>
          <TabsTrigger
            value="recent"
            onClick={() => {
              const date = new Date();
              date.setDate(date.getDate() - 1);
              setFilters({
                ...filters,
                startDate: date.toISOString(),
                status: "",
              });
            }}
          >
            Recent
          </TabsTrigger>
          <TabsTrigger
            value="monitoring"
            onClick={() => setFilters({ ...filters, status: "monitoring" })}
          >
            Monitoring
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>All Disaster Events</CardTitle>
              <CardDescription>
                Comprehensive list of tracked disaster events
              </CardDescription>

              <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 mt-4">
                <div className="flex items-center gap-2">
                  <form
                    onSubmit={handleSearch}
                    className="flex items-center gap-2"
                  >
                    <Input
                      placeholder="Search events..."
                      className="max-w-sm"
                      value={filters.search}
                      onChange={(e) =>
                        setFilters({ ...filters, search: e.target.value })
                      }
                    />
                    <Button type="submit" variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </form>
                  <Select
                    value={filters.type}
                    onValueChange={(value) =>
                      setFilters({ ...filters, type: value })
                    }
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Type: All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="earthquake">Earthquake</SelectItem>
                      <SelectItem value="flood">Flood</SelectItem>
                      <SelectItem value="fire">Fire</SelectItem>
                      <SelectItem value="hurricane">Hurricane</SelectItem>
                      <SelectItem value="tornado">Tornado</SelectItem>
                      <SelectItem value="volcano">Volcano</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    value={filters.severity}
                    onValueChange={(value) =>
                      setFilters({ ...filters, severity: value })
                    }
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Severity: All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Severity</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="severe">Severe</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <AlertTriangle className="h-8 w-8 text-red-500 mb-2" />
                  <p className="text-muted-foreground">
                    Error loading events. Please try again.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4"
                    onClick={handleRefresh}
                  >
                    Retry
                  </Button>
                </div>
              ) : data?.events.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <p className="text-muted-foreground">
                    No events found. Try adjusting your filters.
                  </p>
                </div>
              ) : (
                <>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[300px]">
                          <div className="flex items-center space-x-1">
                            <span>Event</span>
                            <ArrowUpDown className="h-3 w-3" />
                          </div>
                        </TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Severity</TableHead>
                        <TableHead>
                          <div className="flex items-center space-x-1">
                            <span>Time</span>
                            <ArrowUpDown className="h-3 w-3" />
                          </div>
                        </TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Sources</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data.events.map((event) => (
                        <TableRow key={event.id}>
                          <TableCell className="font-medium">
                            <div className="max-w-[300px]">
                              <div className="font-medium">{event.title}</div>
                              <div className="text-xs text-muted-foreground truncate">
                                {event.description}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={getTypeColor(event.disasterType)}
                            >
                              {event.disasterType.charAt(0).toUpperCase() +
                                event.disasterType.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="max-w-[140px] truncate">
                              {event.location.name}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getSeverityColor(event.severity)}>
                              {event.severity.charAt(0).toUpperCase() +
                                event.severity.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <div className="text-xs">
                                {formatDate(event.timestamp.toString())}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {formatTimeDiff(event.timestamp.toString())}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={getStatusColor(event.status)}
                            >
                              {event.status.charAt(0).toUpperCase() +
                                event.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {event.sources.length}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Link href={`/dashboard/events/${event.id}`}>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                              >
                                <span className="sr-only">View details</span>
                                <Eye className="h-4 w-4" />
                              </Button>
                            </Link>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  {/* Pagination */}
                  {data.pagination.pages > 1 && (
                    <div className="flex items-center justify-between space-x-2 py-4">
                      <div className="text-sm text-muted-foreground">
                        Showing{" "}
                        <span className="font-medium">
                          {(data.pagination.page - 1) * data.pagination.limit +
                            1}
                        </span>{" "}
                        to{" "}
                        <span className="font-medium">
                          {Math.min(
                            data.pagination.page * data.pagination.limit,
                            data.pagination.total
                          )}
                        </span>{" "}
                        of{" "}
                        <span className="font-medium">
                          {data.pagination.total}
                        </span>{" "}
                        results
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setFilters({ ...filters, page: filters.page - 1 })
                          }
                          disabled={filters.page <= 1}
                        >
                          Previous
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setFilters({ ...filters, page: filters.page + 1 })
                          }
                          disabled={filters.page >= data.pagination.pages}
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Other tab contents would follow the same pattern */}
        <TabsContent value="active" className="mt-4">
          {/* Similar to "all" tab but with filtering */}
        </TabsContent>

        <TabsContent value="severe" className="mt-4">
          {/* Similar to "all" tab but with filtering */}
        </TabsContent>

        <TabsContent value="recent" className="mt-4">
          {/* Similar to "all" tab but with filtering */}
        </TabsContent>

        <TabsContent value="monitoring" className="mt-4">
          {/* Similar to "all" tab but with filtering */}
        </TabsContent>
      </Tabs>
    </div>
  );
}
