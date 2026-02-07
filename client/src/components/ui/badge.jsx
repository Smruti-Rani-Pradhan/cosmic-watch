import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "../../lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-lg border px-2.5 py-0.5 text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-accent-purple/50 focus:ring-offset-2 focus:ring-offset-space-950",
  {
    variants: {
      variant: {
        default: "border-transparent bg-accent-purple/20 text-accent-purple shadow hover:bg-accent-purple/30",
        destructive: "border-red-500/40 bg-red-500/20 text-red-300 shadow-[0_0_12px_-4px_rgba(239,68,68,0.3)] hover:bg-red-500/30",
        warning: "border-amber-500/40 bg-amber-500/20 text-amber-200 hover:bg-amber-500/30",
        success: "border-green-500/40 bg-green-500/20 text-green-300 hover:bg-green-500/30",
        secondary: "border-white/10 bg-white/[0.06] text-gray-300 hover:bg-white/[0.08]",
        outline: "border-white/20 text-white hover:bg-white/[0.06]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Badge = React.forwardRef(({ className, variant, ...props }, ref) => {
  return <div ref={ref} className={cn(badgeVariants({ variant }), className)} {...props} />
})
Badge.displayName = "Badge"

export { Badge, badgeVariants }