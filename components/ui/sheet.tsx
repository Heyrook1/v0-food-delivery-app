"use client"

import type React from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { cn } from "@/lib/utils"

export function Sheet({ children, ...props }: Dialog.DialogProps) {
  return <Dialog.Root {...props}>{children}</Dialog.Root>
}

export function SheetTrigger({ children, ...props }: React.ComponentPropsWithoutRef<typeof Dialog.Trigger>) {
  return <Dialog.Trigger {...props}>{children}</Dialog.Trigger>
}

export function SheetClose({ children, ...props }: React.ComponentPropsWithoutRef<typeof Dialog.Close>) {
  return <Dialog.Close {...props}>{children}</Dialog.Close>
}

export function SheetPortal({ children }: { children: React.ReactNode }) {
  return <Dialog.Portal>{children}</Dialog.Portal>
}

export function SheetOverlay({ className, ...props }: React.ComponentPropsWithoutRef<typeof Dialog.Overlay>) {
  return (
    <Dialog.Overlay
      className={cn("fixed inset-0 z-50 bg-black/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className)}
      {...props}
    />
  )
}

export function SheetContent({
  side = "right",
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Dialog.Content> & {
  side?: "left" | "right" | "top" | "bottom"
}) {
  return (
    <Dialog.Portal>
      <SheetOverlay />
      <Dialog.Content
        className={cn(
          "fixed z-50 bg-white shadow-xl outline-none overflow-y-auto p-6",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          side === "right" && "right-0 top-0 h-full w-80 sm:w-96 data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
          side === "left"  && "left-0 top-0 h-full w-80 sm:w-96 data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left",
          side === "bottom" && "bottom-0 left-0 w-full max-h-[60vh] rounded-t-xl data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
          side === "top"   && "top-0 left-0 w-full max-h-[60vh] rounded-b-xl data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
          className,
        )}
        {...props}
      >
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  )
}

export function SheetHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col gap-1.5 mb-4", className)} {...props}>
      {children}
    </div>
  )
}

export function SheetFooter({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col gap-2 mt-4 pt-4 border-t", className)} {...props}>
      {children}
    </div>
  )
}

export function SheetTitle({ className, children, ...props }: React.ComponentPropsWithoutRef<typeof Dialog.Title>) {
  return (
    <Dialog.Title className={cn("text-lg font-semibold", className)} {...props}>
      {children}
    </Dialog.Title>
  )
}

export function SheetDescription({ className, children, ...props }: React.ComponentPropsWithoutRef<typeof Dialog.Description>) {
  return (
    <Dialog.Description className={cn("text-sm text-muted-foreground", className)} {...props}>
      {children}
    </Dialog.Description>
  )
}

export default Sheet
