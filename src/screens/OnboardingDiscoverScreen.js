import { ONBOARDING_SLIDES } from "../data/onboardingSlides";
import OnboardingSlideLayout from "../components/OnboardingSlideLayout";
import useCompleteOnboarding from "../hooks/useCompleteOnboarding";

const SLIDE = ONBOARDING_SLIDES[2];
const STEP_INDEX = 2;

const OnboardingDiscoverScreen = ({ navigation, onComplete }) => {
  const completeOnboarding = useCompleteOnboarding(navigation, onComplete);

  return (
    <OnboardingSlideLayout
      slide={SLIDE}
      stepIndex={STEP_INDEX}
      onContinue={completeOnboarding}
      onSkip={completeOnboarding}
      continueAccessibilityHint="Opens the main library"
    />
  );
};

export default OnboardingDiscoverScreen;
