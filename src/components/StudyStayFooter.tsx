import { leagueSpartan } from "@/utils/fonts"
import Link from "next/link"

const StudyStayFooter = () => {
    return (
        <footer className={`bg-blue-800 py-8 text-white ${leagueSpartan.className} mt-auto`}>
            <div className="container mx-auto px-4">
                <div className="flex flex-row justify-between mt-8 text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} StudyStay. All rights reserved.</p>
                    <div className="flex gap-5">
                        <Link href="/terms-and-conditions">Terms</Link>
                        <Link href="/terms-and-conditions">Privacy</Link>
                        <Link href="mailto:ryan@studystay.us">Contact</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default StudyStayFooter;