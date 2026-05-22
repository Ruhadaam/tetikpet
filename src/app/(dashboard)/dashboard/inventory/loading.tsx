import { GlassCard } from "@/components/shared/glass-card"
import { PageHeader } from "@/components/shared/page-header"
import { Skeleton } from "@/components/ui/skeleton"

export default function InventoryLoading() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Stok Durumu" 
        description="Veriler yükleniyor, lütfen bekleyin..."
      />

      <div className="flex items-center gap-4 py-4 mb-2">
        <Skeleton className="h-11 w-64 rounded-lg" />
      </div>

      <GlassCard noPadding>
        <div className="p-0">
          {/* Table Header Skeleton */}
          <div className="flex border-b p-5 gap-4">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/5" />
            <Skeleton className="h-4 w-1/5" />
            <Skeleton className="h-4 w-1/12 mx-auto" />
            <Skeleton className="h-4 w-1/12 ml-auto" />
          </div>
          
          {/* Table Rows Skeleton */}
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex border-b p-6 gap-4 items-center">
              <div className="flex flex-col gap-2 w-1/4">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
              <Skeleton className="h-6 w-1/5 rounded-md" />
              <Skeleton className="h-5 w-1/5" />
              <Skeleton className="h-8 w-12 rounded-lg mx-auto" />
              <Skeleton className="h-8 w-8 rounded-full ml-auto" />
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  )
}
