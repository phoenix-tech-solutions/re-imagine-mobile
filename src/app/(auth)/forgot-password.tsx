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
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView
                className="flex-1 bg-white dark:bg-black"
                contentContainerClassName="flex-grow"
            >
                <View className="flex-1 justify-center items-center p-6">
                    <View className="w-full max-w-sm mb-8">
                        <View className="items-center mb-8">
                            <View className="w-20 h-20 bg-blue-600 rounded-full items-center justify-center mb-4">
                                <Bot size={40} color="white" />
                            </View>
                            <Text className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100">
                                Re-Imagine Robotics
                            </Text>
                            <Text className="text-lg text-center text-gray-600 dark:text-gray-300 mt-2">
                                Student Dashboard
                            </Text>
                        </View>

                        <View className="w-full bg-white dark:bg-neutral-900 shadow shadow-blue-500 p-6 rounded-lg">
                            <Text className="text-2xl font-bold text-center mb-2">
                                Forgot Password
                            </Text>
                            <Text className="text-center text-gray-500 dark:text-gray-400 mb-6">
                                Enter your email to reset your password
                            </Text>
                            <View className="gap-y-4">
                                <View>
                                    <Text className="mb-2 font-medium">
                                        Email
                                    </Text>
                                    <TextInput
                                        className="border border-gray-300 dark:border-gray-700 p-3 rounded-lg text-gray-900 dark:text-gray-100"
                                        placeholder="Enter your email"
                                        placeholderTextColor={theme === "dark" ? "#9CA3AF" : "#6B7280"}
                                        value={email}
                                        onChangeText={setEmail}
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                    />
                                    {errors.email ? (
                                        <Text className="text-red-500 mt-1">
                                            {errors.email}
                                        </Text>
                                    ) : null}
                                </View>
                            </View>
                            <TouchableOpacity
                                className="w-full bg-blue-600 p-4 rounded-lg mt-6"
                                onPress={handleResetPassword}
                                disabled={loading}
                            >
                                <Text className="text-white font-semibold text-center">
                                    {loading ? "Sending..." : "Send Reset Link"}
                                </Text>
                            </TouchableOpacity>

                            <View className="flex-row items-center justify-center space-x-1 mt-4">
                                <TouchableOpacity
                                    onPress={() => router.back()}
                                >
                                    <Text className="text-blue-600 font-semibold">
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