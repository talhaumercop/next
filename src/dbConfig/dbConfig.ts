import mongoose from "mongoose";

export async function connectToDB() {
    try {
        await mongoose.connect(process.env.MONGO_URL!)
        const connection=mongoose.connection
        connection.on("connected",()=>{
            console.log("connected to the database successfully");
        })
        connection.on("error",(err)=>{
            console.log("mongodb connection error. please make sure mongodb is running");
            console.log(err);
            process.exit();
        })
    } catch (error){
        console.log("something went wrong while connecting to the database");
        console.log(error);
    }
}
