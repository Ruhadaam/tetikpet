import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  children: React.ReactNode
  noPadding?: boolean
}

export function GlassCard({
  title,
  description,
  children,
  noPadding = false,
  className,
  ...props
}: GlassCardProps) {
  return (
    <Card 
      className={cn(
        "border bg-card/40 backdrop-blur-md shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:bg-card/50 rounded-lg",
        className
      )}
      {...props}
    >
      {(title || description) && (
        <CardHeader className="border-b bg-muted/20 pb-4">
          {title && <CardTitle className="text-xl font-bold tracking-tight">{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent className={cn("p-0", !noPadding && "p-6")}>
        {children}
      </CardContent>
    </Card>
  )
}
