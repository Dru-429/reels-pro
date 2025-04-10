import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { error } from "console";
import User from "@/models/User";

export async function POST(request: NextRequest) {
    
    try {
        const { email,password } = await request.json();

        if ( !email || !password) {
            return NextResponse.json(
                {error: "Email and password are required"},
                { status: 400 }
            );
        };

        await connectToDatabase();

        const existingUser = await User.findOne({email});
    
        if (existingUser) {
            return NextResponse.json(
                {error: "Email already exists"},
                { status: 400}
            )
        }

        await User.create({
            email,
            password
        })

        return NextResponse.json(
            { message: "User created" },
            { status: 201 }
        )


    } catch (error) {
        return NextResponse.json(
            { error: "Failed to register user" },
            { status: 500 }
        )
    }

}


// Sending request from frontend itself 

// const res =  fetch("/api/auth/register", {
//     method: "POST",
//     headers: {"Content-Type": "application/json"},
//     body: JSON.stringify({ email, password}) 
// })  

// res.json()