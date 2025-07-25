import { Redirect, Tabs } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import {
    LayoutDashboard,
    Calendar,
    Wrench,
    Book,
    User,
} from "lucide-react-native";
import { useAuth } from "~/contexts/AuthContext";
import { useTheme } from "~/contexts/ThemeContext";
import { CustomTabBar } from "~/components/custom-tab-bar";

export default function AppLayout() {
    const { user, loading } = useAuth();
    const { theme } = useTheme();

    if (loading) {
        return null;
    }

    if (!user) {
        return <Redirect href="/login" />;
    }

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: theme === "dark" ? "#000000" : "#FFFFFF",
            }}
            edges={["top", "bottom", "left", "right"]} // Only handle top edge, let tab bar handle bottom
        >
            <View style={{ flex: 1 }}>
                <Tabs
                    tabBar={(props) => <CustomTabBar {...props} />}
                    screenOptions={{
                        headerShown: false,
                        tabBarActiveTintColor: "#3B82F6",
                        tabBarInactiveTintColor: "#9CA3AF",
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
            </View>
        </SafeAreaView>
    );
}
