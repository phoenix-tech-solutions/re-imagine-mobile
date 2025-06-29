-- Sample data for Re-Imagine Robotics Student Dashboard

-- Insert sample mentors
INSERT INTO mentors (id, full_name, email, expertise, bio) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Dr. Sarah Chen', 'sarah.chen@reimagine-robotics.com', '{"Machine Learning", "Computer Vision", "Python"}', 'PhD in Robotics with 10+ years of experience in AI and autonomous systems.'),
('550e8400-e29b-41d4-a716-446655440002', 'Prof. Michael Rodriguez', 'michael.rodriguez@reimagine-robotics.com', '{"Mechanical Engineering", "3D Printing", "CAD Design"}', 'Professor of Mechanical Engineering specializing in robot design and manufacturing.'),
('550e8400-e29b-41d4-a716-446655440003', 'Emily Watson', 'emily.watson@reimagine-robotics.com', '{"Electronics", "Arduino", "Circuit Design"}', 'Electronics engineer with expertise in embedded systems and IoT devices.');

-- Insert sample events
INSERT INTO events (id, title, description, event_type, start_time, end_time) VALUES
('650e8400-e29b-41d4-a716-446655440001', 'Robot Assembly Workshop', 'Learn the basics of robot assembly using Arduino and sensors', 'workshop', '2025-01-02 14:00:00+00', '2025-01-02 17:00:00+00'),
('650e8400-e29b-41d4-a716-446655440002', 'Programming Challenge: Line Following Robot', 'Code a robot to follow a line using computer vision', 'assignment', '2025-01-03 09:00:00+00', '2025-01-10 23:59:00+00'),
('650e8400-e29b-41d4-a716-446655440003', 'Weekly Mentor Check-in', 'One-on-one session with your assigned mentor', 'meeting', '2025-01-06 15:00:00+00', '2025-01-06 16:00:00+00'),
('650e8400-e29b-41d4-a716-446655440004', 'Advanced Sensor Integration', 'Workshop on integrating multiple sensors in robotics projects', 'workshop', '2025-01-08 10:00:00+00', '2025-01-08 13:00:00+00'),
('650e8400-e29b-41d4-a716-446655440005', 'Team Project Presentation', 'Present your team robotics project to peers and mentors', 'assignment', '2025-01-15 13:00:00+00', '2025-01-15 17:00:00+00');

-- Insert sample projects
INSERT INTO projects (id, title, description, status, start_date, end_date) VALUES
('750e8400-e29b-41d4-a716-446655440001', 'Autonomous Cleaning Robot', 'Design and build a robot that can navigate and clean a room autonomously', 'in_progress', '2024-12-01', '2025-02-15'),
('750e8400-e29b-41d4-a716-446655440002', 'Smart Garden Monitor', 'Create an IoT system to monitor and water plants automatically', 'planning', '2025-01-15', '2025-03-30'),
('750e8400-e29b-41d4-a716-446655440003', 'Robotic Arm Controller', 'Build a 6-DOF robotic arm with precise movement control', 'completed', '2024-09-01', '2024-12-15'),
('750e8400-e29b-41d4-a716-446655440004', 'Drone Navigation System', 'Develop a computer vision-based navigation system for drones', 'in_progress', '2024-11-01', '2025-01-31');

-- Insert sample achievements
INSERT INTO achievements (id, title, description, icon, points, category) VALUES
('850e8400-e29b-41d4-a716-446655440001', 'First Steps', 'Complete your first robotics workshop', '🤖', 10, 'technical'),
('850e8400-e29b-41d4-a716-446655440002', 'Code Master', 'Successfully program a robot to complete a task', '💻', 25, 'technical'),
('850e8400-e29b-41d4-a716-446655440003', 'Team Player', 'Collaborate effectively in a team project', '🤝', 20, 'collaboration'),
('850e8400-e29b-41d4-a716-446655440004', 'Project Leader', 'Lead a team to successfully complete a project', '👑', 50, 'leadership'),
('850e8400-e29b-41d4-a716-446655440005', 'Innovation Award', 'Create an original and creative solution', '💡', 40, 'creativity'),
('850e8400-e29b-41d4-a716-446655440006', 'Mentor Helper', 'Help other students with their projects', '🌟', 30, 'collaboration'),
('850e8400-e29b-41d4-a716-446655440007', 'Problem Solver', 'Overcome a significant technical challenge', '🔧', 35, 'technical');

-- Insert sample resources
INSERT INTO resources (id, title, description, resource_type, url, tags, difficulty_level) VALUES
('950e8400-e29b-41d4-a716-446655440001', 'Arduino Programming Basics', 'Complete guide to getting started with Arduino programming', 'tutorial', 'https://docs.arduino.cc/learn/', '{"arduino", "programming", "electronics"}', 'beginner'),
('950e8400-e29b-41d4-a716-446655440002', 'Robot Operating System (ROS) Documentation', 'Official ROS documentation for advanced robotics development', 'documentation', 'https://docs.ros.org/', '{"ros", "robotics", "advanced"}', 'advanced'),
('950e8400-e29b-41d4-a716-446655440003', 'Computer Vision with OpenCV', 'Video series on computer vision techniques for robotics', 'video', 'https://opencv.org/courses/', '{"computer-vision", "opencv", "python"}', 'intermediate'),
('950e8400-e29b-41d4-a716-446655440004', 'Fusion 360 CAD Software', 'Professional 3D CAD software for designing robot parts', 'tool', 'https://www.autodesk.com/products/fusion-360', '{"cad", "design", "3d-modeling"}', 'intermediate'),
('950e8400-e29b-41d4-a716-446655440005', 'Robotics Simulation Dataset', 'Collection of sensor data for testing robot algorithms', 'dataset', 'https://example.com/robotics-dataset', '{"simulation", "sensors", "testing"}', 'advanced'),
('950e8400-e29b-41d4-a716-446655440006', 'Introduction to Machine Learning', 'Beginner-friendly course on ML applications in robotics', 'tutorial', 'https://ml-course.example.com/', '{"machine-learning", "ai", "robotics"}', 'beginner');

-- Note: Sample students, tasks, and progress data will be created automatically when users sign up and use the app
