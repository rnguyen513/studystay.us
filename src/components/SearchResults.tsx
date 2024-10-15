import { useState, useEffect } from 'react';
import { ListingData } from '@/utils/tempData';
import ListingsArray from '@/components/ListingsArray';

type SearchResultsProps = {
    searchQuery: string,
    date?: string
}

const SearchResults: React.FC<SearchResultsProps> = ({ searchQuery, date}) => {
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
        <>
            {listings.length > 0 ? (
                <ListingsArray listings={listings}/>
            ) : (
                <div className="font-bold text-2xl">No results. Try again...</div>
            )}
        </>
    );
}

export default SearchResults;