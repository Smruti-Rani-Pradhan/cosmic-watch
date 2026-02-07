import * as React from "react"
import { cn as utilsCn } from "../../lib/utils" 

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={utilsCn("rounded-xl border border-white/10 bg-space-900 text-white shadow-sm hover:border-accent-purple/50 transition-colors", className)}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={utilsCn("flex flex-col space-y-1.5 p-6", className)} {...props} />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3 ref={ref} className={utilsCn("font-semibold leading-none tracking-tight", className)} {...props} />
))
CardTitle.displayName = "CardTitle"

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={utilsCn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

export { Card, CardHeader, CardTitle, CardContent }