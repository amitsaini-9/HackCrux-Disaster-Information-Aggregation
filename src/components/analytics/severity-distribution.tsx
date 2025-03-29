"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Sample data
const SEVERITY_DATA = [
  { name: "Low", value: 25, color: "#22C55E" },
  { name: "Moderate", value: 40, color: "#EAB308" },
  { name: "High", value: 25, color: "#F97316" },
  { name: "Severe", value: 10, color: "#EF4444" },
];

const SEVERITY_BY_TYPE = {
  all: [
    { name: "Low", value: 25, color: "#22C55E" },
    { name: "Moderate", value: 40, color: "#EAB308" },
    { name: "High", value: 25, color: "#F97316" },
    { name: "Severe", value: 10, color: "#EF4444" },
  ],
  earthquake: [
    { name: "Low", value: 20, color: "#22C55E" },
    { name: "Moderate", value: 45, color: "#EAB308" },
    { name: "High", value: 30, color: "#F97316" },
    { name: "Severe", value: 5, color: "#EF4444" },
  ],
  flood: [
    { name: "Low", value: 30, color: "#22C55E" },
    { name: "Moderate", value: 40, color: "#EAB308" },
    { name: "High", value: 20, color: "#F97316" },
    { name: "Severe", value: 10, color: "#EF4444" },
  ],
  fire: [
    { name: "Low", value: 15, color: "#22C55E" },
    { name: "Moderate", value: 35, color: "#EAB308" },
    { name: "High", value: 30, color: "#F97316" },
    { name: "Severe", value: 20, color: "#EF4444" },
  ],
  hurricane: [
    { name: "Low", value: 10, color: "#22C55E" },
    { name: "Moderate", value: 30, color: "#EAB308" },
    { name: "High", value: 40, color: "#F97316" },
    { name: "Severe", value: 20, color: "#EF4444" },
  ],
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border p-2 rounded-md shadow-sm">
        <p className="font-medium">{`${payload[0].name} : ${payload[0].value}%`}</p>
      </div>
    );
  }

  return null;
};

interface SeverityDistributionProps {
  className?: string;
}

export function SeverityDistribution({ className }: SeverityDistributionProps) {
  const [disasterType, setDisasterType] = useState<string>("all");
  const data =
    SEVERITY_BY_TYPE[disasterType as keyof typeof SEVERITY_BY_TYPE] ||
    SEVERITY_BY_TYPE.all;

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Severity Distribution</CardTitle>
            <CardDescription>
              Breakdown of disaster events by severity level
            </CardDescription>
          </div>
          <Select value={disasterType} onValueChange={setDisasterType}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Disaster Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="earthquake">Earthquake</SelectItem>
              <SelectItem value="flood">Flood</SelectItem>
              <SelectItem value="fire">Fire</SelectItem>
              <SelectItem value="hurricane">Hurricane</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-wrap gap-2 mt-4 justify-center">
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Low Risk
          </Badge>
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            Moderate Risk
          </Badge>
          <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">
            High Risk
          </Badge>
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            Severe Risk
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
