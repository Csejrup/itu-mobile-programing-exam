import { Ionicons } from "@expo/vector-icons";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useOnboardingActions } from "../context/OnboardingActionsContext";
import { COLORS } from "../styles/theme";

const SettingRow = ({ label, subtitle, onPress, accessibilityHint }) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => [
      styles.settingCard,
      pressed && styles.settingPressed,
    ]}
    accessibilityRole="button"
    accessibilityLabel={subtitle ? `${label}. ${subtitle}` : label}
    accessibilityHint={accessibilityHint}
  >
    <Text style={styles.settingLabel}>{label}</Text>
    {subtitle ? <Text style={styles.settingSubtitle}>{subtitle}</Text> : null}
  </Pressable>
);

const ProfileScreen = () => {
  const { showOnboardingAgain } = useOnboardingActions();

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.profileHeader}>
          <View
            style={styles.avatar}
            accessible={false}
            importantForAccessibility="no-hide-descendants"
          >
            <Ionicons name="musical-notes" size={46} color="#fff" />
          </View>
          <Text style={styles.userName} accessibilityRole="header">
            Music Lover
          </Text>
          <Text style={styles.userTier}>Premium Member</Text>
        </View>

        <View style={styles.statsRow}>
          <View
            style={styles.statCard}
            accessibilityLabel="Songs listened: 1337 songs"
          >
            <Ionicons name="musical-note" size={22} color={COLORS.accentTeal} />
            <Text style={styles.statValue}>1337</Text>
            <Text style={styles.statLabel}>Songs</Text>
          </View>
          <View
            style={styles.statCard}
            accessibilityLabel="Favorites count: 666 songs"
          >
            <Ionicons name="heart" size={22} color={COLORS.accentRed} />
            <Text style={styles.statValue}>666</Text>
            <Text style={styles.statLabel}>Favorites</Text>
          </View>
          <View
            style={styles.statCard}
            accessibilityLabel="Listening time: 420 hours"
          >
            <Ionicons name="time" size={22} color={COLORS.accentGold} />
            <Text style={styles.statValue}>420h</Text>
            <Text style={styles.statLabel}>Listened</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle} accessibilityRole="header">
          Top Artist This Month
        </Text>
        <View style={styles.topArtistCard}>
          <View style={styles.topArtistHeader}>
            <Ionicons name="trending-up" size={20} color={COLORS.accentTeal} />
            <View style={styles.topArtistTextWrap}>
              <Text style={styles.topArtistName}>Twenty One Pilots</Text>
              <Text style={styles.topArtistSub}>10 plays this month</Text>
            </View>
          </View>
          <View
            style={styles.progressTrack}
            accessibilityLabel="Top artist progress: 10 percent of monthly goal"
          >
            <View style={styles.progressFill} />
          </View>
        </View>

        <Text style={styles.sectionTitle} accessibilityRole="header">
          Settings
        </Text>
        <SettingRow
          label="Account Settings"
          subtitle="Manage your account"
          onPress={() =>
            Alert.alert(
              "Account Settings",
              "Account management is not implemented.",
            )
          }
          accessibilityHint="Opens account settings options"
        />
        <SettingRow
          label="Playback Quality"
          subtitle="High Quality • 320kbps"
          onPress={() =>
            Alert.alert(
              "Playback Quality",
              "Quality settings are not implemented.",
            )
          }
          accessibilityHint="Opens playback quality options"
        />
        <SettingRow
          label="Download Settings"
          subtitle="WiFi only"
          onPress={() =>
            Alert.alert(
              "Download Settings",
              "Download settings are not implemented.",
            )
          }
          accessibilityHint="Opens download settings options"
        />
        <SettingRow
          label="Reset onboarding"
          subtitle="Show the intro screens again"
          onPress={showOnboardingAgain}
          accessibilityHint="Clears onboarding progress and opens the first intro screen"
        />
      </ScrollView>
    </SafeAreaView>
  );
};
/**
 * GenAI disclosure (OpenAI): StyleSheet styles below.
 * Prompt: "Generate StyleSheet styles for ProfileScreen — avatar, stats row, top artist card, settings list for a dark music app."
 * Outcome: Draft StyleSheet (profile header, stat cards, progress track, setting cards).
 * Integration: Pasted into this file; stats and settings labels updated for accessibility; settings use View not Pressable.
 * Reflection: Generated structure was close to mockups; stat/progress accessibility labels were added manually.
 */
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  content: { paddingHorizontal: 24, paddingTop: 12, paddingBottom: 24 },
  profileHeader: { alignItems: "center", marginBottom: 28 },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
    backgroundColor: COLORS.accentTeal,
  },
  userName: { color: COLORS.textPrimary, fontSize: 28, fontWeight: "700" },
  userTier: { color: COLORS.textMuted, fontSize: 14, marginTop: 4 },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  statCard: {
    width: "31%",
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 10,
    alignItems: "center",
  },
  statValue: {
    color: COLORS.textPrimary,
    fontSize: 20,
    fontWeight: "700",
    marginTop: 6,
  },
  statLabel: { color: COLORS.textMuted, fontSize: 12, marginTop: 2 },
  sectionTitle: {
    color: COLORS.textPrimary,
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
    marginTop: 6,
  },
  topArtistCard: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 14,
    marginBottom: 18,
  },
  topArtistHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  topArtistTextWrap: { flex: 1 },
  topArtistName: { color: COLORS.textPrimary, fontWeight: "600", fontSize: 16 },
  topArtistSub: { color: COLORS.textMuted, marginTop: 2, fontSize: 13 },
  progressTrack: {
    width: "100%",
    height: 8,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.12)",
    overflow: "hidden",
  },
  progressFill: {
    width: "10%",
    height: "100%",
    backgroundColor: COLORS.accentTeal,
  },
  settingCard: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  settingPressed: { opacity: 0.75 },
  settingLabel: { color: COLORS.textPrimary, fontSize: 16, fontWeight: "600" },
  settingSubtitle: { color: COLORS.textMuted, fontSize: 13, marginTop: 4 },
});

export default ProfileScreen;
