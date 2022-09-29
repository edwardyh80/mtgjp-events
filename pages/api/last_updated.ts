import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!process.env.MONGODB_ENDPOINT || !process.env.MONGODB_API_KEY) {
    return res
      .status(500)
      .json({ isSuccessful: false, message: "Check database credentials!" });
  }
  const response = await axios.post(
    `${process.env.MONGODB_ENDPOINT}/action/find`,
    {
      collection: "last_updated",
      database: "mtg",
      dataSource: "Cluster0",
      sort: { time: -1 },
      limit: 1,
    },
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Request-Headers": "*",
        "api-key": process.env.MONGODB_API_KEY,
      },
    }
  );
  const documents = response.data.documents;
  res.status(200).json({ isSuccessful: true, documents });
};

export default handler;
