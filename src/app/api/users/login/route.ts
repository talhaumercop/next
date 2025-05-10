import { connectToDB} from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export async function POST(request:NextRequest){
    try {
        const {email,password}= await request.json()
        if(!email || !password){
            return NextResponse.json({
                success:false,
                message:"All fields are required"
            },{status:400})
        }
        const user= await User.findOne({email})
        if(!user){
            return NextResponse.json({
                success:false,
                message:"User not found"
            },{status:404})
        }
        const isPasswordCorrect= await bcrypt.compare(password,user.password)
        if( !isPasswordCorrect){
            return NextResponse.json({
                success:false,
                message:"Invalid password"
            },{status:401})
        }

        const tokenData={
            user: user._id
        }
        const token= await jwt.sign(tokenData,process.env.JWT_SECRET_KEY!,{expiresIn:"1d"})
        
        const response = NextResponse.json({
            success: true,
            message: "Login successful",
            token
        })

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production"
        })

        return response
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:"Internal server error"
        },{status:500})
    }
}

connectToDB()