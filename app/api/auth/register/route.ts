import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { error } from "console";
import User from "@/models/User";
import { json } from "stream/consumers";

export async function POST(request: NextRequest) {
    
    try {
        const { email,password } = await request.json();

        if ( !email || !password) {
            return NextResponse.json(
                {error: "Email and password are required"},
                { status: 400 }
            );
        };

        await connectToDatabase()

        const existingUser = await User.create({email})

        if (existingUser) {
            return NextResponse.json(
                {error: "User already exists"},
                { status: 400}
            )
        }

    } catch (error) {
        
    }

}