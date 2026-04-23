"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SheetProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children?: React.ReactNode
}

export function Sheet({ open = false, onOpenChange, children }: SheetProps) {
  return (
    <SheetContext.Provider value={{ open, onOpenChange }}>
      {children}
    </SheetContext.Provider>
  )
}

interface SheetContextValue {
  open: boolean
  onOpenChange?: (open: boolean) => void
}

const SheetContext = React.createContext<SheetContextValue>({ open: false })

function useSheet() {
  return React.useContext(SheetContext)
}

export function SheetTrigger({
  children,
  asChild,
  className,
  ...props
}: React.HTMLAttributes<HTMLButtonElement> & { asChild?: boolean }) {
  const { onOpenChange } = useSheet()
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<React.HTMLAttributes<HTMLElement>>, {
      onClick: () => onOpenChange?.(true),
    })
  }
  return (
    <button
      type="button"
      className={cn("cursor-pointer", className)}
      onClick={() => onOpenChange?.(true)}
      {...props}
    >
      {children}
    </button>
  )
}

export function SheetClose({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLButtonElement>) {
  const { onOpenChange } = useSheet()
  return (
    <button
      type="button"
      className={cn("cursor-pointer", className)}
      onClick={() => onOpenChange?.(false)}
      {...props}
    >
      {children}
    </button>
  )
}

export function SheetContent({
  side = "right",
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  side?: "left" | "right" | "top" | "bottom"
}) {
  const { open, onOpenChange } = useSheet()

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [open])

  if (!open) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
        onClick={() => onOpenChange?.(false)}
        aria-hidden="true"
      />
      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          "fixed z-50 bg-white shadow-xl overflow-y-auto p-6 flex flex-col",
          side === "right"  && "right-0 top-0 h-full w-80 sm:w-96",
          side === "left"   && "left-0 top-0 h-full w-80 sm:w-96",
          side === "bottom" && "bottom-0 left-0 w-full max-h-[80vh] rounded-t-2xl",
          side === "top"    && "top-0 left-0 w-full max-h-[80vh] rounded-b-2xl",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </>
  )
}

export function SheetHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col gap-1.5 mb-4 pb-2 border-b", className)} {...props}>
      {children}
    </div>
  )
}

export function SheetFooter({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col gap-2 mt-auto pt-4", className)} {...props}>
      {children}
    </div>
  )
}

export function SheetTitle({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2 className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props}>
      {children}
    </h2>
  )
}

export function SheetDescription({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)} {...props}>
      {children}
    </p>
  )
}

export function SheetPortal({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

export function SheetOverlay({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("fixed inset-0 z-50 bg-black/40 backdrop-blur-sm", className)}
      {...props}
    />
  )
}

export default Sheet
