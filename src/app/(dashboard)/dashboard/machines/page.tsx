import { getMachines } from "@/actions/data.actions"
import { AddMachineDialog } from "./add-machine-dialog"
import { PageHeader } from "@/components/shared/page-header"
import { StoreInitializer } from "@/components/shared/store-initializer"
import { MachinesClient } from "./machines-client"

export default async function MachinesPage() {
  const machines = await getMachines()

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <StoreInitializer machines={machines} />
      
      <PageHeader 
        title="Makineler" 
        description="Üretim hattındaki aktif makinelerin listesi ve yönetimi."
      >
        <AddMachineDialog />
      </PageHeader>

      <MachinesClient />
    </div>
  )
}
