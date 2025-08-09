import React, { useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { useTheme } from "~/contexts/ThemeContext";
import { useAuth } from "~/contexts/AuthContext";
import { Bot } from "lucide-react-native";
import { useRouter } from "expo-router";

export default function ForgotPasswordScreen() {
    const router = useRouter();
    const { theme } = useTheme();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({ email: "" });

    const { resetPassword } = useAuth();

    const validateForm = () => {
        const newErrors = { email: "" };
        let isValid = true;

        if (!email) {
            newErrors.email = "Email is required";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Email is invalid";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleResetPassword = async () => {
        if (!validateForm()) return;

        setLoading(true);
        const { error } = await resetPassword(email);

        if (error) {
            Alert.alert("Error", error.message);
        } else {
            Alert.alert("Success", "Check your email for a password reset link.");
            router.back();
        }
        setLoading(false);
    };

    return (
        <KeyboardAvoidingView
            className="flex-1 bg-white dark:bg-black"
            behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <ScrollView
                className="flex-1 bg-white dark:bg-black"
                contentContainerClassName="flex-grow">
                <View className="flex-1 items-center justify-center p-6">
                    <View className="mb-8 w-full max-w-sm">
                        <View className="mb-8 items-center">
                            <View className="mb-4 h-20 w-20 items-center justify-center rounded-full bg-blue-600">
                                <Bot size={40} color="white" />
                            </View>
                            <Text className="text-center text-3xl font-bold text-gray-900 dark:text-gray-100">
                                Re-Imagine Robotics
                            </Text>
                            <Text className="mt-2 text-center text-lg text-gray-600 dark:text-gray-300">
                                Student Dashboard
                            </Text>
                        </View>

                        <View className="w-full rounded-lg bg-white p-6 shadow shadow-blue-500 dark:bg-neutral-900">
                            <Text className="mb-2 text-center text-2xl font-bold">
                                Forgot Password
                            </Text>
                            <Text className="mb-6 text-center text-gray-500 dark:text-gray-400">
                                Enter your email to reset your password
                            </Text>
                            <View className="gap-y-4">
                                <View>
                                    <Text className="mb-2 font-medium">Email</Text>
                                    <TextInput
                                        className="rounded-lg border border-gray-300 p-3 text-gray-900 dark:border-gray-700 dark:text-gray-100"
                                        placeholder="Enter your email"
                                        placeholderTextColor={
                                            theme === "dark" ? "#9CA3AF" : "#6B7280"
                                        }
                                        value={email}
                                        onChangeText={setEmail}
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                    />
                                    {errors.email ? (
                                        <Text className="mt-1 text-red-500">{errors.email}</Text>
                                    ) : null}
                                </View>
                            </View>
                            <TouchableOpacity
                                className="mt-6 w-full rounded-lg bg-blue-600 p-4"
                                onPress={handleResetPassword}
                                disabled={loading}>
                                <Text className="text-center font-semibold text-white">
                                    {loading ? "Sending..." : "Send Reset Link"}
                                </Text>
                            </TouchableOpacity>

                            <View className="mt-4 flex-row items-center justify-center space-x-1">
                                <TouchableOpacity onPress={() => router.back()}>
                                    <Text className="font-semibold text-blue-600">
                                        Back to Sign In
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
