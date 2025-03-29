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
import { DivIcon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Filter, Layers, Search } from "lucide-react";
import { useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  ZoomControl,
} from "react-leaflet";

// Types
interface Disaster {
  id: number;
  type: string;
  title: string;
  location: [number, number];
  severity: string;
  status: string;
  description?: string;
  timestamp?: string;
}

// Sample disaster data
const disasters: Disaster[] = [
  {
    id: 1,
    type: "earthquake",
    title: "6.2 Magnitude Earthquake",
    location: [35.6762, 139.6503],
    severity: "high",
    status: "active",
    description: "Strong earthquake detected off the coast of Japan",
    timestamp: new Date().toISOString(),
  },
  {
    id: 2,
    type: "flood",
    title: "Severe Flooding",
    location: [12.6392, 101.4215],
    severity: "severe",
    status: "active",
    description: "Major flooding affecting multiple provinces",
    timestamp: new Date().toISOString(),
  },
  {
    id: 3,
    type: "fire",
    title: "Forest Fire",
    location: [37.7749, -122.4194],
    severity: "high",
    status: "active",
    description: "Large wildfire spreading rapidly",
    timestamp: new Date().toISOString(),
  },
  {
    id: 4,
    type: "flood",
    title: "Monsoon Flooding",
    location: [19.076, 72.8777],
    severity: "high",
    status: "active",
    description:
      "Heavy monsoon rainfall causing widespread flooding in Mumbai and surrounding areas",
    timestamp: new Date().toISOString(),
  },
  {
    id: 5,
    type: "landslide",
    title: "Himalayan Landslide",
    location: [30.7333, 79.0667],
    severity: "severe",
    status: "active",
    description:
      "Major landslide in Uttarakhand blocking key roads and affecting multiple villages",
    timestamp: new Date().toISOString(),
  },
  {
    id: 6,
    type: "cyclone",
    title: "Cyclone Amphan",
    location: [22.5726, 88.3639],
    severity: "severe",
    status: "monitoring",
    description:
      "Powerful cyclone approaching Eastern coast with winds exceeding 160 km/h",
    timestamp: new Date().toISOString(),
  },

  {
    id: 7,
    type: "earthquake",
    title: "5.8 Magnitude Earthquake",
    location: [27.7172, 85.324],
    severity: "moderate",
    status: "monitoring",
    description:
      "Earthquake in Nepal causing structural damage in multiple districts",
    timestamp: new Date().toISOString(),
  },
  {
    id: 8,
    type: "drought",
    title: "Severe Drought",
    location: [23.8103, 90.4125],
    severity: "high",
    status: "active",
    description:
      "Prolonged drought affecting agricultural regions and water supplies",
    timestamp: new Date().toISOString(),
  },
  {
    id: 9,
    type: "tsunami",
    title: "Tsunami Warning",
    location: [8.7832, 78.2003],
    severity: "high",
    status: "warning",
    description:
      "Tsunami warning issued after undersea seismic activity in the Indian Ocean",
    timestamp: new Date().toISOString(),
  },
];

// Custom marker icons for different disaster types
const createMarkerIcon = (type: string) => {
  const colors = {
    earthquake: "#F59E0B",
    flood: "#3B82F6",
    fire: "#EF4444",
    hurricane: "#8B5CF6",
    tornado: "#10B981",
    default: "#6B7280",
  };

  return new DivIcon({
    className: "custom-marker",
    html: `
      <div style="
        background-color: ${
          colors[type as keyof typeof colors] || colors.default
        };
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      "></div>
    `,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
};

// Helper functions
const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "severe":
      return "bg-red-100 text-red-800";
    case "high":
      return "bg-orange-100 text-orange-800";
    case "moderate":
      return "bg-yellow-100 text-yellow-800";
    case "low":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-red-100 text-red-800";
    case "monitoring":
      return "bg-blue-100 text-blue-800";
    case "resolved":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function MapPage() {
  const [selectedType, setSelectedType] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [mapCenter, setMapCenter] = useState<[number, number]>([20, 0]);
  const [mapZoom, setMapZoom] = useState<number>(2);

  const filteredDisasters = disasters.filter((disaster) => {
    if (selectedType && disaster.type !== selectedType) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        disaster.title.toLowerCase().includes(query) ||
        disaster.description?.toLowerCase().includes(query)
      );
    }
    return true;
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Disaster Map</h1>
        <Button variant="outline" size="sm">
          <Layers className="h-4 w-4 mr-2" />
          Change Map Style
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search locations..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="md:col-span-3">
          <CardContent className="p-0">
            <div className="h-[600px] relative">
              <MapContainer
                center={[20.5937, 78.9629]}
                zoom={mapZoom}
                style={{ height: "100%", width: "100%" }}
                zoomControl={false}
              >
                <ZoomControl position="topright" />
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {filteredDisasters.map((disaster) => (
                  <Marker
                    key={disaster.id}
                    position={disaster.location}
                    icon={createMarkerIcon(disaster.type)}
                  >
                    <Popup>
                      <div className="p-1">
                        <h3 className="font-medium text-sm mb-1">
                          {disaster.title}
                        </h3>
                        <p className="text-xs text-muted-foreground mb-2">
                          {disaster.description}
                        </p>
                        <div className="flex items-center gap-2">
                          <Badge
                            className={getSeverityColor(disaster.severity)}
                          >
                            {disaster.severity}
                          </Badge>
                          <Badge className={getStatusColor(disaster.status)}>
                            {disaster.status}
                          </Badge>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Disaster Types</CardTitle>
              <CardDescription>Filter events by type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                {[
                  "all",
                  "earthquake",
                  "flood",
                  "fire",
                  "hurricane",
                  "tornado",
                ].map((type) => (
                  <Button
                    key={type}
                    variant={selectedType === type ? "default" : "outline"}
                    className="justify-start"
                    onClick={() => setSelectedType(type === "all" ? "" : type)}
                  >
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{
                        backgroundColor:
                          type === "all"
                            ? "#6B7280"
                            : createMarkerIcon(type).options.html?.match(
                                /background-color: (#[A-Fa-f0-9]{6})/
                              )?.[1],
                      }}
                    />
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Active Events</CardTitle>
              <CardDescription>Currently monitored disasters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {filteredDisasters.map((disaster) => (
                <div
                  key={disaster.id}
                  className="p-3 rounded-lg border bg-muted/50 space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: createMarkerIcon(
                          disaster.type
                        ).options.html?.match(
                          /background-color: (#[A-Fa-f0-9]{6})/
                        )?.[1],
                      }}
                    />
                    <span className="font-medium text-sm">
                      {disaster.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getSeverityColor(disaster.severity)}>
                      {disaster.severity}
                    </Badge>
                    <Badge className={getStatusColor(disaster.status)}>
                      {disaster.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
