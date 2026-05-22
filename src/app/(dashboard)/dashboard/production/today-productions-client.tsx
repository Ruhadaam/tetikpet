"use client"

import { useDataStore } from "@/stores/use-data-store"
import { GlassCard } from "@/components/shared/glass-card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Clock, Activity, History } from "lucide-react"

import { formatNumber } from "@/lib/utils"

export function TodayProductionsClient() {
  const { productions, products, machines } = useDataStore()

  const todayProductions = productions.filter(p => 
    new Date(p.created_at).toDateString() === new Date().toDateString()
  )

  const totalQuantity = todayProductions.reduce((acc, curr) => acc + curr.quantity, 0)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-black tracking-tight flex items-center gap-2">
          <History className="h-5 w-5 text-primary" /> Bugünün Üretim Kayıtları
        </h3>
        <div className="bg-primary/10 text-primary px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-widest">
          Toplam: {formatNumber(totalQuantity)} Adet
        </div>
      </div>

      <GlassCard noPadding className="border-primary/5">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-b">
              <TableHead className="py-4 px-6 font-bold text-[10px] uppercase tracking-[0.2em]">Saat</TableHead>
              <TableHead className="py-4 font-bold text-[10px] uppercase tracking-[0.2em]">Ürün</TableHead>
              <TableHead className="py-4 font-bold text-[10px] uppercase tracking-[0.2em]">Makine</TableHead>
              <TableHead className="py-4 text-center font-bold text-[10px] uppercase tracking-[0.2em]">Adet</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {todayProductions.length > 0 ? (
              todayProductions.map((p) => (
                <TableRow key={p.id} className="group hover:bg-primary/[0.02] transition-colors border-b last:border-0">
                  <TableCell className="py-4 px-6">
                    <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {new Date(p.created_at).toLocaleTimeString("tr-TR", { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <span className="font-bold text-base">
                      {products.find(prod => prod.id === p.product_id)?.name || "---"}
                    </span>
                  </TableCell>
                  <TableCell className="py-4">
                    <span className="font-semibold text-muted-foreground">
                      {machines.find(m => m.id === p.machine_id)?.name || "---"}
                    </span>
                  </TableCell>
                  <TableCell className="py-4 text-center">
                    <span className="text-lg font-black text-primary tabular-nums">
                      +{formatNumber(p.quantity)}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-32 text-center text-muted-foreground italic">
                  Henüz bugün için üretim girişi yapılmadı.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </GlassCard>
    </div>
  )
}
