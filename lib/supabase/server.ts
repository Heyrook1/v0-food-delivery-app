import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export function createClient() {
  const cookieStore = cookies()

  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: any) {
        try {
          cookieStore.set({ name, value, ...options })
        } catch (error) {
          // The `cookies().set()` method can only be called from a Server Component or Server Action.
          // This error is typically not an issue if you're using `cookies().set()` in a Server Action
          // or Server Component, but it might occur if you're trying to set cookies in a Client Component
          // or a file that's not directly a Server Component/Action.
          console.warn("Could not set cookie from server client:", error)
        }
      },
      remove(name: string, options: any) {
        try {
          cookieStore.set({ name, value: "", ...options })
        } catch (error) {
          console.warn("Could not remove cookie from server client:", error)
        }
      },
    },
  })
}
