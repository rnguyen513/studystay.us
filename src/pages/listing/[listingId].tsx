import { createClient } from "@/utils/supabase/component"
import { leagueSpartan } from "@/utils/fonts"
import Header from "@/components/header"
import ExpandedListing from "@/components/ExpandedListing"
import type { ListingData } from "@/utils/tempData"

import Head from "next/head"

export default function ListingPage({ listing }: { listing: ListingData | null}) {
  return (
    <>
      <Head>
        <title>{listing?.title}</title>
        <meta name="description" content={listing?.description ?? "The better way to sublet"}/>
        <meta property="og:title" content={listing?.title ?? "Listing unavailable"}/>
        <meta property="og:description" content={listing?.description ?? "Listing unavailable"}/>
        <meta property="og:image" content={`https://zinuafgdmiwpkvlixboz.supabase.co/storage/v1/render/image/public/uploadedimages/${listing?.images[0].split("/").at(-1)}?width=1200&height=630&resize=cover`}/>
        <meta property="og:url" content={`https://studystay.us/listing/${listing?.id}}`}/>
        <meta property="og:type" content="website"/>
      </Head>
      <div className={`min-h-screen bg-white text-black ${leagueSpartan.className} text-xl overflow-hidden`}>
        <Header/>
        <main className="container mx-auto px-4 py-8">
          {false ? (
            <p className="text-center text-xl">Loading...</p>
          ) : listing ? (
            <ExpandedListing listing={listing} />
          ) : (
            <p className="text-center text-xl">Listing not found</p>
          )}
        </main>
      </div>
    </>
  )
}

export async function getServerSideProps(context: any) {
  const { listingId } = context.query;
  const supabase = createClient();

  try {
    if (!listingId || typeof listingId !== "string") {
      return { props: { listing: null } };
    }

    // Fetch listing data
    const { data, error } = await supabase
      .from("listings")
      .select()
      .eq("id", listingId)
      .single();

    if (error || !data) {
      console.error("Error fetching listing:", error);
      return { props: { listing: null } };
    }

    return {
      props: { listing: data }, // Pass listing data to the page
    };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { props: { listing: null } };
  }
}