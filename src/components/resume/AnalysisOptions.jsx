import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const OPTIONS = [
  "ATS Score",
  "Skill Gap Analysis",
  "Grammar & Formatting",
  "Job Description Match",
];

export default function AnalysisOptions() {
  return (
    <Card className="bg-[#111] border border-gray-800 transition-colors">
      <CardHeader>
        <CardTitle className="text-white text-lg">What would you like to analyze?</CardTitle>
      </CardHeader>

      <CardContent className="grid gap-4 sm:grid-cols-2">
        {OPTIONS.map((option) => (
          <div
            key={option}
            className="flex items-center gap-3 rounded-md border border-gray-800 p-3 transition-colors"
          >
            <Checkbox defaultChecked className="ring-white" />
            <span className="text-white text-sm font-medium">{option}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
