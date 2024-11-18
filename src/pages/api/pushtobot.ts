import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    console.log(req.body);

    //check if from supabase otherwise quit

    const url = "https://api.groupme.com/v3/bots/post";
    const data = {
        text: `${req.body.record.title} posted by ${req.body.record.postedbyemail}`,
        bot_id: process.env.GROUPME_BOT_ID
    };

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        return res.status(200).send("OK");
    })
    .catch(error => {
        console.error('Error:', error)
        return res.status(500).send(`Error: ${error}`);
    });
}