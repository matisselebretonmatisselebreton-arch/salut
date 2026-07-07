// Hand-written to match supabase/migrations/*.sql.
// Regenerate once linked with:
//   npx supabase gen types typescript --linked > src/types/database.ts

export type OrderStatus = "draft" | "ordered" | "at_warehouse" | "in_transit" | "received";
export type StockStatus = "received" | "for_sale" | "sold";

// The 8 canonical catalog categories. Stored as free text so it stays
// extensible, but the UI drives users toward this set.
export const CATEGORIES = [
  "Montres",
  "Sacs",
  "T-shirts",
  "Pulls/Vestes",
  "Pantalons",
  "Bijoux",
  "Chaussures",
  "Technologie",
] as const;

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          category: string;
          brand: string | null;
          description: string | null;
          product_url: string | null;
          reference_purchase_price: number | null;
          estimated_resale_price: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["products"]["Row"]> & {
          user_id: string;
          name: string;
          category: string;
        };
        Update: Partial<Database["public"]["Tables"]["products"]["Row"]>;
        Relationships: [];
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
          label: string | null;
          order_date: string;
          status: OrderStatus;
          shipping_france_estimated: number;
          shipping_france_actual: number | null;
          received_at: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["orders"]["Row"]> & {
          user_id: string;
        };
        Update: Partial<Database["public"]["Tables"]["orders"]["Row"]>;
        Relationships: [];
      };
      order_lines: {
        Row: {
          id: string;
          user_id: string;
          order_id: string;
          product_id: string;
          quantity: number;
          unit_purchase_price: number;
          comment: string | null;
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
          rating: number | null;
          rating_comment: string | null;
          stock_status: StockStatus;
          asking_price: number | null;
          sold_price: number | null;
          vinted_fee: number;
          sale_channel: string | null;
          listed_at: string | null;
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

export type Product = Database["public"]["Tables"]["products"]["Row"];
export type ProductImage = Database["public"]["Tables"]["product_images"]["Row"];
export type Order = Database["public"]["Tables"]["orders"]["Row"];
export type OrderLine = Database["public"]["Tables"]["order_lines"]["Row"];
export type Item = Database["public"]["Tables"]["items"]["Row"];
export type ItemImage = Database["public"]["Tables"]["item_images"]["Row"];
