import { createContext, useContext } from "react";

/**
 * GenAI disclosure (OpenAI): OnboardingActionsContext.
 * Prompt: "Create a React context that exposes showOnboardingAgain so Profile can reset onboarding and navigate to the intro flow (demo only)."
 * Outcome: Context + useOnboardingActions hook with a default no-op showOnboardingAgain.
 * Integration: Provider in AppNavigator wires showOnboardingAgain to AsyncStorage clear + navigationRef.resetRoot; Profile screen consumes it for the Reset onboarding setting.
 * Reflection: Demo-only bridge between Profile and root navigation; avoids fragile getParent() calls from nested tabs.
 */

export const OnboardingActionsContext = createContext({
  showOnboardingAgain: async () => {},
});

export const useOnboardingActions = () => useContext(OnboardingActionsContext);
