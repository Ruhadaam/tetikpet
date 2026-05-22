export type Role = 'ADMIN' | 'WORKER';

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  role: Role;
  created_at: string;
}

export interface Machine {
  id: string;
  name: string;
  created_at: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  stock_quantity: number;
  created_at: string;
  updated_at: string;
}

export interface Production {
  id: string;
  product_id: string;
  machine_id: string;
  quantity: number;
  created_by: string;
  created_at: string;
}

export interface Dispatch {
  id: string;
  product_id: string;
  customer_id: string;
  quantity: number;
  created_by: string;
  created_at: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  created_at: string;
}
