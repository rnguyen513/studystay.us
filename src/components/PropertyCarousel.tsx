"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Bookmark, ThumbsUp } from "lucide-react"
import { tempListings } from "@/utils/tempData"

export default function Component() {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((currentOffset) => {
        const newOffset = currentOffset - 0.5
        return newOffset <= -100 ? 0 : newOffset
      })
    }, 150)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="container px-4 py-8 relative min-h-[400px]">
      <div className="absolute inset-0 flex items-center justify-center z-50">
        <div className="bg-primary opacity-75 text-primary-foreground px-6 py-3 rounded-full text-2xl font-bold shadow-lg">
          Coming Soon
        </div>
      </div>
      <div className="blur">
        <div className="relative">
          <div
            className="flex transition-transform duration-[50ms] ease-linear"
            style={{ transform: `translateX(${offset}%)` }}
          >
            {[...tempListings, ...tempListings, ...tempListings].map((property, index) => (
              <div key={`${property.listingId}-${index}`} className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-2">
                <Card className="overflow-hidden">
                  <div className="relative">
                    <Image
                      src={property.images[0]}
                      alt={`View of ${property.location}`}
                      width={400}
                      height={300}
                      className="object-cover w-full h-48"
                    />
                    <div className="absolute top-2 left-2 bg-white px-2 py-1 text-sm font-semibold rounded">
                      Guest favorite
                    </div>
                    <div className="absolute top-2 right-2 bg-white bg-opacity-50 p-2 rounded-full">
                      <Bookmark className="h-4 w-4" />
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold">{property.location}</h3>
                      <div className="flex items-center">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        <span className="text-sm">{property.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{property.views}</p>
                    <p className="text-sm text-muted-foreground">{property.dates}</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between items-end">
                    <div>
                      <span className="text-2xl font-bold">${property.price}</span>
                      <span className="text-sm text-muted-foreground"> month</span>
                    </div>
                    {property.extraCosts && <p className="text-xs text-muted-foreground">{property.extraCosts}</p>}
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}