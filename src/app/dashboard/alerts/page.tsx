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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { sampleAlerts } from "@/constant/alert";
import {
  Bell,
  Edit,
  Globe,
  Locate,
  Mail,
  Plus,
  Smartphone,
  Trash2,
} from "lucide-react";

export default function AlertsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">
          Alert Configuration
        </h1>

        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Alert
        </Button>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active Alerts</TabsTrigger>
          <TabsTrigger value="create">Create Alert</TabsTrigger>
          <TabsTrigger value="channels">Notification Channels</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configured Alerts</CardTitle>
              <CardDescription>
                Custom alerts for specific disaster types and regions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Alert Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Radius</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Channels</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sampleAlerts.map((alert) => (
                    <TableRow key={alert.id}>
                      <TableCell className="font-medium">
                        {alert.name}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            alert.type === "earthquake"
                              ? "bg-amber-100 text-amber-800"
                              : alert.type === "fire"
                              ? "bg-red-100 text-red-800"
                              : alert.type === "flood"
                              ? "bg-blue-100 text-blue-800"
                              : alert.type === "hurricane"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-teal-100 text-teal-800"
                          }
                        >
                          {alert.type.charAt(0).toUpperCase() +
                            alert.type.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Globe className="mr-1 h-3 w-3 text-muted-foreground" />
                          {alert.location}
                        </div>
                      </TableCell>
                      <TableCell>{alert.radius} km</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            alert.severity === "high"
                              ? "bg-red-100 text-red-800"
                              : alert.severity === "moderate"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                          }
                        >
                          {alert.severity === "any"
                            ? "Any"
                            : alert.severity.charAt(0).toUpperCase() +
                              alert.severity.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          {alert.channels.includes("app") && (
                            <Bell className="h-4 w-4 text-muted-foreground" />
                          )}
                          {alert.channels.includes("email") && (
                            <Mail className="h-4 w-4 text-muted-foreground" />
                          )}
                          {alert.channels.includes("sms") && (
                            <Smartphone className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {alert.active ? (
                          <Badge className="bg-green-100 text-green-800">
                            Active
                          </Badge>
                        ) : (
                          <Badge variant="outline">Inactive</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create">
          <Card>
            <CardHeader>
              <CardTitle>Create New Alert</CardTitle>
              <CardDescription>
                Configure custom alerts for disasters in specific regions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="alert-name">Alert Name</Label>
                  <Input
                    id="alert-name"
                    placeholder="E.g., Japan Earthquakes"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="disaster-type">Disaster Type</Label>
                  <Select>
                    <SelectTrigger id="disaster-type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="earthquake">Earthquake</SelectItem>
                      <SelectItem value="flood">Flood</SelectItem>
                      <SelectItem value="fire">Fire</SelectItem>
                      <SelectItem value="hurricane">Hurricane</SelectItem>
                      <SelectItem value="tornado">Tornado</SelectItem>
                      <SelectItem value="any">Any Type</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="location"
                      placeholder="Enter location"
                      className="flex-1"
                    />
                    <Button variant="outline" size="icon">
                      <Locate className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="radius">Radius (km)</Label>
                  <Input id="radius" type="number" placeholder="300" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="severity">Minimum Severity</Label>
                  <Select>
                    <SelectTrigger id="severity">
                      <SelectValue placeholder="Select severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="severe">Severe</SelectItem>
                      <SelectItem value="any">Any Severity</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Notification Channels</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="app-notif" defaultChecked />
                      <Label htmlFor="app-notif">App Notifications</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="email-notif" />
                      <Label htmlFor="email-notif">Email</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="sms-notif" />
                      <Label htmlFor="sms-notif">SMS</Label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Create Alert</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="channels">
          <Card>
            <CardHeader>
              <CardTitle>Notification Channels</CardTitle>
              <CardDescription>
                Configure how you receive disaster alerts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">
                    App Notifications
                  </h3>
                  <div className="p-4 border rounded-lg bg-muted/20">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <Bell className="h-5 w-5 mr-2 text-primary" />
                        <span className="font-medium">
                          Browser Notifications
                        </span>
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        Enabled
                      </Badge>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4">
                      Receive real-time alerts directly in your browser, even
                      when the application is running in the background.
                    </p>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="browser-sound">
                          Notification Sound
                        </Label>
                        <Switch id="browser-sound" defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="browser-focus">Focus Window</Label>
                        <Switch id="browser-focus" />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">
                    Email Notifications
                  </h3>
                  <div className="p-4 border rounded-lg bg-muted/20">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <Mail className="h-5 w-5 mr-2 text-primary" />
                        <span className="font-medium">Email Alerts</span>
                      </div>
                      <Badge variant="outline">Configure</Badge>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email-address">Email Address</Label>
                        <Input
                          id="email-address"
                          placeholder="Enter your email"
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch id="email-verify" />
                        <Label htmlFor="email-verify">Verified</Label>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email-frequency">Alert Frequency</Label>
                        <Select>
                          <SelectTrigger id="email-frequency">
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="realtime">Real-time</SelectItem>
                            <SelectItem value="hourly">
                              Hourly Digest
                            </SelectItem>
                            <SelectItem value="daily">Daily Digest</SelectItem>
                            <SelectItem value="severe-only">
                              Severe Events Only
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">
                    SMS Notifications
                  </h3>
                  <div className="p-4 border rounded-lg bg-muted/20">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <Smartphone className="h-5 w-5 mr-2 text-primary" />
                        <span className="font-medium">SMS Alerts</span>
                      </div>
                      <Badge variant="outline">Not Configured</Badge>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone-number">Phone Number</Label>
                        <Input
                          id="phone-number"
                          placeholder="Enter phone number"
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch id="phone-verify" />
                        <Label htmlFor="phone-verify">Verified</Label>
                      </div>

                      <p className="text-xs text-muted-foreground">
                        SMS alerts are limited to severe events only to reduce
                        message volume. Carrier charges may apply.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">API Webhooks</h3>
                  <div className="p-4 border rounded-lg bg-muted/20">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <Globe className="h-5 w-5 mr-2 text-primary" />
                        <span className="font-medium">API Integration</span>
                      </div>
                      <Badge variant="outline">Advanced</Badge>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4">
                      Integrate disaster alerts with your own systems using
                      webhooks. Requires API key authentication.
                    </p>

                    <Button variant="outline" size="sm" className="w-full">
                      Configure Webhooks
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
