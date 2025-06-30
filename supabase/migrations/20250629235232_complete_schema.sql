-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create public.users table that mirrors auth.users
CREATE TABLE public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'mentor', 'admin')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

-- Create student_profiles table for additional student data
CREATE TABLE student_profiles (
    user_id UUID PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
    school TEXT,
    grade_level TEXT,
    experience_level TEXT CHECK (experience_level IN ('beginner', 'intermediate', 'advanced')),
    interests TEXT[],
    emergency_contact_name TEXT,
    emergency_contact_phone TEXT,
    program_start_date DATE,
    total_hours_logged DECIMAL(8,2) DEFAULT 0,
    overall_progress DECIMAL(5,2) DEFAULT 0 CHECK (overall_progress >= 0 AND overall_progress <= 100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

-- Create mentor_profiles table for mentor-specific data
CREATE TABLE mentor_profiles (
    user_id UUID PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
    expertise TEXT[] NOT NULL,
    bio TEXT,
    company TEXT,
    years_experience INTEGER,
    max_students INTEGER DEFAULT 5,
    linkedin_url TEXT,
    github_url TEXT,
    availability TEXT[], -- Days/times available
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

-- Create events table
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    event_type TEXT NOT NULL CHECK (event_type IN ('workshop', 'assignment', 'meeting', 'presentation', 'competition')),
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    location TEXT,
    max_participants INTEGER,
    instructor_id UUID REFERENCES public.users(id),
    is_required BOOLEAN DEFAULT false,
    materials_needed TEXT[],
    created_by UUID REFERENCES public.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

-- Create event_registrations table
CREATE TABLE event_registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'registered' CHECK (status IN ('registered', 'attended', 'no_show', 'cancelled')),
    registered_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()),
    UNIQUE(event_id, user_id)
);

-- Create projects table
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    status TEXT NOT NULL CHECK (status IN ('planning', 'in_progress', 'completed', 'cancelled', 'on_hold')) DEFAULT 'planning',
    difficulty_level TEXT CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
    start_date DATE,
    end_date DATE,
    github_repo TEXT,
    documentation_url TEXT,
    demo_video_url TEXT,
    tags TEXT[],
    required_skills TEXT[],
    max_team_size INTEGER DEFAULT 4,
    created_by UUID REFERENCES public.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

-- Create project_members table
CREATE TABLE project_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('leader', 'member', 'mentor')) DEFAULT 'member',
    contribution_areas TEXT[],
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()),
    left_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(project_id, user_id)
);

-- Create tasks table
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    assigned_to UUID REFERENCES public.users(id) ON DELETE CASCADE,
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'todo' CHECK (status IN ('todo', 'in_progress', 'completed', 'blocked')),
    priority TEXT CHECK (priority IN ('low', 'medium', 'high', 'urgent')) DEFAULT 'medium',
    due_date TIMESTAMP WITH TIME ZONE,
    estimated_hours DECIMAL(5,2),
    actual_hours DECIMAL(5,2),
    dependencies UUID[], -- Array of task IDs this task depends on
    created_by UUID REFERENCES public.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

-- Create mentorship_relationships table
CREATE TABLE mentorship_relationships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mentor_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    student_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'paused', 'terminated')),
    start_date DATE NOT NULL,
    end_date DATE,
    meeting_frequency TEXT, -- e.g., 'weekly', 'bi-weekly', 'monthly'
    preferred_communication TEXT[], -- e.g., 'video_call', 'chat', 'email'
    goals TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()),
    UNIQUE(mentor_id, student_id)
);

-- Create progress_logs table
CREATE TABLE progress_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    log_date DATE NOT NULL,
    hours_logged DECIMAL(5,2) DEFAULT 0,
    tasks_completed INTEGER DEFAULT 0,
    activities TEXT[], -- What they worked on
    challenges_faced TEXT,
    achievements TEXT,
    mentor_feedback TEXT,
    self_reflection TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()),
    UNIQUE(user_id, log_date)
);

