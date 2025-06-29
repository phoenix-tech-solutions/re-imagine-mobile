export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      achievements: {
        Row: {
          category: string;
          created_at: string | null;
          description: string | null;
          icon: string | null;
          id: string;
          points: number | null;
          title: string;
        };
        Insert: {
          category: string;
          created_at?: string | null;
          description?: string | null;
          icon?: string | null;
          id?: string;
          points?: number | null;
          title: string;
        };
        Update: {
          category?: string;
          created_at?: string | null;
          description?: string | null;
          icon?: string | null;
          id?: string;
          points?: number | null;
          title?: string;
        };
        Relationships: [];
      };
      events: {
        Row: {
          created_at: string | null;
          description: string | null;
          end_time: string;
          event_type: string;
          id: string;
          start_time: string;
          title: string;
        };
        Insert: {
          created_at?: string | null;
          description?: string | null;
          end_time: string;
          event_type: string;
          id?: string;
          start_time: string;
          title: string;
        };
        Update: {
          created_at?: string | null;
          description?: string | null;
          end_time?: string;
          event_type?: string;
          id?: string;
          start_time?: string;
          title?: string;
        };
        Relationships: [];
      };
      mentors: {
        Row: {
          bio: string | null;
          created_at: string | null;
          email: string;
          expertise: string[] | null;
          full_name: string;
          id: string;
        };
        Insert: {
          bio?: string | null;
          created_at?: string | null;
          email: string;
          expertise?: string[] | null;
          full_name: string;
          id?: string;
        };
        Update: {
          bio?: string | null;
          created_at?: string | null;
          email?: string;
          expertise?: string[] | null;
          full_name?: string;
          id?: string;
        };
        Relationships: [];
      };
      project_members: {
        Row: {
          id: string;
          joined_at: string | null;
          project_id: string | null;
          role: string;
          student_id: string | null;
        };
        Insert: {
          id?: string;
          joined_at?: string | null;
          project_id?: string | null;
          role?: string;
          student_id?: string | null;
        };
        Update: {
          id?: string;
          joined_at?: string | null;
          project_id?: string | null;
          role?: string;
          student_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "project_members_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "project_members_student_id_fkey";
            columns: ["student_id"];
            isOneToOne: false;
            referencedRelation: "students";
            referencedColumns: ["id"];
          },
        ];
      };
      projects: {
        Row: {
          created_at: string | null;
          description: string | null;
          end_date: string | null;
          id: string;
          start_date: string | null;
          status: string;
          title: string;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          description?: string | null;
          end_date?: string | null;
          id?: string;
          start_date?: string | null;
          status?: string;
          title: string;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          description?: string | null;
          end_date?: string | null;
          id?: string;
          start_date?: string | null;
          status?: string;
          title?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      resources: {
        Row: {
          created_at: string | null;
          description: string | null;
          difficulty_level: string | null;
          id: string;
          resource_type: string;
          tags: string[] | null;
          title: string;
          url: string | null;
        };
        Insert: {
          created_at?: string | null;
          description?: string | null;
          difficulty_level?: string | null;
          id?: string;
          resource_type: string;
          tags?: string[] | null;
          title: string;
          url?: string | null;
        };
        Update: {
          created_at?: string | null;
          description?: string | null;
          difficulty_level?: string | null;
          id?: string;
          resource_type?: string;
          tags?: string[] | null;
          title?: string;
          url?: string | null;
        };
        Relationships: [];
      };
      student_achievements: {
        Row: {
          achievement_id: string | null;
          earned_at: string | null;
          id: string;
          student_id: string | null;
        };
        Insert: {
          achievement_id?: string | null;
          earned_at?: string | null;
          id?: string;
          student_id?: string | null;
        };
        Update: {
          achievement_id?: string | null;
          earned_at?: string | null;
          id?: string;
          student_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "student_achievements_achievement_id_fkey";
            columns: ["achievement_id"];
            isOneToOne: false;
            referencedRelation: "achievements";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "student_achievements_student_id_fkey";
            columns: ["student_id"];
            isOneToOne: false;
            referencedRelation: "students";
            referencedColumns: ["id"];
          },
        ];
      };
      student_events: {
        Row: {
          event_id: string;
          student_id: string;
        };
        Insert: {
          event_id: string;
          student_id: string;
        };
        Update: {
          event_id?: string;
          student_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "student_events_event_id_fkey";
            columns: ["event_id"];
            isOneToOne: false;
            referencedRelation: "events";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "student_events_student_id_fkey";
            columns: ["student_id"];
            isOneToOne: false;
            referencedRelation: "students";
            referencedColumns: ["id"];
          },
        ];
      };
      student_mentors: {
        Row: {
          assigned_at: string | null;
          id: string;
          mentor_id: string | null;
          student_id: string | null;
        };
        Insert: {
          assigned_at?: string | null;
          id?: string;
          mentor_id?: string | null;
          student_id?: string | null;
        };
        Update: {
          assigned_at?: string | null;
          id?: string;
          mentor_id?: string | null;
          student_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "student_mentors_mentor_id_fkey";
            columns: ["mentor_id"];
            isOneToOne: false;
            referencedRelation: "mentors";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "student_mentors_student_id_fkey";
            columns: ["student_id"];
            isOneToOne: false;
            referencedRelation: "students";
            referencedColumns: ["id"];
          },
        ];
      };
      student_progress: {
        Row: {
          created_at: string | null;
          hours_logged: number | null;
          id: string;
          notes: string | null;
          overall_progress: number | null;
          student_id: string | null;
          tasks_completed: number | null;
          updated_at: string | null;
          week_number: number;
          week_start_date: string;
        };
        Insert: {
          created_at?: string | null;
          hours_logged?: number | null;
          id?: string;
          notes?: string | null;
          overall_progress?: number | null;
          student_id?: string | null;
          tasks_completed?: number | null;
          updated_at?: string | null;
          week_number: number;
          week_start_date: string;
        };
        Update: {
          created_at?: string | null;
          hours_logged?: number | null;
          id?: string;
          notes?: string | null;
          overall_progress?: number | null;
          student_id?: string | null;
          tasks_completed?: number | null;
          updated_at?: string | null;
          week_number?: number;
          week_start_date?: string;
        };
        Relationships: [
          {
            foreignKeyName: "student_progress_student_id_fkey";
            columns: ["student_id"];
            isOneToOne: false;
            referencedRelation: "students";
            referencedColumns: ["id"];
          },
        ];
      };
      student_resource_access: {
        Row: {
          accessed_at: string | null;
          id: string;
          resource_id: string | null;
          student_id: string | null;
        };
        Insert: {
          accessed_at?: string | null;
          id?: string;
          resource_id?: string | null;
          student_id?: string | null;
        };
        Update: {
          accessed_at?: string | null;
          id?: string;
          resource_id?: string | null;
          student_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "student_resource_access_resource_id_fkey";
            columns: ["resource_id"];
            isOneToOne: false;
            referencedRelation: "resources";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "student_resource_access_student_id_fkey";
            columns: ["student_id"];
            isOneToOne: false;
            referencedRelation: "students";
            referencedColumns: ["id"];
          },
        ];
      };
      students: {
        Row: {
          created_at: string | null;
          email: string;
          full_name: string;
          id: string;
        };
        Insert: {
          created_at?: string | null;
          email: string;
          full_name: string;
          id?: string;
        };
        Update: {
          created_at?: string | null;
          email?: string;
          full_name?: string;
          id?: string;
        };
        Relationships: [];
      };
      tasks: {
        Row: {
          created_at: string | null;
          description: string | null;
          id: string;
          is_done: boolean | null;
          student_id: string | null;
          title: string;
        };
        Insert: {
          created_at?: string | null;
          description?: string | null;
          id?: string;
          is_done?: boolean | null;
          student_id?: string | null;
          title: string;
        };
        Update: {
          created_at?: string | null;
          description?: string | null;
          id?: string;
          is_done?: boolean | null;
          student_id?: string | null;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: "tasks_student_id_fkey";
            columns: ["student_id"];
            isOneToOne: false;
            referencedRelation: "students";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_current_student_id: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DefaultSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  } ? keyof (
      & Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
      & Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"]
    )
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database } ? (
    & Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    & Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"]
  )[TableName] extends {
    Row: infer R;
  } ? R
  : never
  : DefaultSchemaTableNameOrOptions extends keyof (
    & DefaultSchema["Tables"]
    & DefaultSchema["Views"]
  ) ? (
      & DefaultSchema["Tables"]
      & DefaultSchema["Views"]
    )[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R;
    } ? R
    : never
  : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  } ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][
    TableName
  ] extends {
    Insert: infer I;
  } ? I
  : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Insert: infer I;
    } ? I
    : never
  : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  } ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][
    TableName
  ] extends {
    Update: infer U;
  } ? U
  : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Update: infer U;
    } ? U
    : never
  : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database;
  } ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  } ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]][
      "CompositeTypes"
    ]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][
    CompositeTypeName
  ]
  : PublicCompositeTypeNameOrOptions extends
    keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never;

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const;
