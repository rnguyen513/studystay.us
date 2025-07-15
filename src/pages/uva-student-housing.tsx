import SeoHead from "@/components/SeoHead";
import Link from "next/link";

export default function UVAStudentHousing() {
  return (
    <>
      <SeoHead
        title="UVA Student Housing Options | StudyStay"
        description="Explore short-term student housing near UVA with StudyStay. Find verified sublets, roommate matches, and convenient listings tailored to University of Virginia students."
        url="https://www.studystay.us/uva-student-housing"
      />
      <main className="container mx-auto px-6 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-6">Student Housing Near UVA</h1>
        <p className="mb-6 text-lg leading-relaxed">
          Finding temporary student housing near UVA can be overwhelming. StudyStay simplifies this by connecting students with trusted sublets and flexible lease options to fit your academic calendar.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Features of StudyStay Housing</h2>
        <ul className="list-disc list-inside mb-6 space-y-2 text-gray-700">
          <li>Verified student listings to ensure safety</li>
          <li>Flexible durations: semester, summer, or year-round</li>
          <li>Search filters by location, price, and amenities</li>
          <li>Secure payment and documentation process</li>
        </ul>

        <p>
          Browse our <Link href="/in" className="text-blue-600 underline">current listings</Link> to find your next home near UVA.
        </p>
      </main>
    </>
  );
}
