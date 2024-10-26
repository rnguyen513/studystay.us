import ImageCarousel from './ImageCarousel'
import { Bookmark, ThumbsUp } from 'lucide-react'
import type { ListingData } from '@/utils/tempData'

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type ListingsArrayProps = {
    listings: ListingData[];
};

const Listing = ({ listing }: { listing: ListingData }) => {
    const [bookmarked, setBookmarked] = useState(false);

    const router = useRouter();

    const goToExpandedPage = () => {
        router.push(`/listing/${listing.id}`);
    }

    return (
        <div className="space-y-4 hover:cursor-pointer">
            <div className="relative">
                <ImageCarousel images={listing.images} />
                <button onClick={() => setBookmarked(!bookmarked)} className={`absolute top-2 right-2 text-white z-10`}>
                    <Bookmark className={`w-6 h-6 fill-${bookmarked ? "current" : "none"}`} />
                </button>
                <div className="absolute top-2 left-2 bg-white rounded-full px-2 py-1 text-xs font-semibold z-10">
                    Guest favorite
                </div>
            </div>
            <div onClick={goToExpandedPage} className="space-y-1">
                <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-base">{listing.location}</h3>
                    <div className="flex items-center hover:bg-gray-100 hover:cursor-pointer rounded-full px-2">
                        <span className="mr-1">{listing.rating}</span>
                        <ThumbsUp className="w-4 h-4 pb-1 fill-current text-black" />
                    </div>
                </div>
                <p className="text-gray-500 text-sm">{listing.views}</p>
                <p className="text-gray-500 text-sm">{listing.dates}</p>
                <div className="flex flex-row space-x-2 items-center">
                    <p className="font-semibold">${listing.price} <span className="font-normal">month</span></p>
                    {listing.extraCosts && listing.extraCosts?.map((cost, index) => (
                        <p key={index} className="text-gray-500 text-xs mt-1">+ {cost}</p>
                    ))}
                </div>
            </div>
        </div>
    );
};

const ListingsArray: React.FC<ListingsArrayProps> = ({ listings }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {listings.length > 0 ? (
                listings.map((listing, index) => (
                    <Listing listing={listing} key={index}/>
                ))
            ) : (
                <div>Nothing found...</div>
            )}
        </div>
    )
}

export default ListingsArray;