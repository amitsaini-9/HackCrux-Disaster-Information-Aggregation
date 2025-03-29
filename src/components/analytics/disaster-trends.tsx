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
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Sample data - would come from API in real app
const MONTHLY_DATA = [
  {
    month: "Jan",
    earthquake: 12,
    flood: 5,
    fire: 8,
    hurricane: 0,
    tornado: 3,
    other: 2,
  },
  {
    month: "Feb",
    earthquake: 8,
    flood: 4,
    fire: 6,
    hurricane: 0,
    tornado: 1,
    other: 3,
  },
  {
    month: "Mar",
    earthquake: 15,
    flood: 8,
    fire: 10,
    hurricane: 0,
    tornado: 2,
    other: 1,
  },
  {
    month: "Apr",
    earthquake: 10,
    flood: 12,
    fire: 12,
    hurricane: 0,
    tornado: 5,
    other: 2,
  },
  {
    month: "May",
    earthquake: 7,
    flood: 15,
    fire: 15,
    hurricane: 1,
    tornado: 8,
    other: 3,
  },
  {
    month: "Jun",
    earthquake: 9,
    flood: 18,
    fire: 18,
    hurricane: 3,
    tornado: 6,
    other: 2,
  },
  {
    month: "Jul",
    earthquake: 11,
    flood: 20,
    fire: 22,
    hurricane: 5,
    tornado: 4,
    other: 1,
  },
  {
    month: "Aug",
    earthquake: 13,
    flood: 17,
    fire: 28,
    hurricane: 8,
    tornado: 3,
    other: 4,
  },
  {
    month: "Sep",
    earthquake: 10,
    flood: 16,
    fire: 20,
    hurricane: 9,
    tornado: 2,
    other: 3,
  },
  {
    month: "Oct",
    earthquake: 14,
    flood: 14,
    fire: 15,
    hurricane: 6,
    tornado: 1,
    other: 2,
  },
  {
    month: "Nov",
    earthquake: 16,
    flood: 9,
    fire: 10,
    hurricane: 2,
    tornado: 0,
    other: 1,
  },
  {
    month: "Dec",
    earthquake: 18,
    flood: 6,
    fire: 7,
    hurricane: 0,
    tornado: 0,
    other: 2,
  },
];

const YEARLY_DATA = [
  {
    year: "2018",
    earthquake: 110,
    flood: 95,
    fire: 128,
    hurricane: 24,
    tornado: 32,
    other: 18,
  },
  {
    year: "2019",
    earthquake: 132,
    flood: 105,
    fire: 148,
    hurricane: 28,
    tornado: 38,
    other: 22,
  },
  {
    year: "2020",
    earthquake: 128,
    flood: 118,
    fire: 162,
    hurricane: 32,
    tornado: 35,
    other: 24,
  },
  {
    year: "2021",
    earthquake: 145,
    flood: 125,
    fire: 172,
    hurricane: 27,
    tornado: 33,
    other: 19,
  },
  {
    year: "2022",
    earthquake: 138,
    flood: 142,
    fire: 185,
    hurricane: 32,
    tornado: 30,
    other: 20,
  },
  {
    year: "2023",
    earthquake: 142,
    flood: 152,
    fire: 195,
    hurricane: 35,
    tornado: 28,
    other: 23,
  },
  {
    year: "2024",
    earthquake: 148,
    flood: 144,
    fire: 171,
    hurricane: 34,
    tornado: 35,
    other: 26,
  },
];

interface DisasterTrendsProps {
  className?: string;
}

export function DisasterTrends({ className }: DisasterTrendsProps) {
  const [timeframe, setTimeframe] = useState<"monthly" | "yearly">("monthly");
  const data = timeframe === "monthly" ? MONTHLY_DATA : YEARLY_DATA;
  const xAxisKey = timeframe === "monthly" ? "month" : "year";

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Disaster Trends</CardTitle>
            <CardDescription>
              Distribution of disasters over time
            </CardDescription>
          </div>
          <Select
            value={timeframe}
            onValueChange={(value) =>
              setTimeframe(value as "monthly" | "yearly")
            }
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            Flood
          </Badge>
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            Fire
          </Badge>
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
            Earthquake
          </Badge>
          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
            Hurricane
          </Badge>
          <Badge className="bg-teal-100 text-teal-800 hover:bg-teal-100">
            Tornado
          </Badge>
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
            Other
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xAxisKey} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="earthquake" stackId="a" fill="#F59E0B" />
              <Bar dataKey="flood" stackId="a" fill="#3B82F6" />
              <Bar dataKey="fire" stackId="a" fill="#EF4444" />
              <Bar dataKey="hurricane" stackId="a" fill="#8B5CF6" />
              <Bar dataKey="tornado" stackId="a" fill="#14B8A6" />
              <Bar dataKey="other" stackId="a" fill="#6B7280" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
