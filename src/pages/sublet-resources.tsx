import SeoHead from "@/components/SeoHead";

export default function SubletResources() {
  return (
    <>
      <SeoHead
        title="Student Sublet Resources | StudyStay"
        description="Helpful tips, guides, and resources for students subletting near UVA. Learn how to avoid scams, understand lease terms, and find the perfect sublet."
        url="https://www.studystay.us/sublet-resources"
      />
      <main className="container mx-auto px-6 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-6">Student Sublet Resources</h1>
        <p className="mb-6 text-lg leading-relaxed">
          Subletting can be tricky, but we’re here to help. Our resources guide you through finding safe listings, understanding your lease, and protecting yourself from scams.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Tips for a Successful Sublet</h2>
        <ul className="list-disc list-inside mb-6 space-y-2 text-gray-700">
          <li>Always verify the identity of your landlord or sublessor</li>
          <li>Read your lease carefully before signing</li>
          <li>Never send money without a signed agreement</li>
          <li>Use secure payment methods through trusted platforms</li>
          <li>Visit the property in person or request a video tour</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">Additional Resources</h2>
        <ul className="list-disc list-inside mb-6 space-y-2 text-gray-700">
          <li><a href="https://housing.virginia.edu/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">UVA Housing Office</a></li>
          <li><a href="https://www.uva.edu/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">University of Virginia</a></li>
          <li><a href="https://www.studentlegalservices.virginia.edu/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Student Legal Services</a></li>
        </ul>
      </main>
    </>
  );
}
