import clientPromise from "../../lib/mongodb";
import { IEvent, IEventsResponse } from "../../types";

import { Filter } from "mongodb";
import { withAxiom } from "next-axiom";

import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IEventsResponse>
) => {
  if (!req.query.prefecture)
    return res
      .status(400)
      .json({ isSuccessful: false, message: "No prefecture provided!" });
  if (!req.query.format)
    return res
      .status(400)
      .json({ isSuccessful: false, message: "No format provided!" });
  if (!req.query.type)
    return res
      .status(400)
      .json({ isSuccessful: false, message: "No type provided!" });
  const filter: Filter<IEvent> = {};
  for (const k of ["prefecture", "format", "type"]) {
    const q = req.query[k];
    if (q) {
      if (typeof q === "string") {
        filter[k as "prefecture" | "format" | "type"] = Number(q);
      } else if (Array.isArray(q)) {
        filter[k as "prefecture" | "format" | "type"] = {
          $in: q.map((n: string) => Number(n)),
        };
      }
    }
  }

  const client = await clientPromise;
  const db = client.db("mtg");

  const events = await db
    .collection("events")
    .find<IEvent>({
      ...filter,
      time: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) },
    })
    .toArray();
  res.status(200).json({ isSuccessful: true, events });
};

export default withAxiom(handler);
