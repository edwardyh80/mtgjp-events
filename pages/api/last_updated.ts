import clientPromise from "../../lib/mongodb";
import { ILastUpdated, ILastUpdatedResponse } from "../../types";

import { withAxiom } from "next-axiom";

import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ILastUpdatedResponse>
) => {
  const client = await clientPromise;
  const db = client.db("mtg");

  const lastUpdated = await db
    .collection("last_updated")
    .find<ILastUpdated>({})
    .sort({ time: -1 })
    .limit(1)
    .toArray();
  res.status(200).json({ isSuccessful: true, lastUpdated: lastUpdated[0] });
};

export default withAxiom(handler);
