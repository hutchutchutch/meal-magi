export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      meal_plans: {
        Row: {
          date_created: string | null
          date_updated: string | null
          id: string
          recipes: Json
          user_id: string | null
          week_start: string
        }
        Insert: {
          date_created?: string | null
          date_updated?: string | null
          id?: string
          recipes: Json
          user_id?: string | null
          week_start: string
        }
        Update: {
          date_created?: string | null
          date_updated?: string | null
          id?: string
          recipes?: Json
          user_id?: string | null
          week_start?: string
        }
        Relationships: []
      }
      meditations: {
        Row: {
          audio_url: string | null
          date_created: string | null
          date_updated: string | null
          id: string
          recipe_id: string | null
          text_content: string
        }
        Insert: {
          audio_url?: string | null
          date_created?: string | null
          date_updated?: string | null
          id?: string
          recipe_id?: string | null
          text_content: string
        }
        Update: {
          audio_url?: string | null
          date_created?: string | null
          date_updated?: string | null
          id?: string
          recipe_id?: string | null
          text_content?: string
        }
        Relationships: [
          {
            foreignKeyName: "meditations_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_preferences: {
        Row: {
          date_created: string | null
          date_updated: string | null
          id: string
          local_produce_updates: boolean
          meditation_reminders: boolean
          notifications_enabled: boolean
          recipe_reminders: boolean
          user_id: string | null
        }
        Insert: {
          date_created?: string | null
          date_updated?: string | null
          id?: string
          local_produce_updates?: boolean
          meditation_reminders?: boolean
          notifications_enabled?: boolean
          recipe_reminders?: boolean
          user_id?: string | null
        }
        Update: {
          date_created?: string | null
          date_updated?: string | null
          id?: string
          local_produce_updates?: boolean
          meditation_reminders?: boolean
          notifications_enabled?: boolean
          recipe_reminders?: boolean
          user_id?: string | null
        }
        Relationships: []
      }
      pantry_items: {
        Row: {
          date_added: string | null
          date_updated: string | null
          id: string
          item_name: string
          quantity: string
          user_id: string | null
        }
        Insert: {
          date_added?: string | null
          date_updated?: string | null
          id?: string
          item_name: string
          quantity: string
          user_id?: string | null
        }
        Update: {
          date_added?: string | null
          date_updated?: string | null
          id?: string
          item_name?: string
          quantity?: string
          user_id?: string | null
        }
        Relationships: []
      }
      recipes: {
        Row: {
          date_created: string | null
          date_updated: string | null
          description: string | null
          id: string
          ingredients: Json
          source: string
          steps: Json
          tip: string | null
          title: string
        }
        Insert: {
          date_created?: string | null
          date_updated?: string | null
          description?: string | null
          id?: string
          ingredients: Json
          source?: string
          steps: Json
          tip?: string | null
          title: string
        }
        Update: {
          date_created?: string | null
          date_updated?: string | null
          description?: string | null
          id?: string
          ingredients?: Json
          source?: string
          steps?: Json
          tip?: string | null
          title?: string
        }
        Relationships: []
      }
      shopping_lists: {
        Row: {
          amount: string
          date_created: string | null
          date_updated: string | null
          estimated_price: number | null
          grocery_section: string | null
          id: string
          item: string
          meal_plan_id: string | null
          user_id: string | null
        }
        Insert: {
          amount: string
          date_created?: string | null
          date_updated?: string | null
          estimated_price?: number | null
          grocery_section?: string | null
          id?: string
          item: string
          meal_plan_id?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: string
          date_created?: string | null
          date_updated?: string | null
          estimated_price?: number | null
          grocery_section?: string | null
          id?: string
          item?: string
          meal_plan_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shopping_lists_meal_plan_id_fkey"
            columns: ["meal_plan_id"]
            isOneToOne: false
            referencedRelation: "meal_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      subscription_plans: {
        Row: {
          can_edit_recipes: boolean
          date_created: string | null
          date_updated: string | null
          id: string
          meal_limit_per_week: number
          name: string
          price_monthly: number
        }
        Insert: {
          can_edit_recipes: boolean
          date_created?: string | null
          date_updated?: string | null
          id?: string
          meal_limit_per_week: number
          name: string
          price_monthly: number
        }
        Update: {
          can_edit_recipes?: boolean
          date_created?: string | null
          date_updated?: string | null
          id?: string
          meal_limit_per_week?: number
          name?: string
          price_monthly?: number
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          allergens: Json | null
          city: string
          date_created: string | null
          date_updated: string | null
          disliked_ingredients: Json | null
          id: string
          liked_ingredients: Json | null
          state: string
          subscription_plan_id: string | null
        }
        Insert: {
          allergens?: Json | null
          city: string
          date_created?: string | null
          date_updated?: string | null
          disliked_ingredients?: Json | null
          id: string
          liked_ingredients?: Json | null
          state: string
          subscription_plan_id?: string | null
        }
        Update: {
          allergens?: Json | null
          city?: string
          date_created?: string | null
          date_updated?: string | null
          disliked_ingredients?: Json | null
          id?: string
          liked_ingredients?: Json | null
          state?: string
          subscription_plan_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_profiles_subscription_plan_id_fkey"
            columns: ["subscription_plan_id"]
            isOneToOne: false
            referencedRelation: "subscription_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      user_recipe_interactions: {
        Row: {
          date_created: string | null
          id: string
          interaction_type: Database["public"]["Enums"]["interaction_type"]
          recipe_id: string | null
          user_id: string | null
        }
        Insert: {
          date_created?: string | null
          id?: string
          interaction_type: Database["public"]["Enums"]["interaction_type"]
          recipe_id?: string | null
          user_id?: string | null
        }
        Update: {
          date_created?: string | null
          id?: string
          interaction_type?: Database["public"]["Enums"]["interaction_type"]
          recipe_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_recipe_interactions_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      auth_provider: "email" | "google" | "facebook"
      interaction_type: "LIKE" | "DISLIKE" | "SAVE"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
