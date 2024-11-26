"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@nextui-org/slider"
import { SearchQuery } from "@/utils/tempData"
import { leagueSpartan } from "@/utils/fonts"

import { useRouter } from "next/navigation";

const SearchModal = ({open, onOpenChange, searchQuery, setSearchQuery, submitQuery}: {open: boolean, onOpenChange: (open: boolean) => void, searchQuery: SearchQuery, setSearchQuery: React.Dispatch<React.SetStateAction<SearchQuery>>, submitQuery: (e: React.FormEvent) => void}) => {
    const [priceRange, setPriceRange] = React.useState<number[]>([0, 2000]);

    const router = useRouter();

    const handleSliderChange = (value: number | number[]) => {
      if (Array.isArray(value)) {
        setPriceRange(value)
        setSearchQuery(prev => ({ ...prev, minPrice: value[0], maxPrice: value[1] }));
      }
    }

    const updateQuery = (key: string, value: any) => {
        setSearchQuery(prev => ({ ...prev, [key]: value }));
        console.log("new search query:", searchQuery);
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className={`sm:max-w-[600px] bg-white ${leagueSpartan.className}`}>
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl">Search</DialogTitle>
            </div>
          </DialogHeader>
          <div className="space-y-8 py-4">
            <div>
              <h2 className="text-3xl font-bold mb-6">Find your next room</h2>
              <div className="flex justify-end mb-4">
                <Button onClick={() => {onOpenChange(false); setSearchQuery({listing: {location: "University of Virginia (UVA)"}, minPrice: 0, maxPrice: 2000}); router.push("/in")}} variant="ghost" className="text-primary">
                  X Clear filters
                </Button>
              </div>
            </div>
  
            <div className="space-y-2">
              <h3 className="text-lg font-medium mb-2">College</h3>
              {/* <Select value={searchQuery.listing.location} onValueChange={() => updateQuery("listing", {...searchQuery.listing, location: "University of Virginia (UVA)"})}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Search / Select College" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="college1">University of Virginia (UVA)</SelectItem>
                </SelectContent>
              </Select> */}
              <b className="bg-gray-400/10 rounded-lg p-2">{searchQuery.listing.location ?? "University of Virginia (VUA)"}</b>
            </div>
  
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Semester and Year</h3>
              <div className="grid grid-cols-4 gap-2">
                {["Fall", "Winter", "Spring", "Summer"].map((semester) => (
                  <Button
                    key={semester}
                    variant="outline"
                    className={`w-full hover:bg-[#004aad] hover:text-white ${searchQuery.listing.available_semester === semester ? "bg-[#004aad] text-white" : ""}`}
                    onClick={() => updateQuery("listing", {...searchQuery.listing ?? {}, available_semester: searchQuery.listing.available_semester === semester ? undefined : semester})}
                  >
                    {semester}
                  </Button>
                ))}
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[2024, 2025, 2026, 2027].map((year) => (
                  <Button
                    key={year}
                    variant="outline"
                    className={`w-full hover:bg-[#004aad] hover:text-white ${searchQuery.listing.available_year == year ? "bg-[#004aad] text-white" : ""}`}
                    onClick={() => updateQuery("listing", {...searchQuery.listing ?? {}, available_year: searchQuery.listing.available_year == year ? undefined : year})}
                  >
                    {year}
                  </Button>
                ))}
              </div>
            </div>
  
            <div className="space-y-4 w-full">
              <h3 className="text-lg font-medium">Price</h3>
              <Slider 
                label="Select a budget"
                formatOptions={{style: "currency", currency: "USD"}}
                step={50}
                maxValue={2000}
                minValue={0}
                value={priceRange}
                onChange={handleSliderChange}
                className="w-full max-w-full"
              />
              <p className="text-default-500 font-medium text-small">
                Selected budget: {priceRange.map((b) => `$${b}`).join(" - ")}
              </p>
            </div>
  
            <Button onClick={(e) => {submitQuery(e); onOpenChange(false)}} className="w-full bg-[#004aad] hover:bg-black text-white">
              Search
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
}

export default SearchModal;