import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-accent-purple text-white shadow-[0_0_32px_-8px_rgba(139,92,246,0.5)] hover:bg-violet-500 hover:shadow-[0_0_40px_-8px_rgba(139,92,246,0.7)] hover:-translate-y-0.5",
        destructive:
          "bg-red-500/90 text-white shadow-sm hover:bg-red-500 hover:-translate-y-0.5",
        outline:
          "border border-white/10 bg-white/[0.06] hover:bg-white/[0.08] hover:border-white/20 text-white",
        secondary:
          "bg-white/[0.06] text-white hover:bg-white/[0.08] hover:-translate-y-0.5",
        ghost: "text-gray-400 hover:bg-white/[0.06] hover:text-white",
        link: "text-accent-purple underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-lg px-3",
        lg: "h-12 rounded-xl px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button, buttonVariants }
