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
import { Clock, History, User, PackageMinus } from "lucide-react"
import { formatNumber } from "@/lib/utils"

export function RecentDispatchesClient() {
  const { dispatches, products } = useDataStore()

  // Get today's dispatches for the summary
  const todayDispatches = dispatches.filter(d => 
    new Date(d.created_at).toDateString() === new Date().toDateString()
  )

  const totalToday = todayDispatches.reduce((acc, curr) => acc + curr.quantity, 0)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-black tracking-tight flex items-center gap-2">
          <History className="h-5 w-5 text-primary" /> Son Sevkiyat Kayıtları
        </h3>
        <div className="bg-destructive/10 text-destructive px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-widest">
          Bugün Çıkan: {formatNumber(totalToday)} Adet
        </div>
      </div>

      <GlassCard noPadding className="border-primary/5">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-b">
              <TableHead className="py-4 px-6 font-bold text-[10px] uppercase tracking-[0.2em]">Zaman</TableHead>
              <TableHead className="py-4 font-bold text-[10px] uppercase tracking-[0.2em]">Ürün</TableHead>
              <TableHead className="py-4 font-bold text-[10px] uppercase tracking-[0.2em]">Alıcı / Müşteri</TableHead>
              <TableHead className="py-4 text-center font-bold text-[10px] uppercase tracking-[0.2em]">Adet</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dispatches.length > 0 ? (
              dispatches.map((d) => (
                <TableRow key={d.id} className="group hover:bg-destructive/[0.02] transition-colors border-b last:border-0">
                  <TableCell className="py-4 px-6">
                    <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {new Date(d.created_at).toLocaleDateString("tr-TR")}
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <span className="font-bold text-base">
                      {products.find(prod => prod.id === d.product_id)?.name || "---"}
                    </span>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex items-center gap-2 font-semibold text-muted-foreground">
                      <User className="h-3 w-3" />
                      {d.customers?.name || "Silinmiş Müşteri"}
                    </div>
                  </TableCell>
                  <TableCell className="py-4 text-center">
                    <span className="text-lg font-black text-destructive tabular-nums flex items-center justify-center gap-1">
                      <PackageMinus className="h-4 w-4" />
                      -{formatNumber(d.quantity)}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-32 text-center text-muted-foreground italic">
                  Henüz sevkiyat kaydı bulunmuyor.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </GlassCard>
    </div>
  )
}
