"use client"

import { useState } from "react"
import { createCustomer } from "@/actions/data.actions"
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
import { Plus, UserPlus } from "lucide-react"
import { toast } from "sonner"
import { LoadingButton } from "@/components/shared/loading-button"

export function AddCustomerDialog() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  })

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!formData.name) {
      toast.error("Lütfen müşteri adını girin.")
      return
    }

    setLoading(true)
    try {
      await createCustomer(formData)
      await useDataStore.getState().fetchAll()
      toast.success("Müşteri başarıyla eklendi.")
      setOpen(false)
      setFormData({
        name: "",
        phone: "",
      })
    } catch (error: any) {
      console.error(error)
      toast.error(error.message || "Müşteri eklenirken bir hata oluştu.")
    } finally {
      setLoading(false)
    }
  }

  const isFormValid = formData.name.trim() !== ""

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <LoadingButton variant="premium" size="lg" className="rounded-lg px-6">
          <Plus className="mr-2 h-5 w-5" /> Yeni Müşteri
        </LoadingButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden rounded-lg border-none shadow-2xl">
        <form onSubmit={onSubmit}>
          <div className="p-8 space-y-6">
            <DialogHeader className="text-left space-y-1">
              <div className="flex items-center gap-2">
                <div className="bg-primary/10 p-2 rounded-lg text-primary">
                  <UserPlus className="h-5 w-5" />
                </div>
                <DialogTitle className="text-2xl font-bold tracking-tight">Yeni Müşteri</DialogTitle>
              </div>
              <DialogDescription className="font-medium text-muted-foreground">
                Sisteme yeni bir müşteri veya alıcı firma kaydedin.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-2">
              <label className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground/60 px-1">
                Firma / Müşteri Adı
              </label>
              <Input
                placeholder="Örn: X Otomotiv A.Ş."
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="h-12 bg-muted/30 border-none focus-visible:ring-primary/40 rounded-lg px-4 font-semibold"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground/60 px-1">
                Telefon Numarası
              </label>
              <Input
                placeholder="0555 123 4567"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="h-12 bg-muted/30 border-none focus-visible:ring-primary/40 rounded-lg px-4"
              />
            </div>

            <DialogFooter className="pt-4">
              <LoadingButton 
                type="submit" 
                className="rounded-lg font-bold shadow-md transition-transform active:scale-95 px-8"
                loading={loading}
                disabled={!isFormValid}
              >
                Müşteriyi Kaydet
              </LoadingButton>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
