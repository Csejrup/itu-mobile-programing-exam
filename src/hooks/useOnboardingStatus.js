import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";
import { ONBOARDING_STORAGE_KEY } from "../data/onboardingSlides";

/**
 * GenAI disclosure (OpenAI): useOnboardingStatus hook.
 * Prompt: "Create a React hook that loads onboarding completion from AsyncStorage, exposes markOnboardingComplete and resetOnboarding for a demo app."
 * Outcome: Hook with hasCompletedOnboarding, isLoading, markOnboardingComplete, and resetOnboarding.
 * Integration: Used in AppNavigator for initial route; resetOnboarding is demo-only (Profile → Reset onboarding).
 * Reflection: Straightforward persistence layer; not required for production—only for prototyping and re-showing onboarding during development.
 */

export const useOnboardingStatus = () => {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(null);

  useEffect(() => {
    const loadOnboardingStatus = async () => {
      try {
        const value = await AsyncStorage.getItem(ONBOARDING_STORAGE_KEY);
        setHasCompletedOnboarding(value === "true");
      } catch {
        setHasCompletedOnboarding(false);
      }
    };

    loadOnboardingStatus();
  }, []);

  const markOnboardingComplete = useCallback(async () => {
    await AsyncStorage.setItem(ONBOARDING_STORAGE_KEY, "true");
    setHasCompletedOnboarding(true);
  }, []);

  const resetOnboarding = useCallback(async () => {
    await AsyncStorage.removeItem(ONBOARDING_STORAGE_KEY);
    setHasCompletedOnboarding(false);
  }, []);

  return {
    hasCompletedOnboarding,
    isLoading: hasCompletedOnboarding === null,
    markOnboardingComplete,
    resetOnboarding,
  };
};
