import SeoHead from "@/components/SeoHead";
import Link from "next/link";

export default function CharlottesvilleSublets() {
  return (
    <>
      <SeoHead
        title="Charlottesville Sublets for Students | StudyStay"
        description="Find verified student sublets in Charlottesville near UVA. Safe, secure, and easy-to-use listings designed for University of Virginia students."
        url="https://www.studystay.us/charlottesville-sublets"
      />
      <main className="container mx-auto px-6 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-6">Charlottesville Sublets for Students</h1>
        <p className="mb-6 text-lg leading-relaxed">
          If you&apos;re a University of Virginia student looking for a short-term housing solution, you&apos;re in the right place. StudyStay offers verified sublets all around Charlottesville, making it easier than ever to find a safe, affordable spot near campus.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Why Choose Sublets in Charlottesville?</h2>
        <ul className="list-disc list-inside mb-6 space-y-2 text-gray-700">
          <li>Convenient access to UVA campus and local amenities</li>
          <li>Flexible lease terms perfect for study abroad or internships</li>
          <li>Verified listings reduce risk of scams</li>
          <li>Connect directly with student hosts for a smooth process</li>
        </ul>

        <p className="mb-8">
          Start browsing available listings now, or <Link href="/in" className="text-blue-600 underline">post your own sublet</Link> if you&apos;e looking to rent out your space.
        </p>
      </main>
    </>
  );
}
