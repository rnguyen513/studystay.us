'use client'

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { MapPin, Users, Bed, Bath, Star, Share2, Heart, Mail, Bookmark, Pen, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import DynamicPropertyGallery from "@/components/DynamicPropertyGallery"
import type { ListingData } from "@/utils/tempData"
import { GoogleMapsEmbed } from "@next/third-parties/google"
import { leagueSpartan } from "@/utils/fonts"

import { createClient } from "@/utils/supabase/component"
import type { User } from "@supabase/supabase-js"

export default function ExpandedListing({ listing: initialListing }: { listing: ListingData }) {
  const [listing, setListing] = useState(initialListing)
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [updatedListing, setUpdatedListing] = useState<ListingData>(listing)
  const [loading, setLoading] = useState(false)

  const supabase = createClient()
  const [userData, setUserData] = useState<User | null>(null)

  const router = useRouter()

  useEffect(() => {
    const fetchUserData = async () => {
      const { data } = await supabase.auth.getUser()
      setUserData(data.user)
    }
    fetchUserData()
  }, [supabase])

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setUpdatedListing(prev => ({ ...prev, [name]: value }))
  }

  const handleDateChange = (field: 'from' | 'to') => (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setUpdatedListing(prev => ({
      ...prev,
      dates: { ...prev.dates, [field]: value }
    }))
  }

  const handleSelectChange = (name: string) => (value: string) => {
    setUpdatedListing(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (loading) return;

    if (userData?.email !== listing.postedbyemail) {
      console.error("Unauthorized to update this listing")
      return
    }

    setLoading(true);

    const { data, error } = await supabase
      .from('listings')
      .update(updatedListing)
      .eq('id', listing.id)
      .select()
      .single()

    if (error) {
      console.error("Error updating listing:", error)
    } else {
      console.log("Listing updated successfully:", data)
      setListing(data)
      setLoading(false)
      setIsEditOpen(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold">{listing.title}</h1>
        {userData?.email === listing.postedbyemail && (
          <Button variant="outline" onClick={() => setIsEditOpen(true)}>
            <Pen className="w-4 h-4 mr-2" />
            Edit Listing
          </Button>
        )}
      </div>
      <div className="flex items-center text-muted-foreground mb-6">
        <MapPin className="w-4 h-4 mr-1" />
        <span>{listing.location}</span>
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
                {userData?.email === listing.postedbyemail && userData != null && (
                  <div className="flex flex-row gap-2 text-red-500 px-2 py-1 rounded-lg hover:cursor-pointer hover:bg-gray-100" onClick={() => setIsDeleteOpen(true)}>
                    <a>Delete</a>
                    <X className="h-4 w-4 font-bold text-red-500 pt-1"/>
                  </div>
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
              <Users className={`w-5 h-5 mr-2 ${listing.gender === "male" ? "fill-blue-500" : listing.gender === "female" ? "fill-pink-500" : ""}`}/>
              <span>Space for {listing.guests} guest(s){listing.gender && `: ${listing.gender}`}</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold">Available:</span>
              <span className="ml-2">{new Date(listing.dates.from).toLocaleDateString()} - {new Date(listing.dates.to).toLocaleDateString()}</span>
            </div>
            <Button className="w-full" onClick={() => setIsBookingOpen(true)}>Contact</Button>
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
              <GoogleMapsEmbed
                apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ""}
                height={200}
                width="100%"
                mode="place"
                loading="eager"
                q={listing.address}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {isEditOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className={`text-lg font-semibold ${leagueSpartan.className}`}>Edit Listing</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" name="title" value={updatedListing.title} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" name="description" value={updatedListing.description} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="price">Price (per month)</Label>
                  <Input id="price" name="price" type="number" value={updatedListing.price} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" name="location" value={updatedListing.location} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" name="address" value={updatedListing.address} onChange={handleInputChange} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="bedrooms">Bedrooms</Label>
                    <Input id="bedrooms" name="bedrooms" type="number" value={updatedListing.bedrooms} onChange={handleInputChange} />
                  </div>
                  <div>
                    <Label htmlFor="baths">Bathrooms</Label>
                    <Input id="baths" name="baths" type="number" value={updatedListing.baths} onChange={handleInputChange} />
                  </div>
                </div>
                <div>
                  <Label htmlFor="guests">Number of Guests</Label>
                  <Input id="guests" name="guests" type="number" value={updatedListing.guests} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="gender">Gender Preference</Label>
                  <Select name="gender" value={updatedListing.gender} onValueChange={handleSelectChange('gender')}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender preference" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="any">Any</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="dateFrom">Available From</Label>
                    <Input
                      id="dateFrom"
                      name="dateFrom"
                      type="date"
                      value={updatedListing.dates.from.split('T')[0]}
                      onChange={handleDateChange('from')}
                    />
                  </div>
                  <div>
                    <Label htmlFor="dateTo">Available To</Label>
                    <Input
                      id="dateTo"
                      name="dateTo"
                      type="date"
                      value={updatedListing.dates.to.split('T')[0]}
                      onChange={handleDateChange('to')}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="additionalcontact">Additional Contact Info</Label>
                  <Input id="additionalcontact" name="additionalcontact" value={updatedListing.additionalcontact || ''} onChange={handleInputChange} />
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                  <Button type="button" variant="outline" disabled={loading} onClick={() => setIsEditOpen(false)}>Cancel</Button>
                  <Button type="submit" disabled={loading}>Update Listing</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {isBookingOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className={`${leagueSpartan.className}`}>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`flex flex-col items-center justify-center p-6 ${leagueSpartan.className}`}>
                <div className="flex items-center justify-center p-6">
                  <Mail className="w-6 h-6 mr-2" />
                  <a href={`mailto:${listing.postedbyemail}`} className="text-lg font-medium hover:underline">
                    {listing.postedbyemail} 
                  </a>
                </div>
                {listing.additionalcontact && (
                  <div className="bg-gray-100 rounded-lg px-4 py-2">
                    or {listing.additionalcontact}
                  </div>
                )}
              </div>
              <div className="flex justify-end mt-4">
                <Button onClick={() => setIsBookingOpen(false)}>Close</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {isDeleteOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className={`font-bold text-red-500 ${leagueSpartan.className}`}>Are you sure you want to delete this listing?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`flex items-center justify-center p-6 ${leagueSpartan.className}`}>
                <Button onClick={handleDelete} variant="destructive" className="mr-2">Yes, I&apos;m sure</Button>
                <Button onClick={() => setIsDeleteOpen(false)} variant="outline">Cancel</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}