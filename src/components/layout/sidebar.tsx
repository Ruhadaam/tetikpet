"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  LayoutDashboard, 
  Package, 
  Settings, 
  History, 
  Factory,
  Users,
  Truck,
  Building2
} from "lucide-react"
import { useUIStore } from "@/stores/use-ui-store"

const sidebarItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Üretim Girişi", href: "/dashboard/production", icon: Factory },
  { name: "Sevkiyat Girişi", href: "/dashboard/dispatch", icon: Truck },
  { name: "Müşteriler", href: "/dashboard/customers", icon: Building2 },
  { name: "Stok Durumu", href: "/dashboard/inventory", icon: Package },
  { name: "Üretim Geçmişi", href: "/dashboard/history", icon: History },
  { name: "Makineler", href: "/dashboard/machines", icon: Settings },
  { name: "Kullanıcılar", href: "/dashboard/users", icon: Users },
]

export function Sidebar() {
  const pathname = usePathname()
  const { isSidebarOpen } = useUIStore()

  return (
    <aside
      className={cn(
        "fixed left-0 top-20 z-40 h-[calc(100vh-5rem)] w-64 border-r bg-card/30 backdrop-blur-xl transition-transform lg:translate-x-0 shadow-sm",
        !isSidebarOpen && "-translate-x-full"
      )}
    >
      <div className="flex h-full flex-col overflow-y-auto px-4 py-6">
        <div className="space-y-2">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-center relative rounded-lg px-4 py-3 text-sm font-bold transition-all duration-200 overflow-hidden",
                  isActive 
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className={cn(
                  "mr-3 h-5 w-5 transition-transform duration-200 group-hover:scale-110",
                  isActive ? "text-white" : "text-muted-foreground group-hover:text-primary"
                )} />
                {item.name}
                
                {isActive && (
                  <div className="absolute right-0 top-0 h-full w-1.5 bg-white/20 rounded-l-full" />
                )}
              </Link>
            )
          })}
        </div>

        <div className="mt-auto p-4 rounded-lg bg-primary/5 border border-primary/10">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 mb-1">Sistem Durumu</p>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-foreground/80 tracking-tight">Sunucu Aktif</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
