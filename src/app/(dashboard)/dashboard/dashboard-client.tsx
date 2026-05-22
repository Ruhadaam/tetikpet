"use client"

import { useDataStore } from "@/stores/use-data-store"
import { GlassCard } from "@/components/shared/glass-card"
import { 
  Cpu, 
  Package, 
  TrendingUp, 
  Activity,
  ArrowUpRight,
  Clock
} from "lucide-react"

export function DashboardClient() {
  const { machines, products, productions } = useDataStore()

  const stats = [
    {
      label: "Toplam Makine",
      value: machines.length,
      icon: Cpu,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      label: "Kayıtlı Ürün",
      value: products.length,
      icon: Package,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
    {
      label: "Günlük Üretim",
      value: productions.filter(p => 
        new Date(p.created_at).toDateString() === new Date().toDateString()
      ).reduce((acc, curr) => acc + curr.quantity, 0),
      icon: TrendingUp,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
  ]

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((stat) => (
          <GlassCard key={stat.label} className="relative group">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
                  {stat.label}
                </p>
                <p className="text-4xl font-black tracking-tight">{stat.value}</p>
              </div>
              <div className={`${stat.bg} ${stat.color} p-4 rounded-lg transition-transform group-hover:scale-110 duration-300`}>
                <stat.icon className="h-8 w-8" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs font-medium text-emerald-600">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              <span>Son 24 saatte %12 artış</span>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <GlassCard 
          title="Son Üretim Faaliyetleri" 
          description="Tesis genelinde gerçekleşen son 5 üretim kaydı."
          noPadding
        >
          <div className="divide-y border-t bg-muted/5">
            {productions.slice(0, 5).map((p) => (
              <div key={p.id} className="flex items-center justify-between p-5 hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/5 p-2.5 rounded-lg text-primary">
                    <Activity className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-bold text-base leading-tight">
                      {products.find(prod => prod.id === p.product_id)?.name || "Bilinmeyen Ürün"}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium mt-1">
                      <Clock className="h-3 w-3" />
                      <span>{new Date(p.created_at).toLocaleTimeString("tr-TR")}</span>
                      <span className="opacity-30">•</span>
                      <span>{machines.find(m => m.id === p.machine_id)?.name || "Bilinmeyen Makine"}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-black text-primary">+{p.quantity}</p>
                  <p className="text-[10px] font-bold uppercase text-muted-foreground/60 tracking-wider">Adet</p>
                </div>
              </div>
            ))}
            {productions.length === 0 && (
              <div className="p-10 text-center text-muted-foreground italic">
                Henüz üretim kaydı bulunamadı.
              </div>
            )}
          </div>
        </GlassCard>

        <GlassCard 
          title="Üretim Performansı" 
          description="Haftalık bazda makinelerin doluluk oranı."
        >
          <div className="h-[300px] flex items-center justify-center border-2 border-dashed rounded-lg bg-muted/10">
            <div className="text-center space-y-2">
              <TrendingUp className="h-10 w-10 text-muted-foreground mx-auto opacity-20" />
              <p className="text-muted-foreground font-medium italic">Grafik verileri hazırlanıyor...</p>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
