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
