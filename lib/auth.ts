import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/drizzle"; // your drizzle instance
import { schema, verification } from "@/db/schema"; // your drizzle schema
import { nextCookies } from "better-auth/next-js";
import { Resend } from "resend";
import VerificationTemplate from "@/components/emails/verification-email";
import PasswordReset from "@/components/emails/password-reset-email";

const resend = new Resend(process.env.RESEND_API_KEY!);

export const auth = betterAuth({
    emailVerification: {
    sendVerificationEmail: async ( { user, url }) => {
        await resend.emails.send({
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
        sendResetPassword: async ({user, url }) => {
            await resend.emails.send({
            from: 'Notes <notes@arjunsharmahehe.tech>',
            to: [user.email],
            subject: 'Reset your password',
            react: PasswordReset({ name: user.name, email: user.email, resetUrl: url }),
        });
        },
        onPasswordReset: async ({ user }, request) => {
        // your logic here
        console.log(`Password for user ${user.email} has been reset.`);
        },
    },
    database: drizzleAdapter(db, {
        provider: "pg", // or "mysql", "sqlite"
        schema
    }),
    plugins: [nextCookies()]
});