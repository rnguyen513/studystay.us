import { useState, useEffect } from 'react';
import { ListingData } from '@/utils/tempData';
import ListingsArray from '@/components/ListingsArray';
import LoadingSkeleton from '@/components/ListingsArrayLoadingSkeleton';

type SearchResultsProps = {
    searchQuery: string,
    date?: string
}

const SearchResults: React.FC<SearchResultsProps> = ({ searchQuery, date}) => {
    const [listings, setListings] = useState<ListingData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (searchQuery) {
            fetch("/api/firestoreRequest").then(res => res.json()).then(data => {
                console.log("data:", data);
                setListings(data);
                setLoading(false);
            });
        }
    }, [searchQuery, date]);

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