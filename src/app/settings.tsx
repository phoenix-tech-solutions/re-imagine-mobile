import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Switch,
    ScrollView,
    Pressable,
    Alert,
    Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Constants from "expo-constants";
import { ThemedView } from "~/components/ThemedView";
import { useTheme } from "~/contexts/ThemeContext";
import { useAuth } from "~/contexts/AuthContext";
import {
    ChevronLeft,
    ChevronRight,
    LogOut,
    User2,
    Bell,
    HelpCircle,
    Info,
    Mail,
    Moon,
} from "lucide-react-native";

type RowProps = {
    icon: React.ReactNode;
    label: string;
    valueText?: string;
    onPress?: () => void;
    rightElement?: React.ReactNode;
};

function SettingsRow({ icon, label, valueText, onPress, rightElement }: RowProps) {
    const content = (
        <View className="flex-row items-center justify-between py-3">
            <View className="flex-row items-center">
                <View className="mr-3">{icon}</View>
                <Text className="text-base text-gray-900 dark:text-white">{label}</Text>
            </View>
            {rightElement ?? (
                <View className="flex-row items-center">
                    {valueText ? (
                        <Text className="mr-2 text-sm text-gray-500 dark:text-gray-400">
                            {valueText}
                        </Text>
                    ) : null}
                    <ChevronRight size={18} color="#9CA3AF" />
                </View>
            )}
        </View>
    );

    if (onPress) {
        return (
            <Pressable onPress={onPress} android_ripple={{ color: "#e5e7eb" }}>
                {content}
            </Pressable>
        );
    }
    return content;
}

function ProfileHeader() {
    const { user } = useAuth();
    const name = (user?.user_metadata?.full_name as string) || "Student";
    const email = (user?.email as string) || "";
    const initials = name
        .split(" ")
        .map((n: string) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();

    return (
        <ThemedView className="mb-4 flex-row items-center rounded-xl p-4">
            <View className="h-12 w-12 items-center justify-center rounded-full bg-blue-500">
                <Text className="text-base font-bold text-white">{initials}</Text>
            </View>
            <View className="ml-3">
                <Text className="text-base font-semibold text-gray-900 dark:text-white">
                    {name}
                </Text>
                {!!email && (
                    <Text className="text-sm text-gray-500 dark:text-gray-400">{email}</Text>
                )}
            </View>
        </ThemedView>
    );
}

export default function SettingsScreen() {
    const router = useRouter();
    const { theme, toggleTheme } = useTheme();
    const { signOut } = useAuth();

    const [notificationsEnabled, setNotificationsEnabled] = React.useState<boolean>(true);
    const version = (Constants.expoConfig?.version as string) || "1.0.0";

    const handleSignOut = async () => {
        const confirm = new Promise<boolean>((resolve) => {
            Alert.alert("Sign out", "Are you sure you want to sign out?", [
                { text: "Cancel", style: "cancel", onPress: () => resolve(false) },
                { text: "Sign out", style: "destructive", onPress: () => resolve(true) },
            ]);
        });
        if (await confirm) {
            await signOut();
            router.replace("/login");
        }
    };

    const openMail = () => Linking.openURL("mailto:support@reimaginerobotics.org");
    const openDocs = () => Linking.openURL("https://reimaginerobotics.org");

    return (
        <ScrollView
            className={theme == "dark" ? "bg-black" : "bg-white"}
            contentContainerClassName="pb-8">
            <View className="px-6 pt-2">
                {/* Header */}
                <View className="mb-4 flex-row items-center">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        accessibilityLabel="Go back"
                        accessibilityRole="button">
                        <ChevronLeft size={24} color={theme === "dark" ? "#9CA3AF" : "#6B7280"} />
                    </TouchableOpacity>
                    <Text className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                        Settings
                    </Text>
                </View>

                <ProfileHeader />

                {/* Appearance */}
                <ThemedView className="mb-4 rounded-xl p-2">
                    <SettingsRow
                        icon={<Moon size={18} color={theme === "dark" ? "#9CA3AF" : "#6B7280"} />}
                        label="Dark Mode"
                        rightElement={
                            <Switch value={theme === "dark"} onValueChange={toggleTheme} />
                        }
                    />
                </ThemedView>

                {/* Account */}
                <ThemedView className="mb-4 rounded-xl p-2">
                    <SettingsRow
                        icon={<User2 size={18} color={theme === "dark" ? "#9CA3AF" : "#6B7280"} />}
                        label="Manage Profile"
                        onPress={() => router.push("/profile")}
                    />
                    <View className="h-px bg-gray-200 dark:bg-gray-700" />
                    <SettingsRow
                        icon={<Bell size={18} color={theme === "dark" ? "#9CA3AF" : "#6B7280"} />}
                        label="Notifications"
                        rightElement={
                            <Switch
                                value={notificationsEnabled}
                                onValueChange={setNotificationsEnabled}
                            />
                        }
                    />
                </ThemedView>

                {/* Support */}
                <ThemedView className="mb-4 rounded-xl p-2">
                    <SettingsRow
                        icon={<Mail size={18} color={theme === "dark" ? "#9CA3AF" : "#6B7280"} />}
                        label="Contact Support"
                        onPress={openMail}
                    />
                    <View className="h-px bg-gray-200 dark:bg-gray-700" />
                    <SettingsRow
                        icon={
                            <HelpCircle
                                size={18}
                                color={theme === "dark" ? "#9CA3AF" : "#6B7280"}
                            />
                        }
                        label="Help Center"
                        onPress={openDocs}
                    />
                </ThemedView>

                {/* About */}
                <ThemedView className="mb-6 rounded-xl p-2">
                    <SettingsRow
                        icon={<Info size={18} color={theme === "dark" ? "#9CA3AF" : "#6B7280"} />}
                        label="Version"
                        valueText={version}
                    />
                </ThemedView>

                {/* Sign out */}
                <ThemedView className="rounded-xl p-2">
                    <Pressable
                        onPress={handleSignOut}
                        accessibilityRole="button"
                        accessibilityLabel="Sign out">
                        <View className="flex-row items-center py-3">
                            <LogOut size={18} color="#EF4444" />
                            <Text className="ml-2 font-medium text-red-500">Sign out</Text>
                        </View>
                    </Pressable>
                </ThemedView>
            </View>
        </ScrollView>
    );
}
