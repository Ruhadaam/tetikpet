import { GlassCard } from "@/components/shared/glass-card"
import { PageHeader } from "@/components/shared/page-header"
import { Skeleton } from "@/components/ui/skeleton"

export default function MachinesLoading() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Makineler" 
        description="Makine listesi hazırlanıyor..."
      />

      <GlassCard noPadding>
        <div className="p-0">
          {/* Table Header Skeleton */}
          <div className="flex border-b p-5 gap-4">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-12 ml-auto" />
          </div>
          
          {/* Table Rows Skeleton */}
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex border-b p-6 gap-4 items-center">
              <Skeleton className="h-6 w-1/3 rounded-md" />
              <Skeleton className="h-5 w-1/4" />
              <Skeleton className="h-8 w-8 rounded-full ml-auto" />
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  )
}
