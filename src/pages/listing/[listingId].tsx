import { createClient } from "@/utils/supabase/component"
import { leagueSpartan } from "@/utils/fonts"
import Header from "@/components/header"
import ExpandedListing from "@/components/ExpandedListing"
import type { ListingData } from "@/utils/tempData"
import SeoHead from "@/components/SeoHead"

export default function ListingPage({ listing }: { listing: ListingData | null }) {
  const imageUrl = listing?.images?.[0]
    ? `https://zinuafgdmiwpkvlixboz.supabase.co/storage/v1/render/image/public/uploadedimages/${listing.images[0].split("/").at(-1)}?width=1200&height=630&resize=cover`
    : "https://www.studystay.us/og-image.png";

  const pageUrl = listing?.id
    ? `https://www.studystay.us/listing/${listing.id}`
    : "https://www.studystay.us";

  return (
    <>
      <SeoHead
        title={listing?.title ?? "Listing not found | StudyStay"}
        description={listing?.description ?? "This listing may have been removed or is unavailable."}
        url={pageUrl}
        image={imageUrl}
      />
      <div className={`min-h-screen bg-white text-black ${leagueSpartan.className} text-xl overflow-hidden`}>
        <Header />
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
  );
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