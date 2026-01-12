import { Sparkles } from "lucide-react";
import { Button } from "../ui/button";

export default function AnalyzeButton({ disabled, isLoading, onClick }) {
  return (
    <Button
      size="lg"
      disabled={disabled || isLoading}
      onClick={onClick}
      className="bg-white text-black hover:bg-gray-200 disabled:opacity-50 flex items-center justify-center transition-colors"
    >
      <Sparkles className="h-5 w-5 mr-2" />
      {isLoading ? "Analyzing..." : "Analyze Resume"}
    </Button>
  );
}
