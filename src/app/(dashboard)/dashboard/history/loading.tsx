import { GlassCard } from "@/components/shared/glass-card"
import { PageHeader } from "@/components/shared/page-header"
import { Skeleton } from "@/components/ui/skeleton"

export default function HistoryLoading() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Üretim Geçmişi" 
        description="Kayıtlar dökülüyor..."
      />

      <GlassCard noPadding>
        <div className="p-0">
          {/* Table Header Skeleton */}
          <div className="flex border-b p-5 gap-4">
            <Skeleton className="h-4 w-1/6" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/6" />
            <Skeleton className="h-4 w-12 mx-auto" />
            <Skeleton className="h-4 w-20 ml-auto" />
          </div>
          
          {/* Table Rows Skeleton */}
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex border-b p-6 gap-4 items-center">
              <div className="space-y-2 w-1/6">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
              <div className="space-y-2 w-1/4">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
              <Skeleton className="h-5 w-1/6" />
              <Skeleton className="h-8 w-12 rounded-lg mx-auto" />
              <Skeleton className="h-6 w-20 rounded-full ml-auto" />
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  )
}
