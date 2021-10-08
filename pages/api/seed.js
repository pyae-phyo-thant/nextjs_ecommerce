import nc from "next-connect";

import db from "../../utils/db";
import Product from "../../models/Products";
import User from "../../models/User";
import data from "../../utils/data";

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();

  //Seed Sample Users
  await User.deleteMany();

  await User.insertMany(data.users);

  // Seed Sample Products
  await Product.deleteMany();

  await Product.insertMany(data.products);

  await db.disconnect();

  res.send({ message: "seed successfully" });
});

export default handler;
