import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const { _key } = req.query;
    console.log(_key);
    console.log(req.query);
    if (req.body.SUPABASE_ANON_KEY as string != process.env.SUPABASE_ANON_KEY as string) return res.status(401).send("Unauthorized");
    if (!req.body.record) return res.status(400).send("No record");

    //TODO: check if from supabase otherwise quit

    await fetch("https://api.groupme.com/v3/bots/post", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "text": `${req.body.record.title} posted by ${req.body.record.postedbyemail}`,
            // "text": `${Math.random()}`,
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