import { connectToDB } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model"
import bcrypt from "bcryptjs";

export async function POST(request:NextRequest){
    try {
        const {email,password,username}= await request.json()
        if(!email || !password || !username){
            return NextResponse.json({
                success:false,
                message:"All fields are required"
            },{status:400})
        }
        const userExist= await User.findOne({email})
        if(userExist){
            return NextResponse.json({
                success:false,
                message:"User already exists"
            },{status:400})
        }
      
        //hash passsword
        const salt= await bcrypt.genSalt(10)
        const hashedPasword= await bcrypt.hash(password,salt)

        const user= await User.create({
            name:username,
            email,
            password:hashedPasword
        })
        const savedUser= await user.save()
        return NextResponse.json({
            success:true,
            message:"User created successfully",
            user:savedUser
        })
        
        
    } catch (error:any) {
        return NextResponse.json({
            success:false,
            message:error.message
        },{status:500})
    }
}


connectToDB()