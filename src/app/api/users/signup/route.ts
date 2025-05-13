import { connectToDB } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model"
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

// Connect to database before handling requests
await connectToDB();

export async function POST(request: NextRequest) {
    try {
        const { email, password, username } = await request.json();
        
        // Input validation
        if (!email || !password || !username) {
            return NextResponse.json({
                success: false,
                message: "All fields are required"
            }, { status: 400 });
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({
                success: false,
                message: "Invalid email format"
            }, { status: 400 });
        }

        // Password strength validation
        if (password.length < 6) {
            return NextResponse.json({
                success: false,
                message: "Password must be at least 6 characters long"
            }, { status: 400 });
        }

        // Check for existing user
        const userExist = await User.findOne({ email });
        if (userExist) {
            return NextResponse.json({
                success: false,
                message: "User already exists"
            }, { status: 400 });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            name: username,
            email,
            password: hashedPassword,
            isVerified: false
        });

        // Save user to database
        const savedUser = await newUser.save();

        // Send verification email
        try {
            await sendEmail({
                email,
                emailType: "VERIFY",
                userId: savedUser._id
            });
        } catch (emailError) {
            // Log email error but don't fail the signup
            console.error("Failed to send verification email:", emailError);
        }

        // Return success response without sensitive data
        return NextResponse.json({
            success: true,
            message: "User created successfully",
            user: {
                id: savedUser._id,
                name: savedUser.name,
                email: savedUser.email,
                isVerified: savedUser.isVerified
            }
        }, { status: 201 });

    } catch (error: any) {
        console.error("Signup error:", error);
        return NextResponse.json({
            success: false,
            message: "An error occurred during signup. Please try again."
        }, { status: 500 });
    }
}