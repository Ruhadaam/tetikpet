"use client"

import { useDataStore } from "@/stores/use-data-store"
import { MachineActions } from "./machine-actions"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { GlassCard } from "@/components/shared/glass-card"

export function MachinesClient() {
  const { machines } = useDataStore()

  return (
    <GlassCard noPadding className="mt-8">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-b">
            <TableHead className="py-5 px-6 font-bold text-xs uppercase tracking-wider">Makine Adı</TableHead>
            <TableHead className="py-5 font-bold text-xs uppercase tracking-wider">Kayıt Tarihi</TableHead>
            <TableHead className="py-5 text-right px-6 font-bold text-xs uppercase tracking-wider">İşlemler</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {machines.length > 0 ? (
            machines.map((machine) => (
              <TableRow key={machine.id} className="group hover:bg-muted/30 transition-colors border-b last:border-0">
                <TableCell className="py-5 px-6">
                  <span className="font-bold text-base text-foreground leading-none">{machine.name}</span>
                </TableCell>
                <TableCell className="py-5">
                  <span className="text-sm font-medium text-muted-foreground">
                    {new Date(machine.created_at).toLocaleDateString("tr-TR")}
                  </span>
                </TableCell>
                <TableCell className="py-5 text-right px-6">
                  <MachineActions machine={machine} />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="h-40 text-center text-muted-foreground italic">
                Sisteme henüz makine tanımlanmamış.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </GlassCard>
  )
}
