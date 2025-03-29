"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  getRegionRiskAssessment,
  predictDisastersByRegion,
} from "@/services/risk-assessment-service";
import { motion } from "framer-motion";
import { AlertTriangle, BarChart2, Calendar } from "lucide-react";

export default function RiskAssessmentDashboard() {
  const [selectedRegion, setSelectedRegion] =
    useState<string>("Coastal Kerala");
  const regions = getRegionRiskAssessment();
  const currentRegion =
    regions.find((r) => r.region === selectedRegion) || regions[0];
  const predictions = predictDisastersByRegion(selectedRegion);

  const getRiskColor = (risk: number) => {
    if (risk >= 75)
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    if (risk >= 50)
      return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
    if (risk >= 25)
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Region Analysis</CardTitle>
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select Region" />
              </SelectTrigger>
              <SelectContent>
                {regions.map((region) => (
                  <SelectItem key={region.region} value={region.region}>
                    {region.region}, {region.state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="detailed">Detailed Analysis</TabsTrigger>
              <TabsTrigger value="predictions">Predictions</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-4 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">
                  {currentRegion.region}, {currentRegion.state}
                </h3>
                <Badge className={getRiskColor(currentRegion.overallRisk)}>
                  Overall Risk: {currentRegion.overallRisk}%
                </Badge>
              </div>

              <div className="bg-muted p-4 rounded-md">
                <h4 className="font-medium mb-2">Main Threats:</h4>
                <div className="flex flex-wrap gap-2">
                  {currentRegion.mainThreats.map((threat, index) => (
                    <Badge key={index} variant="outline">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      {threat}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Card className="p-3">
                  <h3 className="text-sm font-medium mb-2">
                    Top Disaster Risks
                  </h3>
                  <div className="space-y-3">
                    {Object.entries({
                      Flood: currentRegion.floodRisk,
                      Earthquake: currentRegion.earthquakeRisk,
                      Cyclone: currentRegion.cycloneRisk,
                      Wildfire: currentRegion.wildfireRisk,
                      Landslide: currentRegion.landslideRisk,
                      Heatwave: currentRegion.heatwaveRisk,
                    })
                      .sort((a, b) => b[1] - a[1])
                      .slice(0, 3)
                      .map(([type, risk], index) => (
                        <div key={index}>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm">{type}</span>
                            <span className="text-sm font-medium">{risk}%</span>
                          </div>
                          <Progress value={risk} />
                        </div>
                      ))}
                  </div>
                </Card>

                <Card className="p-3">
                  <h3 className="text-sm font-medium mb-2">Recent Activity</h3>
                  <div className="space-y-2">
                    <motion.div
                      className="p-2 bg-yellow-50 dark:bg-yellow-950 text-sm rounded-md"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      Heatwave warning issued 2 days ago
                    </motion.div>
                    <motion.div
                      className="p-2 bg-blue-50 dark:bg-blue-950 text-sm rounded-md"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      Rainfall above normal (12% increase)
                    </motion.div>
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="detailed" className="mt-4 space-y-4">
              <h3 className="text-lg font-medium mb-4">
                Risk Breakdown for {currentRegion.region}
              </h3>

              <div className="space-y-4">
                {Object.entries({
                  "Flood Risk": currentRegion.floodRisk,
                  "Earthquake Risk": currentRegion.earthquakeRisk,
                  "Cyclone Risk": currentRegion.cycloneRisk,
                  "Wildfire Risk": currentRegion.wildfireRisk,
                  "Landslide Risk": currentRegion.landslideRisk,
                  "Heatwave Risk": currentRegion.heatwaveRisk,
                }).map(([type, risk], index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{type}</span>
                      <Badge className={getRiskColor(risk)}>{risk}%</Badge>
                    </div>
                    <Progress value={risk} className="h-2" />
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="predictions" className="mt-4 space-y-4">
              <h3 className="text-lg font-medium mb-4">
                Predicted Disasters for {currentRegion.region}
              </h3>

              {predictions.upcomingRisks.length === 0 ? (
                <Card className="p-4">
                  <p className="text-center text-muted-foreground">
                    No imminent disaster risks predicted for this region.
                  </p>
                </Card>
              ) : (
                <div className="space-y-4">
                  {predictions.upcomingRisks.map((risk, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-bold">
                            {risk.disasterType} Risk
                          </h4>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4 mr-1" />
                            {risk.timeframe}
                          </div>
                        </div>
                        <Badge className={getRiskColor(risk.probability)}>
                          {risk.probability}% Probability
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <h5 className="text-sm font-medium">
                          Contributing Factors:
                        </h5>
                        <ul className="list-disc pl-5 space-y-1">
                          {risk.factors.map((factor, i) => (
                            <li key={i} className="text-sm">
                              {factor}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Card>
                  ))}
                </div>
              )}

              <div className="flex items-center p-3 bg-muted rounded-md text-sm">
                <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
                <p>
                  Predictions are based on historical data, weather patterns,
                  and AI analysis.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
