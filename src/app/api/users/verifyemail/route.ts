import { connectToDB } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";


connectToDB()

export async function POST(request:NextRequest){
    try {
        const {token}= await request.json();
        console.log(token)
        const user= await User.findOne({verifyToken:token,verifyTokenExpiry:{$gt:Date.now()}})
        if(!user){
            return NextResponse.json({error:"Invalid token"},{status:400})
        }
        console.log(user)
        user.isVerified=true;
        user.verifyToken=undefined;
        user.verifyTokenExpiry=undefined;
        await user.save();
        return NextResponse.json({message:"Email verified successfully"},{status:200})
    } catch (error:any) {
        NextResponse.json({error:error.message},
            {status:500}
        )
    }
}
