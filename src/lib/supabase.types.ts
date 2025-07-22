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
                    criteria: string | null;
                    description: string | null;
                    icon: string | null;
                    id: string;
                    is_active: boolean | null;
                    points: number | null;
                    title: string;
                };
                Insert: {
                    category: string;
                    created_at?: string | null;
                    criteria?: string | null;
                    description?: string | null;
                    icon?: string | null;
                    id?: string;
                    is_active?: boolean | null;
                    points?: number | null;
                    title: string;
                };
                Update: {
                    category?: string;
                    created_at?: string | null;
                    criteria?: string | null;
                    description?: string | null;
                    icon?: string | null;
                    id?: string;
                    is_active?: boolean | null;
                    points?: number | null;
                    title?: string;
                };
                Relationships: [];
            };
            announcement_reads: {
                Row: {
                    announcement_id: string | null;
                    id: string;
                    read_at: string | null;
                    user_id: string | null;
                };
                Insert: {
                    announcement_id?: string | null;
                    id?: string;
                    read_at?: string | null;
                    user_id?: string | null;
                };
                Update: {
                    announcement_id?: string | null;
                    id?: string;
                    read_at?: string | null;
                    user_id?: string | null;
                };
                Relationships: [
                    {
                        foreignKeyName: "announcement_reads_announcement_id_fkey";
                        columns: ["announcement_id"];
                        isOneToOne: false;
                        referencedRelation: "announcements";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "announcement_reads_user_id_fkey";
                        columns: ["user_id"];
                        isOneToOne: false;
                        referencedRelation: "current_user_profile";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "announcement_reads_user_id_fkey";
                        columns: ["user_id"];
                        isOneToOne: false;
                        referencedRelation: "users";
                        referencedColumns: ["id"];
                    },
                ];
            };
            announcements: {
                Row: {
                    announcement_type: string | null;
                    content: string;
                    created_at: string | null;
                    created_by: string | null;
                    expires_at: string | null;
                    id: string;
                    is_pinned: boolean | null;
                    target_audience: string[];
                    title: string;
                    updated_at: string | null;
                };
                Insert: {
                    announcement_type?: string | null;
                    content: string;
                    created_at?: string | null;
                    created_by?: string | null;
                    expires_at?: string | null;
                    id?: string;
                    is_pinned?: boolean | null;
                    target_audience: string[];
                    title: string;
                    updated_at?: string | null;
                };
                Update: {
                    announcement_type?: string | null;
                    content?: string;
                    created_at?: string | null;
                    created_by?: string | null;
                    expires_at?: string | null;
                    id?: string;
                    is_pinned?: boolean | null;
                    target_audience?: string[];
                    title?: string;
                    updated_at?: string | null;
                };
                Relationships: [
                    {
                        foreignKeyName: "announcements_created_by_fkey";
                        columns: ["created_by"];
                        isOneToOne: false;
                        referencedRelation: "current_user_profile";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "announcements_created_by_fkey";
                        columns: ["created_by"];
                        isOneToOne: false;
                        referencedRelation: "users";
                        referencedColumns: ["id"];
                    },
                ];
            };
            event_registrations: {
                Row: {
                    event_id: string | null;
                    id: string;
                    registered_at: string | null;
                    status: string;
                    user_id: string | null;
                };
                Insert: {
                    event_id?: string | null;
                    id?: string;
                    registered_at?: string | null;
                    status?: string;
                    user_id?: string | null;
                };
                Update: {
                    event_id?: string | null;
                    id?: string;
                    registered_at?: string | null;
                    status?: string;
                    user_id?: string | null;
                };
                Relationships: [
                    {
                        foreignKeyName: "event_registrations_event_id_fkey";
                        columns: ["event_id"];
                        isOneToOne: false;
                        referencedRelation: "events";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "event_registrations_event_id_fkey";
                        columns: ["event_id"];
                        isOneToOne: false;
                        referencedRelation: "my_upcoming_events";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "event_registrations_user_id_fkey";
                        columns: ["user_id"];
                        isOneToOne: false;
                        referencedRelation: "current_user_profile";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "event_registrations_user_id_fkey";
                        columns: ["user_id"];
                        isOneToOne: false;
                        referencedRelation: "users";
                        referencedColumns: ["id"];
                    },
                ];
            };
            events: {
                Row: {
                    created_at: string | null;
                    created_by: string | null;
                    description: string | null;
                    end_time: string;
                    event_type: string;
                    id: string;
                    instructor_id: string | null;
                    is_required: boolean | null;
                    location: string | null;
                    materials_needed: string[] | null;
                    max_participants: number | null;
                    start_time: string;
                    title: string;
                    updated_at: string | null;
                };
                Insert: {
                    created_at?: string | null;
                    created_by?: string | null;
                    description?: string | null;
                    end_time: string;
                    event_type: string;
                    id?: string;
                    instructor_id?: string | null;
                    is_required?: boolean | null;
                    location?: string | null;
                    materials_needed?: string[] | null;
                    max_participants?: number | null;
                    start_time: string;
                    title: string;
                    updated_at?: string | null;
                };
                Update: {
                    created_at?: string | null;
                    created_by?: string | null;
                    description?: string | null;
                    end_time?: string;
                    event_type?: string;
                    id?: string;
                    instructor_id?: string | null;
                    is_required?: boolean | null;
                    location?: string | null;
                    materials_needed?: string[] | null;
                    max_participants?: number | null;
                    start_time?: string;
                    title?: string;
                    updated_at?: string | null;
                };
                Relationships: [
                    {
                        foreignKeyName: "events_created_by_fkey";
                        columns: ["created_by"];
                        isOneToOne: false;
                        referencedRelation: "current_user_profile";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "events_created_by_fkey";
                        columns: ["created_by"];
                        isOneToOne: false;
                        referencedRelation: "users";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "events_instructor_id_fkey";
                        columns: ["instructor_id"];
                        isOneToOne: false;
                        referencedRelation: "current_user_profile";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "events_instructor_id_fkey";
                        columns: ["instructor_id"];
                        isOneToOne: false;
                        referencedRelation: "users";
                        referencedColumns: ["id"];
                    },
                ];
            };
            mentor_profiles: {
                Row: {
                    availability: string[] | null;
                    bio: string | null;
                    company: string | null;
                    created_at: string | null;
                    expertise: string[];
                    github_url: string | null;
                    linkedin_url: string | null;
                    max_students: number | null;
                    updated_at: string | null;
                    user_id: string;
                    years_experience: number | null;
                };
                Insert: {
                    availability?: string[] | null;
                    bio?: string | null;
                    company?: string | null;
                    created_at?: string | null;
                    expertise: string[];
                    github_url?: string | null;
                    linkedin_url?: string | null;
                    max_students?: number | null;
                    updated_at?: string | null;
                    user_id: string;
                    years_experience?: number | null;
                };
                Update: {
                    availability?: string[] | null;
                    bio?: string | null;
                    company?: string | null;
                    created_at?: string | null;
                    expertise?: string[];
                    github_url?: string | null;
                    linkedin_url?: string | null;
                    max_students?: number | null;
                    updated_at?: string | null;
                    user_id?: string;
                    years_experience?: number | null;
                };
                Relationships: [
                    {
                        foreignKeyName: "mentor_profiles_user_id_fkey";
                        columns: ["user_id"];
                        isOneToOne: true;
                        referencedRelation: "current_user_profile";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "mentor_profiles_user_id_fkey";
                        columns: ["user_id"];
                        isOneToOne: true;
                        referencedRelation: "users";
                        referencedColumns: ["id"];
                    },
                ];
            };
            mentorship_relationships: {
                Row: {
                    created_at: string | null;
                    end_date: string | null;
                    goals: string | null;
                    id: string;
                    meeting_frequency: string | null;
                    mentor_id: string | null;
                    notes: string | null;
                    preferred_communication: string[] | null;
                    start_date: string;
                    status: string;
                    student_id: string | null;
                    updated_at: string | null;
                };
                Insert: {
                    created_at?: string | null;
                    end_date?: string | null;
                    goals?: string | null;
                    id?: string;
                    meeting_frequency?: string | null;
                    mentor_id?: string | null;
                    notes?: string | null;
                    preferred_communication?: string[] | null;
                    start_date: string;
                    status?: string;
                    student_id?: string | null;
                    updated_at?: string | null;
                };
                Update: {
                    created_at?: string | null;
                    end_date?: string | null;
                    goals?: string | null;
                    id?: string;
                    meeting_frequency?: string | null;
                    mentor_id?: string | null;
                    notes?: string | null;
                    preferred_communication?: string[] | null;
                    start_date?: string;
                    status?: string;
                    student_id?: string | null;
                    updated_at?: string | null;
                };
                Relationships: [
                    {
                        foreignKeyName: "mentorship_relationships_mentor_id_fkey";
                        columns: ["mentor_id"];
                        isOneToOne: false;
                        referencedRelation: "current_user_profile";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "mentorship_relationships_mentor_id_fkey";
                        columns: ["mentor_id"];
                        isOneToOne: false;
                        referencedRelation: "users";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "mentorship_relationships_student_id_fkey";
                        columns: ["student_id"];
                        isOneToOne: false;
                        referencedRelation: "current_user_profile";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "mentorship_relationships_student_id_fkey";
                        columns: ["student_id"];
                        isOneToOne: false;
                        referencedRelation: "users";
                        referencedColumns: ["id"];
                    },
                ];
            };
            progress_logs: {
                Row: {
                    achievements: string | null;
                    activities: string[] | null;
                    challenges_faced: string | null;
                    created_at: string | null;
                    hours_logged: number | null;
                    id: string;
                    log_date: string;
                    mentor_feedback: string | null;
                    self_reflection: string | null;
                    tasks_completed: number | null;
                    updated_at: string | null;
                    user_id: string | null;
                };
                Insert: {
                    achievements?: string | null;
                    activities?: string[] | null;
                    challenges_faced?: string | null;
                    created_at?: string | null;
                    hours_logged?: number | null;
                    id?: string;
                    log_date: string;
                    mentor_feedback?: string | null;
                    self_reflection?: string | null;
                    tasks_completed?: number | null;
                    updated_at?: string | null;
                    user_id?: string | null;
                };
                Update: {
                    achievements?: string | null;
                    activities?: string[] | null;
                    challenges_faced?: string | null;
                    created_at?: string | null;
                    hours_logged?: number | null;
                    id?: string;
                    log_date?: string;
                    mentor_feedback?: string | null;
                    self_reflection?: string | null;
                    tasks_completed?: number | null;
                    updated_at?: string | null;
                    user_id?: string | null;
                };
                Relationships: [
                    {
                        foreignKeyName: "progress_logs_user_id_fkey";
                        columns: ["user_id"];
                        isOneToOne: false;
                        referencedRelation: "current_user_profile";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "progress_logs_user_id_fkey";
                        columns: ["user_id"];
                        isOneToOne: false;
                        referencedRelation: "users";
                        referencedColumns: ["id"];
                    },
                ];
            };
            project_members: {
                Row: {
                    contribution_areas: string[] | null;
                    id: string;
                    joined_at: string | null;
                    left_at: string | null;
                    project_id: string | null;
                    role: string;
                    user_id: string | null;
                };
                Insert: {
                    contribution_areas?: string[] | null;
                    id?: string;
                    joined_at?: string | null;
                    left_at?: string | null;
                    project_id?: string | null;
                    role?: string;
                    user_id?: string | null;
                };
                Update: {
                    contribution_areas?: string[] | null;
                    id?: string;
                    joined_at?: string | null;
                    left_at?: string | null;
                    project_id?: string | null;
                    role?: string;
                    user_id?: string | null;
                };
                Relationships: [
                    {
                        foreignKeyName: "project_members_project_id_fkey";
                        columns: ["project_id"];
                        isOneToOne: false;
                        referencedRelation: "my_active_projects";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "project_members_project_id_fkey";
                        columns: ["project_id"];
                        isOneToOne: false;
                        referencedRelation: "projects";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "project_members_user_id_fkey";
                        columns: ["user_id"];
                        isOneToOne: false;
                        referencedRelation: "current_user_profile";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "project_members_user_id_fkey";
                        columns: ["user_id"];
                        isOneToOne: false;
                        referencedRelation: "users";
                        referencedColumns: ["id"];
                    },
                ];
            };
            projects: {
                Row: {
                    created_at: string | null;
                    created_by: string | null;
                    demo_video_url: string | null;
                    description: string | null;
                    difficulty_level: string | null;
                    documentation_url: string | null;
                    end_date: string | null;
                    github_repo: string | null;
                    id: string;
                    max_team_size: number | null;
                    required_skills: string[] | null;
                    start_date: string | null;
                    status: string;
                    tags: string[] | null;
                    title: string;
                    updated_at: string | null;
                };
                Insert: {
                    created_at?: string | null;
                    created_by?: string | null;
                    demo_video_url?: string | null;
                    description?: string | null;
                    difficulty_level?: string | null;
                    documentation_url?: string | null;
                    end_date?: string | null;
                    github_repo?: string | null;
                    id?: string;
                    max_team_size?: number | null;
                    required_skills?: string[] | null;
                    start_date?: string | null;
                    status?: string;
                    tags?: string[] | null;
                    title: string;
                    updated_at?: string | null;
                };
                Update: {
                    created_at?: string | null;
                    created_by?: string | null;
                    demo_video_url?: string | null;
                    description?: string | null;
                    difficulty_level?: string | null;
                    documentation_url?: string | null;
                    end_date?: string | null;
                    github_repo?: string | null;
                    id?: string;
                    max_team_size?: number | null;
                    required_skills?: string[] | null;
                    start_date?: string | null;
                    status?: string;
                    tags?: string[] | null;
                    title?: string;
                    updated_at?: string | null;
                };
                Relationships: [
                    {
                        foreignKeyName: "projects_created_by_fkey";
                        columns: ["created_by"];
                        isOneToOne: false;
                        referencedRelation: "current_user_profile";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "projects_created_by_fkey";
                        columns: ["created_by"];
                        isOneToOne: false;
                        referencedRelation: "users";
                        referencedColumns: ["id"];
                    },
                ];
            };
            resource_access: {
                Row: {
                    accessed_at: string | null;
                    completion_percentage: number | null;
                    completion_status: string | null;
                    id: string;
                    rating: number | null;
                    resource_id: string | null;
                    review_text: string | null;
                    time_spent_hours: number | null;
                    user_id: string | null;
                };
                Insert: {
                    accessed_at?: string | null;
                    completion_percentage?: number | null;
                    completion_status?: string | null;
                    id?: string;
                    rating?: number | null;
                    resource_id?: string | null;
                    review_text?: string | null;
                    time_spent_hours?: number | null;
                    user_id?: string | null;
                };
                Update: {
                    accessed_at?: string | null;
                    completion_percentage?: number | null;
                    completion_status?: string | null;
                    id?: string;
                    rating?: number | null;
                    resource_id?: string | null;
                    review_text?: string | null;
                    time_spent_hours?: number | null;
                    user_id?: string | null;
                };
                Relationships: [
                    {
                        foreignKeyName: "resource_access_resource_id_fkey";
                        columns: ["resource_id"];
                        isOneToOne: false;
                        referencedRelation: "resources";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "resource_access_user_id_fkey";
                        columns: ["user_id"];
                        isOneToOne: false;
                        referencedRelation: "current_user_profile";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "resource_access_user_id_fkey";
                        columns: ["user_id"];
                        isOneToOne: false;
                        referencedRelation: "users";
                        referencedColumns: ["id"];
                    },
                ];
            };
            resources: {
                Row: {
                    created_at: string | null;
                    description: string | null;
                    difficulty_level: string | null;
                    download_count: number | null;
                    estimated_time_hours: number | null;
                    file_path: string | null;
                    id: string;
                    is_public: boolean | null;
                    learning_objectives: string[] | null;
                    prerequisites: string[] | null;
                    rating_average: number | null;
                    rating_count: number | null;
                    resource_type: string;
                    tags: string[] | null;
                    title: string;
                    updated_at: string | null;
                    uploaded_by: string | null;
                    url: string | null;
                };
                Insert: {
                    created_at?: string | null;
                    description?: string | null;
                    difficulty_level?: string | null;
                    download_count?: number | null;
                    estimated_time_hours?: number | null;
                    file_path?: string | null;
                    id?: string;
                    is_public?: boolean | null;
                    learning_objectives?: string[] | null;
                    prerequisites?: string[] | null;
                    rating_average?: number | null;
                    rating_count?: number | null;
                    resource_type: string;
                    tags?: string[] | null;
                    title: string;
                    updated_at?: string | null;
                    uploaded_by?: string | null;
                    url?: string | null;
                };
                Update: {
                    created_at?: string | null;
                    description?: string | null;
                    difficulty_level?: string | null;
                    download_count?: number | null;
                    estimated_time_hours?: number | null;
                    file_path?: string | null;
                    id?: string;
                    is_public?: boolean | null;
                    learning_objectives?: string[] | null;
                    prerequisites?: string[] | null;
                    rating_average?: number | null;
                    rating_count?: number | null;
                    resource_type?: string;
                    tags?: string[] | null;
                    title?: string;
                    updated_at?: string | null;
                    uploaded_by?: string | null;
                    url?: string | null;
                };
                Relationships: [
                    {
                        foreignKeyName: "resources_uploaded_by_fkey";
                        columns: ["uploaded_by"];
                        isOneToOne: false;
                        referencedRelation: "current_user_profile";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "resources_uploaded_by_fkey";
                        columns: ["uploaded_by"];
                        isOneToOne: false;
                        referencedRelation: "users";
                        referencedColumns: ["id"];
                    },
                ];
            };
            student_profiles: {
                Row: {
                    created_at: string | null;
                    emergency_contact_name: string | null;
                    emergency_contact_phone: string | null;
                    experience_level: string | null;
                    grade_level: string | null;
                    interests: string[] | null;
                    overall_progress: number | null;
                    program_start_date: string | null;
                    school: string | null;
                    total_hours_logged: number | null;
                    updated_at: string | null;
                    user_id: string;
                };
                Insert: {
                    created_at?: string | null;
                    emergency_contact_name?: string | null;
                    emergency_contact_phone?: string | null;
                    experience_level?: string | null;
                    grade_level?: string | null;
                    interests?: string[] | null;
                    overall_progress?: number | null;
                    program_start_date?: string | null;
                    school?: string | null;
                    total_hours_logged?: number | null;
                    updated_at?: string | null;
                    user_id: string;
                };
                Update: {
                    created_at?: string | null;
                    emergency_contact_name?: string | null;
                    emergency_contact_phone?: string | null;
                    experience_level?: string | null;
                    grade_level?: string | null;
                    interests?: string[] | null;
                    overall_progress?: number | null;
                    program_start_date?: string | null;
                    school?: string | null;
                    total_hours_logged?: number | null;
                    updated_at?: string | null;
                    user_id?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "student_profiles_user_id_fkey";
                        columns: ["user_id"];
                        isOneToOne: true;
                        referencedRelation: "current_user_profile";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "student_profiles_user_id_fkey";
                        columns: ["user_id"];
                        isOneToOne: true;
                        referencedRelation: "users";
                        referencedColumns: ["id"];
                    },
                ];
            };
            tasks: {
                Row: {
                    actual_hours: number | null;
                    assigned_to: string | null;
                    created_at: string | null;
                    created_by: string | null;
                    dependencies: string[] | null;
                    description: string | null;
                    due_date: string | null;
                    estimated_hours: number | null;
                    id: string;
                    priority: string | null;
                    project_id: string | null;
                    status: Database["public"]["Enums"]["task_status"];
                    title: string;
                    updated_at: string | null;
                };
                Insert: {
                    actual_hours?: number | null;
                    assigned_to?: string | null;
                    created_at?: string | null;
                    created_by?: string | null;
                    dependencies?: string[] | null;
                    description?: string | null;
                    due_date?: string | null;
                    estimated_hours?: number | null;
                    id?: string;
                    priority?: string | null;
                    project_id?: string | null;
                    status?: Database["public"]["Enums"]["task_status"];
                    title: string;
                    updated_at?: string | null;
                };
                Update: {
                    actual_hours?: number | null;
                    assigned_to?: string | null;
                    created_at?: string | null;
                    created_by?: string | null;
                    dependencies?: string[] | null;
                    description?: string | null;
                    due_date?: string | null;
                    estimated_hours?: number | null;
                    id?: string;
                    priority?: string | null;
                    project_id?: string | null;
                    status?: Database["public"]["Enums"]["task_status"];
                    title?: string;
                    updated_at?: string | null;
                };
                Relationships: [
                    {
                        foreignKeyName: "tasks_assigned_to_fkey";
                        columns: ["assigned_to"];
                        isOneToOne: false;
                        referencedRelation: "current_user_profile";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "tasks_assigned_to_fkey";
                        columns: ["assigned_to"];
                        isOneToOne: false;
                        referencedRelation: "users";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "tasks_created_by_fkey";
                        columns: ["created_by"];
                        isOneToOne: false;
                        referencedRelation: "current_user_profile";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "tasks_created_by_fkey";
                        columns: ["created_by"];
                        isOneToOne: false;
                        referencedRelation: "users";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "tasks_project_id_fkey";
                        columns: ["project_id"];
                        isOneToOne: false;
                        referencedRelation: "my_active_projects";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "tasks_project_id_fkey";
                        columns: ["project_id"];
                        isOneToOne: false;
                        referencedRelation: "projects";
                        referencedColumns: ["id"];
                    },
                ];
            };
            user_achievements: {
                Row: {
                    achievement_id: string | null;
                    earned_at: string | null;
                    evidence_text: string | null;
                    evidence_url: string | null;
                    id: string;
                    user_id: string | null;
                    verified_by: string | null;
                };
                Insert: {
                    achievement_id?: string | null;
                    earned_at?: string | null;
                    evidence_text?: string | null;
                    evidence_url?: string | null;
                    id?: string;
                    user_id?: string | null;
                    verified_by?: string | null;
                };
                Update: {
                    achievement_id?: string | null;
                    earned_at?: string | null;
                    evidence_text?: string | null;
                    evidence_url?: string | null;
                    id?: string;
                    user_id?: string | null;
                    verified_by?: string | null;
                };
                Relationships: [
                    {
                        foreignKeyName: "user_achievements_achievement_id_fkey";
                        columns: ["achievement_id"];
                        isOneToOne: false;
                        referencedRelation: "achievements";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "user_achievements_user_id_fkey";
                        columns: ["user_id"];
                        isOneToOne: false;
                        referencedRelation: "current_user_profile";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "user_achievements_user_id_fkey";
                        columns: ["user_id"];
                        isOneToOne: false;
                        referencedRelation: "users";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "user_achievements_verified_by_fkey";
                        columns: ["verified_by"];
                        isOneToOne: false;
                        referencedRelation: "current_user_profile";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "user_achievements_verified_by_fkey";
                        columns: ["verified_by"];
                        isOneToOne: false;
                        referencedRelation: "users";
                        referencedColumns: ["id"];
                    },
                ];
            };
            users: {
                Row: {
                    avatar_url: string | null;
                    created_at: string | null;
                    email: string;
                    full_name: string | null;
                    id: string;
                    role: string;
                    updated_at: string | null;
                };
                Insert: {
                    avatar_url?: string | null;
                    created_at?: string | null;
                    email: string;
                    full_name?: string | null;
                    id: string;
                    role?: string;
                    updated_at?: string | null;
                };
                Update: {
                    avatar_url?: string | null;
                    created_at?: string | null;
                    email?: string;
                    full_name?: string | null;
                    id?: string;
                    role?: string;
                    updated_at?: string | null;
                };
                Relationships: [];
            };
        };
        Views: {
            current_user_profile: {
                Row: {
                    avatar_url: string | null;
                    created_at: string | null;
                    email: string | null;
                    experience_level: string | null;
                    full_name: string | null;
                    grade_level: string | null;
                    id: string | null;
                    interests: string[] | null;
                    overall_progress: number | null;
                    role: string | null;
                    school: string | null;
                    total_hours_logged: number | null;
                    updated_at: string | null;
                };
                Relationships: [];
            };
            my_active_projects: {
                Row: {
                    created_at: string | null;
                    created_by: string | null;
                    demo_video_url: string | null;
                    description: string | null;
                    difficulty_level: string | null;
                    documentation_url: string | null;
                    end_date: string | null;
                    github_repo: string | null;
                    id: string | null;
                    max_team_size: number | null;
                    my_role: string | null;
                    required_skills: string[] | null;
                    start_date: string | null;
                    status: string | null;
                    tags: string[] | null;
                    title: string | null;
                    updated_at: string | null;
                };
                Relationships: [
                    {
                        foreignKeyName: "projects_created_by_fkey";
                        columns: ["created_by"];
                        isOneToOne: false;
                        referencedRelation: "current_user_profile";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "projects_created_by_fkey";
                        columns: ["created_by"];
                        isOneToOne: false;
                        referencedRelation: "users";
                        referencedColumns: ["id"];
                    },
                ];
            };
            my_upcoming_events: {
                Row: {
                    created_at: string | null;
                    created_by: string | null;
                    description: string | null;
                    end_time: string | null;
                    event_type: string | null;
                    id: string | null;
                    instructor_id: string | null;
                    is_required: boolean | null;
                    location: string | null;
                    materials_needed: string[] | null;
                    max_participants: number | null;
                    registration_status: string | null;
                    start_time: string | null;
                    title: string | null;
                    updated_at: string | null;
                };
                Relationships: [
                    {
                        foreignKeyName: "events_created_by_fkey";
                        columns: ["created_by"];
                        isOneToOne: false;
                        referencedRelation: "current_user_profile";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "events_created_by_fkey";
                        columns: ["created_by"];
                        isOneToOne: false;
                        referencedRelation: "users";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "events_instructor_id_fkey";
                        columns: ["instructor_id"];
                        isOneToOne: false;
                        referencedRelation: "current_user_profile";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "events_instructor_id_fkey";
                        columns: ["instructor_id"];
                        isOneToOne: false;
                        referencedRelation: "users";
                        referencedColumns: ["id"];
                    },
                ];
            };
        };
        Functions: {
            [_ in never]: never;
        };
        Enums: {
            task_status: "not_started" | "in_progress" | "done";
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
    }
        ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
              Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
        : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
    ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
          Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
          Row: infer R;
      }
        ? R
        : never
    : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
            DefaultSchema["Views"])
      ? (DefaultSchema["Tables"] &
            DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
            Row: infer R;
        }
          ? R
          : never
      : never;

export type TablesInsert<
    DefaultSchemaTableNameOrOptions extends
        | keyof DefaultSchema["Tables"]
        | { schema: keyof Database },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof Database;
    }
        ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
        : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
    ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
        | keyof DefaultSchema["Tables"]
        | { schema: keyof Database },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof Database;
    }
        ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
        : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
    ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
        | keyof DefaultSchema["Enums"]
        | { schema: keyof Database },
    EnumName extends DefaultSchemaEnumNameOrOptions extends {
        schema: keyof Database;
    }
        ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
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
    }
        ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
        : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
    ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
    : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
      ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
      : never;

export const Constants = {
    graphql_public: {
        Enums: {},
    },
    public: {
        Enums: {
            task_status: ["not_started", "in_progress", "done"],
        },
    },
} as const;
