import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useCallback } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { OnboardingActionsContext } from "../context/OnboardingActionsContext";
import { useOnboardingStatus } from "../hooks/useOnboardingStatus";
import LibraryScreen from "../screens/LibraryScreen";
import OnboardingDiscoverScreen from "../screens/OnboardingDiscoverScreen";
import OnboardingLibraryScreen from "../screens/OnboardingLibraryScreen";
import OnboardingNowPlayingScreen from "../screens/OnboardingNowPlayingScreen";
import PlayerScreen from "../screens/PlayerScreen";
import PlaylistsScreen from "../screens/PlaylistsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SearchScreen from "../screens/SearchScreen";
import { getTabScreenOptions, renderBottomNav } from "../styles/tabBar";
import { COLORS } from "../styles/theme";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={getTabScreenOptions}
      tabBar={renderBottomNav}
    >
      <Tab.Screen
        name="Library"
        component={LibraryScreen}
        options={{ tabBarAccessibilityLabel: "Library tab" }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{ tabBarAccessibilityLabel: "Search tab" }}
      />
      <Tab.Screen
        name="Playlists"
        component={PlaylistsScreen}
        options={{ tabBarAccessibilityLabel: "Playlists tab" }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarAccessibilityLabel: "Profile tab" }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = ({ navigationRef }) => {
  const {
    hasCompletedOnboarding,
    isLoading,
    markOnboardingComplete,
    resetOnboarding,
  } = useOnboardingStatus();

  const showOnboardingAgain = useCallback(async () => {
    await resetOnboarding();
    if (navigationRef.isReady()) {
      navigationRef.resetRoot({
        index: 0,
        routes: [{ name: "OnboardingLibrary" }],
      });
    }
  }, [navigationRef, resetOnboarding]);

  if (isLoading) {
    return (
      <View style={styles.loading} accessible accessibilityLabel="Loading app">
        <ActivityIndicator
          size="large"
          color={COLORS.accentTeal}
          accessible={false}
        />
      </View>
    );
  }

  const initialRouteName = hasCompletedOnboarding
    ? "MainTabs"
    : "OnboardingLibrary";

  return (
    <OnboardingActionsContext.Provider value={{ showOnboardingAgain }}>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={initialRouteName}
      >
        <Stack.Screen name="OnboardingLibrary">
          {(props) => (
            <OnboardingLibraryScreen
              {...props}
              onComplete={markOnboardingComplete}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="OnboardingNowPlaying">
          {(props) => (
            <OnboardingNowPlayingScreen
              {...props}
              onComplete={markOnboardingComplete}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="OnboardingDiscover">
          {(props) => (
            <OnboardingDiscoverScreen
              {...props}
              onComplete={markOnboardingComplete}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="Player" component={PlayerScreen} />
      </Stack.Navigator>
    </OnboardingActionsContext.Provider>
  );
};

/**
 * GenAI disclosure (OpenAI): StyleSheet styles below.
 * Prompt: "Minimal loading screen StyleSheet — centered spinner on COLORS.background."
 * Outcome: Single loading style object.
 * Integration: Used with accessibilityLabel on loading View (added manually, not from AI).
 * Reflection: Trivial generated style; accessibility label was my own addition.
 */
const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.background,
  },
});

export default AppNavigator;
