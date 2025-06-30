import { registerRootComponent } from "expo";
import { ExpoRoot } from "expo-router";
import { NativeWindStyleSheet } from "nativewind";

// https://docs.expo.dev/router/reference/troubleshooting/#expo_router_app_root-not-defined

NativeWindStyleSheet.setOutput({
  default: "native",
});

// Must be exported or Fast Refresh won't update the context
export function App() {
  const ctx = require.context("./app");
  return <ExpoRoot context={ctx} />;
}

registerRootComponent(App);
