"use client"

import { useState } from "react"
import { createMachine } from "@/actions/data.actions"
import { useDataStore } from "@/stores/use-data-store"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Plus, Cpu } from "lucide-react"
import { toast } from "sonner"
import { LoadingButton } from "@/components/shared/loading-button"

export function AddMachineDialog() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState("")

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) {
      toast.error("Lütfen bir makine adı girin.")
      return
    }

    setLoading(true)
    try {
      await createMachine(name.trim())
      await useDataStore.getState().fetchAll()
      toast.success("Makine başarıyla eklendi.")
      setOpen(false)
      setName("")
    } catch (error: any) {
      console.error(error)
      toast.error(error.message || "Makine eklenirken bir hata oluştu.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <LoadingButton variant="premium" size="lg" className="rounded-lg px-6">
          <Plus className="mr-2 h-5 w-5" /> Yeni Makine
        </LoadingButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden rounded-lg border-none shadow-2xl">
        <form onSubmit={onSubmit}>
          <div className="p-8 space-y-6">
            <DialogHeader className="text-left space-y-1">
              <div className="flex items-center gap-2">
                <div className="bg-primary/10 p-2 rounded-lg text-primary">
                  <Cpu className="h-5 w-5" />
                </div>
                <DialogTitle className="text-2xl font-bold tracking-tight">Makine Ekle</DialogTitle>
              </div>
              <DialogDescription className="font-medium text-muted-foreground">
                Üretim hattınıza yeni bir güç katın.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3">
              <label htmlFor="name" className="text-xs font-bold tracking-widest uppercase text-muted-foreground/60 px-1">
                Makine Tanımlayıcı Adı
              </label>
              <Input
                id="name"
                placeholder="Örn: CNC-01 (Torna)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
                className="h-14 text-lg bg-muted/30 border-none focus-visible:ring-primary/40 rounded-lg px-5"
              />
            </div>
            
            <DialogFooter className="pt-4">
              <LoadingButton 
                type="submit" 
                className="rounded-lg font-bold shadow-md transition-transform active:scale-95 px-8"
                loading={loading}
              >
                Sisteme Kaydet
              </LoadingButton>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
