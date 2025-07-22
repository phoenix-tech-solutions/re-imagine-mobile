import * as React from "react";
import {
    View,
    ScrollView,
    RefreshControl,
    Text,
    Image,
    TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "~/contexts/AuthContext";
import { useRouter } from "expo-router";

interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: string;
    points: number;
    earned_at: string;
}

export default function ProfileScreen() {
    const router = useRouter();
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
            id: "1",
            title: "First Steps",
            description: "Complete your first robotics workshop",
            icon: "🤖",
            points: 10,
            earned_at: "2024-12-15",
        },
        {
            id: "2",
            title: "Team Player",
            description: "Collaborate effectively in a team project",
            icon: "🤝",
            points: 20,
            earned_at: "2024-12-20",
        },
        {
            id: "3",
            title: "Code Master",
            description: "Successfully program a robot to complete a task",
            icon: "💻",
            points: 25,
            earned_at: "2024-12-25",
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
        router.replace("/login");
    };

    const getInitials = (name: string) => {
        return (
            name
                ?.split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase() || "U"
        );
    };

    return (
        <ScrollView
            className="flex-1 bg-gray-50"
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <View className="p-6">
                {/* User Info Card */}
                <View className="bg-white p-4 rounded-lg items-center mb-6">
                    <Image
                        source={{
                            uri: user?.user_metadata?.avatar_url || undefined,
                        }}
                        className="w-24 h-24 rounded-full mb-4"
                    />
                    <Text className="text-2xl font-bold text-center">
                        {user?.user_metadata?.full_name || "Student"}
                    </Text>
                    <Text className="text-center text-gray-500">
                        {user?.email}
                    </Text>
                    <TouchableOpacity
                        onPress={handleSignOut}
                        className="flex-row items-center mt-4"
                    >
                        <MaterialIcons
                            name="logout"
                            size={16}
                            color="#6B7280"
                        />
                        <Text className="ml-2 text-gray-500">Sign Out</Text>
                    </TouchableOpacity>
                </View>

                {/* Stats Cards */}
                <View className="mb-6">
                    <View className="flex-row gap-3 mb-3">
                        <View className="flex-1 bg-white p-4 rounded-lg items-center">
                            <MaterialIcons
                                name="schedule"
                                size={28}
                                color="#3B82F6"
                            />
                            <Text className="text-2xl font-bold mt-2">
                                {profile.total_hours}
                            </Text>
                            <Text className="text-xs text-gray-500 text-center">
                                Total Hours
                            </Text>
                        </View>

                        <View className="flex-1 bg-white p-4 rounded-lg items-center">
                            <MaterialIcons
                                name="check-circle"
                                size={28}
                                color="#10B981"
                            />
                            <Text className="text-2xl font-bold mt-2">
                                {profile.projects_completed}
                            </Text>
                            <Text className="text-xs text-gray-500 text-center">
                                Projects Done
                            </Text>
                        </View>
                    </View>

                    <View className="flex-row gap-3">
                        <View className="flex-1 bg-white p-4 rounded-lg items-center">
                            <MaterialIcons
                                name="emoji-events"
                                size={28}
                                color="#F59E0B"
                            />
                            <Text className="text-2xl font-bold mt-2">
                                {profile.achievements_count}
                            </Text>
                            <Text className="text-xs text-gray-500 text-center">
                                Achievements
                            </Text>
                        </View>

                        <View className="flex-1 bg-white p-4 rounded-lg items-center">
                            <MaterialIcons
                                name="local-fire-department"
                                size={28}
                                color="#EF4444"
                            />
                            <Text className="text-2xl font-bold mt-2">
                                {profile.current_streak}
                            </Text>
                            <Text className="text-xs text-gray-500 text-center">
                                Day Streak
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Progress Card */}
                <View className="bg-white p-4 rounded-lg mb-6">
                    <View className="flex-row items-center mb-2">
                        <MaterialIcons
                            name="trending-up"
                            size={20}
                            color="#6366F1"
                        />
                        <Text className="ml-2 font-bold">Overall Progress</Text>
                    </View>
                    <Text className="text-gray-500 mb-4">
                        Your journey in the Re-Imagine Robotics program
                    </Text>
                    <View className="flex-row items-center justify-between mb-2">
                        <Text className="text-sm text-gray-500">
                            Program Completion
                        </Text>
                        <Text className="text-sm font-bold text-blue-600">
                            {profile.overall_progress}%
                        </Text>
                    </View>
                    <View className="h-3 bg-gray-200 rounded-full mb-3">
                        <View
                            className="h-3 bg-blue-500 rounded-full"
                            style={{ width: `${profile.overall_progress}%` }}
                        />
                    </View>
                    <Text className="text-xs text-gray-500">
                        Keep up the great work!
                    </Text>
                </View>

                {/* Recent Achievements */}
                <View className="bg-white p-4 rounded-lg mb-6">
                    <View className="flex-row items-center mb-2">
                        <MaterialIcons
                            name="emoji-events"
                            size={20}
                            color="#F59E0B"
                        />
                        <Text className="ml-2 font-bold">
                            Recent Achievements
                        </Text>
                    </View>
                    <Text className="text-gray-500 mb-4">
                        Your latest accomplishments
                    </Text>
                    <View className="gap-y-3">
                        {achievements.map((achievement) => (
                            <View
                                key={achievement.id}
                                className="flex-row items-center p-3 bg-gray-100 rounded-lg"
                            >
                                <Text className="text-2xl mr-3">
                                    {achievement.icon}
                                </Text>
                                <View className="flex-1">
                                    <Text className="font-medium">
                                        {achievement.title}
                                    </Text>
                                    <Text className="text-sm text-gray-500">
                                        {achievement.description}
                                    </Text>
                                </View>
                                <View className="items-center">
                                    <Text className="text-sm font-bold text-yellow-600">
                                        {achievement.points}
                                    </Text>
                                    <Text className="text-xs text-gray-500">
                                        pts
                                    </Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Action Buttons */}
                <View className="gap-y-3">
                    <TouchableOpacity
                        className="w-full flex-row items-center justify-center border border-gray-200 rounded-lg p-3"
                        onPress={() => router.push("/edit-profile")}
                    >
                        <MaterialIcons name="edit" size={16} color="#6B7280" />
                        <Text className="ml-2 text-gray-500">Edit Profile</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="w-full flex-row items-center justify-center border border-gray-200 rounded-lg p-3"
                        onPress={() => router.push("/settings")}
                    >
                        <MaterialIcons
                            name="settings"
                            size={16}
                            color="#6B7280"
                        />
                        <Text className="ml-2 text-gray-500">Settings</Text>
                    </TouchableOpacity>
                </View>

                <View className="h-8" />
            </View>
        </ScrollView>
    );
}
