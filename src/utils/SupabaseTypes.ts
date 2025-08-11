export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      interested_emails: {
        Row: {
          created_at: string
          email: string | null
          id: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
        }
        Relationships: []
      }
      listings: {
        Row: {
          additionalcontact: string | null
          address: string | null
          available: boolean | null
          available_semester: string | null
          available_year: number | null
          baths: number | null
          bedrooms: number | null
          car_parking_space: boolean | null
          created_at: string | null
          dates: Json | null
          description: string | null
          extraCosts: string[] | null
          furnished: boolean | null
          gender: string | null
          guests: string | null
          handicap_accessible: boolean | null
          id: number
          images: string[] | null
          location: string | null
          open_to_demographics: string[] | null
          otherRoommates: string[] | null
          pets_allowed: boolean | null
          postedby: string | null
          postedbyemail: string | null
          price: number | null
          rating: number | null
          sharedbathroom: boolean | null
          title: string | null
          typeOfProperty: string | null
          views: string | null
          washer_and_dryer: boolean | null
        }
        Insert: {
          additionalcontact?: string | null
          address?: string | null
          available?: boolean | null
          available_semester?: string | null
          available_year?: number | null
          baths?: number | null
          bedrooms?: number | null
          car_parking_space?: boolean | null
          created_at?: string | null
          dates?: Json | null
          description?: string | null
          extraCosts?: string[] | null
          furnished?: boolean | null
          gender?: string | null
          guests?: string | null
          handicap_accessible?: boolean | null
          id?: number
          images?: string[] | null
          location?: string | null
          open_to_demographics?: string[] | null
          otherRoommates?: string[] | null
          pets_allowed?: boolean | null
          postedby?: string | null
          postedbyemail?: string | null
          price?: number | null
          rating?: number | null
          sharedbathroom?: boolean | null
          title?: string | null
          typeOfProperty?: string | null
          views?: string | null
          washer_and_dryer?: boolean | null
        }
        Update: {
          additionalcontact?: string | null
          address?: string | null
          available?: boolean | null
          available_semester?: string | null
          available_year?: number | null
          baths?: number | null
          bedrooms?: number | null
          car_parking_space?: boolean | null
          created_at?: string | null
          dates?: Json | null
          description?: string | null
          extraCosts?: string[] | null
          furnished?: boolean | null
          gender?: string | null
          guests?: string | null
          handicap_accessible?: boolean | null
          id?: number
          images?: string[] | null
          location?: string | null
          open_to_demographics?: string[] | null
          otherRoommates?: string[] | null
          pets_allowed?: boolean | null
          postedby?: string | null
          postedbyemail?: string | null
          price?: number | null
          rating?: number | null
          sharedbathroom?: boolean | null
          title?: string | null
          typeOfProperty?: string | null
          views?: string | null
          washer_and_dryer?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "listings_postedby_fkey"
            columns: ["postedby"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      request_information: {
        Row: {
          created_at: string
          email: string | null
          id: number
          listing_id: number | null
          price: number | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: number
          listing_id?: number | null
          price?: number | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: number
          listing_id?: number | null
          price?: number | null
        }
        Relationships: []
      }
      sell_now_emails: {
        Row: {
          created_at: string
          email: string | null
          id: number
          listing_id: number | null
          price: number | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: number
          listing_id?: number | null
          price?: number | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: number
          listing_id?: number | null
          price?: number | null
        }
        Relationships: []
      }
      users: {
        Row: {
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          listings: number[] | null
          savedlistings: number[] | null
        }
        Insert: {
          email?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          listings?: number[] | null
          savedlistings?: number[] | null
        }
        Update: {
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          listings?: number[] | null
          savedlistings?: number[] | null
        }
        Relationships: []
      }
      public_user_data: {
        Row: {
          user_id: string
          first_name: string
          last_name: string
          profile_picture_url: string | null
          gender: 'M' | 'F' | 'Other'
          gender_other_specify: string | null
          description: string | null
          school: string
          major: string
          linkedin_url: string | null
          introduction: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          first_name: string
          last_name: string
          profile_picture_url?: string | null
          gender: 'M' | 'F' | 'Other'
          gender_other_specify?: string | null
          description?: string | null
          school: string
          major: string
          linkedin_url?: string | null
          introduction?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          user_id?: string
          first_name?: string
          last_name?: string
          profile_picture_url?: string | null
          gender?: 'M' | 'F' | 'Other'
          gender_other_specify?: string | null
          description?: string | null
          school?: string
          major?: string
          linkedin_url?: string | null
          introduction?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_user_data_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
