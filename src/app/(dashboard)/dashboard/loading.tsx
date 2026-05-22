import { GlassCard } from "@/components/shared/glass-card"
import { PageHeader } from "@/components/shared/page-header"
import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      <PageHeader 
        title="Genel Bakış" 
        description="Veriler hazırlanıyor..."
      />

      {/* Stats Grid Skeleton */}
      <div className="grid gap-6 md:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <GlassCard key={i} className="relative">
            <div className="flex items-center justify-between">
              <div className="space-y-2 w-full">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-10 w-16" />
              </div>
              <Skeleton className="h-14 w-14 rounded-lg" />
            </div>
            <div className="mt-4 flex items-center">
              <Skeleton className="h-3 w-32" />
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Recent Activities Skeleton */}
        <GlassCard title="Son Üretim Faaliyetleri" description="Yükleniyor..." noPadding>
          <div className="divide-y border-t">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center justify-between p-5">
                <div className="flex items-center gap-4 w-full">
                  <Skeleton className="h-10 w-10 rounded-lg flex-shrink-0" />
                  <div className="space-y-2 w-full">
                    <Skeleton className="h-5 w-1/2" />
                    <Skeleton className="h-3 w-1/3" />
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <Skeleton className="h-6 w-12 ml-auto" />
                  <Skeleton className="h-2 w-8 ml-auto" />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Performance Chart Skeleton */}
        <GlassCard title="Üretim Performansı" description="Yükleniyor...">
          <Skeleton className="h-[300px] w-full rounded-lg" />
        </GlassCard>
      </div>
    </div>
  )
}
