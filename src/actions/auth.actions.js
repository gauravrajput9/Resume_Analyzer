'use server'
import bcrypt from "bcrypt"
import User from "../../models/user.model"
import { connectDB } from "@/lib/mongodb"

export const signUp = async (name, email, password) => {
    try {
        await connectDB()
        if (!name || !email || !password) {
            return {
                success: false,
                message: "All feilds Are Mandotory"
            }
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return {
                success: false,
                message: "User With This Email Already Exists"
            }
        }
        const hash = await bcrypt.hash(password,10);
        await User.create({
            email, name, password: hash
        })
        return {
            sucess: true,
            message: "User Registered Successfully"
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: "Error Registering User"
        }
    }
}

export const login = async (email, password) => {

}