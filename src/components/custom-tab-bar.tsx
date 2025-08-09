import React from "react";
import { BottomTabBar } from "@react-navigation/bottom-tabs";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function CustomTabBar(props: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  return (
    <BottomTabBar
      {...props}
      style={[
        // @ts-expect-error - style exists at runtime
        props.style,
        {
          paddingBottom: Math.max(insets.bottom, 8),
          paddingTop: 6,
        },
      ]}
    />
  );
}


