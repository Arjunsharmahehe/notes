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
import { Spinner } from "../ui/spinner"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { authClient } from "@/lib/auth-client"

const loginFormSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
}).superRefine(({ password, confirmPassword }, ctx) => {
  if (password !== confirmPassword) {
    ctx.addIssue({
      code: "custom",
      message: "Passwords do not match",
    })
  }
})

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const [ isLoading, setIsLoading ] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams()
  const token = searchParams.get("token") || "";

  const form = useForm<z.infer<typeof loginFormSchema>>({
      resolver: zodResolver(loginFormSchema),
      defaultValues: {
        password: "",
        confirmPassword: "",
      },
  })

  async function onSubmit(data: z.infer<typeof loginFormSchema>) {
    try {
      setIsLoading(true);
      const { error } = await authClient.resetPassword({
        newPassword: data.password,
        token: token
      })
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Password has been reset successfully. You can now log in with your new password.");
        router.push("/login");
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
          <CardTitle>Create a new password</CardTitle>
          <CardDescription>
            Enter your new password below, remember it this time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="password-reset-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
                <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="password-reset-form-password">Password</FieldLabel>
                      <Input
                        {...field}
                        id="password-reset-form-password"
                        type="password"
                        aria-invalid={fieldState.invalid}
                        autoComplete="off"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

              <Controller
                name="confirmPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="password-reset-form-confirm-password">Confirm Password</FieldLabel>
                  <Input
                    {...field}
                    id="password-reset-form-confirm-password"
                    type="password"
                    placeholder="********"
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
                <Button type="submit" form="password-reset-form">
                  { isLoading && <Spinner />}
                  {isLoading ? "Resetting password" : "Reset Password"}
                </Button>
                <FieldDescription className="text-center">
                  Create a new account - <Link href="#">Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
