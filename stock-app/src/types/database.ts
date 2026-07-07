// Hand-written to match supabase/migrations/0001_init.sql.
// Once the project is linked, replace with:
//   npx supabase gen types typescript --linked > src/types/database.ts

export type SupplierStatus = "to_test" | "validated" | "to_avoid";
export type ProductValidationStatus = "pending_test" | "validated" | "rejected";
export type OrderStatus = "ordered" | "in_transit" | "received" | "inspected";
export type QcStatus = "pending" | "conforming" | "minor_defect" | "rejected" | "to_return";
export type StockStatus = "in_stock" | "reserved" | "sold" | "returned";

export interface Database {
  public: {
    Tables: {
      suppliers: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          platform: string | null;
          contact_wechat: string | null;
          contact_phone: string | null;
          contact_link: string | null;
          reliability_score: number | null;
          status: SupplierStatus;
          notes: string | null;
          first_order_date: string | null;
          archived_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["suppliers"]["Row"]> & {
          user_id: string;
          name: string;
        };
        Update: Partial<Database["public"]["Tables"]["suppliers"]["Row"]>;
        Relationships: [];
      };
      products: {
        Row: {
          id: string;
          user_id: string;
          supplier_id: string;
          name: string;
          category: string | null;
          description: string | null;
          product_url: string | null;
          validation_status: ProductValidationStatus;
          quality_notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["products"]["Row"]> & {
          user_id: string;
          supplier_id: string;
          name: string;
        };
        Update: Partial<Database["public"]["Tables"]["products"]["Row"]>;
        Relationships: [
          {
            foreignKeyName: "products_supplier_id_fkey";
            columns: ["supplier_id"];
            isOneToOne: false;
            referencedRelation: "suppliers";
            referencedColumns: ["id"];
          },
        ];
      };
      product_images: {
        Row: {
          id: string;
          user_id: string;
          product_id: string;
          storage_path: string;
          position: number;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["product_images"]["Row"]> & {
          user_id: string;
          product_id: string;
          storage_path: string;
        };
        Update: Partial<Database["public"]["Tables"]["product_images"]["Row"]>;
        Relationships: [
          {
            foreignKeyName: "product_images_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
        ];
      };
      orders: {
        Row: {
          id: string;
          user_id: string;
          supplier_id: string;
          order_date: string;
          status: OrderStatus;
          shipping_cost: number;
          received_at: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["orders"]["Row"]> & {
          user_id: string;
          supplier_id: string;
        };
        Update: Partial<Database["public"]["Tables"]["orders"]["Row"]>;
        Relationships: [
          {
            foreignKeyName: "orders_supplier_id_fkey";
            columns: ["supplier_id"];
            isOneToOne: false;
            referencedRelation: "suppliers";
            referencedColumns: ["id"];
          },
        ];
      };
      order_lines: {
        Row: {
          id: string;
          user_id: string;
          order_id: string;
          product_id: string;
          quantity: number;
          unit_purchase_price: number;
          shipping_cost_allocated: number;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["order_lines"]["Row"]> & {
          user_id: string;
          order_id: string;
          product_id: string;
          quantity: number;
          unit_purchase_price: number;
        };
        Update: Partial<Database["public"]["Tables"]["order_lines"]["Row"]>;
        Relationships: [
          {
            foreignKeyName: "order_lines_order_id_fkey";
            columns: ["order_id"];
            isOneToOne: false;
            referencedRelation: "orders";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "order_lines_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
        ];
      };
      items: {
        Row: {
          id: string;
          user_id: string;
          order_line_id: string;
          product_id: string;
          unit_number: number;
          purchase_price: number;
          shipping_cost_in: number;
          qc_status: QcStatus;
          qc_notes: string | null;
          stock_status: StockStatus;
          resale_price: number | null;
          shipping_cost_out: number;
          sale_channel: string | null;
          sale_date: string | null;
          margin: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["items"]["Row"]> & {
          user_id: string;
          order_line_id: string;
          product_id: string;
          unit_number: number;
          purchase_price: number;
        };
        Update: Partial<Database["public"]["Tables"]["items"]["Row"]>;
        Relationships: [
          {
            foreignKeyName: "items_order_line_id_fkey";
            columns: ["order_line_id"];
            isOneToOne: false;
            referencedRelation: "order_lines";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "items_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
        ];
      };
      item_images: {
        Row: {
          id: string;
          user_id: string;
          item_id: string;
          storage_path: string;
          position: number;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["item_images"]["Row"]> & {
          user_id: string;
          item_id: string;
          storage_path: string;
        };
        Update: Partial<Database["public"]["Tables"]["item_images"]["Row"]>;
        Relationships: [
          {
            foreignKeyName: "item_images_item_id_fkey";
            columns: ["item_id"];
            isOneToOne: false;
            referencedRelation: "items";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

export type Supplier = Database["public"]["Tables"]["suppliers"]["Row"];
export type Product = Database["public"]["Tables"]["products"]["Row"];
export type ProductImage = Database["public"]["Tables"]["product_images"]["Row"];
export type Order = Database["public"]["Tables"]["orders"]["Row"];
export type OrderLine = Database["public"]["Tables"]["order_lines"]["Row"];
export type Item = Database["public"]["Tables"]["items"]["Row"];
export type ItemImage = Database["public"]["Tables"]["item_images"]["Row"];
