"use client"

import type React from "react"
import { createClient } from "@/lib/supabase/client"
import { SessionContextProvider } from "@supabase/auth-helpers-react"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const supabase = createClient()

  return <SessionContextProvider supabaseClient={supabase}>{children}</SessionContextProvider>
}
