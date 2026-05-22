"use client"

import { useState } from "react"
import { deleteProduct, updateProduct } from "@/actions/data.actions"
import { Product } from "@/types"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MoreHorizontal, Pencil, Trash2, Box, AlertTriangle } from "lucide-react"
import { toast } from "sonner"
import { LoadingButton } from "@/components/shared/loading-button"

export function ProductActions({ 
  product
}: { 
  product: Product
}) {
  const [isUpdateOpen, setIsUpdateOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    name: product.name,
    sku: product.sku,
    stock_quantity: product.stock_quantity,
  })

  async function onUpdate(e: React.FormEvent) {
    e.preventDefault()
    if (!formData.name || !formData.sku) return

    setLoading(true)
    try {
      await updateProduct(product.id, formData)
      toast.success("Ürün başarıyla güncellendi.")
      setIsUpdateOpen(false)
    } catch (error: any) {
      toast.error(error.message || "Hata oluştu.")
    } finally {
      setLoading(false)
    }
  }

  async function onDelete() {
    setLoading(true)
    try {
      await deleteProduct(product.id)
      toast.success("Ürün silindi.")
      setIsDeleteOpen(false)
    } catch (error: any) {
      toast.error(error.message || "Hata oluştu.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-9 w-9 p-0 hover:bg-muted rounded-full">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[180px] rounded-lg shadow-xl border-none p-1.5">
          <DropdownMenuItem 
            onClick={() => setIsUpdateOpen(true)}
            className="rounded-lg py-2.5 cursor-pointer font-medium"
          >
            <Pencil className="mr-2 h-4 w-4 text-muted-foreground" /> Düzenle
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-destructive focus:text-destructive focus:bg-destructive/10 rounded-lg py-2.5 cursor-pointer font-medium"
            onClick={() => setIsDeleteOpen(true)}
          >
            <Trash2 className="mr-2 h-4 w-4" /> Sil
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Update Dialog */}
      <Dialog open={isUpdateOpen} onOpenChange={setIsUpdateOpen}>
        <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden rounded-lg border-none shadow-2xl">
          <form onSubmit={onUpdate}>
            <div className="p-8 space-y-6">
              <DialogHeader className="text-left space-y-1">
                <div className="flex items-center gap-2">
                  <div className="bg-primary/10 p-2 rounded-lg text-primary">
                    <Box className="h-5 w-5" />
                  </div>
                  <DialogTitle className="text-2xl font-bold tracking-tight">Ürünü Düzenle</DialogTitle>
                </div>
                <DialogDescription className="font-medium text-muted-foreground">
                  Katalog bilgilerini ve stok durumunu güncelleyin.
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground/60 px-1">
                    Stok Kodu (SKU)
                  </label>
                  <Input
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value.toUpperCase() })}
                    className="h-12 bg-muted/30 border-none focus-visible:ring-primary/40 rounded-lg px-4 uppercase font-mono"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground/60 px-1">
                    Mevcut Stok
                  </label>
                  <Input
                    type="number"
                    value={formData.stock_quantity}
                    onChange={(e) => setFormData({ ...formData, stock_quantity: parseInt(e.target.value) || 0 })}
                    className="h-12 bg-muted/30 border-none focus-visible:ring-primary/40 rounded-lg px-4 font-bold"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground/60 px-1">
                  Ürün Adı
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="h-12 bg-muted/30 border-none focus-visible:ring-primary/40 rounded-lg px-4"
                />
              </div>

              <DialogFooter className="gap-3 pt-4">
                <Button 
                  type="button" 
                  variant="ghost" 
                  onClick={() => setIsUpdateOpen(false)}
                  className="px-6 font-bold"
                >
                  İptal
                </Button>
                <LoadingButton 
                  type="submit" 
                  className="rounded-lg font-bold shadow-md px-8"
                  loading={loading}
                >
                  Güncellemeyi Kaydet
                </LoadingButton>
              </DialogFooter>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="sm:max-w-[400px] p-0 overflow-hidden rounded-lg border-none shadow-2xl">
          <div className="p-8 space-y-6">
            <DialogHeader className="text-left space-y-1">
              <div className="flex items-center gap-2">
                <div className="bg-destructive/10 p-2 rounded-lg text-destructive">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <DialogTitle className="text-2xl font-bold tracking-tight text-destructive">Ürünü Sil?</DialogTitle>
              </div>
              <DialogDescription className="font-medium text-muted-foreground">
                Katalogdan kalıcı olarak kaldırılacak.
              </DialogDescription>
            </DialogHeader>
            <p className="text-muted-foreground font-medium leading-relaxed">
              <strong className="text-foreground">{product.name}</strong> ({product.sku}) ürünü silinecek. Bu işlem geri alınamaz.
            </p>
            
            <DialogFooter className="gap-3 pt-4">
              <Button 
                type="button" 
                variant="ghost" 
                onClick={() => setIsDeleteOpen(false)}
                className="px-6 font-bold"
              >
                İptal
              </Button>
              <LoadingButton 
                variant="destructive" 
                onClick={onDelete} 
                loading={loading}
                className="rounded-lg font-bold shadow-md px-8"
              >
                Evet, Sil
              </LoadingButton>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

