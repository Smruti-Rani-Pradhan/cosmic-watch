import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "../../lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        destructive: "border-transparent bg-red-900/50 text-red-100 border-red-500/50 hover:bg-red-900/70",
        warning: "border-transparent bg-orange-900/50 text-orange-100 border-orange-500/50 hover:bg-orange-900/70",
        success: "border-transparent bg-green-900/50 text-green-100 border-green-500/50 hover:bg-green-900/70",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({ className, variant, ...props }) {
  return (<div className={cn(badgeVariants({ variant }), className)} {...props} />)
}

export { Badge, badgeVariants }