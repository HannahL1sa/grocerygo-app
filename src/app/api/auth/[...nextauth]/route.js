import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client"
import nextAuth from "next-auth";

const prisma = new PrismaClient();

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
          // The name to display on the sign in form (e.g. "Sign in with...")
          name: "Credentials",
          // `credentials` is used to generate a form on the sign in page.
          // You can specify which fields should be submitted, by adding keys to the `credentials` object.
          // e.g. domain, username, password, 2FA token, etc.
          // You can pass any HTML attribute to the <input> tag through the object.
          credentials: {
            username: { label: "Username", type: "text", placeholder: "jsmith" },
            password: { label: "Password", type: "password" },
            email: {label: "Email", type: "email"}
          },
          async authorize(credentials) {
            //check if email or password is valid
            if ( !credentials.email || !credentials.password ) {
              return null;
            }
            
            
            //Check to see if user exists
            const user = await prisma.user.findUnique({
              where: {
                email : credentials.email
              }
            });
        
            //if no user
            if (!user) {
              return null;
            }

            //check if passwords match
            const passwordsMatch = await bcrypt.compare(credentials.password, user.hashedPassword);

            //if passwords don't match
            if(!passwordsMatch){
              return null;
            }

            //return user onject if everything is valid
            return user

          }
        })
      ],
      session: {
        strategy: "jwt",
      },
      secret: process.env.NEXTAUTH_SECRET,
      debug: process.env.NODE_ENV === "development",
};

const handler = nextAuth(authOptions);

export {handler as GET, handler as POST}