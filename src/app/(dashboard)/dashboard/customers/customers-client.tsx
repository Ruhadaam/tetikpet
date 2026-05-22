"use client"

import { useDataStore } from "@/stores/use-data-store"
import { AddCustomerDialog } from "./add-customer-dialog"
import { CustomerActions } from "./customer-actions"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Search, Phone } from "lucide-react"
import { Input } from "@/components/ui/input"
import { GlassCard } from "@/components/shared/glass-card"
import { useState } from "react"

export function CustomersClient() {
  const { customers } = useDataStore()
  const [search, setSearch] = useState("")

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.phone.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <div className="flex items-center gap-4 py-4 mb-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Müşteri adı veya telefon ara..." 
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
              <TableHead className="py-5 px-6 font-bold text-xs uppercase tracking-wider">Firma / Müşteri Adı</TableHead>
              <TableHead className="py-5 font-bold text-xs uppercase tracking-wider">Telefon</TableHead>
              <TableHead className="py-5 text-right px-6 font-bold text-xs uppercase tracking-wider">İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((customer) => (
                <TableRow key={customer.id} className="group hover:bg-muted/30 transition-colors border-b last:border-0">
                  <TableCell className="py-5 px-6">
                    <span className="font-semibold text-base">{customer.name}</span>
                  </TableCell>
                  <TableCell className="py-5">
                    <div className="flex items-center gap-2 text-muted-foreground font-medium">
                      <Phone className="h-4 w-4" />
                      {customer.phone || "Belirtilmemiş"}
                    </div>
                  </TableCell>
                  <TableCell className="py-5 text-right px-6">
                    <CustomerActions customer={customer} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="h-40 text-center text-muted-foreground italic">
                  {search ? "Arama kriterine uygun müşteri bulunamadı." : "Henüz müşteri eklenmemiş."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </GlassCard>
    </>
  )
}
