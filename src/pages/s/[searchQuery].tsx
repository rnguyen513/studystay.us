import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";

import { leagueSpartan } from "@/utils/fonts";
import Header from "@/components/header";
import SearchBar from "@/components/SearchBar";
import LoadingSkeleton from "@/components/ListingsArrayLoadingSkeleton";
import SearchResults from "@/components/SearchResults";

import { Suspense } from 'react';

export default function Page() {
    const router = useRouter();
    const { searchQuery } = router.query;
    const searchParams = useSearchParams();
    const date = searchParams.get("date");

    return (
        <div className={`min-h-screen bg-white text-black ${leagueSpartan.className} text-xl`}>
            <Header/>

            <main className="container mx-auto px-4 py-8 ">
                <SearchBar/>

                <Suspense fallback={<LoadingSkeleton/>}>
                    <SearchResults searchQuery={searchQuery as string} date={date ? date : undefined} home={false}/>
                </Suspense>
            </main>
        </div>
    );
}