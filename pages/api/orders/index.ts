import type { NextApiRequest, NextApiResponse } from "next";

type Data = { message: any };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return createOrder(req, res);

    default:
      return res.status(400).json({
        message: "Bad requested song",
      });
  }
}

const createOrder = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const body = req.body;

  return res.status(200).json({
    message: body,
  });
};
