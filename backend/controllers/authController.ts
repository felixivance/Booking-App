import { NextRequest, NextResponse } from "next/server";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";
import User from "../models/user";

// register user => /api/auth/register
export const registerUser = catchAsyncErrors(async (req: NextRequest)=>{
    const body = await req.json()

    const { name, email, password } = body;

    const user = await User.create({
        name,
        email,
        password
    })

    return NextResponse.json({
        success:true
    })
})

// update user profile => /api/me/update
export const updateProfile = catchAsyncErrors(async (req: NextRequest)=>{
    const body = await req.json()

    console.log("backed");
    console.log(body)

    const userData = {
        name: body.name,
        email: body.email
    }

    const user = await User.findByIdAndUpdate(req.user._id, userData)

    return NextResponse.json({
        success:true,
        user
    })
})