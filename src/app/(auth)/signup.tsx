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

export default function SignupScreen() {
    const router = useRouter();
    const { theme } = useTheme();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({
        fullName: "",
        email: "",
        password: "",
    });

    const { signUp } = useAuth();

    const validateForm = () => {
        const newErrors = { fullName: "", email: "", password: "" };
        let isValid = true;

        if (!fullName) {
            newErrors.fullName = "Full name is required";
            isValid = false;
        }

        if (!email) {
            newErrors.email = "Email is required";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Email is invalid";
            isValid = false;
        }

        if (!password) {
            newErrors.password = "Password is required";
            isValid = false;
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSignup = async () => {
        if (!validateForm()) return;

        setLoading(true);
        const { error } = await signUp(email, password, fullName);

        if (error) {
            Alert.alert("Signup Error", error.message);
        } else {
            Alert.alert("Signup Successful", "You can now log in!");
            router.replace("/login");
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
                            <View className="mb-4 h-20 w-20 items-center justify-center rounded-full bg-yellow-500">
                                <Bot size={40} color="white" />
                            </View>
                            <Text className="text-center text-3xl font-bold text-gray-900 dark:text-gray-100">
                                Re-Imagine Robotics
                            </Text>
                            <Text className="mt-2 text-center text-lg text-gray-600 dark:text-gray-300">
                                Student Dashboard
                            </Text>
                        </View>

                        <View className="w-full rounded-lg bg-white p-6 dark:bg-neutral-900">
                            <Text className="mb-2 text-center text-2xl font-bold">
                                Create Account
                            </Text>
                            <Text className="mb-6 text-center text-gray-500 dark:text-gray-400">
                                Sign up to get started
                            </Text>
                            <View className="gap-y-4">
                                <View>
                                    <Text className="mb-2 font-medium">Full Name</Text>
                                    <TextInput
                                        className="rounded-lg border border-gray-300 p-3 text-gray-900 dark:border-gray-700 dark:text-gray-100"
                                        placeholder="Enter your full name"
                                        placeholderTextColor={
                                            theme === "dark" ? "#9CA3AF" : "#6B7280"
                                        }
                                        value={fullName}
                                        onChangeText={setFullName}
                                    />
                                    {errors.fullName ? (
                                        <Text className="mt-1 text-red-500">{errors.fullName}</Text>
                                    ) : null}
                                </View>
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
                                <View>
                                    <Text className="mb-2 font-medium">Password</Text>
                                    <TextInput
                                        className="rounded-lg border border-gray-300 p-3 text-gray-900 dark:border-gray-700 dark:text-gray-100"
                                        placeholder="Enter your password"
                                        placeholderTextColor={
                                            theme === "dark" ? "#9CA3AF" : "#6B7280"
                                        }
                                        value={password}
                                        onChangeText={setPassword}
                                        secureTextEntry
                                    />
                                    {errors.password ? (
                                        <Text className="mt-1 text-red-500">{errors.password}</Text>
                                    ) : null}
                                </View>
                            </View>
                            <TouchableOpacity
                                className="mt-6 w-full rounded-lg bg-blue-600 p-4"
                                onPress={handleSignup}
                                disabled={loading}>
                                <Text className="text-center font-semibold text-white">
                                    {loading ? "Signing Up..." : "Sign Up"}
                                </Text>
                            </TouchableOpacity>

                            <View className="mt-4 flex-row items-center justify-center space-x-1">
                                <Text className="mr-2 text-sm text-gray-500 dark:text-gray-400">
                                    Already have an account?
                                </Text>
                                <TouchableOpacity onPress={() => router.push("/login")}>
                                    <Text className="font-semibold text-blue-600">Sign In</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
