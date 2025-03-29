import { NotificationList } from "@/components/notifications/notification-list";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function NotificationsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <NotificationList />
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Customize your notification preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="alerts">Disaster Alerts</Label>
                  <p className="text-xs text-muted-foreground">
                    New disasters and severe events
                  </p>
                </div>
                <Switch id="alerts" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="updates">Event Updates</Label>
                  <p className="text-xs text-muted-foreground">
                    Changes to existing events
                  </p>
                </div>
                <Switch id="updates" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email">Email Notifications</Label>
                  <p className="text-xs text-muted-foreground">
                    Receive updates via email
                  </p>
                </div>
                <Switch id="email" />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="push">Push Notifications</Label>
                  <p className="text-xs text-muted-foreground">
                    Browser push notifications
                  </p>
                </div>
                <Switch id="push" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="system">System Notifications</Label>
                  <p className="text-xs text-muted-foreground">
                    Maintenance and system updates
                  </p>
                </div>
                <Switch id="system" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Alert Regions</CardTitle>
              <CardDescription>
                Areas you're monitoring for alerts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-muted rounded-md">
                  <div className="text-sm">Rajasthan </div>
                  <Switch id="sea" defaultChecked />
                </div>
                <div className="flex items-center justify-between p-2 bg-muted rounded-md">
                  <div className="text-sm">North America</div>
                  <Switch id="na" defaultChecked />
                </div>
                <div className="flex items-center justify-between p-2 bg-muted rounded-md">
                  <div className="text-sm">Europe</div>
                  <Switch id="eu" />
                </div>
                <div className="flex items-center justify-between p-2 bg-muted rounded-md">
                  <div className="text-sm">Pacific Region</div>
                  <Switch id="pac" defaultChecked />
                </div>
                <div className="flex items-center justify-between p-2 bg-muted rounded-md">
                  <div className="text-sm">Africa</div>
                  <Switch id="af" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
