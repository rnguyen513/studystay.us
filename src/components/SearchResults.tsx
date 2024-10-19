import { useState, useEffect } from 'react';
import { ListingData } from '@/utils/tempData';
import { useSearchParams } from "next/navigation";
import ListingsArray from '@/components/ListingsArray';
import LoadingSkeleton from '@/components/ListingsArrayLoadingSkeleton';

type SearchResultsProps = {
    searchQuery: string,
    date?: string
}

const SearchResults: React.FC<SearchResultsProps> = ({ searchQuery, date}) => {
    const [listings, setListings] = useState<ListingData[]>([]);
    const [loading, setLoading] = useState(true);
    var searchParams = useSearchParams();

    var typeOfProperty = searchParams.get("typeofproperty") ?? "";

    useEffect(() => {
        console.log("type of property sent to server: " + typeOfProperty);
        if (typeOfProperty != "" && typeOfProperty != undefined && typeOfProperty != null) {
            fetch("/api/firestoreRequest", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    collection: "listings",
                    attribute: "typeOfProperty",
                    filterValue: typeOfProperty,
                    typeOfRequest: "filterSearch"
                })
            }).then(res => res.json()).then(data => {
                console.log("data:", data);
                setListings(data);
                setLoading(false);
            });
        }
        else {
            fetch("/api/firestoreRequest").then(res => res.json()).then(data => {
                console.log("data:", data);
                setListings(data);
                setLoading(false);
            });
        }
    }, [searchQuery, date, searchParams]);

    return (
        <>
            {loading ? (
                <LoadingSkeleton/>
            ) : listings.length > 0 ? (
                <ListingsArray listings={listings} />
            ) : (
                <div>No results found...</div>
            )}
        </>
    );
}

export default SearchResults;