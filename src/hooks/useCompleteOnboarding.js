import { useCallback } from "react";

const useCompleteOnboarding = (navigation, onComplete) => {
  return useCallback(async () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "MainTabs" }],
    });
    await onComplete();
  }, [navigation, onComplete]);
};

export default useCompleteOnboarding;
