import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export default function AnalysisTabs({ analysis }) {
  return (
    <Tabs defaultValue="ats" className="w-full space-y-8">
      
      {/* Tabs */}
      <TabsList className="grid grid-cols-3 gap-2 p-1">
        <TabsTrigger value="ats" className="py-2">
          ATS
        </TabsTrigger>
        <TabsTrigger value="skills" className="py-2">
          Skills
        </TabsTrigger>
        <TabsTrigger value="suggestions" className="py-2">
          Suggestions
        </TabsTrigger>
      </TabsList>

      {/* ATS */}
      <TabsContent value="ats" className="space-y-6 pt-6">
        <div className="flex items-center gap-3 mb-3">
          <p className="font-medium">ATS Status:</p>
          <Badge>{analysis.ats.status}</Badge>
        </div>

        <ul className="list-disc pl-6 space-y-3 text-sm">
          {analysis.ats.issues.map((issue, i) => (
            <li key={i}>{issue}</li>
          ))}
        </ul>
      </TabsContent>

      {/* Skills */}
      <TabsContent value="skills" className="space-y-8 pt-6">
        <div className="space-y-4">
          <p className="font-medium">Matched Skills</p>
          <div className="flex flex-wrap gap-3">
            {analysis.skills.matched.map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <p className="font-medium">Missing Skills</p>
          <div className="flex flex-wrap gap-3">
            {analysis.skills.missing.map((skill) => (
              <Badge key={skill} variant="destructive">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </TabsContent>

      {/* Suggestions */}
      <TabsContent value="suggestions" className="space-y-6 pt-6">
        <ul className="list-disc pl-6 text-sm space-y-3">
          {analysis.suggestions.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </TabsContent>

    </Tabs>
  );
}
