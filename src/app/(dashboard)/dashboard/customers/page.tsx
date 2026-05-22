import { getCustomers } from "@/actions/data.actions"
import { CustomersClient } from "./customers-client"
import { PageHeader } from "@/components/shared/page-header"
import { StoreInitializer } from "@/components/shared/store-initializer"
import { AddCustomerDialog } from "./add-customer-dialog"

export default async function CustomersPage() {
  const customers = await getCustomers()

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <StoreInitializer customers={customers} />
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b pb-6">
        <PageHeader 
          title="Müşteri Yönetimi" 
          description="Sisteme kayıtlı müşterileri ve alıcı firmaları yönetin."
        />
        <AddCustomerDialog />
      </div>

      <CustomersClient />
    </div>
  )
}
