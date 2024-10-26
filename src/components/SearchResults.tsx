import { useState, useEffect } from 'react';
import type {ListingData } from '@/utils/tempData';
import { useSearchParams } from "next/navigation";
import ListingsArray from '@/components/ListingsArray';
import LoadingSkeleton from '@/components/ListingsArrayLoadingSkeleton';

import { createClient } from '@/utils/supabase/component';

type SearchResultsProps = {
    searchQuery: string,
    date?: string,
    home: boolean
}

const SearchResults: React.FC<SearchResultsProps> = ({ searchQuery, date, home}) => {
    const [listings, setListings] = useState<ListingData[]>([]);
    // const [listings, setListings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    let searchParams = useSearchParams();
    let typeOfProperty = (searchParams.get("typeofproperty") ?? "").toString();

    // useEffect(() => {
    //     console.log("type of property sent to server: " + typeOfProperty);
    //     if (typeOfProperty != "" && typeOfProperty != undefined && typeOfProperty != null) {
    //         fetch("/api/firestoreRequest", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify({
    //                 collection: "listings",
    //                 attribute: "typeOfProperty",
    //                 filterValue: typeOfProperty,
    //                 typeOfRequest: "filterSearch"
    //             })
    //         }).then(res => res.json()).then(data => {
    //             console.log("data:", data);
    //             setListings(data);
    //             setLoading(false);
    //         });
    //     }
    //     else {
    //         fetch("/api/firestoreRequest").then(res => res.json()).then(data => {
    //             console.log("data:", data);
    //             setListings(data);
    //             setLoading(false);
    //         });
    //     }
    // }, [searchQuery, date, searchParams]);

    const supabase = createClient();
    useEffect(() => {
        const fetchListings = async () => {
            const { data, error } = typeOfProperty != "" && typeOfProperty != undefined && typeOfProperty != null ? await supabase.from("listings").select().eq("typeOfProperty", typeOfProperty) : await supabase.from("listings").select();

            if (error || !data) {
                return console.log("Error fetching listings or no listings returned: ", error);
            }

            setListings(data);
            setLoading(false);
        }
        fetchListings();
    }, [searchQuery, date, searchParams]);

    return (
        <>
            {loading ? (
                <LoadingSkeleton/>
            ) : listings.length > 0 ? (
                // <ListingsArray listings={listings} />
                <>
                    <div className={`font-bold text-2xl mb-4 ${home && "hidden"}`}>Results for: {searchQuery} ({listings.length})</div>
                    {/* <pre className="max-w-full text-sm">{listings && JSON.stringify(listings, null, 2)}</pre> */}
                    <ListingsArray listings={listings}/>
                </>
            ) : (
                <div>No results found...</div>
            )}
        </>
    );
}

export default SearchResults;