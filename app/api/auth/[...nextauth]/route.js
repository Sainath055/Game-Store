import NextAuth from 'next-auth';
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from 'next-auth/providers/credentials';

import connectMongo  from '@/database/db.js'
import UserModal from '@/models/user.js'
import { compare, hash } from 'bcrypt';
import checkoutLayout from '@/app/checkout/layout';


const handler = NextAuth({
    providers : [
        // Google Provider
        GoogleProvider({
            clientId: process.env.GOOGLE_AUTH_CLIENT_ID,
            clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET
        }),
        CredentialsProvider({
            id: 'Sign_In',
            name : "Sign-In-Credentials-Provider",
            async authorize(credentials, req){
                connectMongo().catch(error => { error: "Connection Failed...!"})

                // check user existance
                const user = await UserModal.findOne( { email : credentials.email})
                if(!user) throw new Error("No user Found with Email Please Sign Up...!")
                if(user.googleAccount) {
                    throw new Error("Its a Google Account, Plz continue with google")
                }
                // compare()
                const checkPassword = await compare(credentials.password, user.password);
                // incorrect password
                if(!checkPassword || user.email !== credentials.email){
                    throw new Error("Username & Password doesn't match");
                }

                if (user) {
                // Any object returned will be saved in `user` property of the JWT
                    return user
                } else {
                    return null
                } 
            }
        }),
        CredentialsProvider({
            id: 'Sign_Up',
            name : "Sign-Up-Credentials-Provider",
            async authorize(credentials, req){
                connectMongo().catch(error => { error: "Connection Failed...!"})

                // check user existance
                const oldUser = await UserModal.findOne({ email: credentials.email });
                if (oldUser) throw new Error("User already exists.")
                
                // create user
                const hashedPassword = await hash(credentials.password, 12)
                const user = await UserModal.create({ email: credentials.email, 
                    password: hashedPassword, name: credentials.name, isAdmin: false });

                if (user) {
                // Any object returned will be saved in `user` property of the JWT
                    return user
                } else {
                    return null
                }
            }
        })
    ],
    // session: {
    //     strategy: 'jwt',
    //     jwt:true
    // },
    // jwt:{
    //     secret: '',
    // },
    callbacks: {
        async signIn({ account, profile }) {
            if (account.provider === "google") {
                await connectMongo();

                // check if account already exists
                const userExists = await UserModal.findOne({ email: profile.email });
        
                // if not, create a new document and save user in MongoDB
                if (!userExists) {
                    await UserModal.create({ email: profile.email, 
                    name: profile.name, isAdmin: false, googleAccount: true });
                }
                return true
            } else {
                return true
            }
          },

        async jwt({ token, account, user, trigger, session }) {
            // Persist the OAuth access_token to the token right after signin
            if (account) {
                if (account.provider === "google") {
                    token.google = true
                }  else {
                    token.google = false
                }
                token.user = user
            }
            if(trigger === 'update' && session?.name) {
                token.user.name = session.name;
            }
            return token
        },

        async session({ session, token, trigger }) {
            // Send properties to the client, like an access_token from a provider.
            if(token.google) {
                const sessionUser = await UserModal.findOne({ email: token.user.email });
                session.user.id = sessionUser._id
                session.user.email = sessionUser.email
                session.user.name = sessionUser.name
                session.user.isAdmin = sessionUser.isAdmin 
                session.user.googleAccount = sessionUser.googleAccount
            } else {
                session.user.id = token.user._id || token.user.id
                session.user.email = token.user.email
                session.user.name = token.user.name
                session.user.isAdmin = token.user.isAdmin 
                session.user.googleAccount = token.user.googleAccount
            }

            return session
        },
    }
})


export { handler as GET, handler as POST };
