import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";

import { afacad } from "@/utils/fonts";
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
        <div className={`min-h-screen bg-white text-black ${afacad.className} text-xl`}>
            <Header/>

            <main className="container mx-auto px-4 py-8 ">
                <SearchBar/>
                <hr className="hidden md:flex mb-4"/>

                <div className="font-bold text-2xl mb-4">Results for: {searchQuery}</div>

                <Suspense fallback={<LoadingSkeleton/>}>
                {searchQuery ? (
                    <SearchResults searchQuery={searchQuery as string} date={date ? date : undefined}/>
                ) : (
                    <div>We didn&apos;t find anything for that...</div>
                )}
                </Suspense>
            </main>
        </div>
    );
}