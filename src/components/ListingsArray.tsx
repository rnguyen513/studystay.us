import ImageCarousel from './ImageCarousel';
import { Bookmark, UserRound } from 'lucide-react';
import type { ListingData } from '@/utils/tempData';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/component';
import type { User } from '@supabase/supabase-js';
import AuthPopup from '@/components/AuthPopup';

type ListingsArrayProps = {
    listings: ListingData[],
    user?: User
};

// export const depreciationStart = new Date("Tue Apr 29 2025").getTime();

const Listing = ({ listing, bookmarks, toggleBookmark, user }: { listing: ListingData, bookmarks: string[], toggleBookmark: (id: string) => void, user?: User }) => {
    const router = useRouter();
    const supabase = createClient();

    const depreciationStart = new Date(listing.created_at).getTime();
    const studystay_price = Math.max(Math.floor((listing.price*0.1)*(0.85**Math.floor((Date.now()-depreciationStart)/86_400_000))), 50);
    const market_price = Math.max(Math.floor((listing.price)*(0.9**(Math.floor((Date.now() - depreciationStart)/86_400_000)))), 79);

    const goToExpandedPage = () => {
        router.push(`/listing/${listing.id}`);
    };

    return (
        <div onClick={goToExpandedPage} className="space-y-4 hover:cursor-pointer">
            <div className="relative">
                <ImageCarousel images={listing.images} />
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleBookmark(listing.id);
                    }}
                    className="absolute top-2 right-2 text-white z-10"
                >
                    <Bookmark className={`w-6 h-6 fill-${bookmarks.includes(listing.id) ? "current" : "none"}`} />
                </button>
                {/* <div className="absolute top-2 left-2 bg-white rounded-full px-2 py-1 text-xs font-semibold z-10">
                    Favorite
                </div> */}
                {/* {user?.email == listing.postedbyemail && <div onClick={async ()=> {
                    const { error } = await supabase.from("sell_now_emails").insert([
                        {
                            price: studystay_price,
                            email: user?.email || "no email found??",
                            listing_id: listing.id
                        },
                        ])
                    if (!error) {
                        alert("The StudyStay Team has been notified. You'll hear back soon.")
                    }
                }} className="absolute top-2 left-20 bg-green-200 rounded-full px-2 py-1 text-xs font-semibold z-10">
                    Sell to StudyStay (<a className="text-sm">${studystay_price}</a>)
                </div>} */}
            </div>
            <div className="space-y-1">
                <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-base">{listing.title}</h3>
                    <div className="flex items-center px-2">
                        <span className="mr-1">{listing.bedrooms}</span>
                        <UserRound className="w-4 h-4 pb-1 fill-current text-black" />
                    </div>
                </div>
                <p className="text-gray-500 text-sm">{listing.views}</p>
                <p className="text-gray-500 text-sm">
                    {new Date(listing.dates.from).toDateString().substring(3)} - {new Date(listing.dates.to).toDateString().substring(3)}
                </p>
                <div className="flex flex-row space-x-2 items-center text-[#004aad]">
                    {/* <p className={`font-semibold ${market_price != listing.price && "line-through"}`}>${listing.price} <span className="font-normal">month</span></p>
                    {market_price != listing.price && <p className="text-red-400 font-black">${market_price}</p>} */}
                    <p className={`font-semibold`}>${listing.price} <span className="font-normal">month</span></p>
                    {/* {listing.extraCosts?.map((cost, index) => (
                        <p key={index} className="text-gray-500 text-xs mt-1">+ {cost}</p>
                    ))} */}
                </div>
            </div>
        </div>
    );
};

const ListingsArray: React.FC<ListingsArrayProps> = ({ listings, user }) => {
    const [showAuthPopup, setShowAuthPopup] = useState(false);
    const [bookmarkedListings, setBookmarkedListings] = useState<string[]>([]);
    const supabase = createClient();

    // Fetch bookmarks on mount
    useEffect(() => {
        const fetchBookmarks = async () => {
            if (user) {
                const { data, error } = await supabase
                    .from("users")
                    .select("savedlistings")
                    .eq("id", user.id)
                    .single();

                if (error) {
                    console.error("Error fetching bookmarks:", error.message);
                } else if (data) {
                    const userBookmarks = data.savedlistings || [];
                    setBookmarkedListings(userBookmarks);
                }
            }
        };
        fetchBookmarks();
    }, [user, supabase]);

    // Update bookmark in both state and database
    const toggleBookmark = useCallback(
        async (listingId: string) => {
            if (!user) {
                setShowAuthPopup(true);
                return;
            }

            const updatedBookmarks = bookmarkedListings.includes(listingId)
                ? bookmarkedListings.filter(id => id !== listingId)
                : [...bookmarkedListings, listingId];

            setBookmarkedListings(updatedBookmarks);

            if (user) {
                const { error } = await supabase
                    .from("users")
                    .update({ savedlistings: updatedBookmarks })
                    .eq("id", user.id);

                if (error) {
                    console.error("Error updating bookmarks:", error.message);
                    // Optionally: Roll back the local update on error
                }
            }
        },
        [bookmarkedListings, user, supabase]
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {listings.length > 0 ? (
                listings.map((listing, index) => (
                    <Listing 
                        key={index}
                        listing={listing}
                        bookmarks={bookmarkedListings}
                        toggleBookmark={toggleBookmark}
                        user={user}
                    />
                ))
            ) : (
                <div>Nothing found...</div>
            )}
            {showAuthPopup && <AuthPopup onClose={() => setShowAuthPopup(false)}/>}
        </div>
    );
};

export default ListingsArray;
