import dbConnect from "@/backend/config/dbConnect";
import User, { InterfaceUser } from "@/backend/models/user";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth/next";
import CredentialsProvider  from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

type Credentials = {
    email: string;
    password: string;
}

type Token = {
    user: InterfaceUser
}
async function auth(request: NextApiRequest, response: NextApiResponse){
    return await NextAuth(request, response, {
        session: {
            strategy: 'jwt',

        },
        providers: [
            CredentialsProvider({
                // @ts-ignore
                async authorize(credentials: Credentials){
                    dbConnect();

                    const { email, password} = credentials

                    const user = await User.findOne({ email }).select('+password');

                    if(!user){
                        throw new Error('Invalid Email or Password')
                    }

                    const isPasswordMatched = await bcrypt.compare(password, user.password);

                    if(!isPasswordMatched){
                        throw new Error('Invalid Email or Password')
                    }

                    return user;
                }
            })
        ],
        callbacks:{
            jwt: async ({token, user})=>{
                user && (token.user = user)

                const jwtToken  = token as Token

                //  update session when user is updated
                if(request.url?.includes("/api/auth/session?update")){
                    // hit the database and return the updated user
                    const updatedUser = await User.findById(jwtToken?.user._id)
                    token.user = updatedUser
                }

                return token
            },
            session: async ({session, token})=>{
                session.user = token.user as InterfaceUser

                console.log("session => ", session)
                // @ts-ignore
                delete session?.user?.password

                return session
            }
        },
        pages: {
            signIn: '/login',
        },
        secret: process.env.NEXTAUTH_SECRET,
    });
}

export { auth as GET, auth as POST}