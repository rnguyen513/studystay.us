import ImageCarousel from './ImageCarousel'
import { Heart, Star } from 'lucide-react'
import { ListingData } from '@/utils/tempData'

type ListingsArrayProps = {
    listings: ListingData[];
};

const ListingsArray: React.FC<ListingsArrayProps> = ({ listings}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {listings.map((listing, index) => (
                <div key={index} className="space-y-4">
                    <div className="relative">
                        <ImageCarousel images={listing.images} />
                        <button className="absolute top-2 right-2 text-white z-10">
                            <Heart className="w-6 h-6" />
                        </button>
                        <div className="absolute top-2 left-2 bg-white rounded-full px-2 py-1 text-xs font-semibold z-10">
                            Guest favorite
                        </div>
                    </div>
                    <div className="space-y-1">
                        <div className="flex justify-between items-center">
                            <h3 className="font-semibold text-base">{listing.location}</h3>
                            <div className="flex items-center">
                                <Star className="w-4 h-4 fill-current text-black mr-1" />
                                <span>{listing.rating}</span>
                            </div>
                        </div>
                        <p className="text-gray-500 text-sm">{listing.views}</p>
                        <p className="text-gray-500 text-sm">{listing.dates}</p>
                        <p className="font-semibold">${listing.price} <span className="font-normal">month</span></p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ListingsArray;