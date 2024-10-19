import type { NextApiRequest, NextApiResponse } from "next";

import db from "../../../utils/firestore";
import {collection, query, where, getDocs, addDoc } from "firebase/firestore";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    try {
        const q = query(collection(db, "listings"), where("listingId", "==", req.body.listingId));
        const querySnapshot = await getDocs(q);
        
        return res.status(200).send({ "listing" : querySnapshot.docs.map(doc => doc.data()) });
    } catch (error) {
      return res.status(500).send({ errorMessage: "Something went wrong: " + error});
    }
}