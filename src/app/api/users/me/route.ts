import { getDataFromUser } from "@/helpers/getDataFromUser";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";
import { connectToDB } from "@/dbConfig/dbConfig";

connectToDB();

export async function GET(request:NextRequest){
    try {
        const userId= await getDataFromUser(request);
        const user= await User.findById(userId).select("-password");
        console.log("Found user:", user);
        return NextResponse.json({
            message:"User fetched successfully",
            success:true,
            data:user
        },{status:200})
    } catch (error:any) {
        return NextResponse.json({
            success:false,
            message:error.message
        },{status:500})
    }
}