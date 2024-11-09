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
              Please read these terms carefully before using our service
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal space-y-6 pl-6">
              <li className="text-lg">
                <h3 className="font-semibold mb-2">Be respectful</h3>
                <p className="text-muted-foreground">
                  Treat all users with courtesy and respect. Harassment, hate speech, or any form of discriminatory behavior will not be tolerated.
                </p>
              </li>
              <li className="text-lg">
                <h3 className="font-semibold mb-2">Don&apos;t put sensitive information through channels</h3>
                <p className="text-muted-foreground">
                  Avoid sharing personal or sensitive information through public channels. This includes but is not limited to financial details, passwords, and private contact information.
                </p>
              </li>
              <li className="text-lg">
                <h3 className="font-semibold mb-2">Profile protection and liability</h3>
                <p className="text-muted-foreground">
                  Profiles are protected through student emails. However, we are not responsible for handling or administering the passing of leases or financial information through the channels. Users are advised to exercise caution and use secure methods for such transactions.
                </p>
              </li>
            </ol>
          </CardContent>
        </Card>
        </main>
    </div>
    )
}

export default TermsAndConditions;