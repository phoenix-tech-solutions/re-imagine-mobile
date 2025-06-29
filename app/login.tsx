import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";
import { router } from "expo-router";
import { useAuth } from "~/contexts/AuthContext";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Text } from "~/components/ui/text";
import { MaterialIcons } from "@expo/vector-icons";

export default function LoginScreen() {
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
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 justify-center items-center p-6 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
          <View className="w-full max-w-sm mb-8">
            <View className="items-center mb-8">
              <View className="w-20 h-20 bg-blue-600 rounded-full items-center justify-center mb-4">
                <MaterialIcons
                  name="precision-manufacturing"
                  size={40}
                  color="white"
                />
              </View>
              <Text className="text-3xl font-bold text-center text-gray-900 dark:text-white">
                Re-Imagine Robotics
              </Text>
              <Text className="text-lg text-center text-gray-600 dark:text-gray-300 mt-2">
                Student Dashboard
              </Text>
            </View>

            <Card className="w-full shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-center">
                  Welcome Back
                </CardTitle>
                <CardDescription className="text-center">
                  Sign in to your student account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  label="Email"
                  placeholder="Enter your email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  error={errors.email}
                />
                <Input
                  label="Password"
                  placeholder="Enter your password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  error={errors.password}
                />
              </CardContent>
              <CardFooter className="flex-col space-y-4">
                <Button
                  className="w-full"
                  onPress={handleLogin}
                  disabled={loading}
                >
                  <Text className="text-white font-semibold">
                    {loading ? "Signing In..." : "Sign In"}
                  </Text>
                </Button>

                <View className="flex-row items-center justify-center space-x-1">
                  <Text className="text-sm text-muted-foreground">
                    Don't have an account?
                  </Text>
                  <Button
                    variant="ghost"
                    size="sm"
                    onPress={() => router.push("/signup")}
                  >
                    <Text className="text-blue-600 font-semibold">Sign Up</Text>
                  </Button>
                </View>
              </CardFooter>
            </Card>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
