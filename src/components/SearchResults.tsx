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
    home: boolean
}

const SearchResults: React.FC<SearchResultsProps> = ({ searchQuery, date, home}) => {
    const [listings, setListings] = useState<ListingData[]>([]);
    const [userData, setUserData] = useState<{user: SupabaseUser | null} | null>(null);
    const [loading, setLoading] = useState(true);
    let searchParams = useSearchParams();
    let typeOfProperty = (searchParams.get("typeofproperty") ?? "").toString();

    const supabase = createClient();
    useEffect(() => {
        const fetchListings = async () => {
            const { data, error } = typeOfProperty != "" && typeOfProperty != undefined && typeOfProperty != null ? await supabase.from("listings").select().eq("typeOfProperty", typeOfProperty).eq("available", true) : await supabase.from("listings").select().eq("available", true);

            if (error || !data) {
                return console.log("Error fetching listings or no listings returned: ", error);
            }

            setListings(data);
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
                <div>No results found...</div>
            )}
        </>
    );
}

export default SearchResults;