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
          email: string
          gender: string
          height_feet: number | null
          height_ft: number
          height_in: number
          height_inches: number | null
          id: string
          liked_ingredients: Json | null
          password: string | null
          state: string
          subscription_plan_id: string | null
          weight: number | null
        }
        Insert: {
          allergens?: Json | null
          city: string
          date_created?: string | null
          date_updated?: string | null
          disliked_ingredients?: Json | null
          email: string
          gender: string
          height_feet?: number | null
          height_ft: number
          height_in: number
          height_inches?: number | null
          id: string
          liked_ingredients?: Json | null
          password?: string | null
          state: string
          subscription_plan_id?: string | null
          weight?: number | null
        }
        Update: {
          allergens?: Json | null
          city?: string
          date_created?: string | null
          date_updated?: string | null
          disliked_ingredients?: Json | null
          email?: string
          gender?: string
          height_feet?: number | null
          height_ft?: number
          height_in?: number
          height_inches?: number | null
          id?: string
          liked_ingredients?: Json | null
          password?: string | null
          state?: string
          subscription_plan_id?: string | null
          weight?: number | null
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