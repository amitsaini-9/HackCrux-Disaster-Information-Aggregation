"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { systemDocummentationList } from "@/constant/help";
import {
  BarChart,
  Bell,
  Book,
  Code,
  FileText,
  HelpCircle,
  Mail,
  MessageCircle,
  Search,
  Send,
  Smartphone,
  VideoIcon,
} from "lucide-react";
import { useState } from "react";

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search functionality would be implemented here
    console.log(`Searching for: ${searchQuery}`);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Help & Support</h1>
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              className="pl-10 pr-14"
              placeholder="Search for help topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              type="submit"
              size="sm"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8"
            >
              Search
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Help Content */}
      <Tabs defaultValue="faq" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="faq">
            <HelpCircle className="mr-2 h-4 w-4" />
            FAQ
          </TabsTrigger>
          <TabsTrigger value="guides">
            <Book className="mr-2 h-4 w-4" />
            Guides
          </TabsTrigger>
          <TabsTrigger value="documentation">
            <FileText className="mr-2 h-4 w-4" />
            Documentation
          </TabsTrigger>
          <TabsTrigger value="support">
            <MessageCircle className="mr-2 h-4 w-4" />
            Contact
          </TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>
                Common questions and answers about using the disaster
                information system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    How is disaster data collected?
                  </AccordionTrigger>
                  <AccordionContent>
                    Our system automatically collects data from multiple sources
                    including social media platforms, news outlets, government
                    disaster portals, and specialized weather services. This
                    data is processed, verified, and categorized using advanced
                    algorithms to provide real-time disaster information.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    How can I set up custom alerts?
                  </AccordionTrigger>
                  <AccordionContent>
                    You can create custom alerts by navigating to the Alerts
                    page from the dashboard. There, you can specify the disaster
                    types, geographic regions, and severity levels you're
                    interested in. You can also choose how you want to receive
                    notifications (email, in-app, or SMS).
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    What does the severity level mean?
                  </AccordionTrigger>
                  <AccordionContent>
                    Severity levels indicate the potential impact of a disaster:
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>
                        <strong>Low:</strong> Minimal impact, limited disruption
                      </li>
                      <li>
                        <strong>Moderate:</strong> Notable impact, local
                        disruption
                      </li>
                      <li>
                        <strong>High:</strong> Significant impact, regional
                        disruption
                      </li>
                      <li>
                        <strong>Severe:</strong> Major impact, widespread
                        disruption
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger>
                    How accurate is the information?
                  </AccordionTrigger>
                  <AccordionContent>
                    We strive for high accuracy by implementing multiple
                    verification layers. Information is assigned a credibility
                    score based on source reliability, confirmation across
                    multiple sources, and official verification. We continuously
                    improve our algorithms to increase accuracy.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger>
                    Can I export disaster data?
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes, you can export data in various formats including CSV,
                    JSON, and PDF. Use the Export button on the Events page.
                    Premium users have access to additional export options and
                    historical data.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6">
                  <AccordionTrigger>
                    How can I report a new disaster?
                  </AccordionTrigger>
                  <AccordionContent>
                    You can report a new disaster by clicking the "Report Event"
                    button on the dashboard. Fill in the details including
                    location, disaster type, and description. Adding sources and
                    images increases the credibility of your report.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-7">
                  <AccordionTrigger>
                    What response resources are available?
                  </AccordionTrigger>
                  <AccordionContent>
                    The system provides information on nearby emergency
                    resources, evacuation routes, and shelters when available.
                    This information is displayed on the event detail page for
                    active disasters.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guides" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Guides</CardTitle>
              <CardDescription>
                Step-by-step guides to help you use the system effectively
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    title: "Getting Started Guide",
                    description:
                      "Learn the basics of using the disaster information dashboard",
                    icon: Book,
                    videoAvailable: true,
                  },
                  {
                    title: "Setting Up Alerts",
                    description:
                      "Configure custom alerts for specific disaster types and regions",
                    icon: Bell,
                    videoAvailable: true,
                  },
                  {
                    title: "Data Analysis Tools",
                    description:
                      "Learn how to use analytics features to gain insights",
                    icon: BarChart,
                    videoAvailable: false,
                  },
                  {
                    title: "Creating Reports",
                    description:
                      "Generate and export disaster reports for your organization",
                    icon: FileText,
                    videoAvailable: true,
                  },
                  {
                    title: "Mobile App Setup",
                    description:
                      "Configure the mobile companion app for on-the-go access",
                    icon: Smartphone,
                    videoAvailable: false,
                  },
                  {
                    title: "API Integration",
                    description:
                      "Integrate disaster data with your own systems",
                    icon: Code,
                    videoAvailable: false,
                  },
                ].map((guide, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardHeader className="p-4 pb-2">
                      <div className="flex items-center gap-2">
                        <guide.icon className="h-5 w-5 text-primary" />
                        <CardTitle className="text-base">
                          {guide.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-muted-foreground">
                        {guide.description}
                      </p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex justify-between">
                      <Button variant="outline" size="sm">
                        <FileText className="mr-2 h-4 w-4" />
                        Read Guide
                      </Button>
                      {guide.videoAvailable && (
                        <Button variant="ghost" size="sm">
                          <VideoIcon className="mr-2 h-4 w-4" />
                          Watch Video
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documentation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Documentation</CardTitle>
              <CardDescription>
                Comprehensive documentation on system features and capabilities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {systemDocummentationList.map((doc, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex flex-col h-full">
                        <div className="flex items-center gap-2 mb-2">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                          <span className="font-medium">{doc.title}</span>
                        </div>
                        <Badge className="w-fit mb-2">{doc.category}</Badge>
                        <div className="text-xs text-muted-foreground mt-auto">
                          Last updated: {doc.lastUpdated}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="support" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>Get help from our support team</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">
                    Submit a Support Ticket
                  </h3>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label htmlFor="name" className="text-sm font-medium">
                        Name
                      </label>
                      <Input id="name" placeholder="Your full name" />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Your email address"
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="topic" className="text-sm font-medium">
                        Topic
                      </label>
                      <Input
                        id="topic"
                        placeholder="Brief description of the issue"
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        placeholder="Please describe your issue in detail"
                        rows={5}
                      />
                    </div>
                    <Button className="w-full">
                      <Send className="mr-2 h-4 w-4" />
                      Submit Request
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Contact Information</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium">Email Support</p>
                      <a
                        href="mailto:support@disasterinfo.example"
                        className="text-sm text-blue-600 hover:underline flex items-center"
                      >
                        <Mail className="mr-2 h-4 w-4" />
                        support@disasterinfo.example
                      </a>
                    </div>
                    <Separator />
                    <div>
                      <p className="text-sm font-medium">Support Hours</p>
                      <p className="text-sm text-muted-foreground">
                        Monday - Friday: 9:00 AM - 8:00 PM EST
                        <br />
                        Saturday - Sunday: 10:00 AM - 6:00 PM EST
                      </p>
                    </div>
                    <Separator />
                    <div>
                      <p className="text-sm font-medium">Emergency Support</p>
                      <p className="text-sm text-muted-foreground">
                        For urgent matters requiring immediate attention,
                        <br />
                        please call our 24/7 emergency support line:
                        <br />
                        <span className="font-medium text-foreground">
                          +1 (555) 123-4567
                        </span>
                      </p>
                    </div>
                    <Separator />
                    <div>
                      <p className="text-sm font-medium">Support Team</p>
                      <div className="flex items-center gap-3 mt-2">
                        <Avatar>
                          <AvatarImage src="/placeholder-avatars/1.jpg" />
                          <AvatarFallback>ST</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">Support Team</p>
                          <p className="text-xs text-muted-foreground">
                            Average response time: 2 hours
                          </p>
                        </div>
                      </div>
                    </div>
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
