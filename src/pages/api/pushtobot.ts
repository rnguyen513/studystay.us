import type { NextApiRequest, NextApiResponse } from "next";
import type { ListingData } from "@/utils/tempData";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if (req.query.SUPABASE_ANON_KEY as string != process.env.SUPABASE_ANON_KEY as string) return res.status(401).send("Unauthorized");
    if (!req.body.record) return res.status(400).send("No record");

    const listing = req.body.record as ListingData;

    //TODO: check if from supabase otherwise quit

    await fetch("https://api.groupme.com/v3/bots/post", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // "text": `Posted by ${req.body.record.postedbyemail} at https://www.studystay.us/listing/${req.body.record.id}`,
            "text": `https://www.studystay.us/listing/${req.body.record.id}\n${req.body.record.title}, $${req.body.record.price}/month`,
            "bot_id": process.env.GROUPME_BOT_ID
        })
    })
    .catch(error => {
        console.error('Error:', error)
        return res.status(500).send(`Error: ${error}`);
    });

    console.log("Success");
    return res.status(200).send("Success");
}