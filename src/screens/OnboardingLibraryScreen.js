import { ONBOARDING_SLIDES } from "../data/onboardingSlides";
import OnboardingSlideLayout from "../components/OnboardingSlideLayout";
import useCompleteOnboarding from "../hooks/useCompleteOnboarding";

const SLIDE = ONBOARDING_SLIDES[0];
const STEP_INDEX = 0;

const OnboardingLibraryScreen = ({ navigation, onComplete }) => {
  const completeOnboarding = useCompleteOnboarding(navigation, onComplete);

  const handleContinue = () => {
    navigation.navigate("OnboardingNowPlaying");
  };

  return (
    <OnboardingSlideLayout
      slide={SLIDE}
      stepIndex={STEP_INDEX}
      onContinue={handleContinue}
      onSkip={completeOnboarding}
      continueAccessibilityHint="Shows the next onboarding step"
    />
  );
};

export default OnboardingLibraryScreen;
