import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";

import { leagueSpartan } from "@/utils/fonts";
import Header from "@/components/header";
import Image from "next/image"
import { Heart, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import DynamicPropertyGallery from "@/components/DynamicPropertyGallery";

import { useState, useEffect } from "react";
import { ListingData } from "@/utils/tempData";

import { createClient } from "@/utils/supabase/component";

export default function Page() {
    const router = useRouter();
    const { listingId } = router.query;
    // const searchParams = useSearchParams();

    const [loading, setLoading] = useState(true);
    const [listing, setListing] = useState({} as ListingData);

    // useEffect(() => {
    //     try {
    //         fetch("/api/misc/getListingById", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify({
    //                 listingId: listingId
    //             })
    //         }).then(res => res.json()).then(data => {
    //             if (data.listing == null) return;
    //             console.log(data.listing[0]);
    //             setListing(data.listing[0] ?? {} as ListingData);
    //         })
    //     } catch (error) {
    //         console.log("something went wrong: " + error);
    //     }
    //     setLoading(false);
    // }, [listingId]);

    const supabase = createClient();
    useEffect(() => {
        try {
            const fetchListing = async () => {
                const { data, error } = await supabase.from("listings").select().eq("id", listingId);

                if (error || !data) {
                    return console.log("Error fetching listings or no listings returned: ", error);
                }

                setListing(data[0] ?? {} as ListingData);
                setLoading(false);
            }
            fetchListing();
        } catch (error) {
            console.log("something went wrong: " + error);
        }
    }, [listingId]);

    return (
        <div className={`min-h-screen bg-white text-black ${leagueSpartan.className} text-xl`}>
            <Header/>

            <main className="container mx-auto px-4 py-8 ">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h1 className="text-2xl font-bold">{listing.title}</h1>
                            <div className="flex gap-2">
                                <Button variant="outline" size="icon">
                                    <Share2 className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="icon">
                                    <Heart className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                        <div className="mb-4">
                            <DynamicPropertyGallery images={listing.images}/>
                        </div>
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h2 className="text-xl font-semibold mb-2">{listing.typeOfProperty}</h2>
                                <p className="text-gray-600">{listing.bedrooms} bedrooms · {listing.baths} baths</p>
                            </div>
                            <div className="text-right">
                                <p className="text-2xl font-bold">${listing.price} <span className="text-lg font-normal">month</span></p>
                            </div>
                        </div>
                        <div className="flex flex-row">
                            <Card>
                                <CardContent className="p-4">
                                    <div>
                                        {listing.description}
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-4">
                                    <div className="">
                                        <div>
                                            <p className="font-semibold mb-2">Available starting</p>
                                            <p>{listing.dates}</p>
                                        </div>
                                        <div className="col-span-2">
                                            <p className="font-semibold mb-2">Guests</p>
                                            <p>{listing.guests}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}