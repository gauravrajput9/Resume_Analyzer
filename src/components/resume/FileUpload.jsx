'use client'

import { Upload, FileText } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";

export default function ResumeUpload({ file, setFile }) {
  return (
    <Card className="bg-[#111] border border-gray-800 hover:border-primary transition-colors">
      <CardContent className="py-10">
        <label
          htmlFor="resume-upload"
          className="flex flex-col items-center justify-center gap-4 cursor-pointer"
        >
          <div className="rounded-full bg-gray-800 p-4 flex items-center justify-center transition-colors">
            <Upload className="h-8 w-8 text-white" />
          </div>

          <div className="text-center space-y-1">
            <p className="font-medium text-white">Drag & drop your resume</p>
            <p className="text-sm text-gray-400">PDF or DOCX • Max 2MB</p>
          </div>

          <Button
            variant="default"
            size="sm"
            className="bg-white text-black hover:bg-gray-200 transition-colors"
          >
            Browse File
          </Button>

          <input
            id="resume-upload"
            type="file"
            accept=".pdf,.docx"
            className="hidden"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </label>

        {file && (
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-white">
            <FileText className="h-4 w-4 text-white" />
            <span className="font-medium">{file.name}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
