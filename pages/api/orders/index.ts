import { db } from "@/database";
import { IOrder } from "@/interfaces";
import { Product, Order } from "@/models";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

type Data = { message: string } | IOrder;

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case "POST":
      return createOrder(req, res);

    default:
      return res.status(400).json({ message: "Bad request" });
  }
}

const createOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { orderItems, total } = req.body as IOrder;
  const session: any = await getSession({ req });

  return res.status(201).json(session);

  // const { orderItems, total } = req.body as IOrder;

  // console.log("req order: ", req);
  // const session: any = await getSession({ req });
  // console.log("session order: ", session);

  // if (!session) {
  //   return res.status(401).json({ message: "Debe estar autenticado!" });
  // }

  // const productsIds = orderItems.map((product) => product._id);
  // await db.connect();
  // const dbProducts = await Product.find({ _id: { $in: productsIds } });

  // try {
  //   const subTotal = orderItems.reduce((prev, current) => {
  //     const currentPrice = dbProducts.find(
  //       (prod) => prod.id === current._id
  //     )!.price;
  //     if (!currentPrice) {
  //       throw new Error("producto no existe");
  //     }
  //     return current.quantity * currentPrice + prev;
  //   }, 0);

  //   const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
  //   const backendTotal = subTotal * (taxRate + 1);

  //   if (total !== backendTotal) {
  //     throw new Error("El total es diferente al monto");
  //   }

  //   const userId = session.user._id;
  //   const newOrder = new Order({ ...req.body, isPaid: false, user: userId });
  //   await newOrder.save();
  //   db.disconnect();

  //   return res.status(200).json(newOrder);
  // } catch (error: any) {
  //   await db.disconnect();
  //   console.log(error);
  //   res.status(400).json({ message: error.message || "Revise los logs" });
  // }

  // return res.status(201).json(session);
};
