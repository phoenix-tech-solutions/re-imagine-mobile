-- RLS Policies for public.users table
CREATE POLICY "Users can view their own profile" ON public.users
FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.users
FOR UPDATE USING (auth.uid() = id);

-- Allow users with admin role to view all users
CREATE POLICY "Admins can view all users" ON public.users
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- RLS Policies for student_profiles table
CREATE POLICY "Students can view their own profile" ON student_profiles
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Students can update their own profile" ON student_profiles
FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Mentors can view their students' profiles" ON student_profiles
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM mentorship_relationships mr
    WHERE mr.student_id = user_id 
    AND mr.mentor_id = auth.uid()
    AND mr.status = 'active'
  )
);

-- RLS Policies for mentor_profiles table
CREATE POLICY "Mentors can view and update their own profile" ON mentor_profiles
FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Students can view mentor profiles" ON mentor_profiles
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE id = auth.uid() AND role IN ('student', 'admin')
  )
);

-- RLS Policies for events table
CREATE POLICY "Everyone can view events" ON events
FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins and mentors can create events" ON events
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE id = auth.uid() AND role IN ('admin', 'mentor')
  )
);

CREATE POLICY "Creators can update their events" ON events
FOR UPDATE USING (created_by = auth.uid());

-- RLS Policies for event_registrations table
CREATE POLICY "Users can view their own registrations" ON event_registrations
FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can register for events" ON event_registrations
FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own registrations" ON event_registrations
FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Event creators can view all registrations for their events" ON event_registrations
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM events 
    WHERE id = event_id AND created_by = auth.uid()
  )
);

-- RLS Policies for projects table
CREATE POLICY "Everyone can view public projects" ON projects
FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can create projects" ON projects
FOR INSERT WITH CHECK (created_by = auth.uid());

CREATE POLICY "Project creators can update their projects" ON projects
FOR UPDATE USING (created_by = auth.uid());

CREATE POLICY "Project members can update projects they're part of" ON projects
FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM project_members 
    WHERE project_id = id AND user_id = auth.uid()
  )
);

-- RLS Policies for project_members table
CREATE POLICY "Everyone can view project memberships" ON project_members
FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can join projects" ON project_members
FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own project membership" ON project_members
FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Project creators can manage memberships" ON project_members
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM projects 
    WHERE id = project_id AND created_by = auth.uid()
  )
);

-- RLS Policies for tasks table
CREATE POLICY "Users can view tasks assigned to them" ON tasks
FOR SELECT USING (assigned_to = auth.uid());

CREATE POLICY "Project members can view project tasks" ON tasks
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM project_members 
    WHERE project_id = tasks.project_id AND user_id = auth.uid()
  )
);

CREATE POLICY "Users can create tasks in projects they're part of" ON tasks
FOR INSERT WITH CHECK (
  created_by = auth.uid() AND 
  EXISTS (
    SELECT 1 FROM project_members 
    WHERE project_id = tasks.project_id AND user_id = auth.uid()
  )
);

CREATE POLICY "Users can update tasks they created or are assigned to" ON tasks
FOR UPDATE USING (
  created_by = auth.uid() OR assigned_to = auth.uid()
);

-- RLS Policies for mentorship_relationships table
CREATE POLICY "Mentors can view their mentorship relationships" ON mentorship_relationships
FOR SELECT USING (mentor_id = auth.uid());

CREATE POLICY "Students can view their mentorship relationships" ON mentorship_relationships
FOR SELECT USING (student_id = auth.uid());

CREATE POLICY "Mentors can create mentorship relationships" ON mentorship_relationships
FOR INSERT WITH CHECK (mentor_id = auth.uid());

CREATE POLICY "Mentors and students can update their relationships" ON mentorship_relationships
FOR UPDATE USING (mentor_id = auth.uid() OR student_id = auth.uid());

-- RLS Policies for progress_logs table
CREATE POLICY "Users can view their own progress logs" ON progress_logs
FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can create their own progress logs" ON progress_logs
FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own progress logs" ON progress_logs
FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Mentors can view their students' progress logs" ON progress_logs
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM mentorship_relationships mr
    WHERE mr.student_id = user_id 
    AND mr.mentor_id = auth.uid()
    AND mr.status = 'active'
  )
);

-- RLS Policies for achievements table
CREATE POLICY "Everyone can view achievements" ON achievements
FOR SELECT TO authenticated USING (is_active = true);

CREATE POLICY "Admins can manage achievements" ON achievements
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- RLS Policies for user_achievements table
CREATE POLICY "Users can view their own achievements" ON user_achievements
FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Everyone can view user achievements" ON user_achievements
FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins and mentors can award achievements" ON user_achievements
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE id = auth.uid() AND role IN ('admin', 'mentor')
  )
);

-- RLS Policies for resources table
CREATE POLICY "Everyone can view public resources" ON resources
FOR SELECT TO authenticated USING (is_public = true);

CREATE POLICY "Users can view their own uploaded resources" ON resources
FOR SELECT USING (uploaded_by = auth.uid());

CREATE POLICY "Users can upload resources" ON resources
FOR INSERT WITH CHECK (uploaded_by = auth.uid());

CREATE POLICY "Users can update their own resources" ON resources
FOR UPDATE USING (uploaded_by = auth.uid());

-- RLS Policies for resource_access table
CREATE POLICY "Users can view their own resource access" ON resource_access
FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can track their own resource access" ON resource_access
FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own resource access" ON resource_access
FOR UPDATE USING (user_id = auth.uid());

-- RLS Policies for announcements table
CREATE POLICY "Everyone can view active announcements" ON announcements
FOR SELECT TO authenticated USING (
  (expires_at IS NULL OR expires_at > now()) AND
  ('all' = ANY(target_audience) OR 
   EXISTS (
     SELECT 1 FROM public.users u
     WHERE u.id = auth.uid() AND u.role = ANY(target_audience)
   ))
);

CREATE POLICY "Admins can manage announcements" ON announcements
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- RLS Policies for announcement_reads table
CREATE POLICY "Users can track their own announcement reads" ON announcement_reads
FOR ALL USING (user_id = auth.uid());

-- Create some helpful views
CREATE VIEW current_user_profile AS
SELECT 
  u.*,
  sp.school,
  sp.grade_level,
  sp.experience_level,
  sp.interests,
  sp.total_hours_logged,
  sp.overall_progress
FROM public.users u
LEFT JOIN student_profiles sp ON u.id = sp.user_id
WHERE u.id = auth.uid();

-- View for upcoming events for current user
CREATE VIEW my_upcoming_events AS
SELECT 
  e.*,
  er.status as registration_status
FROM events e
LEFT JOIN event_registrations er ON e.id = er.event_id AND er.user_id = auth.uid()
WHERE e.start_time > now()
ORDER BY e.start_time;

-- View for user's active projects
CREATE VIEW my_active_projects AS
SELECT 
  p.*,
  pm.role as my_role
FROM projects p
JOIN project_members pm ON p.id = pm.project_id
WHERE pm.user_id = auth.uid() 
AND pm.left_at IS NULL
AND p.status IN ('planning', 'in_progress');

-- Grant access to views
GRANT SELECT ON current_user_profile TO authenticated;
GRANT SELECT ON my_upcoming_events TO authenticated;
GRANT SELECT ON my_active_projects TO authenticated;
