import { connectDB } from "@/utils/database";

import AdminReg from "@/models/AdminRegister";

export const POST = async (req, res) => {
  const { name, username, password } = await req.json();
  console.log(name, username, password);
  try {
    await connectDB();

    const existingAdmin = await AdminReg.findOne({ username });

    if (existingAdmin) {
      // Username already exists, return an appropriate response
      return new Response("Username already exists", {
        status: 409,
      });
      // return res.status(409).json({ message: 'Username already exists' });
    }

    const newRegister = new AdminReg({
      name,
      username,
      password,
    });
    await newRegister.save();
    console.log(newRegister);

    return new Response(JSON.stringify(newRegister), {
      status: 201,
    });
  } catch (error) {
    return new Response("failed to register new admin", { status: 500 });
  }
};
