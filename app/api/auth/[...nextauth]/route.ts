/*
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { getUserCollection } from "@/models/User";

export const { handlers, signIn, signOut, auth } = NextAuth({
  // Use JWT-based sessions for Credentials authentication.
  session: {
    strategy: "jwt",
  },

  // Configure email and password authentication.
  providers: [
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      // Authenticate the user when they submit the login form.
      async authorize(credentials) {
        // Ensure both fields contain strings.
        if (
          typeof credentials?.email !== "string" ||
          typeof credentials?.password !== "string"
        ) {
          return null;
        }

        const email = credentials.email.trim().toLowerCase();
        const password = credentials.password;

        if (!email || !password) {
          return null;
        }

        // Find the account in MongoDB.
        const users = await getUserCollection();
        const user = await users.findOne({ email });

        // Reject unknown accounts.
        if (!user || typeof user.password !== "string") {
          return null;
        }

        // Compare the submitted password with the stored hash.
        const passwordMatches = await bcrypt.compare(
          password,
          user.password
        );

        if (!passwordMatches) {
          return null;
        }

        // Return only the user information needed for authentication.
        return {
          id: user._id.toString(),
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],

  // Store the user's ID and role in the session token.
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }

      return session;
    },
  },

  // Use your custom login page.
  pages: {
    signIn: "/login",
  },
});
*/


import NextAuth from "next-auth";
import { authOptions } from "@/auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
