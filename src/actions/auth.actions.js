"use server";

import bcrypt from "bcrypt";
import User from "../../models/user.model";
import { connectDB } from "@/lib/mongodb";


export const signUp = async (name, email, password) => {
  try {

    await connectDB();

    if (!name || !email || !password) {
      return { success: false, message: "All fields are mandatory" };
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { success: false, message: "User already exists" };
    }

    const hash = await bcrypt.hash(password, 10);

    await User.create({ name, email, password: hash });

    return { success: true, message: "User registered successfully" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Error registering user" };
  }
};

