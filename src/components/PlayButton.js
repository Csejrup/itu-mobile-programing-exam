import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";

/**
 * PlayButton — Figma component set "Play Button"
 * Variants: play | pause (1:1 with Figma State property)
 */
const VARIANTS = {
  play: {
    icon: "play",
    accessibilityLabel: "Play song",
  },
  pause: {
    icon: "pause",
    accessibilityLabel: "Pause song",
  },
};

const PlayButton = ({
  variant = "play",
  backgroundColor,
  onPress,
  accessibilityHint = "Toggles playback state",
}) => {
  const config = VARIANTS[variant] ?? VARIANTS.play;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={[styles.button, { backgroundColor }]}
      accessibilityRole="button"
      accessibilityLabel={config.accessibilityLabel}
      accessibilityHint={accessibilityHint}
    >
      <Ionicons
        name={config.icon}
        size={30}
        color="#ffffff"
        accessible={false}
        importantForAccessibility="no-hide-descendants"
      />
    </TouchableOpacity>
  );
};

/**
 * GenAI disclosure: No generative AI used for StyleSheet below.
 * Prompt: N/A — styles authored manually to match Figma PlayButton (64×64 circle).
 * Outcome: Single button container style (size, border radius, centering).
 * Integration: play | pause variants use Ionicons only; backgroundColor set from song accent on Player.
 * Reflection: Small surface area; verified against Figma component set 43:115.
 */
const styles = StyleSheet.create({
  button: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default PlayButton;
