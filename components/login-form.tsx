"use client"

import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { loginAction } from "@/app/actions"
import Link from "next/link"
import { useRouter } from "next/navigation" // Import useRouter

export function LoginForm() {
  const [state, action, isPending] = useActionState(loginAction, null)
  const router = useRouter()

  // Handle successful login redirect (action handles it directly now)
  // You might still want to show a success message before redirecting
  // if the action didn't handle it.

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">Login</CardTitle>
        <CardDescription className="text-center">Enter your email and password to access your account.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <form action={action} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="m@example.com" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required />
          </div>
          <Button type="submit" className="w-full bg-appRed hover:bg-red-600" disabled={isPending}>
            {isPending ? "Logging in..." : "Login"}
          </Button>
        </form>
        {state && (
          <p className={`text-center text-sm ${state.success ? "text-green-600" : "text-red-600"}`}>{state.message}</p>
        )}
        <div className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link href="/signup" className="underline text-appRed hover:text-red-600" prefetch={false}>
            Sign Up
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
