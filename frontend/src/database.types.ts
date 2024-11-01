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
      accounts: {
        Row: {
          created_at: string
          email: string
          id: number
          name: string
          update_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: number
          name: string
          update_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: number
          name?: string
          update_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      channel_memberships: {
        Row: {
          account_id: number
          channel_id: number
          created_at: string
          id: number
        }
        Insert: {
          account_id: number
          channel_id: number
          created_at?: string
          id?: number
        }
        Update: {
          account_id?: number
          channel_id?: number
          created_at?: string
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "channel_memberships_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "channel_memberships_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "channels"
            referencedColumns: ["id"]
          },
        ]
      }
      channels: {
        Row: {
          client_id: number | null
          created_at: string
          created_by: number
          description: string | null
          id: number
          name: string
          organisation_id: number
          updated_at: string | null
        }
        Insert: {
          client_id?: number | null
          created_at?: string
          created_by: number
          description?: string | null
          id?: number
          name: string
          organisation_id: number
          updated_at?: string | null
        }
        Update: {
          client_id?: number | null
          created_at?: string
          created_by?: number
          description?: string | null
          id?: number
          name?: string
          organisation_id?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "channels_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "channels_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "channels_organisation_id_fkey"
            columns: ["organisation_id"]
            isOneToOne: false
            referencedRelation: "organisations"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          created_at: string
          id: number
          name: string
          organisation_id: number
          portal_id: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          organisation_id: number
          portal_id?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          organisation_id?: number
          portal_id?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "clients_organisation_id_fkey"
            columns: ["organisation_id"]
            isOneToOne: false
            referencedRelation: "organisations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "clients_portal_id_fkey"
            columns: ["portal_id"]
            isOneToOne: false
            referencedRelation: "portals"
            referencedColumns: ["id"]
          },
        ]
      }
      memberships: {
        Row: {
          account_id: number
          created_at: string
          id: number
          owner_id: number
          type: string
          updated_at: string | null
        }
        Insert: {
          account_id: number
          created_at?: string
          id?: number
          owner_id: number
          type?: string
          updated_at?: string | null
        }
        Update: {
          account_id?: number
          created_at?: string
          id?: number
          owner_id?: number
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "team_assignments_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          account_id: number
          client_id: number | null
          content: string
          created_at: string
          id: number
          organisation_id: number
          origin_id: number
          origin_type: string
          updated_at: string | null
        }
        Insert: {
          account_id: number
          client_id?: number | null
          content: string
          created_at?: string
          id?: number
          organisation_id: number
          origin_id: number
          origin_type?: string
          updated_at?: string | null
        }
        Update: {
          account_id?: number
          client_id?: number | null
          content?: string
          created_at?: string
          id?: number
          organisation_id?: number
          origin_id?: number
          origin_type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_organisation_id_fkey"
            columns: ["organisation_id"]
            isOneToOne: false
            referencedRelation: "organisations"
            referencedColumns: ["id"]
          },
        ]
      }
      organisations: {
        Row: {
          created_at: string
          id: number
          name: string
          size: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          size?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          size?: number | null
        }
        Relationships: []
      }
      portals: {
        Row: {
          created_at: string
          id: number
          name: string | null
          organisation_id: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
          organisation_id: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
          organisation_id?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "portals_organisation_id_fkey"
            columns: ["organisation_id"]
            isOneToOne: false
            referencedRelation: "organisations"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          client_id: number | null
          created_at: string | null
          description: string | null
          id: number
          name: string
          organisation_id: number
          updated_at: string | null
          worked_hours: number | null
        }
        Insert: {
          client_id?: number | null
          created_at?: string | null
          description?: string | null
          id?: number
          name: string
          organisation_id: number
          updated_at?: string | null
          worked_hours?: number | null
        }
        Update: {
          client_id?: number | null
          created_at?: string | null
          description?: string | null
          id?: number
          name?: string
          organisation_id?: number
          updated_at?: string | null
          worked_hours?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_organisation_id_fkey"
            columns: ["organisation_id"]
            isOneToOne: false
            referencedRelation: "organisations"
            referencedColumns: ["id"]
          },
        ]
      }
      task_assignments: {
        Row: {
          account_id: number | null
          client_id: number | null
          created_at: string
          id: number
          organisation_id: number
          task_id: number
          updated_at: string | null
        }
        Insert: {
          account_id?: number | null
          client_id?: number | null
          created_at?: string
          id?: number
          organisation_id: number
          task_id: number
          updated_at?: string | null
        }
        Update: {
          account_id?: number | null
          client_id?: number | null
          created_at?: string
          id?: number
          organisation_id?: number
          task_id?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "task_assignments_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "task_assignments_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "task_assignments_organisation_id_fkey"
            columns: ["organisation_id"]
            isOneToOne: false
            referencedRelation: "organisations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "task_assignments_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          client_id: number | null
          completed_at: string | null
          completed_by: number | null
          created_at: string
          description: string | null
          epic_id: number | null
          id: number
          name: string
          project_id: number | null
          team_id: number | null
          updated_at: string | null
          worked_hours: number | null
        }
        Insert: {
          client_id?: number | null
          completed_at?: string | null
          completed_by?: number | null
          created_at?: string
          description?: string | null
          epic_id?: number | null
          id?: number
          name: string
          project_id?: number | null
          team_id?: number | null
          updated_at?: string | null
          worked_hours?: number | null
        }
        Update: {
          client_id?: number | null
          completed_at?: string | null
          completed_by?: number | null
          created_at?: string
          description?: string | null
          epic_id?: number | null
          id?: number
          name?: string
          project_id?: number | null
          team_id?: number | null
          updated_at?: string | null
          worked_hours?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "tasks_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "organisations"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_organisation_membership: {
        Args: {
          account_name: string
          organisation_name: string
          user_id: string
          email: string
        }
        Returns: Database["public"]["CompositeTypes"]["account_memberships_result"]
      }
      get_current_account_id: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      get_organisations: {
        Args: {
          accountid: number
        }
        Returns: {
          id: number
          name: string
        }[]
      }
      get_orgs_for_account: {
        Args: {
          account_id: number
        }
        Returns: number[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      account_memberships_result: {
        account_id: number | null
        organisation_id: number | null
      }
      account_team_assignment_result: {
        account_id: number | null
        team_id: number | null
      }
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
