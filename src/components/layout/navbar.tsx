"use client"

import Link from "next/link"
import { APP_NAME } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import { Menu, User, Bell } from "lucide-react"
import { useUIStore } from "@/stores/use-ui-store"

export function Navbar() {
  const { toggleSidebar } = useUIStore()

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="lg:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <Link href="/" className="flex items-center group ml-[-20px]">
            <div className="relative h-20 w-80 overflow-visible transition-transform duration-300 group-hover:scale-105">
              <img 
                src="/TetikpetLogo.png" 
                alt="Tetikpet Logo" 
                className="h-full w-full object-contain scale-125"
              />
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full border">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  )
}
