import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { createClient } from "@/utils/supabase/component"
import { leagueSpartan } from "@/utils/fonts"
import Header from "@/components/header"
import ExpandedListing from "@/components/ExpandedListing"
import type { ListingData } from "@/utils/tempData"

export default function ListingPage() {
  const router = useRouter()
  const { listingId } = router.query
  const [loading, setLoading] = useState(true)
  const [listing, setListing] = useState<ListingData | null>(null)

  const supabase = createClient()

  useEffect(() => {
    async function fetchListing() {
      if (typeof listingId !== 'string') return

      try {
        setLoading(true)
        const { data, error } = await supabase
          .from("listings")
          .select()
          .eq("id", listingId)
          .single()

        if (error) {
          console.error("Error fetching listing:", error)
          return
        }

        setListing(data as ListingData)
      } catch (error) {
        console.error("Something went wrong:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchListing()
  }, [listingId, supabase])

  return (
    <div className={`min-h-screen bg-white text-black ${leagueSpartan.className} text-xl overflow-hidden`}>
      <Header/>
      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <p className="text-center text-xl">Loading...</p>
        ) : listing ? (
          <ExpandedListing listing={listing} />
        ) : (
          <p className="text-center text-xl">Listing not found</p>
        )}
      </main>
    </div>
  )
}