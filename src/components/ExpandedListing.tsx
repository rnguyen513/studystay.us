'use client'

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { MapPin, Users, Bed, Bath, Mail, Pen, X, Car, Dog, Accessibility, WashingMachine, Armchair, Linkedin, User as UserIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
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
import StudyStayFooter from "@/components/StudyStayFooter"
import Image from "next/image"
import Link from "next/link"

// import { depreciationStart } from "./ListingsArray"
// studystay depreciation: 0.85, starting from 0.05
// market depreciation: 0.6, starting from 0.5

export default function ExpandedListing({ listing: initialListing }: { listing: ListingData }) {
    const [listing, setListing] = useState(initialListing)
    const [isBookingOpen, setIsBookingOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [updatedListing, setUpdatedListing] = useState<ListingData>(listing)
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [posterProfile, setPosterProfile] = useState<null | {
        user_id: string
        first_name: string | null
        last_name: string | null
        profile_picture_url: string | null
        school: string | null
        major: string | null
        gender: string | null
        introduction: string | null
        linkedin_url?: string | null
    }>(null)
    const [loadingPoster, setLoadingPoster] = useState(false)

    const [anonymous_user_email, setAnonymous_user_email] = useState<string | null>(null);

    const supabase = createClient()
    const [userData, setUserData] = useState<User | null>(null)

    const router = useRouter()

    const depreciationStart = new Date(listing.created_at).getTime();
    const studystay_price = Math.max(Math.floor((listing.price * 0.1) * (0.85 ** Math.floor((Date.now() - depreciationStart) / 86_400_000))), 50);
    const market_price = Math.max(Math.floor((listing.price) * (0.9 ** (Math.floor((Date.now() - depreciationStart) / 86_400_000)))), 79);

    useEffect(() => {
        const fetchUserData = async () => {
            const { data } = await supabase.auth.getUser()
            setUserData(data.user)
        }
        fetchUserData()
    }, [supabase])

    // Fetch poster's public profile
    useEffect(() => {
        const fetchPoster = async () => {
            const posterUserId = (listing as any)?.postedby as string | undefined
            if (!posterUserId) return
            try {
                setLoadingPoster(true)
                const { data, error } = await supabase
                    .from('public_user_data')
                    .select('*')
                    .eq('user_id', posterUserId)
                    .single()
                if (!error && data) {
                    setPosterProfile(data as any)
                }
            } finally {
                setLoadingPoster(false)
            }
        }
        fetchPoster()
    }, [listing, supabase])

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

    const handleCheckboxChange = (name: string) => (checked: boolean) => {
        setUpdatedListing(prev => ({ ...prev, [name]: checked }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (loading) return;

        if (userData?.email !== listing.postedbyemail &&
            userData?.email != "amk3ef@virginia.edu" &&
            userData?.email != "uww9ws@virginia.edu") {
            setErrorMessage("Unauthorized to update this listing")
            return
        }

        if (updatedListing.price > listing.price) {
            setErrorMessage("Price can only be lowered, not increased.")
            return
        } else if (updatedListing.price < listing.price) {
            console.log("price reduced")
        }

        if (!updatedListing.price || updatedListing.price < 0) {
            setErrorMessage("Price is invalid!")
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
            setErrorMessage(error.message)
        } else {
            console.log("Listing updated successfully:", data)
            setListing(data)
            setLoading(false)
            setIsEditOpen(false)
        }
    }


    return (
        <div className="w-screen min-h-screen">
            <div className="container mx-auto px-4 py-8">
                {/* {userData?.email === listing.postedbyemail && <div className="flex flex-row justify-center gap-2 p-2 bg-green-200 font-bold rounded-lg hover:cursor-pointer hover:bg-gray-100 mb-2 mt-[-2rem]" onClick={async () => {
        const { error } = await supabase.from("sell_now_emails").insert([
            {
                price: studystay_price,
                email: userData?.email || "no email found??",
                listing_id: listing.id
            },
            ])
        if (!error) {
            alert("The StudyStay Team has been notified. You'll hear back soon.")
        }
    }}>
        <p>Sell to StudyStay for <a className="text-2xl">${studystay_price}</a>! It&apos;s not too late!</p>
    </div>} */}
                <div className="mb-6 flex justify-between items-center">
                    <h1 className="text-3xl font-bold">{listing.title}</h1>
                    {(userData?.email === listing.postedbyemail || ["amk3ef@virginia.edu", "uww9ws@virginia.edu"].includes(userData?.email ?? "")) && (
                        <Button variant="outline" onClick={() => setIsEditOpen(true)}>
                            <Pen className="w-4 h-4 mr-2" />
                            Edit Listing
                        </Button>
                    )}
                </div>
                <div className="flex items-center text-muted-foreground mb-6">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{listing.address}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                        <DynamicPropertyGallery images={listing.images} />
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex justify-between items-center">
                                <div className="flex flex-row space-x-3">
                                    {/* <span className={`text-2xl font-bold ${market_price != listing.price && "line-through"}`}>${listing.price} <span className="text-lg font-normal">/ month</span></span>
                {market_price != listing.price && <p className="text-red-400 font-black text-3xl">${market_price}</p>} */}
                                    <span className="text-2xl font-bold text-[#004aad]">${listing.price} <span className="text-lg font-normal">/ month</span></span>
                                </div>
                                <div className="flex gap-2">
                                    {userData?.email === listing.postedbyemail && userData != null && (
                                        <div className="flex flex-row gap-2 text-red-500 px-2 py-1 rounded-lg hover:cursor-pointer hover:bg-gray-100" onClick={() => setIsDeleteOpen(true)}>
                                            <a>Delete</a>
                                            <X className="h-4 w-4 font-bold text-red-500 pt-1" />
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
                                    <span>{listing.baths} baths {listing.sharedbathroom && <a className="text-gray-400 text-md">(shared)</a>}</span>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <Users className={`w-5 h-5 mr-2 ${listing.gender === "male" ? "fill-blue-500" : listing.gender === "female" ? "fill-pink-500" : ""}`} />
                                <span>Space for {listing.guests} guest(s){listing.gender && `: ${listing.gender}`}</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {listing.furnished && <Badge variant="outline"><Armchair className="w-4 h-4 mr-1" /> Furnished</Badge>}
                                {listing.pets_allowed && <Badge variant="outline"><Dog className="w-4 h-4 mr-1" /> Pets Allowed</Badge>}
                                {listing.car_parking_space && <Badge variant="outline"><Car className="w-4 h-4 mr-1" /> Parking</Badge>}
                                {listing.washer_and_dryer && <Badge variant="outline"><WashingMachine className="w-4 h-4 mr-1" /> Washer/Dryer</Badge>}
                                {listing.handicap_accessible && <Badge variant="outline"><Accessibility className="w-4 h-4 mr-1" /> Accessible</Badge>}
                            </div>
                            <div className="flex items-center">
                                <span className="font-semibold">Available:</span>
                                <span className="ml-2">{new Date(listing.dates.from).toLocaleDateString()} - {new Date(listing.dates.to).toLocaleDateString()}</span>
                            </div>
                            <div>
                                <span className="font-semibold">Semester:</span> {listing.available_semester} {listing.available_year}
                            </div>
                            <div>
                                <span className="font-semibold">Type:</span> {listing.typeOfProperty}
                            </div>
                            <Button className="w-full bg-[#004aad]" onClick={async () => {
                                if (userData?.email) {
                                    const { error } = await supabase.from("request_information").insert([
                                        {
                                            email: userData?.email || " ",
                                            price: listing.price,
                                            listing_id: listing.id
                                        },
                                    ])
                                    if (error) alert("Something went wrong with the database...oops")
                                }
                                setIsBookingOpen(true)
                            }}>Contact to buy</Button>
                        </CardContent>
                    </Card>
                </div>

                <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Main content area - spans 3 columns on large screens */}
                    <div className="lg:col-span-3 space-y-6">
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

                        {/* Location Card - Now in main content area with more space */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Location</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="aspect-video rounded-md overflow-hidden">
                                    <GoogleMapsEmbed
                                        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ""}
                                        height={400}
                                        width="100%"
                                        mode="place"
                                        loading="eager"
                                        q={listing.address + ", Charlottesville, VA, USA"}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right sidebar - spans 1 column, contains host info */}
                    <div className="space-y-6">
                        {/* Host Overview */}
                        <Card>
                            <CardHeader>
                                <CardTitle>About the host</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {loadingPoster ? (
                                    <div className="flex items-center space-x-3">
                                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#004aad]"></div>
                                        <span className="text-sm text-gray-600">Loading host...</span>
                                    </div>
                                ) : posterProfile ? (
                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-4">
                                            {posterProfile.profile_picture_url ? (
                                                <Image
                                                    src={posterProfile.profile_picture_url}
                                                    alt="Host avatar"
                                                    width={56}
                                                    height={56}
                                                    className="w-14 h-14 rounded-full object-cover border"
                                                />
                                            ) : (
                                                <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center">
                                                    <UserIcon className="w-7 h-7 text-gray-500" />
                                                </div>
                                            )}
                                            <div>
                                                <div className="text-lg font-semibold">
                                                    {(posterProfile.first_name || '') + ' ' + (posterProfile.last_name || '')}
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    {posterProfile.school}
                                                    {posterProfile.major ? ` • ${posterProfile.major}` : ''}
                                                </div>
                                            </div>
                                        </div>

                                        {posterProfile.introduction && (
                                            <p className="text-sm text-gray-700 leading-relaxed">
                                                {posterProfile.introduction.length > 180
                                                    ? posterProfile.introduction.slice(0, 177) + '...'
                                                    : posterProfile.introduction}
                                            </p>
                                        )}

                                        <div className="flex items-center justify-between">
                                            <Link
                                                href={`/profile/${posterProfile.user_id}`}
                                                className="text-[#004aad] hover:underline text-sm font-medium"
                                            >
                                                View full profile
                                            </Link>
                                            {posterProfile.linkedin_url && (
                                                <a
                                                    href={posterProfile.linkedin_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center text-sm text-[#004aad] hover:underline"
                                                >
                                                    <Linkedin className="w-4 h-4 mr-1" /> LinkedIn
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-600">Host profile is not available.</p>
                                )}
                            </CardContent>
                        </Card>
                    </div>
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
                                        {updatedListing.price != listing.price && <p className="text-sm text-red-400">New market price: ${Math.max(Math.floor((updatedListing.price) * (0.9 ** (Math.floor((Date.now() - depreciationStart) / 86_400_000)))), 79)}</p>}
                                    </div>
                                    <div>
                                        <Label htmlFor="location">University</Label>
                                        <Input id="location" name="location" value={updatedListing.location} onChange={handleInputChange} />
                                    </div>
                                    <div>
                                        <Label htmlFor="address">Address</Label>
                                        <Input id="address" name="address" value={updatedListing.address} onChange={handleInputChange} />
                                    </div>
                                    <div>
                                        <Label htmlFor="typeOfProperty">Type of Property</Label>
                                        <Input id="typeOfProperty" name="typeOfProperty" value={updatedListing.typeOfProperty} onChange={handleInputChange} />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="bedrooms">Bedrooms</Label>
                                            <Input id="bedrooms" name="bedrooms" type="number" value={updatedListing.bedrooms} onChange={handleInputChange} />
                                        </div>
                                        <div>
                                            <Label htmlFor="baths">Bathrooms</Label>
                                            <Input id="baths" name="baths" type="number" value={updatedListing.baths} onChange={handleInputChange} />
                                            <div className="flex items-center space-x-2 mt-2">
                                                <Checkbox
                                                    id="sharedbathroom"
                                                    checked={updatedListing.sharedbathroom}
                                                    onCheckedChange={handleCheckboxChange('sharedbathroom')}
                                                />
                                                <Label htmlFor="sharedbathroom">Shared Bathroom</Label>
                                            </div>
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
                                    {/* <div>
                  <Label htmlFor="additionalcontact">Additional Contact Info</Label>
                  <Input id="additionalcontact" name="additionalcontact" value={updatedListing.additionalcontact || ''} onChange={handleInputChange} />
                </div> */}
                                    <div>
                                        <Label htmlFor="available_semester">Available Semester</Label>
                                        <div className="grid grid-cols-4 gap-2">
                                            {["Fall", "Winter", "Spring", "Summer"].map((semester) => (
                                                <Button
                                                    id="available_semester"
                                                    name="available_semester"
                                                    key={semester}
                                                    variant="outline"
                                                    className={`w-full hover:bg-black hover:text-white ${updatedListing.available_semester === semester ? "bg-black text-white" : ""}`}
                                                    onClick={(e) => { e.preventDefault(); handleSelectChange("available_semester")(semester) }}
                                                >
                                                    {semester}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <Label htmlFor="available_year">Available Year</Label>
                                        <Input id="available_year" name="available_year" type="number" value={updatedListing.available_year || ''} onChange={handleInputChange} />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="furnished"
                                                checked={updatedListing.furnished}
                                                onCheckedChange={handleCheckboxChange('furnished')}
                                            />
                                            <Label htmlFor="furnished">Furnished</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="pets_allowed"
                                                checked={updatedListing.pets_allowed}
                                                onCheckedChange={handleCheckboxChange('pets_allowed')}
                                            />
                                            <Label htmlFor="pets_allowed">Pets Allowed</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="car_parking_space"
                                                checked={updatedListing.car_parking_space}
                                                onCheckedChange={handleCheckboxChange('car_parking_space')}
                                            />
                                            <Label htmlFor="car_parking_space">Car Parking Space</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="washer_and_dryer"
                                                checked={updatedListing.washer_and_dryer}
                                                onCheckedChange={handleCheckboxChange('washer_and_dryer')}
                                            />
                                            <Label htmlFor="washer_and_dryer">Washer and Dryer</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="handicap_accessible"
                                                checked={updatedListing.handicap_accessible}
                                                onCheckedChange={handleCheckboxChange('handicap_accessible')}
                                            />
                                            <Label htmlFor="handicap_accessible">Handicap Accessible</Label>
                                        </div>
                                    </div>

                                    <hr />

                                    {/* <div className="grid grid-cols-2 gap-4">
                  <p>Select all lessors you are open to:</p>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={updatedListing.open_to_demographics?.includes("Any") || (updatedListing.open_to_demographics && updatedListing.open_to_demographics.length >= 7)}
                      onCheckedChange={(checked) => setUpdatedListing(checked.valueOf() ? { ...updatedListing, open_to_demographics: ["International Students", "Transfer Students", "Traevling Nurses",
                      "Summer Stays", "Monthly Stays", "Winter Break", "Internships/Co-ops"] } : { ...updatedListing, open_to_demographics: [] })}
                    />
                    <Label htmlFor="Any">Any</Label>
                  </div>

                  {
                    ["International Students", "Transfer Students", "Traveling Nurses",
                      "Summer Stays", "Monthly Stays", "Winter Break", "Internships/Co-ops"].map((demographic) => (
                        <div className="flex items-center space-x-2" key={demographic}>
                          <Checkbox
                            checked={updatedListing.open_to_demographics?.includes(demographic)}
                            onCheckedChange={(checked) => setUpdatedListing(
                              checked.valueOf() ? { ...updatedListing, open_to_demographics: [...updatedListing.open_to_demographics ?? [], demographic] } : { ...updatedListing, open_to_demographics: updatedListing.open_to_demographics?.filter((item) => item !== demographic) })}
                          />
                          <Label htmlFor={demographic}>{demographic}</Label>
                        </div>
                      ))
                  }
                </div> */}

                                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                                    <div className="flex justify-end space-x-2 mt-4">
                                        <Button type="button" variant="outline" disabled={loading} onClick={() => { setIsEditOpen(false); setErrorMessage(null) }}>Cancel</Button>
                                        <Button type="submit" disabled={loading}>Update Listing</Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {isBookingOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
                        <Card className="w-full max-w-md rounded-xl shadow-lg">
                            <CardHeader className="relative">
                                <CardTitle className={`text-xl font-semibold text-center ${leagueSpartan.className}`}>
                                    Thanks for your interest!
                                </CardTitle>
                                <button onClick={() => setIsBookingOpen(false)} className="absolute left-5 top-5 text-red-400 font-bold">X</button>
                            </CardHeader>
                            <CardContent className={`space-y-6 ${leagueSpartan.className}`}>
                                <div className="text-center">
                                    <p className="text-md mb-2">The StudyStay team has been notified.</p>
                                    <p className="text-sm text-muted-foreground">For an immediate response, reach out to:</p>
                                    <div className="flex items-center justify-center mt-2">
                                        <Mail className="w-5 h-5 mr-2" />
                                        <a
                                            href="mailto:ryan@studystay.us"
                                            className="text-base font-medium text-blue-600 hover:underline"
                                        >
                                            ryan@studystay.us
                                        </a>
                                    </div>
                                    {listing.additionalcontact && (
                                        <div className="mt-4 text-sm text-gray-700 bg-gray-100 rounded-md px-3 py-2 inline-block">
                                            or {listing.additionalcontact}
                                        </div>
                                    )}
                                </div>

                                {!userData?.email && (
                                    <div className="space-y-2 text-sm text-gray-800">
                                        <Label htmlFor="anonEmail">Your email (so we can follow up):</Label>
                                        <Input
                                            id="anonEmail"
                                            type="email"
                                            required
                                            placeholder="john.doe@place.com"
                                            className={`w-full border ${anonymous_user_email === "" ? "border-red-500" : "border-gray-300"
                                                }`}
                                            value={anonymous_user_email || ""}
                                            onChange={(e) => setAnonymous_user_email(e.target.value)}
                                        />
                                        {anonymous_user_email === "" && (
                                            <p className="text-red-500 text-xs">Email is required.</p>
                                        )}
                                    </div>
                                )}

                                <div className="flex justify-end">
                                    <Button
                                        disabled={!userData?.email && !anonymous_user_email?.trim()}
                                        onClick={async () => {
                                            if (!userData?.email && !anonymous_user_email?.trim()) {
                                                return; // prevent sending if empty
                                            }
                                            if (!userData?.email) {
                                                const { error } = await supabase.from("request_information").insert([
                                                    {
                                                        email: anonymous_user_email?.trim() || "no email provided...",
                                                        price: market_price,
                                                        listing_id: listing.id,
                                                    },
                                                ]);
                                                if (!error) console.log("Successfully submitted anonymous email");
                                            }
                                            setIsBookingOpen(false);
                                        }}
                                    >
                                        {userData?.email ? "Close" : "Send"}
                                    </Button>
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
            <StudyStayFooter />
        </div>
    )
}