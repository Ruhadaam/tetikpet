import { getProductions, getProducts, getMachines } from "@/actions/data.actions"
import { PageHeader } from "@/components/shared/page-header"
import { StoreInitializer } from "@/components/shared/store-initializer"
import { HistoryClient } from "./history-client"

export default async function HistoryPage() {
  const [productions, products, machines] = await Promise.all([
    getProductions(),
    getProducts(),
    getMachines()
  ])

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <StoreInitializer 
        productions={productions} 
        products={products} 
        machines={machines} 
      />
      
      <PageHeader 
        title="Üretim Geçmişi" 
        description="Fabrika genelinde yapılan tüm üretim kayıtlarının dökümü."
      />

      <HistoryClient />
    </div>
  )
}
