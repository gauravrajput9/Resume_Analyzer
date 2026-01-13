'use client'

import { useEffect } from 'react'
import { AlertTriangle, Home, RefreshCw, FileText } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/hero/Button'

export default function ResumeAnalyzerError({ error, reset }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-red-500/20 blur-3xl rounded-full"></div>
            <AlertTriangle className="relative w-20 h-20 text-red-500" />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
          Analysis Error
        </h1>
        
        <p className="text-white/60 text-lg mb-8 max-w-md mx-auto">
          Something went wrong while processing your resume. Please try again or return to the analyzer.
        </p>

        {process.env.NODE_ENV === 'development' && error.message && (
          <div className="bg-red-950/30 border border-red-500/30 rounded-lg p-4 mb-8 text-left">
            <p className="text-red-400 text-sm font-mono break-all">
              {error.message}
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={reset}
            variant="gradient"
            size="lg"
            className="inline-flex items-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </Button>
          
          <Button
            asChild
            variant="ghost"
            size="lg"
            className="inline-flex items-center gap-2"
          >
            <Link href="/resume-analyzer">
              <FileText className="w-5 h-5" />
              Back to Analyzer
            </Link>
          </Button>
          
          <Button
            asChild
            variant="ghost"
            size="lg"
            className="inline-flex items-center gap-2"
          >
            <Link href="/">
              <Home className="w-5 h-5" />
              Go Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

