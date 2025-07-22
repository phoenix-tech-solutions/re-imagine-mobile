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
import { useAuth } from "~/contexts/AuthContext";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  const { signIn } = useAuth();

  const validateForm = () => {
    const newErrors = { email: "", password: "" };
    let isValid = true;

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

  const handleLogin = async () => {
    if (!validateForm()) return;

    setLoading(true);
    const { error } = await signIn(email, password);

    if (error) {
      Alert.alert("Login Error", error.message);
    }
    setLoading(false);
    router.replace("Dashboard");
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerClassName="flex-grow">
        <View className="flex-1 justify-center items-center p-6 bg-gray-50">
          <View className="w-full max-w-sm mb-8">
            <View className="items-center mb-8">
              <View className="w-20 h-20 bg-blue-600 rounded-full items-center justify-center mb-4">
                <MaterialIcons
                  name="precision-manufacturing"
                  size={40}
                  color="white"
                />
              </View>
              <Text className="text-3xl font-bold text-center text-gray-900">
                Re-Imagine Robotics
              </Text>
              <Text className="text-lg text-center text-gray-600 mt-2">
                Student Dashboard
              </Text>
            </View>

            <View className="w-full bg-white shadow shadow-blue-500 p-6 rounded-lg">
              <Text className="text-2xl font-bold text-center mb-2">
                Welcome Back
              </Text>
              <Text className="text-center text-gray-500 mb-6">
                Sign in to your student account
              </Text>
              <View className="gap-y-4">
                <View>
                  <Text className="mb-2 font-medium">Email</Text>
                  <TextInput
                    className="border border-gray-300 p-3 rounded-lg"
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  {errors.email ? (
                    <Text className="text-red-500 mt-1">{errors.email}</Text>
                  ) : null}
                </View>
                <View>
                  <Text className="mb-2 font-medium">Password</Text>
                  <TextInput
                    className="border border-gray-300 p-3 rounded-lg"
                    placeholder="Enter your password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                  />
                  {errors.password ? (
                    <Text className="text-red-500 mt-1">{errors.password}</Text>
                  ) : null}
                </View>
              </View>
              <TouchableOpacity
                className="w-full bg-blue-600 p-4 rounded-lg mt-6"
                onPress={handleLogin}
                disabled={loading}
              >
                <Text className="text-white font-semibold text-center">
                  {loading ? "Signing In..." : "Sign In"}
                </Text>
              </TouchableOpacity>

              <View className="flex-row items-center justify-center space-x-1 mt-4">
                <Text className="text-sm text-gray-500">
                  Don't have an account?
                </Text>
                <TouchableOpacity onPress={() => router.push("Signup")}>
                  <Text className="text-blue-600 font-semibold">Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}