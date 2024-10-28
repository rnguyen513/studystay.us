import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { MapPin, Users, Bed, Bath, Star, Share2, Heart, Mail, Bookmark, Pen, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import DynamicPropertyGallery from "@/components/DynamicPropertyGallery"
import type { ListingData } from "@/utils/tempData"
import { GoogleMapsEmbed } from "@next/third-parties/google"
import { leagueSpartan } from "@/utils/fonts"

import { createClient } from "@/utils/supabase/component"
import type { User } from "@supabase/supabase-js"

export default function ExpandedListing({ listing }: { listing: ListingData }) {
  // const [isFavorite, setIsFavorite] = useState(false)
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const supabase = createClient();
  const [userData, setUserData] = useState<User | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      await supabase.auth.getUser().then( ({ data, error }) => setUserData(data.user));
    }
    fetchUserData();
  }, [listing])

  const handleDelete = async () => {
    if (userData == null || listing.postedbyemail != userData.email) return

    await supabase
      .from('listings')
      .delete()
      .eq('id', listing.id)
      .select()
      .single()
      .then(({ data, error }) => {
        if (error) {
          console.error(error)
        }
      })
      router.push("/mylistings")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{listing.title}</h1>
        <div className="flex items-center text-muted-foreground">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{listing.location}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <DynamicPropertyGallery images={listing.images} />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span className="text-2xl font-bold">${listing.price} <span className="text-lg font-normal">/ month</span></span>
              <div className="flex gap-2">
                {/* <Button variant="outline" size="icon" onClick={() => setIsFavorite(!isFavorite)}>
                  <Bookmark className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                  <span className="sr-only">{isFavorite ? 'Remove from favorites' : 'Add to favorites'}</span>
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                  <span className="sr-only">Share listing</span>
                </Button> */}
                {userData?.email == listing.postedbyemail && userData != null && (
                  <Button variant="outline" size="icon" onClick={() => setIsDeleteOpen(true)}>
                    <X className="h-4 w-4 font-bold text-red-500"/>
                  </Button>
                )}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Bed className="w-5 h-5 mr-2" />
                <span>{listing.bedrooms} bedrooms</span>
              </div>
              <div className="flex items-center">
                <Bath className="w-5 h-5 mr-2" />
                <span>{listing.baths} baths</span>
              </div>
            </div>
            <div className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              <span>Space for {listing.guests} guest(s)</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold">Available:</span>
              <span className="ml-2">{new Date(listing.dates.from).toLocaleDateString()} - {new Date(listing.dates.to).toLocaleDateString()}</span>
            </div>
            {/* {listing.rating && (
              <div className="flex items-center">
                <Star className="w-5 h-5 mr-2 text-yellow-400" />
                <span>{listing.rating} rating</span>
              </div>
            )} */}
            <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
              <DialogTrigger asChild>
                <Button className="w-full">Book Now</Button>
              </DialogTrigger>
              <DialogContent className="bg-white">
                <DialogHeader>
                  <DialogTitle>Contact Information</DialogTitle>
                </DialogHeader>
                <div className="flex items-center justify-center p-6">
                  <Mail className="w-6 h-6 mr-2" />
                  <a href={`mailto:${listing.postedbyemail}`} className="text-lg font-medium hover:underline">
                    {listing.postedbyemail}
                  </a>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
              <DialogContent className="bg-white">
                <DialogHeader>
                  <DialogTitle className={`font-bold text-red-500 ${leagueSpartan.className}`}>Are you sure you want to delete this listing?</DialogTitle>
                </DialogHeader>
                <div className="flex items-center justify-center p-6">
                  <a onClick={handleDelete} className="text-lg font-bold text-red-500 hover:cursor-pointer hover:bg-red-100 px-4 py-2 rounded-lg">Yes I&apos;m sure</a>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base leading-relaxed">{listing.description}</p>
            </CardContent>
          </Card>

          {listing.extraCosts && listing.extraCosts.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Additional Costs</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2">
                  {listing.extraCosts.map((cost, index) => (
                    <li key={index} className="text-lg">{cost}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {listing.otherRoommates && listing.otherRoommates.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Other Roommates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {listing.otherRoommates.map((roommate, index) => (
                    <Badge key={index} variant="secondary" className="text-lg">{roommate}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Location</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video rounded-md overflow-hidden">
              {/* Replace with an actual map component */}
              {/* <div className="w-full h-full bg-muted flex items-center justify-center">
                Map placeholder
              </div> */}
              <GoogleMapsEmbed
                apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ""}
                height={200}
                width="100%"
                mode="place"
                q={listing.address}
                />
            </div>
            {/* <p className="mt-2 text-sm text-muted-foreground">{listing.address}</p> */}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}