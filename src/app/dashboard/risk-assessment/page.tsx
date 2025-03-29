import RiskAssessmentDashboard from "@/components/risk-assessment-dashboard";
import Header from "@/components/header";

export default function RiskAssessmentPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="container mx-auto px-4 py-4 flex-1">
        <h1 className="text-3xl font-bold mb-6">
          AI-Powered Disaster Risk Assessment
        </h1>
        <RiskAssessmentDashboard />
      </div>
    </div>
  );
}
