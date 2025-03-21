// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import db from "../../utils/firestore";
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";

type Data = {
  documentId?: string,
  errorMessage?: string,
  queryResult?: any
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "GET") {
    const q = query(collection(db, "listings"));
    const querySnapshot = await getDocs(q);
    return res.status(200).send(querySnapshot.docs.map(doc => doc.data()));
  }
  else {
    try {
      if (req.body.typeOfRequest == "filterSearch" && (req.body.filterValue != "" || req.body.filterValue != null)) {
        console.log("Searching for docs with " + req.body.attribute + " == " + req.body.filterValue);
        const q = query(collection(db, req.body.collection), where(req.body.attribute, "==", req.body.filterValue));
        const querySnapshot = await getDocs(q);
        return res.status(200).json(querySnapshot.docs.map(doc => doc.data()));
      }
      else {

        if (req.body.collection != null) {
          if (req.body.email != null) {
            const docRef = addDoc(collection(db, req.body.collection), {
              email: req.body.email,
              timestamp: new Date()
            });
            console.log('Document written with ID: ', "" + (await docRef).id);
            return res.status(200).json({ documentId: "" + (await docRef).id })
          }
        }

        return res.status(500).json({ errorMessage: `No collection (${req.body.collection}) specified or no email (${req.body.email})` })
    }

    } catch (error) {
      console.error('Error adding document: ', error);
      return res.status(500).json({ errorMessage: `Error adding document ${req.body.email} to collection ${req.body.collection}` })
    }
  }
}