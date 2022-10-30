import type { NextApiRequest, NextApiResponse } from "next";
import { Filter } from "mongodb";
import axios from "axios";

import { IEvent, IResponse } from "../../types";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IResponse>
) => {
  if (!process.env.MONGODB_ENDPOINT || !process.env.MONGODB_API_KEY) {
    return res
      .status(500)
      .json({ isSuccessful: false, message: "Check database credentials!" });
  }
  const filter: Filter<IEvent> = {
    time: {
      $gte: {
        // eslint-disable-next-line
        // @ts-ignore
        $date: { $numberLong: new Date().setHours(0, 0, 0, 0).toString() },
      },
    },
  };
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
  const response = await axios.post<{ documents: IEvent[] }>(
    `${process.env.MONGODB_ENDPOINT}/action/find`,
    {
      collection: "events",
      database: "mtg",
      dataSource: "Cluster0",
      filter,
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
