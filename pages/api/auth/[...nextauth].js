import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import {PrismaAdapter} from "@next-auth/prisma-adapter";
import {PrismaClient} from "@prisma/client";
const prisma=new PrismaClient();
export const authOptions = {
    // Configure one or more authentication providers
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        // ...add more providers here
    ],
    secret: process.env.JWT_SECRET,
    callbacks: {
        async session({session, token, user}){
            session.user.role=user.role;
            return session
        }
    }
}
export default NextAuth(authOptions)