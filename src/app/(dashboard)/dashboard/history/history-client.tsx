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
import { Clock, Calendar, Activity } from "lucide-react"

export function HistoryClient() {
  const { productions, products, machines } = useDataStore()

  return (
    <GlassCard noPadding className="mt-8">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-b">
            <TableHead className="py-5 px-6 font-bold text-xs uppercase tracking-wider">Tarih & Saat</TableHead>
            <TableHead className="py-5 font-bold text-xs uppercase tracking-wider">Üretilen Ürün</TableHead>
            <TableHead className="py-5 font-bold text-xs uppercase tracking-wider">Makine</TableHead>
            <TableHead className="py-5 text-center font-bold text-xs uppercase tracking-wider">Miktar</TableHead>
            <TableHead className="py-5 text-right px-6 font-bold text-xs uppercase tracking-wider">Durum</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {productions.length > 0 ? (
            productions.map((p) => (
              <TableRow key={p.id} className="group hover:bg-muted/30 transition-colors border-b last:border-0">
                <TableCell className="py-5 px-6">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 font-bold text-foreground">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      {new Date(p.created_at).toLocaleDateString("tr-TR")}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1 font-medium">
                      <Clock className="h-3 w-3" />
                      {new Date(p.created_at).toLocaleTimeString("tr-TR", { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-5">
                  <div className="flex flex-col">
                    <span className="font-bold text-base">
                      {products.find(prod => prod.id === p.product_id)?.name || "Bilinmeyen Ürün"}
                    </span>
                    <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mt-0.5">
                      SKU: {products.find(prod => prod.id === p.product_id)?.sku || "---"}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="py-5">
                  <span className="font-semibold text-muted-foreground">
                    {machines.find(m => m.id === p.machine_id)?.name || "Bilinmeyen Makine"}
                  </span>
                </TableCell>
                <TableCell className="py-5 text-center">
                  <span className="text-xl font-black text-primary tabular-nums">
                    {p.quantity.toLocaleString()}
                  </span>
                </TableCell>
                <TableCell className="py-5 text-right px-6">
                  <div className="inline-flex items-center rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-bold text-emerald-600 border border-emerald-500/20">
                    Tamamlandı
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="h-60 text-center text-muted-foreground italic">
                <div className="flex flex-col items-center gap-2 opacity-50">
                  <Activity className="h-10 w-10 mb-2" />
                  <p>Henüz herhangi bir üretim kaydı bulunmuyor.</p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </GlassCard>
  )
}
