import * as React from 'react';
import { View, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Text } from '~/components/ui/text';
import { useAuth } from '~/contexts/AuthContext';

interface Project {
  id: string;
  title: string;
  description: string;
  status: 'planning' | 'in_progress' | 'completed' | 'cancelled' | 'on_hold';
  difficulty_level: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  required_skills: string[];
  max_team_size: number;
  member_count?: number;
}

export default function ProjectsScreen() {
  const { user } = useAuth();
  const [refreshing, setRefreshing] = React.useState(false);
  const [projects, setProjects] = React.useState<Project[]>([
    {
      id: '1',
      title: 'Autonomous Cleaning Robot',
      description: 'Design and build a robot that can navigate and clean a room autonomously',
      status: 'in_progress',
      difficulty_level: 'intermediate',
      tags: ['autonomous', 'navigation', 'cleaning'],
      required_skills: ['Python', 'Arduino', 'Sensors'],
      max_team_size: 4,
      member_count: 3,
    },
    {
      id: '2',
      title: 'Smart Garden Monitor',
      description: 'Create an IoT system to monitor and water plants automatically',
      status: 'planning',
      difficulty_level: 'beginner',
      tags: ['iot', 'agriculture', 'monitoring'],
      required_skills: ['Arduino', 'Sensors', 'Basic Programming'],
      max_team_size: 3,
      member_count: 1,
    },
    {
      id: '3',
      title: 'Drone Navigation System',
      description: 'Develop a computer vision-based navigation system for drones',
      status: 'in_progress',
      difficulty_level: 'advanced',
      tags: ['drone', 'computer-vision', 'navigation'],
      required_skills: ['Python', 'OpenCV', 'Machine Learning'],
      max_team_size: 4,
      member_count: 4,
    },
    {
      id: '4',
      title: 'Line Following Robot',
      description: 'Build a simple robot that can follow a black line on the ground',
      status: 'planning',
      difficulty_level: 'beginner',
      tags: ['line-following', 'sensors', 'basic-robotics'],
      required_skills: ['Arduino', 'Basic Programming'],
      max_team_size: 2,
      member_count: 0,
    },
  ]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#10B981';
      case 'in_progress':
        return '#3B82F6';
      case 'planning':
        return '#F59E0B';
      case 'on_hold':
        return '#6B7280';
      case 'cancelled':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return '#10B981';
      case 'intermediate':
        return '#F59E0B';
      case 'advanced':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return 'check-circle';
      case 'in_progress':
        return 'play-circle-filled';
      case 'planning':
        return 'schedule';
      case 'on_hold':
        return 'pause-circle-filled';
      case 'cancelled':
        return 'cancel';
      default:
        return 'help';
    }
  };

  return (
    <ScrollView 
      className="flex-1 bg-background"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View className="p-6">
        {/* Header */}
        <View className="mb-6">
          <Text className="text-3xl font-bold text-foreground mb-2">
            Projects
          </Text>
          <Text className="text-muted-foreground">
            Explore robotics projects and join teams
          </Text>
        </View>

        {/* Filter Tabs */}
        <View className="flex-row mb-6 bg-secondary/50 rounded-lg p-1">
          <Button variant="default" size="sm" className="flex-1 mr-1">
            <Text className="text-white">All</Text>
          </Button>
          <Button variant="ghost" size="sm" className="flex-1 mx-1">
            <Text>Available</Text>
          </Button>
          <Button variant="ghost" size="sm" className="flex-1 mx-1">
            <Text>My Projects</Text>
          </Button>
          <Button variant="ghost" size="sm" className="flex-1 ml-1">
            <Text>Completed</Text>
          </Button>
        </View>

        {/* Projects List */}
        <View className="space-y-4">
          {projects.map((project) => (
            <TouchableOpacity 
              key={project.id}
              onPress={() => router.push(`/projects/${project.id}`)}
            >
              <Card className="shadow-sm">
                <CardHeader className="pb-3">
                  <View className="flex-row items-center justify-between mb-2">
                    <View className="flex-row items-center">
                      <MaterialIcons 
                        name={getStatusIcon(project.status)} 
                        size={20} 
                        color={getStatusColor(project.status)} 
                      />
                      <Text className="ml-2 text-sm font-medium capitalize" 
                            style={{ color: getStatusColor(project.status) }}>
                        {project.status.replace('_', ' ')}
                      </Text>
                    </View>
                    <View className="flex-row items-center">
                      <MaterialIcons name="star" size={16} color={getDifficultyColor(project.difficulty_level)} />
                      <Text className="ml-1 text-sm capitalize" 
                            style={{ color: getDifficultyColor(project.difficulty_level) }}>
                        {project.difficulty_level}
                      </Text>
                    </View>
                  </View>
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0">
                  {/* Skills Required */}
                  <View className="mb-3">
                    <Text className="text-sm font-medium text-foreground mb-2">
                      Skills Required:
                    </Text>
                    <View className="flex-row flex-wrap">
                      {project.required_skills.map((skill, index) => (
                        <View key={index} className="bg-primary/10 px-2 py-1 rounded-md mr-2 mb-1">
                          <Text className="text-xs text-primary">{skill}</Text>
                        </View>
                      ))}
                    </View>
                  </View>

                  {/* Tags */}
                  <View className="mb-3">
                    <View className="flex-row flex-wrap">
                      {project.tags.map((tag, index) => (
                        <View key={index} className="bg-secondary px-2 py-1 rounded-md mr-2 mb-1">
                          <Text className="text-xs text-muted-foreground">#{tag}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                </CardContent>

                <CardFooter className="pt-0">
                  <View className="flex-row items-center justify-between w-full">
                    <View className="flex-row items-center">
                      <MaterialIcons name="group" size={16} color="#6B7280" />
                      <Text className="ml-1 text-sm text-muted-foreground">
                        {project.member_count || 0}/{project.max_team_size} members
                      </Text>
                    </View>
                    <Button size="sm" 
                            disabled={project.member_count === project.max_team_size}>
                      <Text className="text-white">
                        {project.member_count === project.max_team_size ? 'Full' : 'Join Team'}
                      </Text>
                    </Button>
                  </View>
                </CardFooter>
              </Card>
            </TouchableOpacity>
          ))}
        </View>

        <View className="h-8" />
      </View>
    </ScrollView>
  );
}
