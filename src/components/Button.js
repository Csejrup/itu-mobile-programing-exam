import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../styles/theme";

/**
 * Button — Figma "Primary Button" component set
 * Variants: filled | ghost
 */

/**
 * GenAI disclosure: No generative AI used for StyleSheet below.
 * Prompt: N/A — styles authored manually to match Figma PrimaryButton (filled | ghost).
 * Outcome: StyleSheet for pill CTA, ghost skip, label, and pressed opacity.
 * Integration: VARIANTS map and Pressable wiring written by hand; used on onboarding and Search.
 * Reflection: Dynamic backgroundColor and textColor come from slide/search props, not from AI output.
 */
const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  filled: {
    borderRadius: 999,
    paddingVertical: 16,
    width: "100%",
  },
  ghost: {
    paddingVertical: 8,
    paddingHorizontal: 4,
    alignSelf: "flex-end",
  },
  labelBlock: {
    flexShrink: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
  },
  labelCentered: {
    textAlign: "center",
  },
  pressed: {
    opacity: 0.75,
  },
});

const VARIANTS = {
  filled: {
    container: styles.filled,
    labelColor: (textColor) => textColor,
    labelText: styles.labelCentered,
    allowArrow: true,
  },
  ghost: {
    container: styles.ghost,
    labelColor: () => COLORS.textMuted,
    labelText: null,
    allowArrow: false,
  },
};

const Button = ({
  variant = "filled",
  label,
  onPress,
  backgroundColor,
  textColor = "#000000",
  showArrow = false,
  accessibilityLabel,
  accessibilityHint,
  style,
}) => {
  const config = VARIANTS[variant] ?? VARIANTS.filled;
  const labelColor = config.labelColor(textColor);
  const shouldShowArrow = config.allowArrow && showArrow;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        config.container,
        variant === "filled" && backgroundColor ? { backgroundColor } : null,
        pressed && styles.pressed,
        style,
      ]}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityHint={accessibilityHint}
    >
      <View style={styles.labelBlock}>
        <Text style={[styles.label, { color: labelColor }, config.labelText]}>
          {label}
        </Text>
      </View>
      {shouldShowArrow ? (
        <Ionicons
          name="arrow-forward"
          size={18}
          color={labelColor}
          accessible={false}
          importantForAccessibility="no-hide-descendants"
        />
      ) : null}
    </Pressable>
  );
};

export default Button;
