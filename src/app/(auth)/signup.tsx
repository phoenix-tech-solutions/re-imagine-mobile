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
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView
                className="flex-1 bg-white dark:bg-black"
                contentContainerClassName="flex-grow"
            >
                <View className="flex-1 justify-center items-center p-6">
                    <View className="w-full max-w-sm mb-8">
                        <View className="items-center mb-8">
                            <View className="w-20 h-20 bg-yellow-500 rounded-full items-center justify-center mb-4">
                                <Bot size={40} color="white" />
                            </View>
                            <Text className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100">
                                Re-Imagine Robotics
                            </Text>
                            <Text className="text-lg text-center text-gray-600 dark:text-gray-300 mt-2">
                                Student Dashboard
                            </Text>
                        </View>

                        <View className="w-full bg-white dark:bg-neutral-900 p-6 rounded-lg">
                            <Text className="text-2xl font-bold text-center mb-2">
                                Create Account
                            </Text>
                            <Text className="text-center text-gray-500 dark:text-gray-400 mb-6">
                                Sign up to get started
                            </Text>
                            <View className="gap-y-4">
                                <View>
                                    <Text className="mb-2 font-medium">
                                        Full Name
                                    </Text>
                                    <TextInput
                                        className="border border-gray-300 dark:border-gray-700 p-3 rounded-lg text-gray-900 dark:text-gray-100"
                                        placeholder="Enter your full name"
                                        placeholderTextColor={theme === "dark" ? "#9CA3AF" : "#6B7280"}
                                        value={fullName}
                                        onChangeText={setFullName}
                                    />
                                    {errors.fullName ? (
                                        <Text className="text-red-500 mt-1">
                                            {errors.fullName}
                                        </Text>
                                    ) : null}
                                </View>
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
                                <View>
                                    <Text className="mb-2 font-medium">
                                        Password
                                    </Text>
                                    <TextInput
                                        className="border border-gray-300 dark:border-gray-700 p-3 rounded-lg text-gray-900 dark:text-gray-100"
                                        placeholder="Enter your password"
                                        placeholderTextColor={theme === "dark" ? "#9CA3AF" : "#6B7280"}
                                        value={password}
                                        onChangeText={setPassword}
                                        secureTextEntry
                                    />
                                    {errors.password ? (
                                        <Text className="text-red-500 mt-1">
                                            {errors.password}
                                        </Text>
                                    ) : null}
                                </View>
                            </View>
                            <TouchableOpacity
                                className="w-full bg-blue-600 p-4 rounded-lg mt-6"
                                onPress={handleSignup}
                                disabled={loading}
                            >
                                <Text className="text-white font-semibold text-center">
                                    {loading ? "Signing Up..." : "Sign Up"}
                                </Text>
                            </TouchableOpacity>

                            <View className="flex-row items-center justify-center space-x-1 mt-4">
                                <Text className="text-sm text-gray-500 dark:text-gray-400 mr-2">
                                    Already have an account?
                                </Text>
                                <TouchableOpacity
                                    onPress={() => router.push("/login")}
                                >
                                    <Text className="text-blue-600 font-semibold">
                                        Sign In
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
