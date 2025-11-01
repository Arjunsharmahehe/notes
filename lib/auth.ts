import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/drizzle"; // your drizzle instance
import { schema, verification } from "@/db/schema"; // your drizzle schema
import { nextCookies } from "better-auth/next-js";
import { Resend } from "resend";
import VerificationTemplate from "@/components/emails/verification-email";

const resend = new Resend(process.env.RESEND_API_KEY!);

export const auth = betterAuth({
    emailVerification: {
    sendVerificationEmail: async ( { user, url, token }, request) => {
        const { data, error } = await resend.emails.send({
            from: 'Notes <notes@arjunsharmahehe.tech>',
            to: [user.email],
            subject: 'Verify your email address',
            react: VerificationTemplate({ name: user.name, email: user.email, verificationUrl: url }),
        });
    },
    sendOnSignUp: true
  },
    emailAndPassword: {
        enabled: true,
    },
    database: drizzleAdapter(db, {
        provider: "pg", // or "mysql", "sqlite"
        schema
    }),
    plugins: [nextCookies()]
});