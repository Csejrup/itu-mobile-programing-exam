import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ONBOARDING_SLIDES } from "../data/onboardingSlides";
import { COLORS } from "../styles/theme";
import Button from "./Button";

const TOTAL_STEPS = ONBOARDING_SLIDES.length;

const OnboardingSlideLayout = ({
  slide,
  stepIndex,
  onContinue,
  onSkip,
  continueAccessibilityHint,
}) => {
  return (
    <LinearGradient
      colors={[slide.gradientTop, "#000000"]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
        <View style={styles.container}>
          <View style={styles.topRow}>
            {slide.showSkip ? (
              <Button
                variant="ghost"
                label="Skip"
                onPress={onSkip}
                accessibilityLabel="Skip onboarding"
                accessibilityHint="Opens the main library without viewing remaining steps"
              />
            ) : (
              <View style={styles.skipPlaceholder} />
            )}
          </View>

          <View style={styles.content}>
            <View
              style={[styles.iconContainer, { borderColor: slide.accentColor }]}
              accessible={false}
            >
              <Ionicons name={slide.icon} size={28} color={slide.accentColor} />
            </View>

            <Text style={[styles.stepLabel, { color: slide.accentColor }]}>
              {slide.stepLabel}
            </Text>

            <Text style={styles.title} accessibilityRole="header">
              {slide.title}
            </Text>

            <Text style={styles.body}>{slide.body}</Text>
          </View>

          <View style={styles.footer}>
            <View
              style={styles.pagination}
              accessibilityLabel={`Step ${stepIndex + 1} of ${TOTAL_STEPS}`}
            >
              {ONBOARDING_SLIDES.map((item, index) => (
                <View
                  key={item.stepLabel}
                  style={[
                    styles.paginationBar,
                    {
                      backgroundColor:
                        index === stepIndex
                          ? slide.accentColor
                          : "rgba(255,255,255,0.2)",
                    },
                  ]}
                />
              ))}
            </View>

            <Button
              variant="filled"
              label={slide.cta}
              backgroundColor={slide.accentColor}
              textColor={slide.ctaTextColor}
              showArrow
              onPress={onContinue}
              accessibilityLabel={slide.cta}
              accessibilityHint={continueAccessibilityHint}
            />
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

/**
 * GenAI disclosure (OpenAI): StyleSheet styles below.
 * Prompt: "Generate StyleSheet styles for OnboardingScreen - gradient full-screen intro with icon, pagination bars, skip and CTA button."
 * Outcome: Draft StyleSheet (container, icon container, pagination, typography).
 * Integration: Moved from OnboardingScreen into this shared layout when onboarding was split into three stack screens.
 * Reflection: AI captured the multi-step layout; step accent colors and spacing were checked against Figma onboarding frames.
 */
const styles = StyleSheet.create({
  gradient: { flex: 1 },
  safeArea: { flex: 1 },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    minHeight: 44,
    alignItems: "center",
  },
  skipPlaceholder: { minHeight: 44 },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingBottom: 48,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 16,
    borderWidth: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  stepLabel: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 12,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: 32,
    fontWeight: "700",
    lineHeight: 38,
    marginBottom: 16,
  },
  body: {
    color: COLORS.textMuted,
    fontSize: 16,
    lineHeight: 24,
    maxWidth: 340,
  },
  footer: {
    gap: 20,
  },
  pagination: {
    flexDirection: "row",
    gap: 8,
  },
  paginationBar: {
    width: 28,
    height: 4,
    borderRadius: 2,
  },
});

export default OnboardingSlideLayout;
