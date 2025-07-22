import { Redirect, Tabs } from "expo-router";
import {
    LayoutDashboard,
    Calendar,
    Wrench,
    Book,
    User,
} from "lucide-react-native";

import { useAuth } from "~/contexts/AuthContext";

export default function AppLayout() {
    const { user, loading } = useAuth();

    if (loading) {
        return null;
    }

    if (!user) {
        return <Redirect href="/login" />;
    }

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "#3B82F6",
                tabBarInactiveTintColor: "#9CA3AF",
                tabBarStyle: {
                    backgroundColor: "#FFFFFF",
                    borderTopWidth: 0,
                    elevation: 4, // android shadow
                    shadowOpacity: 0.05, // iOS shadow
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Dashboard",
                    tabBarIcon: ({ color, size }) => (
                        <LayoutDashboard size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="events"
                options={{
                    title: "Events",
                    tabBarIcon: ({ color, size }) => (
                        <Calendar size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="projects"
                options={{
                    title: "Projects",
                    tabBarIcon: ({ color, size }) => (
                        <Wrench size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="resources"
                options={{
                    title: "Resources",
                    tabBarIcon: ({ color, size }) => (
                        <Book size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color, size }) => (
                        <User size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
