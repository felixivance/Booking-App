import { NextRequest, NextResponse } from "next/server";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";
import User from "../models/user";
import { delete_file, upload_file } from "../utils/cloudinary";
import user from "../models/user";
import { resetPasswordHTMLTemplate } from "../utils/emailTemplate";
import sendEmail from "../utils/sendEmail";

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

// update password => /api/me/update_password
export const updatePassword = catchAsyncErrors(async (req: NextRequest)=>{
    const body = await req.json()

    const user =  await User.findById(req?.user?._id).select('+password')

    // check previous user password
    const isMatched = await user.comparePassword(body.oldPassword)
    if(!isMatched){
        throw new Error('Old password is incorrect')
    }

    user.password = body.password
    await user.save()

    return NextResponse.json({
        success:true,
    })
})

// upload user avatar => /api/me/update_avatar

export const uploadAvatar = catchAsyncErrors(async (req: NextRequest) => {
    const body = await req.json()

    const avatarResponse = await upload_file(body?.avatar, 'bookit-nextjs/avatars');
  
    // remove previous avatar
    if(req.user?.avatar && req.user?.avatar?.public_id){
        await delete_file(req.user.avatar.public_id);
    }

    const user = await User.findByIdAndUpdate(req.user._id, {
        avatar: avatarResponse
    })

    return NextResponse.json({
        success:true,
        user
    })
})

// forgot password => /api/password/forgot

export const forgotPassword = catchAsyncErrors(async (req: NextRequest)=>{
    const body = await req.json()

    const user = await User.findOne({ email: body.email})

    if(!user){
        throw new Error('User not found with this email')
    }

    // get reset token
    const resetToken = user.getResetPasswordToken()

    await user.save()

    // create reset password url
    const resetUrl = `${process.env.APP_URL}/password/reset/${resetToken}`


    const message = resetPasswordHTMLTemplate(user?.name, resetUrl)

    try{
        await sendEmail({
            email: user.email,
            subject: 'BookIT Password Recovery',
            message
        })
    }catch(error: any){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiry = undefined;

        await user.save()

        throw new Error('Email could not be sent')
    }

    return NextResponse.json({
        success:true,
        user
    })

})