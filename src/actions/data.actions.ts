"use server"

import { createClient } from "@/lib/supabase/server"
import { Machine, Product, Production, Dispatch, Customer } from "@/types"
import { revalidatePath } from "next/cache"

export async function getMachines() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("machines")
    .select("*")
    .order("name")

  if (error) {
    console.error("Error fetching machines:", error)
    return []
  }

  return data as Machine[]
}

export async function getProducts() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("name")

  if (error) {
    console.error("Error fetching products:", error)
    return []
  }

  return data as Product[]
}

export async function getProductions() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("productions")
    .select("*, products(sku, name), machines(name)")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching productions:", error)
    return []
  }

  return data as (Production & { products: { sku: string, name: string }, machines: { name: string } })[]
}

export async function getTodayProductions() {
  const supabase = await createClient()
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const { data, error } = await supabase
    .from("productions")
    .select("*, products(sku, name), machines(name)")
    .gte("created_at", today.toISOString())
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching today's productions:", error)
    return []
  }

  return data as (Production & { products: { sku: string, name: string }, machines: { name: string } })[]
}

export async function getRecentProductions(limit = 5) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("productions")
    .select("*, products(sku, name), machines(name)")
    .order("created_at", { ascending: false })
    .limit(limit)

  if (error) {
    console.error("Error fetching recent productions:", error)
    return []
  }

  return data as (Production & { products: { sku: string, name: string }, machines: { name: string } })[]
}

export async function getDashboardStats() {
  const supabase = await createClient()
  
  // Get total production today
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const { data: todayProductions, error: prodError } = await supabase
    .from("productions")
    .select("quantity")
    .gte("created_at", today.toISOString())

  const totalToday = todayProductions?.reduce((sum, p) => sum + p.quantity, 0) || 0

  // Get products with low stock (e.g., < 10)
  const { count: lowStockCount, error: stockError } = await supabase
    .from("products")
    .select("*", { count: "exact", head: true })
    .lt("stock_quantity", 10)

  // Get total products count
  const { count: totalProducts, error: countError } = await supabase
    .from("products")
    .select("*", { count: "exact", head: true })

  return {
    totalToday,
    lowStockCount: lowStockCount || 0,
    totalProducts: totalProducts || 0,
  }
}

export async function createMachine(name: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("machines")
    .insert([{ name }])
    .select()

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath("/dashboard/machines")
  return data[0] as Machine
}

export async function createProduct(product: Omit<Product, "id" | "created_at" | "updated_at">) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("products")
    .insert([product])
    .select()

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath("/dashboard/inventory")
  revalidatePath("/dashboard")
  return data[0] as Product
}

export async function deleteMachine(id: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from("machines")
    .delete()
    .eq("id", id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath("/dashboard/machines")
}

export async function updateMachine(id: string, name: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("machines")
    .update({ name })
    .eq("id", id)
    .select()

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath("/dashboard/machines")
  return data[0] as Machine
}

export async function deleteProduct(id: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath("/dashboard/inventory")
  revalidatePath("/dashboard")
}

export async function updateProduct(id: string, updates: Partial<Omit<Product, "id" | "created_at" | "updated_at">>) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("products")
    .update(updates)
    .eq("id", id)
    .select()

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath("/dashboard/inventory")
  revalidatePath("/dashboard")
  return data[0] as Product
}

export async function createProduction(production: {
  product_id: string
  machine_id: string
  quantity: number
  created_at?: string
}) {
  const supabase = await createClient()
  
  // Get current user for created_by
  const { data: { user } } = await supabase.auth.getUser()
  
  const { data, error } = await supabase
    .from("productions")
    .insert([
      {
        product_id: production.product_id,
        machine_id: production.machine_id,
        quantity: production.quantity,
        created_by: user?.id,
        ...(production.created_at ? { created_at: production.created_at } : {})
      }
    ])
    .select()

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath("/dashboard/production")
  revalidatePath("/dashboard/inventory")
  revalidatePath("/dashboard")
  return data[0] as Production
}

export async function getDispatches() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("dispatches")
    .select("*, products(sku, name), customers(name, phone)")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching dispatches:", error)
    return []
  }

  return data as (Dispatch & { products: { sku: string, name: string }, customers: { name: string, phone: string } })[]
}

export async function createDispatch(dispatch: {
  product_id: string
  quantity: number
  customer_id: string
  created_at?: string
}) {
  const supabase = await createClient()
  
  // Get current user for created_by
  const { data: { user } } = await supabase.auth.getUser()
  
  const { data, error } = await supabase
    .from("dispatches")
    .insert([
      {
        product_id: dispatch.product_id,
        quantity: dispatch.quantity,
        customer_id: dispatch.customer_id,
        created_by: user?.id,
        ...(dispatch.created_at ? { created_at: dispatch.created_at } : {})
      }
    ])
    .select()

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath("/dashboard/dispatch")
  revalidatePath("/dashboard/inventory")
  revalidatePath("/dashboard")
  return data[0] as Dispatch
}

export async function getCustomers() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("customers")
    .select("*")
    .order("name")

  if (error) {
    console.error("Error fetching customers:", error)
    return []
  }

  return data as Customer[]
}

export async function createCustomer(customer: { name: string, phone: string }) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("customers")
    .insert([customer])
    .select()

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath("/dashboard/customers")
  return data[0] as Customer
}

export async function updateCustomer(id: string, updates: { name?: string, phone?: string }) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("customers")
    .update(updates)
    .eq("id", id)
    .select()

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath("/dashboard/customers")
  return data[0] as Customer
}

export async function deleteCustomer(id: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from("customers")
    .delete()
    .eq("id", id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath("/dashboard/customers")
}
