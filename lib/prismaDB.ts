import { NextApiHandler } from "next";
import NextAuth from "next-auth";
// @ts-ignore
import Providers from "next-auth/providers";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const options = {
    providers: [
        Providers.GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
    ],
};
// we will define `options` up next
const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;