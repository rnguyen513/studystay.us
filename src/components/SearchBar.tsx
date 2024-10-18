import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { categoryIcons } from "@/utils/tempData";

const SearchBar = () => {
    const [destination, setDestination] = useState("");
    const [date, setDate] = useState("");

    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const searchQuery = encodeURIComponent(destination)
        router.push(`/s/${searchQuery}?date=${date}`)
    }

    return (
        <>
            <div className="flex items-center justify-center mb-8">
                <form onSubmit={handleSubmit} className="hidden md:flex items-center shadow-md rounded-full border max-w-5xl w-full">
                    <div className="px-6 py-2 border-r flex-1">
                        <div className="text-sm">Campus</div>
                        <input
                        type="text"
                        placeholder="Search destinations"
                        className="w-full outline-none text-sm"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        required
                        />
                    </div>

                    <div className="px-6 py-2 flex-1">
                        <div className="text-sm">When</div>
                            <input
                            type="date"
                            className="w-full outline-none text-sm"
                            value={date}
                            onChange={(e) => {setDate(e.target.value);console.log(e.target.value)}}
                            />
                    </div>

                    <button type="submit" className="bg-[#004aad] text-white p-4 rounded-full hover:bg-blue-700 m-2">
                        <Search className="w-5 h-5" />
                    </button>
                </form>
            </div>
            <hr className="hidden md:flex mb-8"/>


            {/*subheader*/}
            <div className="flex items-start justify-between content-center">
            <div className="space-x-4 hidden md:flex">
                <button className="flex items-center space-x-2 border rounded-lg px-4 py-2 whitespace-nowrap hover:bg-gray-100 hover:border-black">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <span className="text-sm font-semibold">Filters</span>
                </button>
                {/* <div className="flex items-center space-x-2 border rounded-lg px-4 py-2">
                <span className="text-sm whitespace-nowrap">Display total before taxes</span>
                <button
                    className={`w-12 h-6 rounded-full p-1 ${showTotalBeforeTaxes ? 'bg-black' : 'bg-gray-300'}`}
                    onClick={() => setShowTotalBeforeTaxes(!showTotalBeforeTaxes)}
                >
                    <div className={`w-4 h-4 rounded-full bg-white transform transition-transform ${showTotalBeforeTaxes ? 'translate-x-6' : ''}`} />
                </button>
                </div> */}
            </div>
            <div className="relative flex-grow overflow-hidden mr-4">
                <div className="flex space-x-8 overflow-x-auto pb-4 px-4 md:px-8 categories-scroll">
                {categoryIcons.map((label, index) => (
                    <button key={index} className={`flex flex-col items-center space-y-2 ${index === 0 ? 'text-black border-b-2 border-black' : 'text-gray-500'}`}>
                    <img src={label.thumbnail} alt={label.text} className="w-6 h-6" />
                    <span className="text-xs whitespace-nowrap">{label.text}</span>
                    </button>
                ))}
                    </div>
                    {/* <div className="absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-white to-transparent"></div>
                    <div className="absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-white to-transparent"></div> */}
                </div>
            </div>
        </>
    );
}

export default SearchBar;