import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if (!req.body.record) return res.status(400).send("No record");
    console.log(req.body);

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