-- Create achievements table
CREATE TABLE achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    icon TEXT,
    points INTEGER DEFAULT 0,
    category TEXT NOT NULL CHECK (category IN ('technical', 'collaboration', 'leadership', 'creativity', 'consistency', 'mentorship')),
    criteria TEXT, -- What needs to be done to earn this achievement
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

-- Create user_achievements table
CREATE TABLE user_achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    achievement_id UUID REFERENCES achievements(id) ON DELETE CASCADE,
    earned_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()),
    evidence_text TEXT,
    evidence_url TEXT,
    verified_by UUID REFERENCES public.users(id),
    UNIQUE(user_id, achievement_id)
);

-- Create resources table
CREATE TABLE resources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    resource_type TEXT NOT NULL CHECK (resource_type IN ('tutorial', 'documentation', 'video', 'tool', 'dataset', 'book', 'course')),
    url TEXT,
    file_path TEXT, -- For uploaded files
    tags TEXT[],
    difficulty_level TEXT CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
    estimated_time_hours DECIMAL(5,2),
    prerequisites TEXT[],
    learning_objectives TEXT[],
    uploaded_by UUID REFERENCES public.users(id),
    is_public BOOLEAN DEFAULT true,
    download_count INTEGER DEFAULT 0,
    rating_average DECIMAL(3,2),
    rating_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

-- Create resource_access table
CREATE TABLE resource_access (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    resource_id UUID REFERENCES resources(id) ON DELETE CASCADE,
    accessed_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()),
    completion_status TEXT CHECK (completion_status IN ('not_started', 'in_progress', 'completed')) DEFAULT 'not_started',
    completion_percentage DECIMAL(5,2) DEFAULT 0,
    time_spent_hours DECIMAL(5,2) DEFAULT 0,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT,
    UNIQUE(user_id, resource_id)
);

-- Create announcements table
CREATE TABLE announcements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    announcement_type TEXT CHECK (announcement_type IN ('general', 'urgent', 'event', 'achievement', 'deadline')) DEFAULT 'general',
    target_audience TEXT[] NOT NULL, -- e.g., ['all'], ['students'], ['mentors'], ['grade_9'], etc.
    is_pinned BOOLEAN DEFAULT false,
    expires_at TIMESTAMP WITH TIME ZONE,
    created_by UUID REFERENCES public.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

-- Create announcement_reads table to track who has read announcements
CREATE TABLE announcement_reads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    announcement_id UUID REFERENCES announcements(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    read_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()),
    UNIQUE(announcement_id, user_id)
);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc', now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at columns
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_student_profiles_updated_at BEFORE UPDATE ON student_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_mentor_profiles_updated_at BEFORE UPDATE ON mentor_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_mentorship_relationships_updated_at BEFORE UPDATE ON mentorship_relationships FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_progress_logs_updated_at BEFORE UPDATE ON progress_logs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_resources_updated_at BEFORE UPDATE ON resources FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_announcements_updated_at BEFORE UPDATE ON announcements FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  
  -- Create student profile by default (can be changed later)
  INSERT INTO public.student_profiles (user_id)
  VALUES (NEW.id);
  
  RETURN NEW;
END;
$$;

-- Trigger to create user record on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Function to update total_hours_logged in student_profiles
CREATE OR REPLACE FUNCTION update_student_total_hours()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE student_profiles 
  SET total_hours_logged = (
    SELECT COALESCE(SUM(hours_logged), 0) 
    FROM progress_logs 
    WHERE user_id = NEW.user_id
  )
  WHERE user_id = NEW.user_id;
  
  RETURN NEW;
END;
$$;

-- Trigger to update total hours when progress log is inserted/updated
CREATE TRIGGER update_total_hours_on_progress_log
  AFTER INSERT OR UPDATE ON progress_logs
  FOR EACH ROW EXECUTE FUNCTION update_student_total_hours();

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentorship_relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE resource_access ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcement_reads ENABLE ROW LEVEL SECURITY;
