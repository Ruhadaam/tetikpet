import { getProducts, getMachines } from "@/actions/data.actions"
import { AddProductDialog } from "./add-product-dialog"
import { PageHeader } from "@/components/shared/page-header"
import { StoreInitializer } from "@/components/shared/store-initializer"
import { InventoryClient } from "./inventory-client"

export default async function InventoryPage() {
  const [products, machines] = await Promise.all([
    getProducts(),
    getMachines()
  ])

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <StoreInitializer products={products} machines={machines} />
      
      <PageHeader 
        title="Stok Durumu" 
        description="Mevcut ürün kataloğunuzu ve anlık stok seviyelerini takip edin."
      >
        <AddProductDialog />
      </PageHeader>

      <InventoryClient />
    </div>
  )
}
