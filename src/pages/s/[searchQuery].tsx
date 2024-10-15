import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";

import { afacad } from "@/utils/fonts";
import Header from "@/components/header";
import SearchBar from "@/components/SearchBar";
import ListingsArray from "@/components/ListingsArray";
import { ListingData } from "@/utils/tempData";

import { useState, useEffect } from 'react';

export default function Page() {
    const router = useRouter();
    const { searchQuery } = router.query;
    const searchParams = useSearchParams();
    const date = searchParams.get("date");

    const [listings, setListings] = useState<ListingData[]>([]);

    useEffect(() => {
        if (searchQuery) {
            fetch("/api/firestoreRequest").then(res => res.json()).then(data => {
                console.log("data:", data);
                setListings(data);
            });
        }
    }, [searchQuery, date]);

    return (
        <div className={`min-h-screen bg-white text-black ${afacad.className} text-xl`}>
            <Header/>

            <main className="container mx-auto px-4 py-8 ">
                <SearchBar/>
                <hr className="hidden md:flex mb-8"/>

                <ListingsArray listings={listings ? listings : [{
                    location: "New York, NY",
                    rating: 4.5,
                    views: "Mountain and lake views",
                    dates: "Oct 20 - 25",
                    price: 900,
                    lat: 37.0024,
                    lng: -79.6397,
                    images: [
                        "https://a0.muscache.com/im/pictures/miso/Hosting-892669485442312919/original/d6226d33-5397-43b6-8806-9c9f2ffdacef.jpeg?im_w=720",
                        "https://a0.muscache.com/im/pictures/miso/Hosting-892669485442312919/original/d051d89a-be7d-47ac-b368-21e9a6b3e4ec.jpeg?im_w=720",
                        "https://a0.muscache.com/im/pictures/miso/Hosting-892669485442312919/original/bc78c584-9b93-4eaf-be31-7c35aeca9f88.jpeg?im_w=720"
                    ]
                }]}/>
            </main>
        </div>
    );
}