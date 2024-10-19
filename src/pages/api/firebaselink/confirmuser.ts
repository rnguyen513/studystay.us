// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import db from "../../../utils/firestore";
import {collection, query, where, getDocs, addDoc } from "firebase/firestore";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    try {
        
        if (req.body.email != null) {
            const q = query(collection(db, "emails"), where("email", "==", req.body.email));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.docs.map(doc => doc.data().email).includes(req.body.email)) {
                const newEmailRef = addDoc(collection(db, "emails"), {
                    email: req.body.email,
                    thumbnail: req.body.picture,
                    timestamp: new Date()
                })
                return res.status(200).send({ "documentId": " " + (await newEmailRef).id })
            }
            else {
                return res.status(200).send({ "documentId": "already in database"})
            }

        } else {
            return res.status(500).send({ errorMessage: `No email provided (${req.body.email})` })
        }

    } catch (error) {
      console.error('Error verifying email: ', error);
      return res.status(500).send({ errorMessage: "Error verifying email: " + error});
    }
}