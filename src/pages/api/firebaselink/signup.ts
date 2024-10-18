import type { NextApiRequest, NextApiResponse } from "next";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/utils/firebaseConfig";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
    if (req.method == "POST") {
        const { email, password } = req.body;
        try {
            createUserWithEmailAndPassword(auth, email, password);
            // Handle successful sign-up (e.g., redirect to a welcome page)
            return res.status(200).json({ message: "User signed up successfully" });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ errorMessage: "Something went wrong with signup: { email, password } = " + { email, password } });
        }
    }
    else {
        return res.status(405).json({ errorMessage: "Method not allowed" });
    }
}