"use client";

import { useState } from "react";
import { Product, Machine } from "@/types";
import { useDataStore } from "@/stores/use-data-store";
import { createProduction } from "@/actions/data.actions";
import { GlassCard } from "@/components/shared/glass-card";
import { LoadingButton } from "@/components/shared/loading-button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  Factory,
  Box,
  Hash,
  Save,
  Calendar as CalendarIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, formatNumber } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { tr } from "date-fns/locale";

interface SelectFieldProps {
  label: string;
  icon: React.ReactNode;
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
  items: { id: string; name: string; sku?: string; stock?: number }[];
}

function SelectField({
  label,
  icon,
  value,
  onValueChange,
  placeholder,
  items,
}: SelectFieldProps) {
  return (
    <div className="space-y-2 w-full">
      <label className="text-[10px] font-black text-muted-foreground/50 px-0.5 flex items-center gap-2 uppercase tracking-[0.15em]">
        {icon} {label}
      </label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="h-12 w-full bg-white border border-input rounded-md px-6 py-6 text-sm font-semibold transition-all hover:bg-muted/5 shadow-none focus:ring-1 focus:ring-primary/20">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="rounded-lg border border-input shadow-xl p-1 animate-in fade-in slide-in-from-top-1 duration-200 min-w-[var(--radix-select-trigger-width)]">
          {items.map((item) => (
            <SelectItem
              key={item.id}
              value={item.id}
              textValue={item.name}
              className="py-3 px-4 rounded-md focus:bg-primary/5 focus:text-primary cursor-pointer transition-colors"
            >
              <div className="flex flex-col gap-0.5">
                <span className="font-bold text-sm">{item.name}</span>
                {item.sku && (
                  <div className="flex items-center gap-2 text-[10px] opacity-70 font-medium uppercase [[data-slot=select-value]_&]:hidden">
                    <span>SKU: {item.sku}</span>
                    <span>|</span>
                    <span>Stok: {item.stock ? formatNumber(item.stock) : 0}</span>
                  </div>
                )}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export function ProductionForm({
  products,
  machines,
}: {
  products: Product[];
  machines: Machine[];
}) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    product_id: "",
    machine_id: "",
    quantity: "" as string | number,
  });
  const [date, setDate] = useState<Date>(new Date());

  const { fetchAll } = useDataStore();

  const isFormValid =
    formData.product_id && formData.machine_id && Number(formData.quantity) > 0 && date;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isFormValid) return;

    setLoading(true);
    try {
      const isToday = date.toDateString() === new Date().toDateString();
      const payloadDate = isToday ? undefined : date.toISOString();

      await createProduction({
        product_id: formData.product_id,
        machine_id: formData.machine_id,
        quantity: Number(formData.quantity),
        created_at: payloadDate,
      });
      await fetchAll();
      toast.success("Kayıt başarılı.");
      setFormData((prev) => ({ ...prev, quantity: "" }));
      setDate(new Date());
    } catch (error: any) {
      toast.error(error.message || "Hata!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-5xl mx-auto">
      <GlassCard className="border border-input shadow-sm rounded-lg overflow-visible bg-white/50 hover:bg-white/50 hover:shadow-sm">
        <form onSubmit={onSubmit} className="p-6 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left: Selects */}
            <div className="space-y-6">
              <SelectField
                label="Ürün"
                icon={<Box className="h-3.5 w-3.5" />}
                value={formData.product_id}
                onValueChange={(val) =>
                  setFormData((p) => ({ ...p, product_id: val }))
                }
                placeholder="Üretilen ürünü seçin..."
                items={products.map((p) => ({
                  id: p.id,
                  name: p.name,
                  sku: p.sku,
                  stock: p.stock_quantity,
                }))}
              />

              <SelectField
                label="Makine"
                icon={<Factory className="h-3.5 w-3.5" />}
                value={formData.machine_id}
                onValueChange={(val) =>
                  setFormData((p) => ({ ...p, machine_id: val }))
                }
                placeholder="Çalışılan makineyi seçin..."
                items={machines.map((m) => ({ id: m.id, name: m.name }))}
              />
            </div>

            {/* Right: Quantity & Date */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-muted-foreground/50 px-0.5 flex items-center gap-2 uppercase tracking-[0.15em]">
                  <Hash className="h-3.5 w-3.5" /> Adet
                </label>
                <div className="relative">
                  <Input
                    type="number"
                    placeholder="0"
                    value={formData.quantity}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, quantity: e.target.value }))
                    }
                    className="h-12 bg-white border border-input focus-visible:ring-1 focus-visible:ring-primary/20 rounded-lg px-4 text-xl font-bold tabular-nums shadow-none"
                    required
                    min="1"
                  />
                </div>
              </div>

              <div className="space-y-2 flex flex-col">
                <label className="text-[10px] font-black text-muted-foreground/50 px-0.5 flex items-center gap-2 uppercase tracking-[0.15em] mb-1">
                  <CalendarIcon className="h-3.5 w-3.5" /> Üretim Tarihi
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "h-12 w-full justify-start text-left font-semibold shadow-none border-input hover:bg-white hover:text-foreground",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
                      {date ? format(date, "PPP", { locale: tr }) : <span>Tarih seçin</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(d) => d && setDate(d)}
                      locale={tr}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <LoadingButton
              type="submit"
              variant="premium"
              size="lg"
              loading={loading}
              disabled={!isFormValid}
              className="px-10 h-12 rounded-lg shadow-md font-bold text-base tracking-wide bg-primary hover:brightness-110 text-white"
            >
              <Save className="mr-2 h-5 w-5" /> ÜRETİM KAYDINI TAMAMLA
            </LoadingButton>
          </div>
        </form>
      </GlassCard>
    </div>
  );
}
