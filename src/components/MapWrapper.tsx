'use client'

import { useState } from 'react'
import { GoogleMapsEmbed as NextGoogleMapsEmbed } from '@next/third-parties/google'
import { Loader2 } from 'lucide-react'

interface GoogleMapsEmbedProps {
  apiKey: string
  height?: number
  width?: number | string
  mode?: 'place' | 'view' | 'directions' | 'streetview' | 'search'
  q?: string
  center?: string
  zoom?: string
  maptype?: 'roadmap' | 'satellite'
  language?: string
  region?: string
}

export default function GoogleMapsEmbed({
  apiKey,
  height = 300,
  width = '100%',
  mode = 'place',
  q = 'University of Virginia, Charlottesville, VA',
  ...props
}: GoogleMapsEmbedProps) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="relative" style={{ height, width }}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100" aria-label="Loading map">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      )}
      <NextGoogleMapsEmbed
        apiKey={apiKey}
        height={height}
        width={width}
        mode={mode}
        q={q}
        style={isLoading ? "visibility: hidden" : "visibility: visible"}
        {...props}
      />
    </div>
  )
}