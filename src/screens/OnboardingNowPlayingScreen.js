import { ONBOARDING_SLIDES } from "../data/onboardingSlides";
import OnboardingSlideLayout from "../components/OnboardingSlideLayout";
import useCompleteOnboarding from "../hooks/useCompleteOnboarding";

const SLIDE = ONBOARDING_SLIDES[1];
const STEP_INDEX = 1;

const OnboardingNowPlayingScreen = ({ navigation, onComplete }) => {
  const completeOnboarding = useCompleteOnboarding(navigation, onComplete);

  const handleContinue = () => {
    navigation.navigate("OnboardingDiscover");
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

export default OnboardingNowPlayingScreen;
