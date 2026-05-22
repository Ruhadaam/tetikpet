"use client"

import { useState } from "react"
import { deleteMachine, updateMachine } from "@/actions/data.actions"
import { Machine } from "@/types"
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
import { MoreHorizontal, Pencil, Trash2, Cpu, AlertTriangle } from "lucide-react"
import { toast } from "sonner"
import { LoadingButton } from "@/components/shared/loading-button"

export function MachineActions({ machine }: { machine: Machine }) {
  const [isUpdateOpen, setIsUpdateOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState(machine.name)

  async function onUpdate(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) return

    setLoading(true)
    try {
      await updateMachine(machine.id, name.trim())
      toast.success("Makine başarıyla güncellendi.")
      setIsUpdateOpen(false)
    } catch (error: any) {
      toast.error(error.message || "Güncelleme sırasında bir hata oluştu.")
    } finally {
      setLoading(false)
    }
  }

  async function onDelete() {
    setLoading(true)
    try {
      await deleteMachine(machine.id)
      toast.success("Makine silindi.")
      setIsDeleteOpen(false)
    } catch (error: any) {
      toast.error(error.message || "Silme sırasında bir hata oluştu.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-9 w-9 p-0 hover:bg-muted rounded-full">
            <span className="sr-only">Menüyü aç</span>
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
        <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden rounded-lg border-none shadow-2xl">
          <form onSubmit={onUpdate}>
            <div className="p-8 space-y-6">
              <DialogHeader className="text-left space-y-1">
                <div className="flex items-center gap-2">
                  <div className="bg-primary/10 p-2 rounded-lg text-primary">
                    <Cpu className="h-5 w-5" />
                  </div>
                  <DialogTitle className="text-2xl font-bold tracking-tight">Makineyi Düzenle</DialogTitle>
                </div>
                <DialogDescription className="font-medium text-muted-foreground">
                  Makine bilgilerini güncelleyin.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-3">
                <label className="text-xs font-bold tracking-widest uppercase text-muted-foreground/60 px-1">
                  Makine Adı
                </label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Makine adı..."
                  autoFocus
                  className="h-14 text-lg bg-muted/30 border-none focus-visible:ring-primary/40 rounded-lg px-5"
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
                  Değişiklikleri Kaydet
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
                <DialogTitle className="text-2xl font-bold tracking-tight text-destructive">Emin misiniz?</DialogTitle>
              </div>
              <DialogDescription className="font-medium text-muted-foreground">
                Bu işlem geri alınamaz.
              </DialogDescription>
            </DialogHeader>
            <p className="text-muted-foreground font-medium leading-relaxed">
              <strong className="text-foreground">{machine.name}</strong> makinesi kalıcı olarak silinecek. Bu makineye bağlı tüm veriler etkilenebilir.
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

