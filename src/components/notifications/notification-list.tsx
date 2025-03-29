"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Bell,
  CheckCircle,
  Clock,
  AlertTriangle,
  Info,
  ArrowUpCircle,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample notifications data
const NOTIFICATIONS = [
  {
    id: "n1",
    title: "New earthquake detected",
    description: "Magnitude 5.8 earthquake detected off the coast of Japan.",
    type: "alert",
    eventId: "3",
    read: false,
    timestamp: new Date(Date.now() - 25 * 60 * 1000).toISOString(), // 25 mins ago
  },
  {
    id: "n2",
    title: "Flood severity upgraded",
    description:
      "Thailand flooding severity level upgraded from moderate to high.",
    type: "update",
    eventId: "1",
    read: false,
    timestamp: new Date(Date.now() - 55 * 60 * 1000).toISOString(), // 55 mins ago
  },
  {
    id: "n3",
    title: "New wildfire reported",
    description:
      "Wildfire reported in Northern California, evacuation orders issued.",
    type: "alert",
    eventId: "2",
    read: true,
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
  },
  {
    id: "n4",
    title: "Hurricane tracking update",
    description: "Hurricane trajectory updated, expected landfall in 36 hours.",
    type: "update",
    eventId: "4",
    read: true,
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
  },
  {
    id: "n5",
    title: "Relief operation deployed",
    description:
      "Emergency response teams deployed to flood-affected areas in Thailand.",
    type: "info",
    eventId: "1",
    read: true,
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
  },
  {
    id: "n6",
    title: "System maintenance completed",
    description: "Scheduled system maintenance completed successfully.",
    type: "system",
    read: true,
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
  },
];

// Helper function for format time
const formatTimeAgo = (dateString: string) => {
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

// Get icon for notification type
const getNotificationIcon = (type: string) => {
  switch (type) {
    case "alert":
      return <AlertTriangle className="h-5 w-5 text-red-500" />;
    case "update":
      return <ArrowUpCircle className="h-5 w-5 text-blue-500" />;
    case "info":
      return <Info className="h-5 w-5 text-green-500" />;
    case "system":
      return <Bell className="h-5 w-5 text-gray-500" />;
    default:
      return <Info className="h-5 w-5 text-muted-foreground" />;
  }
};

// Get badge color for notification type
const getNotificationBadge = (type: string) => {
  switch (type) {
    case "alert":
      return "bg-red-100 text-red-800 hover:bg-red-100";
    case "update":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100";
    case "info":
      return "bg-green-100 text-green-800 hover:bg-green-100";
    case "system":
      return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100";
  }
};

export function NotificationList() {
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  // Mark a single notification as read
  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  // Count unread notifications
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle>Notifications</CardTitle>
            {unreadCount > 0 && (
              <Badge variant="secondary">{unreadCount} New</Badge>
            )}
          </div>

          <Button variant="ghost" size="sm" onClick={markAllAsRead}>
            <CheckCircle className="mr-1 h-4 w-4" />
            Mark all as read
          </Button>
        </div>
        <CardDescription>
          Stay updated on emerging disasters and event changes
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
            <TabsTrigger value="updates">Updates</TabsTrigger>
            <TabsTrigger value="info">Info</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4">
            <div className="space-y-4">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
                      notification.read ? "bg-card" : "bg-muted/40"
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div>{getNotificationIcon(notification.type)}</div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium">
                          {notification.title}
                        </h4>
                        <Badge
                          variant="outline"
                          className={getNotificationBadge(notification.type)}
                        >
                          {notification.type.charAt(0).toUpperCase() +
                            notification.type.slice(1)}
                        </Badge>
                      </div>

                      <p className="text-xs text-muted-foreground mt-1">
                        {notification.description}
                      </p>

                      <div className="flex items-center text-xs text-muted-foreground mt-2">
                        <Clock className="mr-1 h-3 w-3" />
                        {formatTimeAgo(notification.timestamp)}

                        {notification.eventId && (
                          <Button
                            variant="link"
                            size="sm"
                            className="h-auto p-0 ml-2"
                            asChild
                          >
                            <a
                              href={`/dashboard/events/${notification.eventId}`}
                            >
                              View Event
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-40 text-center">
                  <Bell className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    No notifications to display
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="alerts" className="mt-4">
            <div className="space-y-4">
              {notifications.filter((n) => n.type === "alert").length > 0 ? (
                notifications
                  .filter((n) => n.type === "alert")
                  .map((notification) => (
                    <div
                      key={notification.id}
                      className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
                        notification.read ? "bg-card" : "bg-muted/40"
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div>
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium">
                            {notification.title}
                          </h4>
                          <Badge
                            variant="outline"
                            className="bg-red-100 text-red-800 hover:bg-red-100"
                          >
                            Alert
                          </Badge>
                        </div>

                        <p className="text-xs text-muted-foreground mt-1">
                          {notification.description}
                        </p>

                        <div className="flex items-center text-xs text-muted-foreground mt-2">
                          <Clock className="mr-1 h-3 w-3" />
                          {formatTimeAgo(notification.timestamp)}

                          {notification.eventId && (
                            <Button
                              variant="link"
                              size="sm"
                              className="h-auto p-0 ml-2"
                              asChild
                            >
                              <a
                                href={`/dashboard/events/${notification.eventId}`}
                              >
                                View Event
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="flex flex-col items-center justify-center h-40 text-center">
                  <AlertTriangle className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    No alerts to display
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Similar content for other tabs */}
          <TabsContent value="updates" className="mt-4">
            <div className="space-y-4">
              {notifications.filter((n) => n.type === "update").length > 0 ? (
                notifications
                  .filter((n) => n.type === "update")
                  .map((notification) => (
                    <div
                      key={notification.id}
                      className="flex items-start gap-3 p-3 rounded-lg bg-card"
                    >
                      {/* Similar structure as above but for updates */}
                      <div>
                        <ArrowUpCircle className="h-5 w-5 text-blue-500" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">
                          {notification.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {notification.description}
                        </p>
                        <div className="flex items-center text-xs text-muted-foreground mt-2">
                          <Clock className="mr-1 h-3 w-3" />
                          {formatTimeAgo(notification.timestamp)}
                        </div>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="flex flex-col items-center justify-center h-40 text-center">
                  <p className="text-sm text-muted-foreground">
                    No updates to display
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="info" className="mt-4">
            <div className="space-y-4">
              {notifications.filter(
                (n) => n.type === "info" || n.type === "system"
              ).length > 0 ? (
                notifications
                  .filter((n) => n.type === "info" || n.type === "system")
                  .map((notification) => (
                    <div
                      key={notification.id}
                      className="flex items-start gap-3 p-3 rounded-lg bg-card"
                    >
                      {/* Similar structure as above but for info */}
                      <div>
                        {notification.type === "info" ? (
                          <Info className="h-5 w-5 text-green-500" />
                        ) : (
                          <Bell className="h-5 w-5 text-gray-500" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">
                          {notification.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {notification.description}
                        </p>
                        <div className="flex items-center text-xs text-muted-foreground mt-2">
                          <Clock className="mr-1 h-3 w-3" />
                          {formatTimeAgo(notification.timestamp)}
                        </div>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="flex flex-col items-center justify-center h-40 text-center">
                  <p className="text-sm text-muted-foreground">
                    No info notifications to display
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
