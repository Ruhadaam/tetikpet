import { create } from "zustand"
import { Machine, Product, Production, Dispatch, Customer } from "@/types"
import { getMachines, getProducts, getProductions, getDispatches, getCustomers } from "@/actions/data.actions"

interface DataState {
  machines: Machine[]
  products: Product[]
  productions: Production[]
  dispatches: Dispatch[]
  customers: Customer[]
  isLoading: boolean
  error: string | null

  // Actions
  fetchMachines: () => Promise<void>
  fetchProducts: () => Promise<void>
  fetchProductions: () => Promise<void>
  fetchDispatches: () => Promise<void>
  fetchCustomers: () => Promise<void>
  fetchAll: () => Promise<void>
  
  // Setters for optimistic updates or server-side init
  setMachines: (machines: Machine[]) => void
  setProducts: (products: Product[]) => void
  setProductions: (productions: Production[]) => void
  setDispatches: (dispatches: Dispatch[]) => void
  setCustomers: (customers: Customer[]) => void
}

export const useDataStore = create<DataState>((set, get) => ({
  machines: [],
  products: [],
  productions: [],
  dispatches: [],
  customers: [],
  isLoading: false,
  error: null,

  setMachines: (machines) => set({ machines }),
  setProducts: (products) => set({ products }),
  setProductions: (productions) => set({ productions }),
  setDispatches: (dispatches) => set({ dispatches }),
  setCustomers: (customers) => set({ customers }),

  fetchMachines: async () => {
    set({ isLoading: true })
    try {
      const data = await getMachines()
      set({ machines: data, isLoading: false })
    } catch (error: any) {
      set({ error: error.message, isLoading: false })
    }
  },

  fetchProducts: async () => {
    set({ isLoading: true })
    try {
      const data = await getProducts()
      set({ products: data, isLoading: false })
    } catch (error: any) {
      set({ error: error.message, isLoading: false })
    }
  },

  fetchProductions: async () => {
    set({ isLoading: true })
    try {
      const data = await getProductions()
      set({ productions: data, isLoading: false })
    } catch (error: any) {
      set({ error: error.message, isLoading: false })
    }
  },

  fetchDispatches: async () => {
    set({ isLoading: true })
    try {
      const data = await getDispatches()
      set({ dispatches: data, isLoading: false })
    } catch (error: any) {
      set({ error: error.message, isLoading: false })
    }
  },

  fetchCustomers: async () => {
    set({ isLoading: true })
    try {
      const data = await getCustomers()
      set({ customers: data, isLoading: false })
    } catch (error: any) {
      set({ error: error.message, isLoading: false })
    }
  },

  fetchAll: async () => {
    set({ isLoading: true })
    try {
      const [machines, products, productions, dispatches, customers] = await Promise.all([
        getMachines(),
        getProducts(),
        getProductions(),
        getDispatches(),
        getCustomers()
      ])
      set({ machines, products, productions, dispatches, customers, isLoading: false })
    } catch (error: any) {
      set({ error: error.message, isLoading: false })
    }
  }
}))
