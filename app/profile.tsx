import * as React from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Progress } from '~/components/ui/progress';
import { Text } from '~/components/ui/text';
import { useAuth } from '~/contexts/AuthContext';
import { router } from 'expo-router';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  points: number;
  earned_at: string;
}

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const [refreshing, setRefreshing] = React.useState(false);
  const [profile, setProfile] = React.useState({
    total_hours: 45.5,
    projects_completed: 3,
    achievements_count: 7,
    overall_progress: 65,
    current_streak: 12,
  });

  const [achievements, setAchievements] = React.useState<Achievement[]>([
    {
      id: '1',
      title: 'First Steps',
      description: 'Complete your first robotics workshop',
      icon: '🤖',
      points: 10,
      earned_at: '2024-12-15',
    },
    {
      id: '2',
      title: 'Team Player',
      description: 'Collaborate effectively in a team project',
      icon: '🤝',
      points: 20,
      earned_at: '2024-12-20',
    },
    {
      id: '3',
      title: 'Code Master',
      description: 'Successfully program a robot to complete a task',
      icon: '💻',
      points: 25,
      earned_at: '2024-12-25',
    },
  ]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    router.replace('/login');
  };

  const getInitials = (name: string) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';
  };

  return (
    <ScrollView 
      className="flex-1 bg-background"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View className="p-6">
        {/* User Info Card */}
        <Card className="mb-6">
          <CardHeader className="items-center pb-4">
            <Avatar className="w-24 h-24 mb-4">
              <AvatarImage source={{ uri: user?.user_metadata?.avatar_url }} />
              <AvatarFallback>
                <Text className="text-xl font-bold">
                  {getInitials(user?.user_metadata?.full_name || 'User')}
                </Text>
              </AvatarFallback>
            </Avatar>
            <CardTitle className="text-2xl text-center">
              {user?.user_metadata?.full_name || 'Student'}
            </CardTitle>
            <CardDescription className="text-center">
              {user?.email}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <View className="flex-row justify-center">
              <Button variant="outline" onPress={handleSignOut} className="flex-row items-center">
                <MaterialIcons name="logout" size={16} color="#6B7280" />
                <Text className="ml-2">Sign Out</Text>
              </Button>
            </View>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <View className="mb-6">
          <View className="flex-row gap-3 mb-3">
            <Card className="flex-1">
              <CardContent className="p-4 items-center">
                <MaterialIcons name="schedule" size={28} color="#3B82F6" />
                <Text className="text-2xl font-bold mt-2">{profile.total_hours}</Text>
                <Text className="text-xs text-muted-foreground text-center">
                  Total Hours
                </Text>
              </CardContent>
            </Card>
            
            <Card className="flex-1">
              <CardContent className="p-4 items-center">
                <MaterialIcons name="check-circle" size={28} color="#10B981" />
                <Text className="text-2xl font-bold mt-2">{profile.projects_completed}</Text>
                <Text className="text-xs text-muted-foreground text-center">
                  Projects Done
                </Text>
              </CardContent>
            </Card>
          </View>
          
          <View className="flex-row gap-3">
            <Card className="flex-1">
              <CardContent className="p-4 items-center">
                <MaterialIcons name="emoji-events" size={28} color="#F59E0B" />
                <Text className="text-2xl font-bold mt-2">{profile.achievements_count}</Text>
                <Text className="text-xs text-muted-foreground text-center">
                  Achievements
                </Text>
              </CardContent>
            </Card>
            
            <Card className="flex-1">
              <CardContent className="p-4 items-center">
                <MaterialIcons name="local-fire-department" size={28} color="#EF4444" />
                <Text className="text-2xl font-bold mt-2">{profile.current_streak}</Text>
                <Text className="text-xs text-muted-foreground text-center">
                  Day Streak
                </Text>
              </CardContent>
            </Card>
          </View>
        </View>

        {/* Progress Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex-row items-center">
              <MaterialIcons name="trending-up" size={20} color="#6366F1" />
              <Text className="ml-2">Overall Progress</Text>
            </CardTitle>
            <CardDescription>
              Your journey in the Re-Imagine Robotics program
            </CardDescription>
          </CardHeader>
          <CardContent>
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-sm text-muted-foreground">
                Program Completion
              </Text>
              <Text className="text-sm font-bold text-blue-600">
                {profile.overall_progress}%
              </Text>
            </View>
            <Progress 
              value={profile.overall_progress} 
              className="h-3 mb-3" 
              indicatorClassName="bg-gradient-to-r from-blue-500 to-purple-600" 
            />
            <Text className="text-xs text-muted-foreground">
              Keep up the great work!
            </Text>
          </CardContent>
        </Card>

        {/* Recent Achievements */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex-row items-center">
              <MaterialIcons name="emoji-events" size={20} color="#F59E0B" />
              <Text className="ml-2">Recent Achievements</Text>
            </CardTitle>
            <CardDescription>
              Your latest accomplishments
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {achievements.map((achievement) => (
              <View key={achievement.id} className="flex-row items-center p-3 bg-secondary/50 rounded-lg">
                <Text className="text-2xl mr-3">{achievement.icon}</Text>
                <View className="flex-1">
                  <Text className="font-medium text-foreground">{achievement.title}</Text>
                  <Text className="text-sm text-muted-foreground">{achievement.description}</Text>
                </View>
                <View className="items-center">
                  <Text className="text-sm font-bold text-yellow-600">{achievement.points}</Text>
                  <Text className="text-xs text-muted-foreground">pts</Text>
                </View>
              </View>
            ))}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <View className="space-y-3">
          <Button 
            variant="outline" 
            className="w-full flex-row items-center justify-center"
            onPress={() => router.push('/profile/edit')}
          >
            <MaterialIcons name="edit" size={16} color="#6B7280" />
            <Text className="ml-2">Edit Profile</Text>
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full flex-row items-center justify-center"
            onPress={() => router.push('/profile/settings')}
          >
            <MaterialIcons name="settings" size={16} color="#6B7280" />
            <Text className="ml-2">Settings</Text>
          </Button>
        </View>

        <View className="h-8" />
      </View>
    </ScrollView>
  );
}
