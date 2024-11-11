import { useState } from "react";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import { Search, Menu } from "lucide-react";
import { categoryIcons } from "@/utils/tempData";

import { useEffect } from "react";
import Image from "next/image";

const SearchBar = () => {
    const [destination, setDestination] = useState("");
    const [date, setDate] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const router = useRouter();
    const searchParams = useSearchParams();
    const [typeOfProperty, setTypeOfProperty] = useState(searchParams.get("typeofproperty") ?? "");

    useEffect(() => {
        setTypeOfProperty(searchParams.get("typeofproperty") ?? "");
    }, [searchParams]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const searchQuery = encodeURIComponent(destination)
        
        if (typeOfProperty != "" && typeOfProperty != undefined && typeOfProperty != null) {
            router.push(`/s/${searchQuery}?date=${date}&typeofproperty=${typeOfProperty}`);
        } else {
            router.push(`/s/${searchQuery}?date=${date}`);
        }
    }

    return (
        <>
            <div className="flex items-center justify-center mb-8">
                {/* Mobile menu button */}
                <button 
                    className="md:hidden p-2 rounded-full border mr-4"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <Menu className="w-5 h-5" />
                </button>

                {/* Desktop search form */}
                <form onSubmit={handleSubmit} className="hidden md:flex items-center shadow-md rounded-full border max-w-5xl w-full">
                    <div className="px-6 py-2 border-r flex-1">
                        <div className="text-sm">Campus</div>
                        <input
                        type="text"
                        placeholder="Search campuses"
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

                {/* Mobile search form */}
                <form onSubmit={handleSubmit} className="md:hidden flex items-center shadow-md rounded-full border flex-1">
                    <div className="px-4 py-2 flex-1">
                        <input
                        type="text"
                        placeholder="Search campuses"
                        className="w-full outline-none text-sm"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        required
                        />
                    </div>
                    <button type="submit" className="bg-[#004aad] text-white p-2 rounded-full hover:bg-blue-700 m-1">
                        <Search className="w-4 h-4" />
                    </button>
                </form>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="md:hidden mb-4">
                    <div className="mb-4">
                        <div className="text-sm mb-1">When</div>
                        <input
                            type="date"
                            className="w-full outline-none text-sm border rounded p-2"
                            value={date}
                            onChange={(e) => {setDate(e.target.value);console.log(e.target.value)}}
                        />
                    </div>
                    <div className="space-x-4 flex md:hidden hover:cursor-default opacity-50 text-gray-500">
                        <button className="flex items-center space-x-2 border rounded-lg px-4 py-2 whitespace-nowrap hover:cursor-default">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                            </svg>
                            <span className="text-sm font-semibold">Filters</span>
                        </button>
                    </div>
                </div>
            )}

            <hr className="hidden md:flex mb-8"/>

            {/*subheader*/}
            <div className="flex items-start justify-between content-center">
            <div className="space-x-4 hidden md:flex hover:cursor-default opacity-50 text-gray-500">
                <button className="flex items-center space-x-2 border rounded-lg px-4 py-2 whitespace-nowrap hover:cursor-default">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <span className="text-sm font-semibold">Filters</span>
                </button>
            </div>
            <div className="relative flex-grow overflow-hidden mr-4">
                <div className="flex space-x-8 overflow-x-auto pb-4 px-4 md:px-8 categories-scroll">
                {categoryIcons.map((label, index) => (
                    <button onClick={() => {
                        router.query.typeofproperty = label.text == typeOfProperty ? "" : label.text; router.push(router);
                    }
                        } key={index} className={`flex flex-col items-center space-y-2 border-b-2 ${label.text == typeOfProperty ? 'text-black border-black' : 'border-transparent text-gray-500'}`}>
                        <img src={label.thumbnail} alt={label.text} className="w-6 h-6" />
                        <span className="text-xs whitespace-nowrap">{label.text}</span>
                    </button>
                ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default SearchBar;