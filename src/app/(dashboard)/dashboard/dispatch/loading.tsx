import { GlassCard } from "@/components/shared/glass-card"
import { PageHeader } from "@/components/shared/page-header"
import { Skeleton } from "@/components/ui/skeleton"

export default function DispatchLoading() {
  return (
    <div className="space-y-12">
      <PageHeader 
        title="Sevkiyat Girişi" 
        description="Sistem hazırlanıyor..."
      />

      <div className="space-y-16">
        {/* Form Skeleton */}
        <div className="max-w-5xl mx-auto w-full">
          <GlassCard className="border border-input shadow-sm rounded-lg bg-white/50">
            <div className="p-6 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Left Column Skeletons */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-12 w-full rounded-lg" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-3 w-28" />
                    <Skeleton className="h-12 w-full rounded-lg" />
                  </div>
                </div>

                {/* Right Column Skeletons */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Skeleton className="h-3 w-20" />
                    <div className="flex gap-2">
                      <Skeleton className="h-12 flex-1 rounded-lg" />
                      <Skeleton className="h-12 w-12 rounded-lg" />
                      <Skeleton className="h-12 w-12 rounded-lg" />
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    <Skeleton className="h-10 w-full rounded-lg" />
                    <Skeleton className="h-10 w-full rounded-lg" />
                    <Skeleton className="h-10 w-full rounded-lg" />
                    <Skeleton className="h-10 w-full rounded-lg" />
                  </div>
                </div>
              </div>

              {/* Button Skeleton */}
              <div className="pt-4 flex justify-end">
                <Skeleton className="h-12 w-48 rounded-lg" />
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Table Skeleton */}
        <div className="max-w-5xl mx-auto pt-8 w-full border-t border-primary/5">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-6 w-32 rounded-lg" />
            </div>

            <GlassCard noPadding className="border-primary/5">
              <div className="p-0">
                <div className="flex border-b p-4 gap-4 bg-muted/30">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-4 w-1/6 ml-auto" />
                </div>
                
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex border-b p-4 gap-4 items-center">
                    <Skeleton className="h-5 w-1/5" />
                    <Skeleton className="h-5 w-1/4" />
                    <Skeleton className="h-5 w-1/4" />
                    <Skeleton className="h-6 w-1/6 ml-auto" />
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  )
}
