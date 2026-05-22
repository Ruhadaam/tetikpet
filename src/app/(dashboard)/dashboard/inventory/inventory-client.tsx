"use client"

import { useDataStore } from "@/stores/use-data-store"
import { AddProductDialog } from "./add-product-dialog"
import { ProductActions } from "./product-actions"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { GlassCard } from "@/components/shared/glass-card"
import { useState } from "react"

export function InventoryClient() {
  const { products } = useDataStore()
  const [search, setSearch] = useState("")

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.sku.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <div className="flex items-center gap-4 py-4 mb-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Ürün veya SKU ara..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-11 bg-card/50 border-none shadow-sm rounded-lg"
          />
        </div>
      </div>

      <GlassCard noPadding>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-b">
              <TableHead className="py-5 px-6 font-bold text-xs uppercase tracking-wider">Ürün Adı</TableHead>
              <TableHead className="py-5 font-bold text-xs uppercase tracking-wider">Stok Kodu (SKU)</TableHead>
              <TableHead className="py-5 text-center font-bold text-xs uppercase tracking-wider">Mevcut Stok</TableHead>
              <TableHead className="py-5 text-right px-6 font-bold text-xs uppercase tracking-wider">İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <TableRow key={product.id} className="group hover:bg-muted/30 transition-colors border-b last:border-0">
                  <TableCell className="py-5 px-6">
                    <div className="flex flex-col">
                      <span className="font-semibold text-base">{product.name}</span>
                      {product.stock_quantity < 10 && (
                        <span className="text-[10px] text-destructive font-bold uppercase tracking-widest mt-0.5">Kritik Stok</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="py-5">
                    <code className="rounded-md bg-muted px-2 py-1 text-xs font-mono font-bold text-muted-foreground border border-muted-foreground/10">
                      {product.sku}
                    </code>
                  </TableCell>
                  <TableCell className="py-5 text-center">
                    <span className={product.stock_quantity < 10 ? "text-lg font-black text-destructive tabular-nums" : "text-lg font-bold tabular-nums"}>
                      {product.stock_quantity.toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell className="py-5 text-right px-6">
                    <ProductActions product={product} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-40 text-center text-muted-foreground italic">
                  {search ? "Arama kriterine uygun ürün bulunamadı." : "Henüz ürün eklenmemiş."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </GlassCard>
    </>
  )
}
