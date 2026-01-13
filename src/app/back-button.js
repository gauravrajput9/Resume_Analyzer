'use client'

import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/hero/Button'

export default function BackButton() {
  return (
    <Button
      variant="ghost"
      size="lg"
      className="inline-flex items-center gap-2"
      onClick={() => window.history.back()}
    >
      <ArrowLeft className="w-5 h-5" />
      Go Back
    </Button>
  )
}

