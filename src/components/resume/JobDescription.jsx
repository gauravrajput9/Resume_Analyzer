'use client'
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function JobDescriptionInput({ value, onChange }) {
  return (
    <Card className="bg-[#0f0f0f] border border-zinc-800 rounded-2xl">
      <CardHeader className="pb-3">
        <CardTitle className="text-white text-lg ml-5 mt-4 font-semibold">
          Job Description <span className="text-sm text-zinc-500">(Optional)</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-8">
        {/* VISUAL separation layer */}
        <div className="rounded-xl border border-zinc-700 bg-[#151515] p-4">
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Paste the job description you’re applying for..."
            rows={8}
            className="
              bg-transparent
              border-none
              p-0
              text-white
              leading-relaxed
              resize-none
              placeholder:text-zinc-400
              focus-visible:ring-0
            "
          />
        </div>

        <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
          Adding a job description improves ATS accuracy and skill matching.
        </p>
      </CardContent>
    </Card>
  );
}
