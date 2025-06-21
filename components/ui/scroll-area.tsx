"use client"

import React from "react"

import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"
import { cn } from "@/lib/utils"

/**
 * ScrollArea – a thin wrapper around @radix-ui/react-scroll-area
 * – exported as *named* components to match existing imports.
 */

export interface ScrollAreaProps extends React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> {
  /** Optional className merged with defaults */
  className?: string
}

/** Root area that adds custom scrollbar styles */
export const ScrollArea = React.forwardRef<React.ElementRef<typeof ScrollAreaPrimitive.Root>, ScrollAreaProps>(
  function ScrollArea({ className, children, ...props }, ref) {
    return (
      <ScrollAreaPrimitive.Root ref={ref} className={cn("relative overflow-hidden", className)} {...props}>
        <ScrollAreaPrimitive.Viewport className="h-full w-full">{children}</ScrollAreaPrimitive.Viewport>
        <ScrollBar />
        <ScrollAreaPrimitive.Corner className="bg-border" />
      </ScrollAreaPrimitive.Root>
    )
  },
)

/** Horizontal/vertical scrollbar (exported so CategoryFilter can import it) */
export const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Scrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Scrollbar>
>(function ScrollBar({ className, orientation = "horizontal", ...props }, ref) {
  return (
    <ScrollAreaPrimitive.Scrollbar
      ref={ref}
      orientation={orientation}
      className={cn(
        "flex select-none touch-none p-0.5 bg-transparent transition-colors",
        orientation === "vertical" && "h-full w-2.5 border-l border-border",
        orientation === "horizontal" && "h-2.5 w-full border-t border-border",
        className,
      )}
      {...props}
    >
      <ScrollAreaPrimitive.Thumb className="flex-1 rounded-full bg-muted-foreground" />
    </ScrollAreaPrimitive.Scrollbar>
  )
})
ScrollBar.displayName = "ScrollBar"
