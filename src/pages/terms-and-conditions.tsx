import Header from "@/components/header";
import { leagueSpartan } from "@/utils/fonts";
import StudyStayFooter from "@/components/StudyStayFooter";

const TermsAndConditions = () => {
  return (
    <div
      className={`min-h-screen bg-white text-black ${leagueSpartan.className} text-xl overflow-hidden flex flex-col`}
    >
      <Header />
      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="w-full" role="region" aria-label="Terms and Conditions PDF">
          <object
            data="/terms-and-conditions.pdf#toolbar=1&navpanes=1&scrollbar=1"
            type="application/pdf"
            className="w-full h-[80vh] rounded-md border"
          >
            <p className="text-base">
              Unable to display the PDF. You can
              {" "}
              <a
                href="/terms-and-conditions.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                download the Terms and Conditions here
              </a>
              .
            </p>
          </object>
        </div>
      </main>
      <StudyStayFooter />
    </div>
  );
};

export default TermsAndConditions;