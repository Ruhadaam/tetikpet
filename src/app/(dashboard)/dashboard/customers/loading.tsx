import { GlassCard } from "@/components/shared/glass-card"
import { PageHeader } from "@/components/shared/page-header"
import { Skeleton } from "@/components/ui/skeleton"

export default function CustomersLoading() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b pb-6">
        <PageHeader 
          title="Müşteri Yönetimi" 
          description="Veriler yükleniyor, lütfen bekleyin..."
        />
        <Skeleton className="h-11 w-36 rounded-lg" />
      </div>

      <div className="flex items-center gap-4 py-4 mb-2">
        <Skeleton className="h-11 w-80 rounded-lg" />
      </div>

      <GlassCard noPadding>
        <div className="p-0">
          {/* Table Header Skeleton */}
          <div className="flex border-b p-5 gap-4">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-1/12 ml-auto" />
          </div>
          
          {/* Table Rows Skeleton */}
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex border-b p-6 gap-4 items-center">
              <Skeleton className="h-5 w-1/4" />
              <Skeleton className="h-5 w-1/4" />
              <Skeleton className="h-8 w-8 rounded-full ml-auto" />
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  )
}
