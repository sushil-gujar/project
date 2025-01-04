export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      shops: {
        Row: {
          id: string
          name: string
          created_at: string
          user_id: string
        }
        Insert: {
          id?: string
          name: string
          created_at?: string
          user_id: string
        }
        Update: {
          id?: string
          name?: string
          created_at?: string
          user_id?: string
        }
      }
      shopping_items: {
        Row: {
          id: string
          name: string
          quantity: number
          completed: boolean
          created_at: string
          shop_id: string
          user_id: string
        }
        Insert: {
          id?: string
          name: string
          quantity?: number
          completed?: boolean
          created_at?: string
          shop_id: string
          user_id: string
        }
        Update: {
          id?: string
          name?: string
          quantity?: number
          completed?: boolean
          created_at?: string
          shop_id?: string
          user_id?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}