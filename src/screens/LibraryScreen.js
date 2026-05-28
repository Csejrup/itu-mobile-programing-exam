import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { songs } from "../data/songs";
import { COLORS } from "../styles/theme";

const LibrarySongRow = ({ song, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
      accessibilityLabel={`Open ${song.title} by ${song.artist}`}
      accessibilityRole="button"
      accessibilityHint="Opens the player screen for this song"
    >
      <Image
        source={{ uri: song.artwork }}
        style={styles.artwork}
        accessible={false}
        importantForAccessibility="no-hide-descendants"
      />
      <View style={styles.songMeta}>
        <Text style={styles.songTitle} numberOfLines={1}>
          {song.title}
        </Text>
        <Text style={styles.songArtist} numberOfLines={1}>
          {song.artist}
        </Text>
      </View>
      <Ionicons name="play" size={18} color={COLORS.textMuted} />
      <Text style={styles.songDuration}>{song.duration}</Text>
    </Pressable>
  );
};

const LibraryScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <FlatList
        data={songs}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.heading} accessibilityRole="header">
              Your Library
            </Text>
            <Text style={styles.subheading}>{songs.length} songs</Text>
          </View>
        }
        renderItem={({ item }) => (
          <LibrarySongRow
            song={item}
            onPress={() => navigation.navigate("Player", { songId: item.id })}
          />
        )}
      />
    </SafeAreaView>
  );
};

/**
 * GenAI disclosure (OpenAI): StyleSheet styles below.
 * Prompt: "Generate StyleSheet styles for LibraryScreen — dark music app song list (rows, artwork, typography) using COLORS from theme.js."
 * Outcome: Draft StyleSheet (safeArea, row layout, heading, song meta text styles).
 * Integration: Pasted into this file; tuned padding, pressed state, and accessibility-related structure.
 * Reflection: Speeds layout boilerplate; final spacing verified against Figma and on a simulator.
 */
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  listContent: { paddingHorizontal: 24, paddingTop: 12, paddingBottom: 24 },
  header: { marginBottom: 20 },
  heading: { color: COLORS.textPrimary, fontSize: 32, fontWeight: "700" },
  subheading: { color: COLORS.textMuted, fontSize: 14, marginTop: 4 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 10,
    borderRadius: 10,
    marginBottom: 6,
  },
  rowPressed: { backgroundColor: COLORS.card },
  artwork: { width: 56, height: 56, borderRadius: 8 },
  songMeta: { flex: 1 },
  songTitle: { color: COLORS.textPrimary, fontSize: 16, fontWeight: "500" },
  songArtist: { color: COLORS.textMuted, fontSize: 14, marginTop: 2 },
  songDuration: { color: COLORS.textMuted, fontSize: 12, minWidth: 36 },
});

export default LibraryScreen;
