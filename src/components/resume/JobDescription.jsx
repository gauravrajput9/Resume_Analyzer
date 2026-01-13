'use client'
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function JobDescriptionInput({ value, onChange }) {
  return (
    <Card className="bg-[#111] border border-gray-800">
      <CardHeader>
        <CardTitle className="text-white text-lg">
          Job Description (Optional)
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste the job description you’re applying for..."
          rows={8}
          className="bg-[#0b0b0b] border-gray-700 text-white resize-none"
        />

        <p className="text-xs text-gray-400">
          Adding a job description improves ATS accuracy and skill matching.
        </p>
      </CardContent>
    </Card>
  );
}
