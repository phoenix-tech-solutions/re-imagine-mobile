import * as React from "react";
import {
    ActivityIndicator,
    RefreshControl,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
} from "react-native";

import { useAuth } from "~/contexts/AuthContext";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Dashboard() {
    const router = useRouter();
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
        const router = useRouter();
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
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" />
                <Text className="mt-4">Loading dashboard...</Text>
            </View>
        );
    }

    if (!user) {
        return null;
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
        <SafeAreaView className="flex-1 bg-gray-50">
            <ScrollView
                className="flex-1 bg-gray-50"
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <View className="p-6 pt-8">
                    {/* Header */}
                    <View className="flex-row justify-between items-center mb-8">
                        <View className="flex-1">
                            <Text className="text-2xl font-bold mb-1">
                                Welcome back,{" "}
                                {user.user_metadata?.full_name || "Student"}!
                            </Text>
                            <Text className="text-gray-500">
                                Ready to build the future?
                            </Text>
                        </View>
                        <TouchableOpacity
                            onPress={handleSignOut}
                            className="ml-4"
                        >
                            <MaterialIcons
                                name="logout"
                                size={24}
                                color="#6B7280"
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Quick Stats */}
                    <View className="flex-row gap-3 mb-6">
                        <View className="flex-1 bg-white p-4 rounded-lg items-center">
                            <MaterialIcons
                                name="schedule"
                                size={24}
                                color="#3B82F6"
                            />
                            <Text className="text-2xl font-bold mt-2">
                                {weeklyHours}
                            </Text>
                            <Text className="text-xs text-gray-500">
                                Hours This Week
                            </Text>
                        </View>
                        <View className="flex-1 bg-white p-4 rounded-lg items-center">
                            <MaterialIcons
                                name="check-circle"
                                size={24}
                                color="#10B981"
                            />
                            <Text className="text-2xl font-bold mt-2">
                                {projectsCompleted}
                            </Text>
                            <Text className="text-xs text-gray-500">
                                Projects Done
                            </Text>
                        </View>
                    </View>

                    {/* Progress Card */}
                    <View className="bg-white p-4 rounded-lg mb-6">
                        <View className="flex-row items-center mb-2">
                            <MaterialIcons
                                name="trending-up"
                                size={20}
                                color="#6366F1"
                                className="mr-2"
                            />
                            <Text className="font-bold">Overall Progress</Text>
                        </View>
                        <Text className="text-gray-500 mb-4">
                            Your journey in the Re-Imagine Robotics program
                        </Text>
                        <View className="flex-row items-center justify-between mb-2">
                            <Text className="text-sm text-gray-500">
                                Program Completion
                            </Text>
                            <Text className="text-sm font-bold text-blue-600">
                                {overallProgress}%
                            </Text>
                        </View>
                        <View className="h-3 bg-gray-200 rounded-full mb-3">
                            <View
                                className="h-3 bg-blue-500 rounded-full"
                                style={{ width: `${overallProgress}%` }}
                            />
                        </View>
                        <Text className="text-xs text-gray-500">
                            Great progress! Keep up the momentum.
                        </Text>
                    </View>

                    {/* Upcoming Events */}
                    <View className="bg-white p-4 rounded-lg mb-6">
                        <View className="flex-row items-center mb-2">
                            <MaterialIcons
                                name="event"
                                size={20}
                                color="#F59E0B"
                                className="mr-2"
                            />
                            <Text className="font-bold">Upcoming Events</Text>
                        </View>
                        <Text className="text-gray-500 mb-4">
                            Don't miss these important activities
                        </Text>
                        <View className="gap-3">
                            {upcomingEvents.map((event) => (
                                <View
                                    key={event.id}
                                    className="flex-row items-center p-3 bg-gray-100 rounded-lg"
                                >
                                    <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center mr-3">
                                        <MaterialIcons
                                            name={getEventIcon(event.type)}
                                            size={20}
                                            color="#6366F1"
                                        />
                                    </View>
                                    <View className="flex-1">
                                        <Text className="font-medium">
                                            {event.title}
                                        </Text>
                                        <Text className="text-sm text-gray-500">
                                            {event.date}
                                        </Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Quick Actions */}
                    <View className="bg-white p-4 rounded-lg">
                        <View className="flex-row items-center mb-4">
                            <MaterialIcons
                                name="flash-on"
                                size={20}
                                color="#EF4444"
                                className="mr-2"
                            />
                            <Text className="font-bold">Quick Actions</Text>
                        </View>
                        <View className="flex-row gap-3">
                            <TouchableOpacity className="flex-1 border border-gray-200 rounded-lg p-3 items-center">
                                <MaterialIcons
                                    name="assignment"
                                    size={16}
                                    color="#6B7280"
                                />
                                <Text className="ml-2 text-gray-500">
                                    View Events
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="flex-1 border border-gray-200 rounded-lg p-3 items-center">
                                <MaterialIcons
                                    name="people"
                                    size={16}
                                    color="#6B7280"
                                />
                                <Text className="ml-2 text-gray-500">
                                    Projects
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View className="flex-row gap-3 mt-3">
                            <TouchableOpacity className="flex-1 border border-gray-200 rounded-lg p-3 items-center">
                                <MaterialIcons
                                    name="library-books"
                                    size={16}
                                    color="#6B7280"
                                />
                                <Text className="ml-2 text-gray-500">
                                    Resources
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="flex-1 border border-gray-200 rounded-lg p-3 items-center">
                                <MaterialIcons
                                    name="person"
                                    size={16}
                                    color="#6B7280"
                                />
                                <Text className="ml-2 text-gray-500">
                                    Profile
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View className="h-8" />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
