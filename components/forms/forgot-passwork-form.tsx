"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from 'sonner'
import { signInUser } from "@/server/users"
import { Spinner } from "../ui/spinner"
import Link from "next/link"
import { redirect, useRouter } from "next/navigation"
import { Plane, Send } from "lucide-react"
import { authClient } from "@/lib/auth-client"

const loginFormSchema = z.object({
  email: z.email("Invalid email address"),
})

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const [ isLoading, setIsLoading ] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof loginFormSchema>>({
      resolver: zodResolver(loginFormSchema),
      defaultValues: {
        email: "",
      },
  })

  async function onSubmit(data: z.infer<typeof loginFormSchema>) {
    try {
      setIsLoading(true);
      const { error } = await authClient.forgetPassword({
        email: data.email,
        redirectTo: "/reset-password"
      });
      if (!error) {
          toast.success("Password reset email sent. Please check your inbox.");
      } else {
        toast.error(error.message);
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.")
    } finally {
        setIsLoading(false);
    }
  }
    

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Reset your password</CardTitle>
          <CardDescription>
            Enter your email below to receive a password reset link
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="forgot-password-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="forgot-password-form-email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="forgot-password-form-email"
                    type="email"
                    placeholder="johndoe@example.com"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
                )}
              />

              <Field>
                <Button type="submit" form="forgot-password-form">
                  { isLoading && <Spinner />}
                  {isLoading ? "Sending" : "Reset Password"}
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <Link href="#">Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
