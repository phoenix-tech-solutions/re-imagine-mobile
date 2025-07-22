import * as React from "react";
import {
    RefreshControl,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    Switch,
} from "react-native";

import { useAuth, User } from "~/contexts/AuthContext";
import { useTheme } from "~/contexts/ThemeContext";
import {
    LogOut,
    Clock,
    CheckCircle,
    TrendingUp,
    Calendar,
    Zap,
    Book,
    UserIcon,
    Wrench,
} from "lucide-react-native";
import { useRouter } from "expo-router";
import { ThemedView } from "~/components/ThemedView";
import { useRefreshControlStyle } from "~/hooks/use-refresh-control-style";

export default function Dashboard() {
    const { user } = useAuth();
    const { theme } = useTheme();

    if (!user) {
        return null; // or a loading spinner
    }
    const refreshStyle = useRefreshControlStyle(theme);

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        // Simulate data refresh
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);

    return (
        <ScrollView
            contentContainerClassName="flex-grow"
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    title="Pull to refresh"
                    {...refreshStyle}
                />
            }
        >
            <Content user={user} />
        </ScrollView>
    );
}

function Content({ user }: { user: User }) {
    const router = useRouter();
    const { signOut } = useAuth();
    const { theme, toggleTheme } = useTheme();

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
    const handleSignOut = async () => {
        await signOut();
        router.replace("/login");
    };

    const getEventIcon = (type: string) => {
        switch (type) {
            case "workshop":
                return <Wrench size={20} color="#6366F1" />;
            case "assignment":
                return <Book size={20} color="#6366F1" />;
            case "meeting":
                return <UserIcon size={20} color="#6366F1" />;
            default:
                return <Calendar size={20} color="#6366F1" />;
        }
    };

    return (
        <ThemedView className="flex-1 p-6 pt-8">
            {/* Header */}
            <View className="flex-row justify-between items-center mb-8">
                <View className="flex-1">
                    <Text className="text-2xl font-bold mb-1 text-gray-900 dark:text-white">
                        Welcome back,{" "}
                        {user.user_metadata?.full_name || "Student"}!
                    </Text>
                    <Text className="text-gray-500 dark:text-gray-400">
                        Ready to build the future?
                    </Text>
                </View>
                <View className="flex-row items-center">
                    <Switch
                        value={theme === "dark"}
                        onValueChange={toggleTheme}
                    />
                    <TouchableOpacity onPress={handleSignOut} className="ml-4">
                        <LogOut
                            size={24}
                            color={theme === "dark" ? "#9CA3AF" : "#6B7280"}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Quick Stats */}
            <View className="flex-row gap-3 mb-6">
                <ThemedView className="flex-1 p-4 rounded-lg items-center">
                    <Clock size={24} color="#3B82F6" />
                    <Text className="text-2xl font-bold mt-2 text-gray-900 dark:text-white">
                        {weeklyHours}
                    </Text>
                    <Text className="text-xs text-gray-500 dark:text-gray-400">
                        Hours This Week
                    </Text>
                </ThemedView>
                <ThemedView className="flex-1 p-4 rounded-lg items-center">
                    <CheckCircle size={24} color="#10B981" />
                    <Text className="text-2xl font-bold mt-2 text-gray-900 dark:text-white">
                        {projectsCompleted}
                    </Text>
                    <Text className="text-xs text-gray-500 dark:text-gray-400">
                        Projects Done
                    </Text>
                </ThemedView>
            </View>

            {/* Progress Card */}
            <ThemedView className="p-4 rounded-lg mb-6">
                <View className="flex-row items-center mb-2">
                    <TrendingUp size={20} color="#6366F1" className="mr-2" />
                    <Text className="font-bold ml-2 text-gray-900 dark:text-white">
                        Overall Progress
                    </Text>
                </View>
                <Text className="text-gray-500 dark:text-gray-400 mb-4">
                    Your journey in the Re-Imagine Robotics program
                </Text>
                <View className="flex-row items-center justify-between mb-2">
                    <Text className="text-sm text-gray-500 dark:text-gray-400">
                        Program Completion
                    </Text>
                    <Text className="text-sm font-bold text-blue-600">
                        {overallProgress}%
                    </Text>
                </View>
                <View className="h-3 rounded-full bg-gray-200 dark:bg-gray-700 mb-3">
                    <View
                        className="h-3 bg-blue-500 rounded-full"
                        style={{ width: `${overallProgress}%` }}
                    />
                </View>
                <Text className="text-xs text-gray-500 dark:text-gray-400">
                    Great progress! Keep up the momentum.
                </Text>
            </ThemedView>

            {/* Upcoming Events */}
            <ThemedView className="p-4 rounded-lg mb-6">
                <View className="flex-row items-center mb-2">
                    <Calendar size={20} color="#F59E0B" className="mr-2" />
                    <Text className="font-bold ml-2 text-gray-900 dark:text-white">
                        Upcoming Events
                    </Text>
                </View>
                <Text className="text-gray-500 dark:text-gray-400 mb-4">
                    Don't miss these important activities
                </Text>
                <View className="gap-3">
                    {upcomingEvents.map((event) => (
                        <ThemedView
                            key={event.id}
                            className="flex-row items-center p-3 rounded-lg"
                        >
                            <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center mr-3">
                                {getEventIcon(event.type)}
                            </View>
                            <View className="flex-1">
                                <Text className="font-medium text-gray-900 dark:text-white">
                                    {event.title}
                                </Text>
                                <Text className="text-sm text-gray-500 dark:text-gray-400">
                                    {event.date}
                                </Text>
                            </View>
                        </ThemedView>
                    ))}
                </View>
            </ThemedView>

            {/* Quick Actions */}
            <ThemedView className="p-4 rounded-lg">
                <View className="flex-row items-center mb-4">
                    <Zap size={20} color="#EF4444" className="mr-2" />
                    <Text
                        className={`font-bold ml-2 ${
                            theme === "dark" ? "text-white" : "text-gray-900"
                        }`}
                    >
                        Quick Actions
                    </Text>
                </View>
                <View className="flex-row gap-3">
                    <TouchableOpacity
                        className={`flex-1 border rounded-lg p-3 items-center ${
                            theme === "dark"
                                ? "border-gray-700"
                                : "border-gray-200"
                        }`}
                    >
                        <Calendar
                            size={16}
                            color={theme === "dark" ? "#9CA3AF" : "#6B7280"}
                        />
                        <Text
                            className={`ml-2 ${
                                theme === "dark"
                                    ? "text-gray-400"
                                    : "text-gray-500"
                            }`}
                        >
                            View Events
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className={`flex-1 border rounded-lg p-3 items-center ${
                            theme === "dark"
                                ? "border-gray-700"
                                : "border-gray-200"
                        }`}
                    >
                        <Wrench
                            size={16}
                            color={theme === "dark" ? "#9CA3AF" : "#6B7280"}
                        />
                        <Text
                            className={`ml-2 ${
                                theme === "dark"
                                    ? "text-gray-400"
                                    : "text-gray-500"
                            }`}
                        >
                            Projects
                        </Text>
                    </TouchableOpacity>
                </View>
                <View className="flex-row gap-3 mt-3">
                    <TouchableOpacity
                        className={`flex-1 border rounded-lg p-3 items-center ${
                            theme === "dark"
                                ? "border-gray-700"
                                : "border-gray-200"
                        }`}
                    >
                        <Book
                            size={16}
                            color={theme === "dark" ? "#9CA3AF" : "#6B7280"}
                        />
                        <Text
                            className={`ml-2 ${
                                theme === "dark"
                                    ? "text-gray-400"
                                    : "text-gray-500"
                            }`}
                        >
                            Resources
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className={`flex-1 border rounded-lg p-3 items-center ${
                            theme === "dark"
                                ? "border-gray-700"
                                : "border-gray-200"
                        }`}
                    >
                        <UserIcon
                            size={16}
                            color={theme === "dark" ? "#9CA3AF" : "#6B7280"}
                        />
                        <Text
                            className={`ml-2 ${
                                theme === "dark"
                                    ? "text-gray-400"
                                    : "text-gray-500"
                            }`}
                        >
                            Profile
                        </Text>
                    </TouchableOpacity>
                </View>
            </ThemedView>
        </ThemedView>
    );
}
