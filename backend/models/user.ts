import mongoose, { Document, Schema } from 'mongoose'
import bcrypt from 'bcryptjs';

export interface InterfaceUser extends Document{
    name: string;
    email: string;
    password: string;
    avatar: {
        public_id: string;
        url: string;
    },
    role: string;
    createdAt: Date;
    resetPasswordToken: string;
    resetPasswordExpiry: Date;
    comparePassword: (enteredPassword: string) => Promise<boolean>

}

const userSchema: Schema<InterfaceUser> = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name']
    },
    email: {
        type: String,
        required: [ true, "please enter your email"],
        unique:true
    },
    password: {
        type: String,
        required: [ true, "Please enter your password"],
        minlength: [6, "Your password must be longer than 6 characters"],
        select: false
    },
    avatar: {
        public_id: String,
        url: String
    },
    role:{
        type: String,
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    resetPasswordToken: String,
    resetPasswordExpiry: Date
    
})

//encrypt password before saving the user
userSchema.pre("save", async function (next) {
    console.log('Password is modified')
        if (!this.isModified("password")) {
            console.log('Password is not modified');
            next();
        }
    
        this.password = await bcrypt.hash(this.password, 10);
});


// compare user password
userSchema.methods.comparePassword = async function(enteredPassword: string){
    return await bcrypt.compare(enteredPassword, this.password);
}

export default mongoose.models.User || mongoose.model<InterfaceUser>('User', userSchema)