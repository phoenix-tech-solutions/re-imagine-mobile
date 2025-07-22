import * as React from "react";
import { Platform } from "react-native";

// Custom hook for consistent refresh control styling
export function useRefreshControlStyle(theme: "light" | "dark") {
    const baseProps = React.useMemo(() => {
        const isDark = theme === "dark";

        return {
            progressBackgroundColor: isDark ? "#1E293B" : "#F8FAFC",
            tintColor: isDark ? "#60A5FA" : "#3B82F6",
            titleColor: isDark ? "#F1F5F9" : "#1F2937",
            colors: isDark
                ? ["#60A5FA", "#34D399", "#A78BFA", "#FBBF24"]
                : ["#3B82F6", "#10B981", "#8B5CF6", "#F59E0B"],
            progressViewOffset: Platform.OS === "ios" ? 0 : 50,
        };
    }, [theme]);

    return baseProps;
}
