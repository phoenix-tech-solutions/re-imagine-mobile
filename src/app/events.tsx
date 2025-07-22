
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

interface Event {
    id: string;
    title: string;
    description: string;
    event_type:
        | "workshop"
        | "assignment"
        | "meeting"
        | "presentation"
        | "competition";
    start_time: string;
    end_time: string;
    location?: string;
    max_participants?: number;
    is_required: boolean;
    registered?: boolean;
}

export default function EventsScreen() {
    const router = useRouter();
    const { user } = useAuth();
    const [refreshing, setRefreshing] = React.useState(false);
    const [events, setEvents] = React.useState<Event[]>([
        {
            id: "1",
            title: "Robot Assembly Workshop",
            description:
                "Learn the basics of robot assembly using Arduino and sensors",
            event_type: "workshop",
            start_time: "2025-01-02T14:00:00Z",
            end_time: "2025-01-02T17:00:00Z",
            location: "Lab Room A",
            max_participants: 20,
            is_required: true,
            registered: false,
        },
        {
            id: "2",
            title: "Programming Challenge: Line Following Robot",
            description: "Code a robot to follow a line using computer vision",
            event_type: "assignment",
            start_time: "2025-01-03T09:00:00Z",
            end_time: "2025-01-10T23:59:00Z",
            location: "Online",
            is_required: false,
            registered: true,
        },
        {
            id: "3",
            title: "Advanced Sensor Integration",
            description:
                "Workshop on integrating multiple sensors in robotics projects",
            event_type: "workshop",
            start_time: "2025-01-08T10:00:00Z",
            end_time: "2025-01-08T13:00:00Z",
            location: "Lab Room B",
            max_participants: 15,
            is_required: false,
            registered: false,
        },
        {
            id: "4",
            title: "Team Project Presentation",
            description:
                "Present your team robotics project to peers and mentors",
            event_type: "presentation",
            start_time: "2025-01-15T13:00:00Z",
            end_time: "2025-01-15T17:00:00Z",
            location: "Main Auditorium",
            max_participants: 100,
            is_required: true,
            registered: false,
        },
        {
            id: "5",
            title: "Robotics Competition Kickoff",
            description: "Launch event for the annual robotics competition",
            event_type: "competition",
            start_time: "2025-02-01T09:00:00Z",
            end_time: "2025-02-01T18:00:00Z",
            location: "Competition Arena",
            max_participants: 50,
            is_required: false,
            registered: false,
        },
    ]);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        // Simulate data refresh
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);

    const getEventTypeColor = (type: string) => {
        switch (type) {
            case "workshop":
                return "#3B82F6";
            case "assignment":
                return "#F59E0B";
            case "meeting":
                return "#10B981";
            case "presentation":
                return "#8B5CF6";
            case "competition":
                return "#EF4444";
            default:
                return "#6B7280";
        }
    };

    const getEventTypeIcon = (type: string) => {
        switch (type) {
            case "workshop":
                return "build";
            case "assignment":
                return "assignment";
            case "meeting":
                return "people";
            case "presentation":
                return "presentation";
            case "competition":
                return "emoji-events";
            default:
                return "event";
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
        });
    };

    const formatTime = (startTime: string, endTime: string) => {
        const start = new Date(startTime);
        const end = new Date(endTime);
        return `${start.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
        })} - ${end.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
        })}`;
    };

    const handleRegister = (eventId: string) => {
        setEvents((prev) =>
            prev.map((event) =>
                event.id === eventId
                    ? { ...event, registered: !event.registered }
                    : event,
            ),
        );
    };

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
        <ScrollView
            className="flex-1"
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <View className="p-6">
                {/* Header */}
                <View className="mb-6">
                    <Text className="text-3xl font-bold text-gray-900 mb-2">
                        Events
                    </Text>
                    <Text className="text-gray-500">
                        Workshops, assignments, and competitions
                    </Text>
                </View>

                {/* Filter Tabs */}
                <View className="flex-row mb-6 bg-gray-200 rounded-lg p-1">
                    <TouchableOpacity className="flex-1 bg-white rounded-md p-2 items-center">
                        <Text className="font-bold">All</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-1 p-2 items-center">
                        <Text>Workshops</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-1 p-2 items-center">
                        <Text>My Events</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-1 p-2 items-center">
                        <Text>Required</Text>
                    </TouchableOpacity>
                </View>

                {/* Events List */}
                <View className="gap-y-4">
                    {events.map((event) => (
                        <TouchableOpacity
                            key={event.id}
                            onPress={() => router.push(`/events/${event.id}`)}
                            className="bg-white p-4 rounded-lg"
                        >
                            <View className="flex-row items-center justify-between mb-2">
                                <View className="flex-row items-center">
                                    <MaterialIcons
                                        name={getEventTypeIcon(
                                            event.event_type,
                                        )}
                                        size={20}
                                        color={getEventTypeColor(
                                            event.event_type,
                                        )}
                                    />
                                    <Text
                                        style={{
                                            color: getEventTypeColor(
                                                event.event_type,
                                            ),
                                        }}
                                        className="ml-2 font-bold capitalize"
                                    >
                                        {event.event_type}
                                    </Text>
                                </View>
                                {event.is_required && (
                                    <View className="bg-red-100 px-2 py-1 rounded-md">
                                        <Text className="text-xs text-red-600 font-medium">
                                            Required
                                        </Text>
                                    </View>
                                )}
                            </View>
                            <Text className="text-lg font-bold mb-2">
                                {event.title}
                            </Text>
                            <Text className="text-gray-500 mb-4">
                                {event.description}
                            </Text>

                            <View className="flex-row items-center mb-3">
                                <MaterialIcons
                                    name="schedule"
                                    size={16}
                                    color="#6B7280"
                                />
                                <Text className="ml-2 text-sm text-gray-500">
                                    {formatDate(event.start_time)}
                                </Text>
                            </View>

                            <View className="flex-row items-center mb-3">
                                <MaterialIcons
                                    name="access-time"
                                    size={16}
                                    color="#6B7280"
                                />
                                <Text className="ml-2 text-sm text-gray-500">
                                    {formatTime(
                                        event.start_time,
                                        event.end_time,
                                    )}
                                </Text>
                            </View>

                            {event.location && (
                                <View className="flex-row items-center mb-3">
                                    <MaterialIcons
                                        name="location-on"
                                        size={16}
                                        color="#6B7280"
                                    />
                                    <Text className="ml-2 text-sm text-gray-500">
                                        {event.location}
                                    </Text>
                                </View>
                            )}

                            {event.max_participants && (
                                <View className="flex-row items-center">
                                    <MaterialIcons
                                        name="group"
                                        size={16}
                                        color="#6B7280"
                                    />
                                    <Text className="ml-2 text-sm text-gray-500">
                                        Max {event.max_participants}{" "}
                                        participants
                                    </Text>
                                </View>
                            )}

                            <View className="flex-row items-center justify-between w-full mt-4">
                                {event.registered && (
                                    <View className="flex-row items-center">
                                        <MaterialIcons
                                            name="check-circle"
                                            size={16}
                                            color="#10B981"
                                        />
                                        <Text className="ml-1 text-sm text-green-600">
                                            Registered
                                        </Text>
                                    </View>
                                )}
                                <TouchableOpacity
                                    onPress={() => handleRegister(event.id)}
                                    className={`py-2 px-4 rounded-lg ${event.registered ? "border border-gray-300" : "bg-blue-600"}`}
                                >
                                    <Text
                                        className={`${event.registered ? "text-gray-900" : "text-white"}`}
                                    >
                                        {event.registered
                                            ? "Unregister"
                                            : "Register"}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                <View className="h-8" />
            </View>
        </ScrollView>
    </SafeAreaView>
    );
}
