export const APP_NAME = 'Tetikpet Üretim Takip'
export const APP_DESCRIPTION = 'Üretim ve Stok Takip Sistemi'

export const ROLES = {
  ADMIN: 'ADMIN',
  WORKER: 'WORKER',
} as const

export type Role = (typeof ROLES)[keyof typeof ROLES]
