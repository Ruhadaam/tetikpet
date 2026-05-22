"use client"

import { useRef } from "react"
import { useDataStore } from "@/stores/use-data-store"
import { Machine, Product, Production, Dispatch, Customer } from "@/types"

export function StoreInitializer({
  machines,
  products,
  productions,
  dispatches,
  customers,
}: {
  machines?: Machine[]
  products?: Product[]
  productions?: Production[]
  dispatches?: Dispatch[]
  customers?: Customer[]
}) {
  const initialized = useRef(false)

  if (!initialized.current) {
    if (machines) useDataStore.setState({ machines })
    if (products) useDataStore.setState({ products })
    if (productions) useDataStore.setState({ productions })
    if (dispatches) useDataStore.setState({ dispatches })
    if (customers) useDataStore.setState({ customers })
    initialized.current = true
  }

  return null
}
