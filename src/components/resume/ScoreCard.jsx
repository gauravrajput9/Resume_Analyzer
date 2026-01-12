import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function ResumeScore({ score }) {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-center">
          Resume Score
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col items-center justify-center space-y-6 pt-2">
        <div className="text-4xl mb-3 font-bold tracking-tight">
          {score} / 100
        </div>

        <div className="w-full px-2">
          <Progress value={score} />
        </div>

        <p className="max-w-xs mt-3 text-center text-sm text-muted-foreground leading-relaxed">
          Based on ATS compatibility and resume structure
        </p>
      </CardContent>
    </Card>
  );
}
