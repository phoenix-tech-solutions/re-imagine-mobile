import * as React from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  View,
} from "react-native";
import { router } from "expo-router";
import { useAuth } from "~/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Progress } from "~/components/ui/progress";
import { Text } from "~/components/ui/text";
import { MaterialIcons } from "@expo/vector-icons";

export default function Dashboard() {
  const { user, loading, signOut } = useAuth();
  const [refreshing, setRefreshing] = React.useState(false);
  const [overallProgress, setOverallProgress] = React.useState(65);
  const [weeklyHours, setWeeklyHours] = React.useState(12);
  const [projectsCompleted, setProjectsCompleted] = React.useState(3);
  const [upcomingEvents, setUpcomingEvents] = React.useState([
    {
      id: 1,
      title: "Robot Assembly Workshop",
      date: "Tomorrow 2:00 PM",
      type: "workshop",
    },
    {
      id: 2,
      title: "Programming Challenge Due",
      date: "Friday 11:59 PM",
      type: "assignment",
    },
    {
      id: 3,
      title: "Mentor Check-in",
      date: "Next Monday 3:00 PM",
      type: "meeting",
    },
  ]);

  React.useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    router.replace("/login");
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-background">
        <ActivityIndicator size="large" className="text-primary" />
        <Text className="mt-4 text-muted-foreground">Loading dashboard...</Text>
      </View>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  const getEventIcon = (type: string) => {
    switch (type) {
      case "workshop":
        return "build";
      case "assignment":
        return "assignment";
      case "meeting":
        return "people";
      default:
        return "event";
    }
  };

  return (
    <ScrollView
      className="flex-1 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View className="p-6 pt-8">
        {/* Header */}
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-2xl font-bold text-foreground">
              Welcome back, {user.user_metadata?.full_name || "Student"}!
            </Text>
            <Text className="text-muted-foreground mt-1">
              Ready to build the future?
            </Text>
          </View>
          <Button variant="ghost" size="sm" onPress={handleSignOut}>
            <MaterialIcons name="logout" size={20} color="#6B7280" />
          </Button>
        </View>

        {/* Quick Stats */}
        <View className="flex-row gap-3 mb-6">
          <Card className="flex-1">
            <CardContent className="p-4 items-center">
              <MaterialIcons name="schedule" size={24} color="#3B82F6" />
              <Text className="text-2xl font-bold mt-2">{weeklyHours}</Text>
              <Text className="text-xs text-muted-foreground">
                Hours This Week
              </Text>
            </CardContent>
          </Card>
          <Card className="flex-1">
            <CardContent className="p-4 items-center">
              <MaterialIcons name="check-circle" size={24} color="#10B981" />
              <Text className="text-2xl font-bold mt-2">
                {projectsCompleted}
              </Text>
              <Text className="text-xs text-muted-foreground">
                Projects Done
              </Text>
            </CardContent>
          </Card>
        </View>

        {/* Progress Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex-row items-center">
              <MaterialIcons
                name="trending-up"
                size={20}
                color="#6366F1"
                className="mr-2"
              />
              Overall Progress
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
                {overallProgress}%
              </Text>
            </View>
            <Progress
              value={overallProgress}
              className="h-3 mb-3"
              indicatorClassName="bg-gradient-to-r from-blue-500 to-purple-600"
            />
            <Text className="text-xs text-muted-foreground">
              Great progress! Keep up the momentum.
            </Text>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex-row items-center">
              <MaterialIcons
                name="event"
                size={20}
                color="#F59E0B"
                className="mr-2"
              />
              Upcoming Events
            </CardTitle>
            <CardDescription>
              Don't miss these important activities
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingEvents.map((event) => (
              <View
                key={event.id}
                className="flex-row items-center p-3 bg-secondary/50 rounded-lg"
              >
                <View className="w-10 h-10 bg-primary/10 rounded-full items-center justify-center mr-3">
                  <MaterialIcons
                    name={getEventIcon(event.type)}
                    size={20}
                    color="#6366F1"
                  />
                </View>
                <View className="flex-1">
                  <Text className="font-medium text-foreground">
                    {event.title}
                  </Text>
                  <Text className="text-sm text-muted-foreground">
                    {event.date}
                  </Text>
                </View>
              </View>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex-row items-center">
              <MaterialIcons
                name="flash-on"
                size={20}
                color="#EF4444"
                className="mr-2"
              />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <View className="flex-row gap-3">
              <Button className="flex-1" variant="outline">
                <MaterialIcons name="assignment" size={16} color="#6B7280" />
                <Text className="ml-2">View Assignments</Text>
              </Button>
              <Button className="flex-1" variant="outline">
                <MaterialIcons name="people" size={16} color="#6B7280" />
                <Text className="ml-2">Find Teammates</Text>
              </Button>
            </View>
            <View className="flex-row gap-3 mt-3">
              <Button className="flex-1" variant="outline">
                <MaterialIcons name="library-books" size={16} color="#6B7280" />
                <Text className="ml-2">Resources</Text>
              </Button>
              <Button className="flex-1" variant="outline">
                <MaterialIcons name="help" size={16} color="#6B7280" />
                <Text className="ml-2">Get Help</Text>
              </Button>
            </View>
          </CardContent>
        </Card>

        <View className="h-8" />
      </View>
    </ScrollView>
  );
}
