import "~/global.css";
import { Slot } from "expo-router";
import Head from "expo-router/head";

import { AuthProvider } from "~/contexts/AuthContext";
import { StatusBar } from "expo-status-bar";

export default function Layout() {
    return (
        <>
            <StatusBar style="dark" />
            <AuthProvider>
                <Head>
                    <title>Dashboard | Expo App</title>
                    <meta
                        name="description"
                        content="High-performance dashboard built with Expo Router"
                    />
                </Head>
                <Slot />
            </AuthProvider>
        </>
    );
}
