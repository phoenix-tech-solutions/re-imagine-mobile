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
                <title>RIR Mobile</title>
                <meta name="description" content="RIR Mobile App" />
                <link rel="icon" href="/favicon.png" />
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
