export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.15";
  };
  public: {
    Tables: {
      admin_activity: {
        Row: {
          action: string;
          admin_username: string | null;
          created_at: string;
          id: string;
          resource: string | null;
          resource_id: string | null;
        };
        Insert: {
          action: string;
          admin_username?: string | null;
          created_at?: string;
          id?: string;
          resource?: string | null;
          resource_id?: string | null;
        };
        Update: {
          action?: string;
          admin_username?: string | null;
          created_at?: string;
          id?: string;
          resource?: string | null;
          resource_id?: string | null;
        };
        Relationships: [];
      };
      admin_users: {
        Row: {
          auth_user_id: string;
          created_at: string;
          display_name: string;
          id: string;
          is_active: boolean;
          last_login: string | null;
          role: string;
          updated_at: string;
          username: string;
        };
        Insert: {
          auth_user_id: string;
          created_at?: string;
          display_name?: string;
          id?: string;
          is_active?: boolean;
          last_login?: string | null;
          role?: string;
          updated_at?: string;
          username: string;
        };
        Update: {
          auth_user_id?: string;
          created_at?: string;
          display_name?: string;
          id?: string;
          is_active?: boolean;
          last_login?: string | null;
          role?: string;
          updated_at?: string;
          username?: string;
        };
        Relationships: [];
      };
      case_studies: {
        Row: {
          challenge: string;
          channels: string;
          created_at: string;
          cta_label: string;
          disclaimer: string;
          eyebrow: string;
          featured_image_url: string | null;
          featured_on_homepage: boolean;
          geos: string;
          group_key: string;
          id: string;
          industry: string;
          name: string;
          next_chapter: string;
          og_image_url: string | null;
          outcome: Json;
          published_at: string | null;
          role: string;
          seo_description: string;
          seo_title: string;
          slug: string;
          sort_order: number;
          status: string;
          subtitle: string;
          summary: string;
          tags: Json;
          telegram_message: string;
          thumbnail_url: string | null;
          timeline: string;
          title: string;
          updated_at: string;
          whatsapp_message: string;
        };
        Insert: {
          challenge?: string;
          channels?: string;
          created_at?: string;
          cta_label?: string;
          disclaimer?: string;
          eyebrow?: string;
          featured_image_url?: string | null;
          featured_on_homepage?: boolean;
          geos?: string;
          group_key?: string;
          id?: string;
          industry?: string;
          name: string;
          next_chapter?: string;
          og_image_url?: string | null;
          outcome?: Json;
          published_at?: string | null;
          role?: string;
          seo_description?: string;
          seo_title?: string;
          slug: string;
          sort_order?: number;
          status?: string;
          subtitle?: string;
          summary?: string;
          tags?: Json;
          telegram_message?: string;
          thumbnail_url?: string | null;
          timeline?: string;
          title?: string;
          updated_at?: string;
          whatsapp_message?: string;
        };
        Update: {
          challenge?: string;
          channels?: string;
          created_at?: string;
          cta_label?: string;
          disclaimer?: string;
          eyebrow?: string;
          featured_image_url?: string | null;
          featured_on_homepage?: boolean;
          geos?: string;
          group_key?: string;
          id?: string;
          industry?: string;
          name?: string;
          next_chapter?: string;
          og_image_url?: string | null;
          outcome?: Json;
          published_at?: string | null;
          role?: string;
          seo_description?: string;
          seo_title?: string;
          slug?: string;
          sort_order?: number;
          status?: string;
          subtitle?: string;
          summary?: string;
          tags?: Json;
          telegram_message?: string;
          thumbnail_url?: string | null;
          timeline?: string;
          title?: string;
          updated_at?: string;
          whatsapp_message?: string;
        };
        Relationships: [];
      };
      case_study_images: {
        Row: {
          alt_text: string;
          caption: string;
          case_study_id: string;
          created_at: string;
          enabled: boolean;
          featured: boolean;
          highlight: string;
          id: string;
          image_url: string;
          sort_order: number;
          updated_at: string;
        };
        Insert: {
          alt_text?: string;
          caption?: string;
          case_study_id: string;
          created_at?: string;
          enabled?: boolean;
          featured?: boolean;
          highlight?: string;
          id?: string;
          image_url: string;
          sort_order?: number;
          updated_at?: string;
        };
        Update: {
          alt_text?: string;
          caption?: string;
          case_study_id?: string;
          created_at?: string;
          enabled?: boolean;
          featured?: boolean;
          highlight?: string;
          id?: string;
          image_url?: string;
          sort_order?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "case_study_images_case_study_id_fkey";
            columns: ["case_study_id"];
            isOneToOne: false;
            referencedRelation: "case_studies";
            referencedColumns: ["id"];
          },
        ];
      };
      case_study_metrics: {
        Row: {
          animate: boolean;
          case_study_id: string;
          created_at: string;
          enabled: boolean;
          id: string;
          label: string;
          sort_order: number;
          support_text: string;
          updated_at: string;
          value: string;
        };
        Insert: {
          animate?: boolean;
          case_study_id: string;
          created_at?: string;
          enabled?: boolean;
          id?: string;
          label: string;
          sort_order?: number;
          support_text?: string;
          updated_at?: string;
          value: string;
        };
        Update: {
          animate?: boolean;
          case_study_id?: string;
          created_at?: string;
          enabled?: boolean;
          id?: string;
          label?: string;
          sort_order?: number;
          support_text?: string;
          updated_at?: string;
          value?: string;
        };
        Relationships: [
          {
            foreignKeyName: "case_study_metrics_case_study_id_fkey";
            columns: ["case_study_id"];
            isOneToOne: false;
            referencedRelation: "case_studies";
            referencedColumns: ["id"];
          },
        ];
      };
      case_study_steps: {
        Row: {
          case_study_id: string;
          created_at: string;
          description: string;
          enabled: boolean;
          heading: string;
          icon: string | null;
          id: string;
          image_url: string | null;
          sort_order: number;
          step_label: string;
          updated_at: string;
        };
        Insert: {
          case_study_id: string;
          created_at?: string;
          description?: string;
          enabled?: boolean;
          heading: string;
          icon?: string | null;
          id?: string;
          image_url?: string | null;
          sort_order?: number;
          step_label?: string;
          updated_at?: string;
        };
        Update: {
          case_study_id?: string;
          created_at?: string;
          description?: string;
          enabled?: boolean;
          heading?: string;
          icon?: string | null;
          id?: string;
          image_url?: string | null;
          sort_order?: number;
          step_label?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "case_study_steps_case_study_id_fkey";
            columns: ["case_study_id"];
            isOneToOne: false;
            referencedRelation: "case_studies";
            referencedColumns: ["id"];
          },
        ];
      };
      ctas: {
        Row: {
          channel: string;
          created_at: string;
          enabled: boolean;
          id: string;
          label: string;
          location: string;
          name: string;
          open_new_tab: boolean;
          prefilled_message: string;
          sort_order: number;
          style: string;
          tracking_source: string;
          updated_at: string;
          url: string | null;
        };
        Insert: {
          channel?: string;
          created_at?: string;
          enabled?: boolean;
          id?: string;
          label: string;
          location?: string;
          name: string;
          open_new_tab?: boolean;
          prefilled_message?: string;
          sort_order?: number;
          style?: string;
          tracking_source?: string;
          updated_at?: string;
          url?: string | null;
        };
        Update: {
          channel?: string;
          created_at?: string;
          enabled?: boolean;
          id?: string;
          label?: string;
          location?: string;
          name?: string;
          open_new_tab?: boolean;
          prefilled_message?: string;
          sort_order?: number;
          style?: string;
          tracking_source?: string;
          updated_at?: string;
          url?: string | null;
        };
        Relationships: [];
      };
      faqs: {
        Row: {
          answer: string;
          created_at: string;
          enabled: boolean;
          id: string;
          question: string;
          sort_order: number;
          updated_at: string;
        };
        Insert: {
          answer: string;
          created_at?: string;
          enabled?: boolean;
          id?: string;
          question: string;
          sort_order?: number;
          updated_at?: string;
        };
        Update: {
          answer?: string;
          created_at?: string;
          enabled?: boolean;
          id?: string;
          question?: string;
          sort_order?: number;
          updated_at?: string;
        };
        Relationships: [];
      };
      form_options: {
        Row: {
          created_at: string;
          enabled: boolean;
          id: string;
          label: string;
          question_id: string;
          sort_order: number;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          enabled?: boolean;
          id?: string;
          label: string;
          question_id: string;
          sort_order?: number;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          enabled?: boolean;
          id?: string;
          label?: string;
          question_id?: string;
          sort_order?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "form_options_question_id_fkey";
            columns: ["question_id"];
            isOneToOne: false;
            referencedRelation: "form_questions";
            referencedColumns: ["id"];
          },
        ];
      };
      form_questions: {
        Row: {
          auto_advance: boolean;
          created_at: string;
          enabled: boolean;
          field_type: string;
          helper_text: string;
          id: string;
          label: string;
          question_key: string;
          required: boolean;
          sort_order: number;
          updated_at: string;
        };
        Insert: {
          auto_advance?: boolean;
          created_at?: string;
          enabled?: boolean;
          field_type?: string;
          helper_text?: string;
          id?: string;
          label: string;
          question_key: string;
          required?: boolean;
          sort_order?: number;
          updated_at?: string;
        };
        Update: {
          auto_advance?: boolean;
          created_at?: string;
          enabled?: boolean;
          field_type?: string;
          helper_text?: string;
          id?: string;
          label?: string;
          question_key?: string;
          required?: boolean;
          sort_order?: number;
          updated_at?: string;
        };
        Relationships: [];
      };
      hero_metrics: {
        Row: {
          animate: boolean;
          count_to: number | null;
          created_at: string;
          enabled: boolean;
          id: string;
          label: string;
          prefix: string;
          sort_order: number;
          suffix: string;
          updated_at: string;
          value: string;
        };
        Insert: {
          animate?: boolean;
          count_to?: number | null;
          created_at?: string;
          enabled?: boolean;
          id?: string;
          label: string;
          prefix?: string;
          sort_order?: number;
          suffix?: string;
          updated_at?: string;
          value: string;
        };
        Update: {
          animate?: boolean;
          count_to?: number | null;
          created_at?: string;
          enabled?: boolean;
          id?: string;
          label?: string;
          prefix?: string;
          sort_order?: number;
          suffix?: string;
          updated_at?: string;
          value?: string;
        };
        Relationships: [];
      };
      homepage_sections: {
        Row: {
          created_at: string;
          enabled: boolean;
          id: string;
          label: string;
          section_key: string;
          sort_order: number;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          enabled?: boolean;
          id?: string;
          label: string;
          section_key: string;
          sort_order?: number;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          enabled?: boolean;
          id?: string;
          label?: string;
          section_key?: string;
          sort_order?: number;
          updated_at?: string;
        };
        Relationships: [];
      };
      leads: {
        Row: {
          company: string;
          contact_destination: string;
          created_at: string;
          fbclid: string;
          id: string;
          landing_url: string;
          main_issue: Json;
          message: string;
          monthly_spend: Json;
          name: string;
          notes: string;
          referrer: string;
          scclid: string;
          services_needed: Json;
          source: string;
          status: string;
          target_geo: string;
          traffic_sources: Json;
          ttclid: string;
          updated_at: string;
          utm_campaign: string;
          utm_content: string;
          utm_medium: string;
          utm_source: string;
          utm_term: string;
          vertical: Json;
          website: string;
        };
        Insert: {
          company?: string;
          contact_destination?: string;
          created_at?: string;
          fbclid?: string;
          id?: string;
          landing_url?: string;
          main_issue?: Json;
          message?: string;
          monthly_spend?: Json;
          name?: string;
          notes?: string;
          referrer?: string;
          scclid?: string;
          services_needed?: Json;
          source?: string;
          status?: string;
          target_geo?: string;
          traffic_sources?: Json;
          ttclid?: string;
          updated_at?: string;
          utm_campaign?: string;
          utm_content?: string;
          utm_medium?: string;
          utm_source?: string;
          utm_term?: string;
          vertical?: Json;
          website?: string;
        };
        Update: {
          company?: string;
          contact_destination?: string;
          created_at?: string;
          fbclid?: string;
          id?: string;
          landing_url?: string;
          main_issue?: Json;
          message?: string;
          monthly_spend?: Json;
          name?: string;
          notes?: string;
          referrer?: string;
          scclid?: string;
          services_needed?: Json;
          source?: string;
          status?: string;
          target_geo?: string;
          traffic_sources?: Json;
          ttclid?: string;
          updated_at?: string;
          utm_campaign?: string;
          utm_content?: string;
          utm_medium?: string;
          utm_source?: string;
          utm_term?: string;
          vertical?: Json;
          website?: string;
        };
        Relationships: [];
      };
      marquee_items: {
        Row: {
          created_at: string;
          enabled: boolean;
          id: string;
          label: string;
          sort_order: number;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          enabled?: boolean;
          id?: string;
          label: string;
          sort_order?: number;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          enabled?: boolean;
          id?: string;
          label?: string;
          sort_order?: number;
          updated_at?: string;
        };
        Relationships: [];
      };
      media_assets: {
        Row: {
          alt_text: string;
          category: string;
          created_at: string;
          file_name: string;
          file_path: string;
          file_size: number | null;
          height: number | null;
          id: string;
          mime_type: string;
          public_url: string;
          updated_at: string;
          width: number | null;
        };
        Insert: {
          alt_text?: string;
          category?: string;
          created_at?: string;
          file_name: string;
          file_path: string;
          file_size?: number | null;
          height?: number | null;
          id?: string;
          mime_type?: string;
          public_url: string;
          updated_at?: string;
          width?: number | null;
        };
        Update: {
          alt_text?: string;
          category?: string;
          created_at?: string;
          file_name?: string;
          file_path?: string;
          file_size?: number | null;
          height?: number | null;
          id?: string;
          mime_type?: string;
          public_url?: string;
          updated_at?: string;
          width?: number | null;
        };
        Relationships: [];
      };
      navigation_items: {
        Row: {
          created_at: string;
          enabled: boolean;
          href: string;
          id: string;
          label: string;
          location: string;
          open_new_tab: boolean;
          sort_order: number;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          enabled?: boolean;
          href: string;
          id?: string;
          label: string;
          location?: string;
          open_new_tab?: boolean;
          sort_order?: number;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          enabled?: boolean;
          href?: string;
          id?: string;
          label?: string;
          location?: string;
          open_new_tab?: boolean;
          sort_order?: number;
          updated_at?: string;
        };
        Relationships: [];
      };
      process_steps: {
        Row: {
          created_at: string;
          enabled: boolean;
          icon: string | null;
          id: string;
          items: Json;
          lead: string;
          sort_order: number;
          step_label: string;
          title: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          enabled?: boolean;
          icon?: string | null;
          id?: string;
          items?: Json;
          lead?: string;
          sort_order?: number;
          step_label?: string;
          title: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          enabled?: boolean;
          icon?: string | null;
          id?: string;
          items?: Json;
          lead?: string;
          sort_order?: number;
          step_label?: string;
          title?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      services: {
        Row: {
          bullets: Json;
          created_at: string;
          cta_label: string;
          cta_url: string | null;
          enabled: boolean;
          featured: boolean;
          icon: string | null;
          id: string;
          long_description: string;
          number_label: string;
          short_description: string;
          sort_order: number;
          tags: Json;
          telegram_message: string;
          title: string;
          updated_at: string;
          whatsapp_message: string;
        };
        Insert: {
          bullets?: Json;
          created_at?: string;
          cta_label?: string;
          cta_url?: string | null;
          enabled?: boolean;
          featured?: boolean;
          icon?: string | null;
          id?: string;
          long_description?: string;
          number_label?: string;
          short_description?: string;
          sort_order?: number;
          tags?: Json;
          telegram_message?: string;
          title: string;
          updated_at?: string;
          whatsapp_message?: string;
        };
        Update: {
          bullets?: Json;
          created_at?: string;
          cta_label?: string;
          cta_url?: string | null;
          enabled?: boolean;
          featured?: boolean;
          icon?: string | null;
          id?: string;
          long_description?: string;
          number_label?: string;
          short_description?: string;
          sort_order?: number;
          tags?: Json;
          telegram_message?: string;
          title?: string;
          updated_at?: string;
          whatsapp_message?: string;
        };
        Relationships: [];
      };
      site_settings: {
        Row: {
          is_public: boolean;
          key: string;
          updated_at: string;
          value: Json;
        };
        Insert: {
          is_public?: boolean;
          key: string;
          updated_at?: string;
          value?: Json;
        };
        Update: {
          is_public?: boolean;
          key?: string;
          updated_at?: string;
          value?: Json;
        };
        Relationships: [];
      };
      tech_categories: {
        Row: {
          created_at: string;
          enabled: boolean;
          id: string;
          items: Json;
          sort_order: number;
          title: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          enabled?: boolean;
          id?: string;
          items?: Json;
          sort_order?: number;
          title: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          enabled?: boolean;
          id?: string;
          items?: Json;
          sort_order?: number;
          title?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      verticals: {
        Row: {
          created_at: string;
          cta_label: string;
          cta_url: string | null;
          description: string;
          enabled: boolean;
          icon: string | null;
          id: string;
          sort_order: number;
          tags: Json;
          telegram_message: string;
          title: string;
          updated_at: string;
          whatsapp_message: string;
        };
        Insert: {
          created_at?: string;
          cta_label?: string;
          cta_url?: string | null;
          description?: string;
          enabled?: boolean;
          icon?: string | null;
          id?: string;
          sort_order?: number;
          tags?: Json;
          telegram_message?: string;
          title: string;
          updated_at?: string;
          whatsapp_message?: string;
        };
        Update: {
          created_at?: string;
          cta_label?: string;
          cta_url?: string | null;
          description?: string;
          enabled?: boolean;
          icon?: string | null;
          id?: string;
          sort_order?: number;
          tags?: Json;
          telegram_message?: string;
          title?: string;
          updated_at?: string;
          whatsapp_message?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      is_admin: { Args: never; Returns: boolean };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    keyof DefaultSchema["Enums"] | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    keyof DefaultSchema["CompositeTypes"] | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;
