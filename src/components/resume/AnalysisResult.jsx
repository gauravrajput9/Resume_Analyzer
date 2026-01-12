import ResumeScore from "../resume/ScoreCard";
import AnalysisTabs from "./AnalysisTabs";

export default function AnalysisResult({ analysis }) {
  return (
    <div className="space-y-6">
      <ResumeScore score={analysis.score} />
      <AnalysisTabs analysis={analysis} />
    </div>
  );
}
