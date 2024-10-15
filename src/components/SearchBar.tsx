import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

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
        <div className="flex items-center justify-center mb-8">
            <form onSubmit={handleSubmit} className="hidden md:flex items-center shadow-md rounded-full border max-w-5xl w-full">
                <div className="px-6 py-2 border-r flex-1">
                    <div className="text-xs font-bold">Where</div>
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
                    <div className="text-xs font-bold">When</div>
                        <input
                        type="date"
                        className="w-full outline-none text-sm"
                        value={date}
                        onChange={(e) => {setDate(e.target.value);console.log(e.target.value)}}
                        />
                </div>

                <button type="submit" className="bg-blue-600 text-white p-4 rounded-full hover:bg-blue-700 m-2">
                    <Search className="w-5 h-5" />
                </button>
            </form>
        </div>
    );
}

export default SearchBar;