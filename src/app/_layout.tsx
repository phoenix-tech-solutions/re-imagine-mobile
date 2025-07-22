import "~/global.css";
import { Slot } from "expo-router";
import Head from "expo-router/head";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "~/contexts/AuthContext";
import { ThemeProvider, useTheme } from "~/contexts/ThemeContext";

function RootLayout() {
    const { theme } = useTheme();
    return (
        <>
            <StatusBar style={theme === "dark" ? "light" : "dark"} />
            <Head>
                <title>Dashboard | Expo App</title>
                <meta
                    name="description"
                    content="High-performance dashboard built with Expo Router"
                />
            </Head>
            <Slot />
        </>
    );
}

export default function Layout() {
    return (
        <SafeAreaProvider>
            <AuthProvider>
                <ThemeProvider>
                    <RootLayout />
                </ThemeProvider>
            </AuthProvider>
        </SafeAreaProvider>
    );
}
