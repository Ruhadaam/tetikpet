import { getMachines, getProducts, getTodayProductions } from "@/actions/data.actions"
import { ProductionForm } from "./production-form"
import { PageHeader } from "@/components/shared/page-header"
import { StoreInitializer } from "@/components/shared/store-initializer"
import { TodayProductionsClient } from "./today-productions-client"

export default async function ProductionEntryPage() {
  const [machines, products, productions] = await Promise.all([
    getMachines(),
    getProducts(),
    getTodayProductions()
  ])

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <StoreInitializer 
        machines={machines} 
        products={products} 
        productions={productions} 
      />

      <PageHeader 
        title="Üretim Girişi" 
        description="Tamamlanan üretim adetlerini sisteme girerek stokları güncelleyin."
      />

      <div className="space-y-16">
        <ProductionForm products={products} machines={machines} />
        
        <div className="max-w-5xl mx-auto pt-8 border-t border-primary/5">
          <TodayProductionsClient />
        </div>
      </div>
    </div>
  )
}
