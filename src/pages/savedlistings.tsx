import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import ListingsArray from "@/components/ListingsArray";
import type { ListingData } from "@/utils/tempData";
import { leagueSpartan } from "@/utils/fonts";
import Header from "@/components/header";

import { createClient } from "@/utils/supabase/component";
import type { User } from "@supabase/supabase-js";

const SavedListings = () => {
    const [userData, setUserData] = useState<User | null>(null);
    const [listingIds, setListingIds] = useState<string[]>([]);
    const [listings, setListings] = useState<ListingData[]>([]);
    const [loading, setLoading] = useState(true);

    const supabase = createClient();
    const router = useRouter();

    useEffect(() => {
        const fetchSavedListings = async () => {
            try {
                // Get the current user
                const { data: userResponse, error: userError } = await supabase.auth.getUser();
                if (userError) {
                    console.error("Error fetching user:", userError);
                    return;
                }
                
                setUserData(userResponse.user);

                // Redirect if user is not logged in
                if (!userResponse.user) {
                    // console.error("no user, aborting!");
                    return router.push("/in");
                }

                // Get saved listings for the user
                const { data: userDataResponse, error: userDataError } = await supabase
                    .from("users")
                    .select("savedlistings")
                    .eq("id", userResponse.user.id)
                    .single();

                if (userDataError) {
                    console.error("Error fetching saved listings:", userDataError);
                    return;
                }

                setListingIds(userDataResponse?.savedlistings || []);

                // Fetch details for each listing sequentially
                if (userDataResponse?.savedlistings) {
                    const listingDataArray = await Promise.all(
                        userDataResponse?.savedlistings.map(async (id: string) => {
                            const { data: listingData, error: listingError } = await supabase
                                .from("listings")
                                .select("*")
                                .eq("id", id)
                                .single();
    
                            if (listingError) {
                                console.error(`Error fetching listing with id ${id}:`, listingError);
                                return null;
                            }
                            return listingData;
                        }) || []
                    );

                    // Filter out any null values in case of errors
                    setListings(listingDataArray.filter((listing) => listing !== null) as ListingData[]);
                }
            } catch (error) {
                console.error("Unexpected error:", error);
                router.push("/in");
            } finally {
                setLoading(false);
            }
        };

        fetchSavedListings();
    }, [supabase, router]);

    return (
        <div className={`min-h-screen bg-white text-black ${leagueSpartan.className} text-xl overflow-hidden`}>

        <Header/>
  
        <main className="container mx-auto px-4 py-8">
            <div className="font-bold text-3xl mb-8">My saved listings</div>
            {loading ? (
                <div>Loading...</div>
            ) : listings.length > 0 ? (
                <ListingsArray listings={listings} user={userData ?? undefined}/>
            ) : (
                <div>Uh oh... nothing here</div>
            )}
        </main>
        </div>
    )
};

export default SavedListings;
