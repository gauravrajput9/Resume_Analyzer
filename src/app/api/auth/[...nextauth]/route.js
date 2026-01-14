import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { connectDB } from "@/lib/mongodb";
import User from "../../../../../models/user.model";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        await connectDB();
        const user = await User.findOne({ email: credentials.email }).select("+password");
        if (!user) return null;

        const isMatch = await bcrypt.compare(credentials.password, user.password);
        if (!isMatch) return null;

        return {
          id: user._id.toString(), // MongoDB ObjectId as string
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      // On first sign in, user object exists
      if (user) {
        if (account.provider === "credentials") {
          // Credentials login: user.id is already MongoDB _id
          token.id = user.id;
        } else {
          // OAuth login: find or create user in MongoDB
          await connectDB();
          let dbUser = await User.findOne({ email: user.email });
          if (!dbUser) {
            dbUser = await User.create({
              name: user.name,
              email: user.email,
              image: user.image,
            });
          }
          token.id = dbUser._id.toString(); 
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
  },

};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
