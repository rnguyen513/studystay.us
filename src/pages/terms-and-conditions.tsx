import Header from "@/components/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { leagueSpartan } from "@/utils/fonts"

const TermsAndConditions = () => {
  return (
    <div className={`min-h-screen bg-white text-black ${leagueSpartan.className} text-xl overflow-hidden`}>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Card className="w-full max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Terms and Conditions</CardTitle>
            <CardDescription className="text-center">
              By creating an account and posting on StudyStay, you agree to the following terms and conditions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal space-y-6 pl-6">
              <li className="text-lg">
                <h3 className="font-semibold mb-2">Use of the StudyStay Platform</h3>
                <p className="text-muted-foreground mb-2">
                  StudyStay provides a platform for users to list and sell subleases. When listing a property, users may choose:
                </p>
                <ul className="list-disc list-inside ml-4 text-muted-foreground">
                  <li>Sell immediately to StudyStay at a displayed price.</li>
                  <li>List on the open market, starting at 50% of the original rent. This market price decreases over time, according to a proprietary formula created by StudyStay that reflects rapid diminishing demand over time.</li>
                </ul>
              </li>

              <li className="text-lg">
                <h3 className="font-semibold mb-2">User Conduct</h3>
                <p className="text-muted-foreground">
                  Users are expected to treat others with courtesy and respect. Harassment, discrimination, or hate speech will result in removal from the platform.
                </p>
              </li>

              <li className="text-lg">
                <h3 className="font-semibold mb-2">Information Safety</h3>
                <p className="text-muted-foreground">
                  Do not share sensitive information (e.g. passwords, financial details, personal addresses) through public or unsecured channels.
                </p>
              </li>

              <li className="text-lg">
                <h3 className="font-semibold mb-2">Terms of Service Summary</h3>
                <ol className="list-decimal list-inside text-muted-foreground space-y-2 ml-4">
                  <li><strong>Acceptance of Terms:</strong> Use of StudyStay constitutes agreement to these Terms and our Privacy Policy.</li>
                  <li><strong>Service Description:</strong> StudyStay facilitates sublease listings but does not own or manage any properties listed.</li>
                  <li><strong>Payment Processing:</strong> Rent payments are securely processed. Service Fees are non-refundable.</li>
                  <li><strong>User Responsibilities:</strong> Users must provide accurate information and are responsible for safeguarding their accounts.</li>
                  <li><strong>Limitation of Liability:</strong> StudyStay is not liable for property condition, user disputes, or tenant behavior.</li>
                  <li><strong>Dispute Resolution:</strong> Disputes must be resolved between the buyer and seller. StudyStay may assist but is not obligated to mediate.</li>
                  <li><strong>Governing Law:</strong> These Terms are governed by the laws of the Commonwealth of Virginia.</li>
                </ol>
              </li>
            </ol>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default TermsAndConditions;