import { Loader, Sparkles } from "lucide-react";
import { Button } from "../ui/button";

export default function AnalyzeButton({ disabled, isLoading, onClick }) {
  return (
    <Button
      size="lg"
      disabled={disabled || isLoading}
      onClick={onClick}
      className="bg-white text-black hover:bg-gray-200 disabled:opacity-50 flex items-center justify-center transition-colors"
    >
      {isLoading ? (
        <Loader className="animate-spin h-5 w-5" />
      ) : (
        <>
          <Sparkles className="h-5 w-5 mr-2" />
          <p>Analyze Resume</p>
        </>
      )}
    </Button>
  );
}
