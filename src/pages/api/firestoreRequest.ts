// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import db from "../../utils/firestore";
import { addDoc, collection } from "firebase/firestore";

type Data = {
    documentId?: string,
    errorMessage?: string
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  try {
    if (req.body.collection != null) {
        if (req.body.email != null) {
            const docRef = addDoc(collection(db, req.body.collection), {
                email: req.body.email
            });
            console.log('Document written with ID: ', "" + (await docRef).id);
            return res.status(200).json({ documentId: "" + (await docRef).id })
        }
    }

    return res.status(500).json({ errorMessage: `No collection (${req.body.collection}) specified or no email (${req.body.email})` })

  } catch (error) {
    console.error('Error adding document: ', error);
    return res.status(500).json({ errorMessage: `Error adding document ${req.body.email} to collection ${req.body.collection}` })
  }
}