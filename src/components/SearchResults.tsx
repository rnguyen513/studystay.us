import { useState, useEffect } from 'react';
import type {ListingData } from '@/utils/tempData';
import { useSearchParams } from "next/navigation";
import ListingsArray from '@/components/ListingsArray';
import LoadingSkeleton from '@/components/ListingsArrayLoadingSkeleton';

import { createClient } from '@/utils/supabase/component';
import type { User as SupabaseUser } from '@supabase/supabase-js';

type SearchResultsProps = {
    searchQuery: string,
    date?: string,
    home: boolean,
    setNumListings?: (numListings: number) => void,
    randomized?: boolean
}

const SearchResults: React.FC<SearchResultsProps> = ({ searchQuery, date, home, setNumListings, randomized}) => {
    const [listings, setListings] = useState<ListingData[]>([]);
    const [userData, setUserData] = useState<{user: SupabaseUser | null} | null>(null);
    const [loading, setLoading] = useState(true);
    let searchParams = useSearchParams();
    let typeOfProperty = (searchParams.get("typeofproperty") ?? "").toString();

    const supabase = createClient();
    useEffect(() => {
        const fetchListings = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const filters = Object.fromEntries(urlParams.entries());
            let query = supabase.from("listings").select();

            for (const [key, value] of Object.entries(filters)) {
                if (value !== "" && value !== undefined && value !== null && key != "location") {
                    if (key === "minPrice") query = query.gte("price", parseFloat(value));
                    else if (key === "maxPrice") query = query.lte("price", parseFloat(value));
                    else if (value === "true" || value === "false") query = query.eq(key, value === "true");
                    else if (key == "open_to_demographics") {
                        if (value != "Any") query = query.contains("open_to_demographics", [value]);
                    }
                    else query = query.eq(key, value);
                }
            }

            query = query.eq("available", true);

            const { data, error } = await query;

            if (error || !data) {
                console.log("Error fetching listings or no listings returned: ", error);
                setLoading(false);
                return;
            }

            setListings(randomized ? data.sort(() => Math.random() - 0.5) : data);
            if (setNumListings) setNumListings(data.length);
            setLoading(false);
        }
        fetchListings();

        const fetchUserData = async () => {
            const { data, error } = await supabase.auth.getUser();
            setUserData(data);
        }
        fetchUserData();
    }, [searchQuery, date, searchParams, typeOfProperty, supabase]);

    return (
        <>
            {loading ? (
                <LoadingSkeleton/>
            ) : listings.length > 0 ? (
                // <ListingsArray listings={listings} />
                <>
                    <div className={`font-bold text-2xl mb-4 ${home && "hidden"}`}>Results for: {searchQuery} ({listings.length})</div>
                    {/* <pre className="max-w-full text-sm">{listings && JSON.stringify(listings, null, 2)}</pre> */}
                    <ListingsArray listings={listings} user={userData?.user ?? undefined}/>
                </>
            ) : (
                <div>Nothing to see here...</div>
            )}
        </>
    );
}

export default SearchResults;