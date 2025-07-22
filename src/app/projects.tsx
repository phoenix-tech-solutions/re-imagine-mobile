import * as React from "react";
import {
    View,
    ScrollView,
    RefreshControl,
    TouchableOpacity,
    Text,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "~/contexts/AuthContext";
import { useRouter } from "expo-router";

interface Project {
    id: string;
    title: string;
    description: string;
    status: "planning" | "in_progress" | "completed" | "cancelled" | "on_hold";
    difficulty_level: "beginner" | "intermediate" | "advanced";
    tags: string[];
    required_skills: string[];
    max_team_size: number;
    member_count?: number;
}

export default function ProjectsScreen() {
    const router = useRouter();
    const { user } = useAuth();
    const [refreshing, setRefreshing] = React.useState(false);
    const [projects, setProjects] = React.useState<Project[]>([
        {
            id: "1",
            title: "Autonomous Cleaning Robot",
            description:
                "Design and build a robot that can navigate and clean a room autonomously",
            status: "in_progress",
            difficulty_level: "intermediate",
            tags: ["autonomous", "navigation", "cleaning"],
            required_skills: ["Python", "Arduino", "Sensors"],
            max_team_size: 4,
            member_count: 3,
        },
        {
            id: "2",
            title: "Smart Garden Monitor",
            description:
                "Create an IoT system to monitor and water plants automatically",
            status: "planning",
            difficulty_level: "beginner",
            tags: ["iot", "agriculture", "monitoring"],
            required_skills: ["Arduino", "Sensors", "Basic Programming"],
            max_team_size: 3,
            member_count: 1,
        },
        {
            id: "3",
            title: "Drone Navigation System",
            description:
                "Develop a computer vision-based navigation system for drones",
            status: "in_progress",
            difficulty_level: "advanced",
            tags: ["drone", "computer-vision", "navigation"],
            required_skills: ["Python", "OpenCV", "Machine Learning"],
            max_team_size: 4,
            member_count: 4,
        },
        {
            id: "4",
            title: "Line Following Robot",
            description:
                "Build a simple robot that can follow a black line on the ground",
            status: "planning",
            difficulty_level: "beginner",
            tags: ["line-following", "sensors", "basic-robotics"],
            required_skills: ["Arduino", "Basic Programming"],
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
            case "completed":
                return "#10B981";
            case "in_progress":
                return "#3B82F6";
            case "planning":
                return "#F59E0B";
            case "on_hold":
                return "#6B7280";
            case "cancelled":
                return "#EF4444";
            default:
                return "#6B7280";
        }
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case "beginner":
                return "#10B981";
            case "intermediate":
                return "#F59E0B";
            case "advanced":
                return "#EF4444";
            default:
                return "#6B7280";
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "completed":
                return "check-circle";
            case "in_progress":
                return "play-circle-filled";
            case "planning":
                return "schedule";
            case "on_hold":
                return "pause-circle-filled";
            case "cancelled":
                return "cancel";
            default:
                return "help";
        }
    };

    return (
        <ScrollView
            className="flex-1 bg-gray-50"
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <View className="p-6">
                {/* Header */}
                <View className="mb-6">
                    <Text className="text-3xl font-bold text-gray-900 mb-2">
                        Projects
                    </Text>
                    <Text className="text-gray-500">
                        Explore robotics projects and join teams
                    </Text>
                </View>

                {/* Filter Tabs */}
                <View className="flex-row mb-6 bg-gray-200 rounded-lg p-1">
                    <TouchableOpacity className="flex-1 bg-white rounded-md p-2 items-center">
                        <Text className="font-bold">All</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-1 p-2 items-center">
                        <Text>Available</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-1 p-2 items-center">
                        <Text>My Projects</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-1 p-2 items-center">
                        <Text>Completed</Text>
                    </TouchableOpacity>
                </View>

                {/* Projects List */}
                <View className="gap-y-4">
                    {projects.map((project) => (
                        <TouchableOpacity
                            key={project.id}
                            onPress={() =>
                                router.push(`/projects/${project.id}`)
                            }
                            className="bg-white p-4 rounded-lg"
                        >
                            <View className="flex-row items-center justify-between mb-2">
                                <View className="flex-row items-center">
                                    <MaterialIcons
                                        name={getStatusIcon(project.status)}
                                        size={20}
                                        color={getStatusColor(project.status)}
                                    />
                                    <Text
                                        style={{
                                            color: getStatusColor(
                                                project.status,
                                            ),
                                        }}
                                        className="ml-2 font-bold capitalize"
                                    >
                                        {project.status.replace("_", " ")}
                                    </Text>
                                </View>
                                <View className="flex-row items-center">
                                    <MaterialIcons
                                        name="star"
                                        size={16}
                                        color={getDifficultyColor(
                                            project.difficulty_level,
                                        )}
                                    />
                                    <Text
                                        style={{
                                            color: getDifficultyColor(
                                                project.difficulty_level,
                                            ),
                                        }}
                                        className="ml-1 capitalize"
                                    >
                                        {project.difficulty_level}
                                    </Text>
                                </View>
                            </View>
                            <Text className="text-lg font-bold mb-2">
                                {project.title}
                            </Text>
                            <Text className="text-gray-500 mb-4">
                                {project.description}
                            </Text>

                            <View className="mb-3">
                                <Text className="font-bold mb-2">
                                    Skills Required:
                                </Text>
                                <View className="flex-row flex-wrap">
                                    {project.required_skills.map(
                                        (skill, index) => (
                                            <View
                                                key={index}
                                                className="bg-blue-100 px-2 py-1 rounded-md mr-2 mb-1"
                                            >
                                                <Text className="text-xs text-blue-800">
                                                    {skill}
                                                </Text>
                                            </View>
                                        ),
                                    )}
                                </View>
                            </View>

                            <View className="flex-row flex-wrap">
                                {project.tags.map((tag, index) => (
                                    <View
                                        key={index}
                                        className="bg-gray-200 px-2 py-1 rounded-md mr-2 mb-1"
                                    >
                                        <Text className="text-xs text-gray-500">
                                            #{tag}
                                        </Text>
                                    </View>
                                ))}
                            </View>

                            <View className="flex-row items-center justify-between w-full mt-4">
                                <View className="flex-row items-center">
                                    <MaterialIcons
                                        name="group"
                                        size={16}
                                        color="#6B7280"
                                    />
                                    <Text className="ml-1 text-sm text-gray-500">
                                        {project.member_count || 0}/
                                        {project.max_team_size} members
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    disabled={
                                        project.member_count ===
                                        project.max_team_size
                                    }
                                    className={`py-2 px-4 rounded-lg ${project.member_count === project.max_team_size ? "bg-gray-300" : "bg-blue-600"}`}
                                >
                                    <Text
                                        className={`${project.member_count === project.max_team_size ? "text-gray-500" : "text-white"}`}
                                    >
                                        {project.member_count ===
                                        project.max_team_size
                                            ? "Full"
                                            : "Join Team"}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                <View className="h-8" />
            </View>
        </ScrollView>
    );
}
