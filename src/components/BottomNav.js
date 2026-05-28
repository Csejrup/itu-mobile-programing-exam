import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../styles/theme";

/**
 * BottomNav — Figma component set "BottomNav"
 * Variants (Property 1): library | playlists | search | profile
 * Maps to Figma: Default | Variant2 | Variant3 | Variant4
 */

const TAB_ITEMS = [
  { routeName: "Library", label: "Library", icon: "library" },
  { routeName: "Search", label: "Search", icon: "search" },
  { routeName: "Playlists", label: "Playlists", icon: "musical-notes" },
  { routeName: "Profile", label: "Profile", icon: "person" },
];

/** @type {Record<string, string>} Figma Property 1 → active route */
export const BOTTOM_NAV_VARIANTS = {
  library: "Library",
  playlists: "Playlists",
  search: "Search",
  profile: "Profile",
};

const BottomNavTab = ({
  label,
  icon,
  isActive,
  onPress,
  onLongPress,
  accessibilityLabel,
  accessibilityHint,
}) => {
  const iconColor = isActive ? COLORS.textPrimary : COLORS.tabInactive;
  const labelStyle = isActive ? styles.labelActive : styles.labelInactive;

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={({ pressed }) => [styles.tab, pressed && styles.tabPressed]}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? `${label} tab`}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ selected: isActive }}
    >
      <Ionicons
        name={icon}
        size={24}
        color={iconColor}
        accessible={false}
        importantForAccessibility="no-hide-descendants"
      />
      <Text style={[styles.label, labelStyle]}>{label}</Text>
    </Pressable>
  );
};

/**
 * Standalone bar driven by a Figma variant (library | playlists | search | profile).
 */
export const BottomNavPreview = ({ variant = "library", onTabPress }) => {
  const activeRoute = BOTTOM_NAV_VARIANTS[variant] ?? "Library";

  return (
    <View style={styles.bar} accessibilityRole="tablist">
      {TAB_ITEMS.map((tab) => (
        <BottomNavTab
          key={tab.routeName}
          label={tab.label}
          icon={tab.icon}
          isActive={tab.routeName === activeRoute}
          onPress={() => onTabPress?.(tab.routeName)}
          accessibilityHint={
            tab.routeName === activeRoute
              ? `Currently on ${tab.label}`
              : `Switch to ${tab.label}`
          }
        />
      ))}
    </View>
  );
};

/**
 * React Navigation custom tab bar — active tab follows navigation state.
 */
const BottomNav = ({ state, descriptors, navigation, insets }) => {
  const bottomInset = insets?.bottom ?? 0;

  return (
    <View
      style={[styles.bar, { paddingBottom: bottomInset, height: 81 + bottomInset }]}
      accessibilityRole="tablist"
    >
      {state.routes.map((route, index) => {
        const tab = TAB_ITEMS.find((item) => item.routeName === route.name);
        if (!tab) {
          return null;
        }

        const isFocused = state.index === index;
        const { options } = descriptors[route.key];
        const accessibilityLabel =
          options.tabBarAccessibilityLabel ?? `${tab.label} tab`;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <BottomNavTab
            key={route.key}
            label={tab.label}
            icon={tab.icon}
            isActive={isFocused}
            onPress={onPress}
            onLongPress={onLongPress}
            accessibilityHint={
              isFocused
                ? `Currently on ${tab.label}`
                : options.tabBarAccessibilityHint ??
                  `Switch to ${tab.label}`
            }
            accessibilityLabel={accessibilityLabel}
          />
        );
      })}
    </View>
  );
};

/**
 * GenAI disclosure: No generative AI used for StyleSheet below.
 * Prompt: N/A — styles authored manually from Figma BottomNav (81px bar, #1a1a1a, active/inactive labels).
 * Outcome: Tab bar, tab item, pressed state, and active/inactive label typography.
 * Integration: Rendered as React Navigation custom tabBar; maps Figma Default / Variant2–4 to selected route.
 * Reflection: Safe-area bottom inset added in component; icon+label+font weight avoid color-only selected state.
 */
const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 81,
    paddingHorizontal: 24,
    paddingTop: 1,
    backgroundColor: "#1a1a1a",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "rgba(255,255,255,0.08)",
  },
  tab: {
    minWidth: 60,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  tabPressed: {
    opacity: 0.75,
  },
  label: {
    fontSize: 12,
    lineHeight: 16,
  },
  labelActive: {
    color: COLORS.textPrimary,
    fontWeight: "600",
  },
  labelInactive: {
    color: COLORS.tabInactive,
    fontWeight: "400",
  },
});

export default BottomNav;
