import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Badge,
  Bell,
  Globe,
  Lock,
  Mail,
  Moon,
  Plus,
  Save,
  Settings,
  Shield,
  Sun,
} from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your account information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src="/placeholder-avatar.jpg"
                    alt="User avatar"
                  />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline" size="sm">
                    Change Avatar
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground"
                  >
                    Remove
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    defaultValue="Alex Doe"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Your email"
                    defaultValue="alex@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="job-title">Job Title</Label>
                  <Input
                    id="job-title"
                    placeholder="Job title"
                    defaultValue="Disaster Response Coordinator"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="organization">Organization</Label>
                  <Input
                    id="organization"
                    placeholder="Organization"
                    defaultValue="Example Relief Agency"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="utc+0">
                    <SelectTrigger id="timezone">
                      <SelectValue placeholder="Select Timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc-8">
                        Pacific Time (UTC-8)
                      </SelectItem>
                      <SelectItem value="utc-5">
                        Eastern Time (UTC-5)
                      </SelectItem>
                      <SelectItem value="utc+0">UTC</SelectItem>
                      <SelectItem value="utc+1">
                        Central European Time (UTC+1)
                      </SelectItem>
                      <SelectItem value="utc+8">
                        China Standard Time (UTC+8)
                      </SelectItem>
                      <SelectItem value="utc+9">
                        Japan Standard Time (UTC+9)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Select Language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="ja">Japanese</SelectItem>
                      <SelectItem value="zh">Chinese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>
                Customize how the application looks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Theme</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="border rounded-md p-4 w-full h-24 flex items-center justify-center bg-background shadow-sm">
                      <Sun className="h-8 w-8 text-primary" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="theme-light">Light</Label>
                      <Switch id="theme-light" />
                    </div>
                  </div>

                  <div className="flex flex-col items-center space-y-2">
                    <div className="border rounded-md p-4 w-full h-24 flex items-center justify-center bg-slate-950 shadow-sm">
                      <Moon className="h-8 w-8 text-slate-50" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="theme-dark">Dark</Label>
                      <Switch id="theme-dark" defaultChecked />
                    </div>
                  </div>

                  <div className="flex flex-col items-center space-y-2">
                    <div className="border rounded-md p-4 w-full h-24 flex items-center justify-center bg-background shadow-sm">
                      <Settings className="h-8 w-8 text-primary" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="theme-system">System</Label>
                      <Switch id="theme-system" />
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Display Options</Label>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="density">Compact Mode</Label>
                      <p className="text-xs text-muted-foreground">
                        Reduce padding and spacing in the UI
                      </p>
                    </div>
                    <Switch id="density" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="animations">Animations</Label>
                      <p className="text-xs text-muted-foreground">
                        Enable animations and transitions
                      </p>
                    </div>
                    <Switch id="animations" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="reduced-motion">Reduced Motion</Label>
                      <p className="text-xs text-muted-foreground">
                        Reduce or eliminate motion effects
                      </p>
                    </div>
                    <Switch id="reduced-motion" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Control when and how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Event Notifications</h3>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="new-events">New Disasters</Label>
                      <p className="text-xs text-muted-foreground">
                        Notifications for new disaster events
                      </p>
                    </div>
                    <Switch id="new-events" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="updates">Event Updates</Label>
                      <p className="text-xs text-muted-foreground">
                        Notifications when events are updated
                      </p>
                    </div>
                    <Switch id="updates" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="comments">Comments & Notes</Label>
                      <p className="text-xs text-muted-foreground">
                        Notifications for comments on events
                      </p>
                    </div>
                    <Switch id="comments" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="system">System Notifications</Label>
                      <p className="text-xs text-muted-foreground">
                        Notifications about system status and maintenance
                      </p>
                    </div>
                    <Switch id="system" />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Delivery Methods</h3>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Bell className="h-4 w-4 text-muted-foreground" />
                      <Label>In-App Notifications</Label>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <Label>Email Notifications</Label>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <Label>Browser Push Notifications</Label>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your account security and access
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Password</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>

                  <div></div>

                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">
                      Confirm New Password
                    </Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>

                <Button className="mt-2">
                  <Lock className="mr-2 h-4 w-4" />
                  Update Password
                </Button>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="text-lg font-medium">
                  Two-Factor Authentication
                </h3>

                <div className="flex items-center justify-between mb-4">
                  <div className="space-y-0.5">
                    <Label>2FA Status</Label>
                    <p className="text-xs text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Button variant="outline">
                    <Shield className="mr-2 h-4 w-4" />
                    Enable 2FA
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Session Management</h3>

                <div className="space-y-4">
                  <div className="border rounded-md p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">Current Session</div>
                      <Badge className="bg-green-100 text-green-800">
                        Active
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground mb-1">
                      <span className="font-medium">Browser:</span> Chrome on
                      Windows
                    </div>
                    <div className="text-xs text-muted-foreground mb-1">
                      <span className="font-medium">IP Address:</span>{" "}
                      192.168.1.1
                    </div>
                    <div className="text-xs text-muted-foreground">
                      <span className="font-medium">Last Active:</span> Just now
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    Logout All Other Devices
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>
                Manage API keys for accessing the disaster information system
                programmatically
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h3 className="text-lg font-medium">Your API Keys</h3>
                  <p className="text-sm text-muted-foreground">
                    API keys allow secure access to our REST API for custom
                    integrations
                  </p>
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Generate New Key
                </Button>
              </div>

              <div className="border rounded-md p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium">Default API Key</div>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
                <div className="bg-muted p-2 rounded-md mb-2 font-mono text-sm">
                  sk_api_7f8w9e5r6t7y8u9i0o1p2a3s4d...
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-xs text-muted-foreground">
                    Created: March 15, 2025
                  </div>
                  <Button variant="outline" size="sm">
                    Revoke
                  </Button>
                </div>
              </div>

              <div className="border rounded-md p-4 bg-muted/20">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium">Read-Only API Key</div>
                  <Badge>Revoked</Badge>
                </div>
                <div className="bg-muted p-2 rounded-md mb-2 font-mono text-sm text-muted-foreground">
                  sk_api_2a3s4d5f6g7h8j9k0l1z2x3c4v...
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-xs text-muted-foreground">
                    Created: January 10, 2025 (Revoked)
                  </div>
                  <Button variant="outline" size="sm" disabled>
                    Revoke
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="text-lg font-medium">API Documentation</h3>
                <p className="text-sm text-muted-foreground">
                  Refer to our comprehensive API documentation to build
                  integrations with the disaster information system.
                </p>
                <Button variant="outline">
                  <Globe className="mr-2 h-4 w-4" />
                  View API Docs
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
