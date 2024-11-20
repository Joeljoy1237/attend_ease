// pages/api/register.ts
import User from "@models/User";
import { connectToDB } from "@utils/database";
import CryptoJS from "crypto-js";


export const POST = async (request: any) => {

  const { firstName, lastName, email, password } = await request.json();

  if (!firstName && !lastName && !email && !password) {
    return new Response(
      JSON.stringify({ message: "Please fill the required fields" }),
      { status: 400 }
    );
  }

  if (!firstName) {
    return new Response(
      JSON.stringify({ message: "First name is required", desc: "Kindly fill and try again" }),
      { status: 400 }
    );
  }
  if (!lastName) {
    return new Response(
      JSON.stringify({ message: "Last name is required" }),
      { status: 400 }
    );
  } else if (!email) {
    return new Response(
      JSON.stringify({ message: "Email is required" }),
      { status: 400 }
    );
  } else if (!password) {
    return new Response(
      JSON.stringify({ message: "Password is required" }),
      { status: 400 }
    );
  }

  try {
    await connectToDB();

    const existUser = await User.findOne({ email });
    if (existUser) {
      return new Response(
        JSON.stringify({ message: "User already exists", desc: "Try another email" }),
        { status: 409 }
      );
    }
    const encryptedData = CryptoJS.AES.encrypt(password, process.env.CRYPTO_SECRET_KEY!).toString();
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: encryptedData
    });
    await newUser.save();
    return new Response(
      JSON.stringify({ message: "Registered successfully", desc: "Redirecting to login page" }),
      { status: 201 }
    );
  } catch (err: any) {
    console.log(err);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
  }
};
