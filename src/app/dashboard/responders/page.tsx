"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
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
import {
  equipmentInventoryStatus,
  recentTeamActivities,
  responders,
  teamDeploymentSchedule,
} from "@/constant/responder";
import {
  Activity,
  AlertTriangle,
  BellRing,
  CalendarClock,
  ChevronRight,
  Clipboard,
  Clock,
  Filter,
  HeartPulse,
  MapPin,
  Phone,
  Search,
  SendToBack,
  ShieldCheck,
  Truck,
  UserCheck,
  UserPlus,
  Users,
} from "lucide-react";
import {
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  ReactPortal,
  useState,
} from "react";

export default function RespondersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  // Filter responders based on search query
  const filteredResponders = responders.filter(
    (responder) =>
      responder.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      responder.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      responder.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Helper function to get status badge color
  const getStatusBadge = (
    status:
      | string
      | number
      | bigint
      | boolean
      | ReactElement<unknown, string | JSXElementConstructor<any>>
      | Iterable<ReactNode>
      | Promise<
          | string
          | number
          | bigint
          | boolean
          | ReactPortal
          | ReactElement<unknown, string | JSXElementConstructor<any>>
          | Iterable<ReactNode>
          | null
          | undefined
        >
      | null
      | undefined
  ) => {
    switch (status) {
      case "available":
        return <Badge className="bg-green-100 text-green-800">Available</Badge>;
      case "deployed":
        return <Badge className="bg-blue-100 text-blue-800">Deployed</Badge>;
      case "standby":
        return <Badge className="bg-amber-100 text-amber-800">Standby</Badge>;
      case "maintenance":
        return <Badge className="bg-gray-100 text-gray-800">Maintenance</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Helper function to get team type icon
  const getTeamTypeIcon = (type: string) => {
    switch (type) {
      case "Medical":
        return <HeartPulse className="h-4 w-4 text-red-500" />;
      case "Search & Rescue":
        return <UserCheck className="h-4 w-4 text-amber-500" />;
      case "Firefighting":
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case "Logistics":
        return <Truck className="h-4 w-4 text-blue-500" />;
      case "Technical Rescue":
        return <ShieldCheck className="h-4 w-4 text-purple-500" />;
      case "Water Rescue":
        return <SendToBack className="h-4 w-4 text-blue-500" />;
      default:
        return <Users className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">
          Emergency Responders
        </h1>

        <div className="flex items-center gap-2">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Add Responder
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Responder Team</DialogTitle>
                <DialogDescription>
                  Enter details for the new response team
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Team Name
                  </label>
                  <Input id="name" placeholder="Enter team name" />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="type" className="text-sm font-medium">
                    Team Type
                  </label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select team type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="medical">Medical</SelectItem>
                      <SelectItem value="search">Search & Rescue</SelectItem>
                      <SelectItem value="fire">Firefighting</SelectItem>
                      <SelectItem value="logistics">Logistics</SelectItem>
                      <SelectItem value="technical">
                        Technical Rescue
                      </SelectItem>
                      <SelectItem value="water">Water Rescue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <label htmlFor="members" className="text-sm font-medium">
                    Team Members
                  </label>
                  <Input
                    id="members"
                    type="number"
                    placeholder="Number of members"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="location" className="text-sm font-medium">
                    Location
                  </label>
                  <Input id="location" placeholder="Team location" />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="contact" className="text-sm font-medium">
                    Contact Person
                  </label>
                  <Input id="contact" placeholder="Primary contact name" />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="phone" className="text-sm font-medium">
                    Contact Phone
                  </label>
                  <Input id="phone" placeholder="Contact phone number" />
                </div>
                <div className="grid gap-2">
                  <label
                    htmlFor="specialization"
                    className="text-sm font-medium"
                  >
                    Specialization
                  </label>
                  <Input
                    id="specialization"
                    placeholder="Team specialization"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setDialogOpen(false)}>Add Team</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search responders..."
            className="pl-8 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Teams</TabsTrigger>
          <TabsTrigger value="available">Available</TabsTrigger>
          <TabsTrigger value="deployed">Deployed</TabsTrigger>
          <TabsTrigger value="medical">Medical</TabsTrigger>
          <TabsTrigger value="rescue">Rescue</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Response Teams</CardTitle>
              <CardDescription>
                Manage and deploy emergency response teams
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">Team Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Members</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Readiness</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredResponders.map((responder) => (
                    <TableRow key={responder.id}>
                      <TableCell className="font-medium">
                        {responder.name}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {getTeamTypeIcon(responder.type)}
                          <span>{responder.type}</span>
                        </div>
                      </TableCell>
                      <TableCell>{responder.members}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>{responder.location}</span>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(responder.status)}</TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <div className="flex justify-between text-xs">
                            <span>Readiness</span>
                            <span>{responder.readiness}%</span>
                          </div>
                          <Progress
                            value={responder.readiness}
                            className="h-1.5"
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant={
                              responder.status === "available"
                                ? "default"
                                : "outline"
                            }
                            disabled={responder.status !== "available"}
                          >
                            Deploy
                          </Button>
                          <Button size="sm" variant="outline">
                            Details
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

        <TabsContent value="available" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Available Teams</CardTitle>
              <CardDescription>
                Teams ready for immediate deployment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredResponders
                  .filter((team) => team.status === "available")
                  .map((team) => (
                    <Card key={team.id} className="overflow-hidden">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-base">
                            {team.name}
                          </CardTitle>
                          {getTeamTypeIcon(team.type)}
                        </div>
                        <CardDescription>{team.specialization}</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{team.members} Members</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{team.location}</span>
                          </div>
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{team.contact}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>Last deployed: {team.lastDeployed}</span>
                          </div>
                          <div className="flex flex-col gap-1 pt-1">
                            <div className="flex justify-between text-xs">
                              <span>Readiness</span>
                              <span>{team.readiness}%</span>
                            </div>
                            <Progress
                              value={team.readiness}
                              className="h-1.5"
                            />
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full">Deploy Team</Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deployed" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Deployed Teams</CardTitle>
              <CardDescription>
                Currently active teams in the field
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredResponders
                  .filter((team) => team.status === "deployed")
                  .map((team) => (
                    <Card key={team.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="p-4 border-l-4 border-blue-500">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">{team.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {team.type} • {team.members} members
                              </p>
                            </div>
                            <Badge className="bg-blue-100 text-blue-800">
                              Active Mission
                            </Badge>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                            <div className="space-y-1">
                              <p className="text-xs text-muted-foreground">
                                Location
                              </p>
                              <div className="flex items-center">
                                <MapPin className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                                <span className="text-sm">{team.location}</span>
                              </div>
                            </div>
                            <div className="space-y-1">
                              <p className="text-xs text-muted-foreground">
                                Contact
                              </p>
                              <div className="flex items-center">
                                <Phone className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                                <span className="text-sm">{team.contact}</span>
                              </div>
                            </div>
                            <div className="space-y-1">
                              <p className="text-xs text-muted-foreground">
                                Deployed Since
                              </p>
                              <div className="flex items-center">
                                <Clock className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                                <span className="text-sm">12 hours ago</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-between items-center mt-4">
                            <div className="flex flex-col gap-1 w-1/3">
                              <div className="flex justify-between text-xs">
                                <span>Mission Progress</span>
                                <span>45%</span>
                              </div>
                              <Progress value={45} className="h-1.5" />
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <BellRing className="h-3.5 w-3.5 mr-1" />
                                Contact
                              </Button>
                              <Button variant="default" size="sm">
                                <Clipboard className="h-3.5 w-3.5 mr-1" />
                                Status Report
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="medical" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Medical Teams</CardTitle>
              <CardDescription>
                Medical response and healthcare teams
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                Medical teams list would be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rescue" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Rescue Teams</CardTitle>
              <CardDescription>
                Search and rescue specialized teams
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                Rescue teams list would be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Current Deployments</CardTitle>
          <CardDescription>
            Overview of ongoing emergency response operations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="bg-muted/40 border-0">
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <CardTitle className="text-base">
                    Thailand Flooding Response
                  </CardTitle>
                  <Badge className="bg-blue-100 text-blue-800">Active</Badge>
                </div>
                <CardDescription>
                  Chanthaburi Province, Thailand
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Teams Deployed:</span>
                    <span>3</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Personnel:</span>
                    <span>28</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Start Date:</span>
                    <span>Mar 18, 2025</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Duration:</span>
                    <span>2 days</span>
                  </div>
                  <div className="flex flex-col gap-1 pt-1">
                    <div className="flex justify-between text-xs">
                      <span>Mission Progress</span>
                      <span>35%</span>
                    </div>
                    <Progress value={35} className="h-1.5" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View Details
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-muted/40 border-0">
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <CardTitle className="text-base">
                    California Wildfire Support
                  </CardTitle>
                  <Badge className="bg-blue-100 text-blue-800">Active</Badge>
                </div>
                <CardDescription>Northern California, USA</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Teams Deployed:</span>
                    <span>5</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Personnel:</span>
                    <span>42</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Start Date:</span>
                    <span>Mar 16, 2025</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Duration:</span>
                    <span>4 days</span>
                  </div>
                  <div className="flex flex-col gap-1 pt-1">
                    <div className="flex justify-between text-xs">
                      <span>Mission Progress</span>
                      <span>62%</span>
                    </div>
                    <Progress value={62} className="h-1.5" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View Details
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-muted/40 border-0">
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <CardTitle className="text-base">
                    Japan Earthquake Response
                  </CardTitle>
                  <Badge className="bg-green-100 text-green-800">
                    <Activity className="h-3.5 w-3.5 mr-1" />
                    Planning
                  </Badge>
                </div>
                <CardDescription>Miyagi Prefecture, Japan</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Teams Assigned:</span>
                    <span>4</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Personnel:</span>
                    <span>32</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Start Date:</span>
                    <span>Mar 22, 2025</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Status:</span>
                    <span>Preparing</span>
                  </div>
                  <div className="flex flex-col gap-1 pt-1">
                    <div className="flex justify-between text-xs">
                      <span>Preparation Progress</span>
                      <span>85%</span>
                    </div>
                    <Progress value={85} className="h-1.5" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View Details
                </Button>
              </CardFooter>
            </Card>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Team Availability Overview</CardTitle>
          <CardDescription>
            Current status and availability of response teams by type
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h3 className="text-sm font-medium flex items-center">
                <HeartPulse className="h-4 w-4 mr-2 text-red-500" />
                Medical Teams
              </h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    <Avatar className="h-7 w-7 border-2 border-background">
                      <AvatarFallback>M1</AvatarFallback>
                    </Avatar>
                    <Avatar className="h-7 w-7 border-2 border-background">
                      <AvatarFallback>M2</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="text-sm">
                    <p>2 Teams Available</p>
                    <p className="text-xs text-muted-foreground">
                      15 Personnel
                    </p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800">
                  67% Available
                </Badge>
              </div>
              <Progress value={67} className="h-1.5" />
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium flex items-center">
                <UserCheck className="h-4 w-4 mr-2 text-amber-500" />
                Search & Rescue
              </h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    <Avatar className="h-7 w-7 border-2 border-background">
                      <AvatarFallback>S1</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="text-sm">
                    <p>1 Team Available</p>
                    <p className="text-xs text-muted-foreground">
                      12 Personnel
                    </p>
                  </div>
                </div>
                <Badge className="bg-amber-100 text-amber-800">
                  50% Available
                </Badge>
              </div>
              <Progress value={50} className="h-1.5" />
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2 text-orange-500" />
                Firefighting
              </h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    <Avatar className="h-7 w-7 border-2 border-background">
                      <AvatarFallback>F1</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="text-sm">
                    <p>1 Team Available</p>
                    <p className="text-xs text-muted-foreground">
                      15 Personnel
                    </p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800">
                  100% Available
                </Badge>
              </div>
              <Progress value={100} className="h-1.5" />
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium flex items-center">
                <Truck className="h-4 w-4 mr-2 text-blue-500" />
                Logistics
              </h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    <Avatar className="h-7 w-7 border-2 border-background">
                      <AvatarFallback>L1</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="text-sm">
                    <p>1 Team Available</p>
                    <p className="text-xs text-muted-foreground">6 Personnel</p>
                  </div>
                </div>
                <Badge className="bg-amber-100 text-amber-800">
                  50% Available
                </Badge>
              </div>
              <Progress value={50} className="h-1.5" />
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium flex items-center">
                <ShieldCheck className="h-4 w-4 mr-2 text-purple-500" />
                Technical Rescue
              </h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    <Avatar className="h-7 w-7 border-2 border-background">
                      <AvatarFallback>T1</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="text-sm">
                    <p>1 Team Available</p>
                    <p className="text-xs text-muted-foreground">
                      10 Personnel
                    </p>
                  </div>
                </div>
                <Badge className="bg-red-100 text-red-800">0% Available</Badge>
              </div>
              <Progress value={0} className="h-1.5" />
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium flex items-center">
                <SendToBack className="h-4 w-4 mr-2 text-blue-500" />
                Water Rescue
              </h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    <Avatar className="h-7 w-7 border-2 border-background">
                      <AvatarFallback>W1</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="text-sm">
                    <p>1 Team Available</p>
                    <p className="text-xs text-muted-foreground">9 Personnel</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800">
                  100% Available
                </Badge>
              </div>
              <Progress value={100} className="h-1.5" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Team Deployment Schedule</CardTitle>
            <CardDescription>
              Upcoming and planned deployment schedules
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamDeploymentSchedule.map((deployment, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="space-y-1">
                    <p className="font-medium text-sm">{deployment.team}</p>
                    <p className="text-xs text-muted-foreground">
                      {deployment.event}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <div className="flex items-center text-xs text-muted-foreground">
                        <CalendarClock className="h-3 w-3 mr-1" />
                        {deployment.date}
                      </div>
                      <Badge
                        className={
                          deployment.status === "Scheduled"
                            ? "bg-green-100 text-green-800"
                            : deployment.status === "Tentative"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-blue-100 text-blue-800"
                        }
                      >
                        {deployment.status}
                      </Badge>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Team Activities</CardTitle>
            <CardDescription>
              Recent deployments and training activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTeamActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 border-b pb-3 last:border-0 last:pb-0"
                >
                  <Avatar>
                    <AvatarFallback>
                      {activity.team
                        .split(" ")
                        .map((word) => word[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">{activity.team}</p>
                    <p className="text-sm text-muted-foreground">
                      {activity.activity}
                    </p>
                    <div className="flex gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {activity.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {activity.date}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Equipment Inventory Status</CardTitle>
          <CardDescription>
            Current status of critical response equipment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {equipmentInventoryStatus.map((item, index) => (
              <Card key={index} className="border-0 shadow-none bg-muted/50">
                <CardContent className="p-3">
                  <div className="flex justify-between items-start">
                    <p className="font-medium text-sm">{item.category}</p>
                    <Badge
                      className={
                        item.status === "Adequate"
                          ? "bg-green-100 text-green-800"
                          : item.status === "Limited"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-red-100 text-red-800"
                      }
                    >
                      {item.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>Available: {item.available}</span>
                    <span>Total: {item.total}</span>
                  </div>
                  <Progress
                    value={(item.available / item.total) * 100}
                    className="h-1.5 mt-1"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
