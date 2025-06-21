"use client"

import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { signupAction } from "@/app/actions"
import Link from "next/link"

export function SignupForm() {
  const [state, action, isPending] = useActionState(signupAction, null)

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">Sign Up</CardTitle>
        <CardDescription className="text-center">Create an account to get started.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <form action={action} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" type="text" placeholder="John Doe" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="m@example.com" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required />
          </div>
          <Button type="submit" className="w-full bg-appRed hover:bg-red-600" disabled={isPending}>
            {isPending ? "Signing up..." : "Sign Up"}
          </Button>
        </form>
        {state && (
          <p className={`text-center text-sm ${state.success ? "text-green-600" : "text-red-600"}`}>{state.message}</p>
        )}
        <div className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="underline text-appRed hover:text-red-600" prefetch={false}>
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
