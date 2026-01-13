import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const OPTIONS = [
  { key: "atsScore", label: "ATS Score" },
  { key: "skillGapAnalysis", label: "Skill Gap Analysis" },
  { key: "grammarAndFormatting", label: "Grammar & Formatting" },
  { key: "jobDescriptionMatch", label: "Job Description Match" },
];

export default function AnalysisOptions({
  analysisOptions,
  setAnalysisOptions,
}) {
  return (
    <Card className="bg-[#111] border p-5 border-gray-800">
      <CardHeader>
        <CardTitle className="mb-5 text-white text-lg">
          What would you like to analyze?
        </CardTitle>
      </CardHeader>

      <CardContent className="grid gap-4 sm:grid-cols-2">
        {OPTIONS.map(({ key, label }) => (
          <div
            key={key}
            className="flex items-center gap-3 rounded-md border border-gray-800 p-3"
          >
            <Checkbox
              checked={analysisOptions[key]}
              onCheckedChange={(value) =>
                setAnalysisOptions((prev) => ({
                  ...prev,
                  [key]: value === true,
                }))
              }
            />
            <span className="text-white text-sm font-medium">{label}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
