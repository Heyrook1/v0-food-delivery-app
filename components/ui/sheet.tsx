"use client"

import type React from "react"

import * as Dialog from "@radix-ui/react-dialog"
import { cn } from "@/lib/utils"

export function Sheet(props: Dialog.DialogProps) {
  return <Dialog.Root {...props} />
}

export const SheetTrigger = Dialog.Trigger

export function SheetContent({
  side = "right",
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Dialog.Content> & { side?: "left" | "right" | "top" | "bottom" }) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
      <Dialog.Content
        {...props}
        className={cn(
          "fixed z-50 bg-white shadow-lg outline-none",
          side === "right" && "right-0 top-0 h-full w-80 sm:w-96",
          side === "left" && "left-0 top-0 h-full w-80 sm:w-96",
          side === "bottom" && "left-0 bottom-0 w-full h-3/5 rounded-t-lg",
          side === "top" && "left-0 top-0 w-full h-3/5 rounded-b-lg",
          className,
        )}
      />
    </Dialog.Portal>
  )
}

export const SheetHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-4 border-b pb-2">{children}</div>
)
export const SheetTitle = Dialog.Title
export const SheetDescription = Dialog.Description
export const SheetFooter = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-4 border-t pt-4">{children}</div>
)

export const SheetClose = Dialog.Close
