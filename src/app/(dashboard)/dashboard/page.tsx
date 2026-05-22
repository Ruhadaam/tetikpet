import { getMachines, getProducts, getProductions } from "@/actions/data.actions"
import { PageHeader } from "@/components/shared/page-header"
import { 
  Plus
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { StoreInitializer } from "@/components/shared/store-initializer"
import { DashboardClient } from "./dashboard-client"

export default async function DashboardPage() {
  const [machines, products, productions] = await Promise.all([
    getMachines(),
    getProducts(),
    getProductions(),
  ])

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <StoreInitializer 
        machines={machines} 
        products={products} 
        productions={productions} 
      />
      
      <PageHeader 
        title="Genel Bakış" 
        description="Tetikpet üretim tesisindeki anlık durum ve istatistikler."
      >
        <Link href="/dashboard/production">
          <Button className="rounded-lg font-bold shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90">
            <Plus className="mr-2 h-5 w-5" /> Yeni Üretim Kaydı
          </Button>
        </Link>
      </PageHeader>

      <DashboardClient />
    </div>
  )
}
