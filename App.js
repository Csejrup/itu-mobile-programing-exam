import {
  DefaultTheme,
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigator from "./src/navigation/AppNavigator";
import { COLORS } from "./src/styles/theme";

/**
 * GenAI disclosure (OpenAI): React Navigation theme (inline styling).
 * Prompt: "Suggest React Navigation DefaultTheme color overrides for dark music app matching background #121212."
 * Outcome: navigationTheme object (background, card, text, border colors).
 * Integration: Wired into NavigationContainer; card/border hex values kept in sync with tab bar from AppNavigator.
 * Reflection: Quick theme pass; verified visually with all screens in the navigator.
 */
const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: COLORS.background,
    card: "#171717",
    text: COLORS.textPrimary,
    border: "rgba(255,255,255,0.08)",
  },
};

export default function App() {
  const navigationRef = useNavigationContainerRef();

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <NavigationContainer ref={navigationRef} theme={navigationTheme}>
        <AppNavigator navigationRef={navigationRef} />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
