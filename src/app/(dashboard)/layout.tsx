import { Navbar } from "@/components/layout/navbar"
import { Sidebar } from "@/components/layout/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1 lg:pl-64 flex flex-col">
        <Sidebar />
        <main className="flex-1 w-full max-w-[1400px] mx-auto py-8 px-6 md:px-8 lg:px-10">
          {children}
        </main>
      </div>
    </div>
  )
}
