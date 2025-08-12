import { leagueSpartan } from "@/utils/fonts"
import SeoHead from "@/components/SeoHead"
import Header from "@/components/header"
import StudyStayFooter from "@/components/StudyStayFooter"

export default function AboutPage() {
  return (
    <div className={`min-h-screen ${leagueSpartan.className} flex flex-col bg-white text-xl`}>
      <SeoHead
        title="About Us | StudyStay"
        description="Learn more about StudyStay - the better way to sublet for students. Discover our mission, values, and commitment to making student housing easier."
        url="https://www.studystay.us/about"
      />
      
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About studystay</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Learn more about our mission to make student subletting easier, safer, and more accessible.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="w-full h-[800px] md:h-[1000px]">
            <iframe
              src="/about-us.pdf"
              className="w-full h-full border-0"
              title="About Us PDF"
            />
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Having trouble viewing the PDF? 
            <a 
              href="/about-us.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#004aad] hover:text-[#003d8f] underline ml-1"
            >
              Open in new tab
            </a>
          </p>
        </div>
      </main>
      
      <StudyStayFooter />
    </div>
  )
}
