"use client"

import { useState } from "react"
import { createProduct } from "@/actions/data.actions"
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
import { Plus, Box } from "lucide-react"
import { toast } from "sonner"
import { LoadingButton } from "@/components/shared/loading-button"

export function AddProductDialog() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    stock_quantity: 0,
  })

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!formData.name || !formData.sku) {
      toast.error("Lütfen tüm zorunlu alanları doldurun.")
      return
    }

    setLoading(true)
    try {
      await createProduct(formData)
      await useDataStore.getState().fetchAll()
      toast.success("Ürün başarıyla kataloğa eklendi.")
      setOpen(false)
      setFormData({
        name: "",
        sku: "",
        stock_quantity: 0,
      })
    } catch (error: any) {
      console.error(error)
      toast.error(error.message || "Ürün eklenirken bir hata oluştu.")
    } finally {
      setLoading(false)
    }
  }

  const isFormValid = formData.name && formData.sku

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <LoadingButton variant="premium" size="lg" className="rounded-lg px-6">
          <Plus className="mr-2 h-5 w-5" /> Yeni Ürün
        </LoadingButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden rounded-lg border-none shadow-2xl">
        <form onSubmit={onSubmit}>
          <div className="p-8 space-y-6">
            <DialogHeader className="text-left space-y-1">
              <div className="flex items-center gap-2">
                <div className="bg-primary/10 p-2 rounded-lg text-primary">
                  <Box className="h-5 w-5" />
                </div>
                <DialogTitle className="text-2xl font-bold tracking-tight">Ürün Tanımla</DialogTitle>
              </div>
              <DialogDescription className="font-medium text-muted-foreground">
                Kataloğa yeni bir ürün ve başlangıç stoğu ekleyin.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground/60 px-1">
                  Stok Kodu (SKU)
                </label>
                <Input
                  placeholder="KAPAK-01"
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value.toUpperCase() })}
                  className="h-12 bg-muted/30 border-none focus-visible:ring-primary/40 rounded-lg px-4 uppercase font-mono"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground/60 px-1">
                  Başlangıç Stoku
                </label>
                <Input
                  type="number"
                  value={formData.stock_quantity}
                  onChange={(e) => setFormData({ ...formData, stock_quantity: parseInt(e.target.value) || 0 })}
                  className="h-12 bg-muted/30 border-none focus-visible:ring-primary/40 rounded-lg px-4"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground/60 px-1">
                Ürün Adı
              </label>
              <Input
                placeholder="Örn: Mavi Plastik Kapak"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="h-12 bg-muted/30 border-none focus-visible:ring-primary/40 rounded-lg px-4"
                required
              />
            </div>

            <DialogFooter className="pt-4">
              <LoadingButton 
                type="submit" 
                className="rounded-lg font-bold shadow-md transition-transform active:scale-95 px-8"
                loading={loading}
                disabled={!isFormValid}
              >
                Ürünü Kaydet
              </LoadingButton>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
