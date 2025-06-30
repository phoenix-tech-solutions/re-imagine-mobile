-- Sample data for Re-Imagine Robotics Student Dashboard
-- Note: User accounts will be created when people sign up

-- Insert sample events (no created_by since we don't have users yet)
INSERT INTO events (id, title, description, event_type, start_time, end_time, location, max_participants, is_required) VALUES
('650e8400-e29b-41d4-a716-446655440001', 'Robot Assembly Workshop', 'Learn the basics of robot assembly using Arduino and sensors', 'workshop', '2025-01-02 14:00:00+00', '2025-01-02 17:00:00+00', 'Lab Room A', 20, true),
('650e8400-e29b-41d4-a716-446655440002', 'Programming Challenge: Line Following Robot', 'Code a robot to follow a line using computer vision', 'assignment', '2025-01-03 09:00:00+00', '2025-01-10 23:59:00+00', 'Online', null, false),
('650e8400-e29b-41d4-a716-446655440003', 'Advanced Sensor Integration', 'Workshop on integrating multiple sensors in robotics projects', 'workshop', '2025-01-08 10:00:00+00', '2025-01-08 13:00:00+00', 'Lab Room B', 15, false),
('650e8400-e29b-41d4-a716-446655440004', 'Team Project Presentation', 'Present your team robotics project to peers and mentors', 'presentation', '2025-01-15 13:00:00+00', '2025-01-15 17:00:00+00', 'Main Auditorium', 100, true),
('650e8400-e29b-41d4-a716-446655440005', 'Robotics Competition Kickoff', 'Launch event for the annual robotics competition', 'competition', '2025-02-01 09:00:00+00', '2025-02-01 18:00:00+00', 'Competition Arena', 50, false);

-- Insert sample projects (no created_by since we don't have users yet)
INSERT INTO projects (id, title, description, status, difficulty_level, start_date, end_date, tags, required_skills, max_team_size) VALUES
('750e8400-e29b-41d4-a716-446655440001', 'Autonomous Cleaning Robot', 'Design and build a robot that can navigate and clean a room autonomously', 'in_progress', 'intermediate', '2024-12-01', '2025-02-15', '{"autonomous", "navigation", "cleaning"}', '{"Python", "Arduino", "Sensors"}', 4),
('750e8400-e29b-41d4-a716-446655440002', 'Smart Garden Monitor', 'Create an IoT system to monitor and water plants automatically', 'planning', 'beginner', '2025-01-15', '2025-03-30', '{"iot", "agriculture", "monitoring"}', '{"Arduino", "Sensors", "Basic Programming"}', 3),
('750e8400-e29b-41d4-a716-446655440003', 'Robotic Arm Controller', 'Build a 6-DOF robotic arm with precise movement control', 'completed', 'advanced', '2024-09-01', '2024-12-15', '{"robotic-arm", "control-systems", "precision"}', '{"C++", "Control Theory", "Mechanical Design"}', 4),
('750e8400-e29b-41d4-a716-446655440004', 'Drone Navigation System', 'Develop a computer vision-based navigation system for drones', 'in_progress', 'advanced', '2024-11-01', '2025-01-31', '{"drone", "computer-vision", "navigation"}', '{"Python", "OpenCV", "Machine Learning"}', 4),
('750e8400-e29b-41d4-a716-446655440005', 'Line Following Robot', 'Build a simple robot that can follow a black line on the ground', 'planning', 'beginner', '2025-01-20', '2025-02-28', '{"line-following", "sensors", "basic-robotics"}', '{"Arduino", "Basic Programming"}', 2);

-- Insert sample achievements
INSERT INTO achievements (id, title, description, icon, points, category, criteria) VALUES
('850e8400-e29b-41d4-a716-446655440001', 'First Steps', 'Complete your first robotics workshop', '🤖', 10, 'technical', 'Attend and complete any workshop event'),
('850e8400-e29b-41d4-a716-446655440002', 'Code Master', 'Successfully program a robot to complete a task', '💻', 25, 'technical', 'Complete a programming assignment with full functionality'),
('850e8400-e29b-41d4-a716-446655440003', 'Team Player', 'Collaborate effectively in a team project', '🤝', 20, 'collaboration', 'Be an active member of a team project for at least 4 weeks'),
('850e8400-e29b-41d4-a716-446655440004', 'Project Leader', 'Lead a team to successfully complete a project', '👑', 50, 'leadership', 'Successfully lead a team project from start to completion'),
('850e8400-e29b-41d4-a716-446655440005', 'Innovation Award', 'Create an original and creative solution', '💡', 40, 'creativity', 'Develop a unique solution that shows creativity and innovation'),
('850e8400-e29b-41d4-a716-446655440006', 'Mentor Helper', 'Help other students with their projects', '🌟', 30, 'collaboration', 'Assist fellow students with their projects and receive positive feedback'),
('850e8400-e29b-41d4-a716-446655440007', 'Problem Solver', 'Overcome a significant technical challenge', '🔧', 35, 'technical', 'Successfully debug and solve a complex technical problem'),
('850e8400-e29b-41d4-a716-446655440008', 'Consistent Learner', 'Log progress for 30 consecutive days', '📈', 25, 'consistency', 'Maintain daily progress logs for 30 days straight'),
('850e8400-e29b-41d4-a716-446655440009', 'Workshop Enthusiast', 'Attend 5 different workshops', '🎯', 15, 'technical', 'Participate in 5 different workshop events'),
('850e8400-e29b-41d4-a716-446655440010', 'Community Builder', 'Recruit a new student to the program', '👥', 20, 'collaboration', 'Successfully refer and onboard a new student');

-- Insert sample resources
INSERT INTO resources (id, title, description, resource_type, url, tags, difficulty_level, estimated_time_hours, prerequisites, learning_objectives) VALUES
('950e8400-e29b-41d4-a716-446655440001', 'Arduino Programming Basics', 'Complete guide to getting started with Arduino programming', 'tutorial', 'https://docs.arduino.cc/learn/', '{"arduino", "programming", "electronics"}', 'beginner', 4.0, '{}', '{"Understand basic Arduino syntax", "Write simple programs", "Control LEDs and sensors"}'),
('950e8400-e29b-41d4-a716-446655440002', 'Robot Operating System (ROS) Documentation', 'Official ROS documentation for advanced robotics development', 'documentation', 'https://docs.ros.org/', '{"ros", "robotics", "advanced"}', 'advanced', 20.0, '{"Python", "Linux basics", "Object-oriented programming"}', '{"Understand ROS architecture", "Create ROS nodes", "Use ROS communication"}'),
('950e8400-e29b-41d4-a716-446655440003', 'Computer Vision with OpenCV', 'Video series on computer vision techniques for robotics', 'video', 'https://opencv.org/courses/', '{"computer-vision", "opencv", "python"}', 'intermediate', 8.0, '{"Python basics", "Mathematics fundamentals"}', '{"Process images", "Detect objects", "Track movement"}'),
('950e8400-e29b-41d4-a716-446655440004', 'Fusion 360 CAD Software', 'Professional 3D CAD software for designing robot parts', 'tool', 'https://www.autodesk.com/products/fusion-360', '{"cad", "design", "3d-modeling"}', 'intermediate', 12.0, '{"Basic geometry", "Computer skills"}', '{"Create 3D models", "Design robot parts", "Generate technical drawings"}'),
('950e8400-e29b-41d4-a716-446655440005', 'Introduction to Machine Learning', 'Beginner-friendly course on ML applications in robotics', 'course', 'https://ml-course.example.com/', '{"machine-learning", "ai", "robotics"}', 'beginner', 15.0, '{"Basic mathematics", "Python basics"}', '{"Understand ML concepts", "Apply ML to robotics", "Train simple models"}'),
('950e8400-e29b-41d4-a716-446655440006', 'Electronics Fundamentals', 'Understanding basic electronics for robotics projects', 'tutorial', 'https://electronics-tutorial.example.com/', '{"electronics", "circuits", "fundamentals"}', 'beginner', 6.0, '{}', '{"Read circuit diagrams", "Understand Ohms law", "Build basic circuits"}'),
('950e8400-e29b-41d4-a716-446655440007', 'Sensor Integration Guide', 'How to integrate various sensors with microcontrollers', 'documentation', 'https://sensor-guide.example.com/', '{"sensors", "integration", "arduino"}', 'intermediate', 5.0, '{"Arduino basics", "Electronics fundamentals"}', '{"Connect sensors", "Read sensor data", "Calibrate sensors"}'),
('950e8400-e29b-41d4-a716-446655440008', 'Python for Robotics', 'Python programming specifically for robotics applications', 'course', 'https://python-robotics.example.com/', '{"python", "robotics", "programming"}', 'intermediate', 10.0, '{"Basic programming concepts"}', '{"Write robotics code", "Use robotics libraries", "Debug robot programs"}');

-- Insert sample announcements
INSERT INTO announcements (id, title, content, announcement_type, target_audience, is_pinned, expires_at) VALUES
('a50e8400-e29b-41d4-a716-446655440001', 'Welcome to Re-Imagine Robotics!', 'Welcome to our robotics program! We are excited to have you join our community of innovative makers and builders. Check out the resources section to get started with your first project.', 'general', '{"all"}', true, null),
('a50e8400-e29b-41d4-a716-446655440002', 'Workshop Registration Open', 'Registration is now open for the Robot Assembly Workshop on January 2nd. This is a required workshop for all new students. Please register through the events section.', 'event', '{"student"}', false, '2025-01-02 12:00:00+00'),
('a50e8400-e29b-41d4-a716-446655440003', 'Project Teams Forming', 'Teams are now forming for the spring semester projects. Check out the available projects and join a team that matches your interests and skill level.', 'general', '{"student"}', false, '2025-01-20 23:59:00+00'),
('a50e8400-e29b-41d4-a716-446655440004', 'Mentorship Program Launch', 'Our mentorship program is launching soon! Students will be paired with experienced mentors to guide their learning journey. More details coming next week.', 'general', '{"all"}', false, '2025-02-01 00:00:00+00');

-- Note: User-related data (students, mentors, progress logs, etc.) will be created when users sign up and use the app
