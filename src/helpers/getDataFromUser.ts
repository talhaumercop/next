import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromUser=async(request:NextRequest)=>{
    try {
        const token= request.cookies.get("token")?.value || "";
        console.log("Token:", token);
        const decodedToken:any=jwt.verify(token,process.env.JWT_SECRET_KEY!)
        console.log("Decoded token:", decodedToken);
        return decodedToken.id;
    } catch (error:any) {
        throw new Error(error.message)
    }
}