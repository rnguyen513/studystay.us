import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";

import { leagueSpartan } from "@/utils/fonts";
import Header from "@/components/header";

export default function Page() {
    const router = useRouter();
    const { listingId } = router.query;
    const searchParams = useSearchParams();

    return (
        <div className={`min-h-screen bg-white text-black ${leagueSpartan.className} text-xl`}>
            <Header/>

            <main className="container mx-auto px-4 py-8 ">
                {listingId}
            </main>
        </div>
    );
}