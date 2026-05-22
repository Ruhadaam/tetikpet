import { getProducts, getDispatches, getCustomers } from "@/actions/data.actions"
import { DispatchForm } from "./dispatch-form"
import { PageHeader } from "@/components/shared/page-header"
import { StoreInitializer } from "@/components/shared/store-initializer"
import { RecentDispatchesClient } from "./recent-dispatches-client"

export default async function DispatchPage() {
  const [products, dispatches, customers] = await Promise.all([
    getProducts(),
    getDispatches(),
    getCustomers()
  ])

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <StoreInitializer 
        products={products} 
        dispatches={dispatches} 
        customers={customers}
      />

      <PageHeader 
        title="Sevkiyat Girişi" 
        description="Fabrikadan çıkan veya müşteriye gönderilen ürünlerin kaydını tutun."
      />

      <div className="space-y-16">
        <DispatchForm products={products} customers={customers} />
        
        <div className="max-w-5xl mx-auto pt-8 border-t border-primary/5">
          <RecentDispatchesClient />
        </div>
      </div>
    </div>
  )
}
