import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useMemo, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/Button";
import { songs } from "../data/songs";
import { COLORS } from "../styles/theme";

const SearchScreen = () => {
  const navigation = useNavigation();
  const [query, setQuery] = useState("");

  // MEMOIZED FILTERED SONGS
  const filteredSongs = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      return [];
    }
    return songs.filter(
      (song) =>
        song.title.toLowerCase().includes(trimmed) ||
        song.artist.toLowerCase().includes(trimmed) ||
        song.album.toLowerCase().includes(trimmed),
    );
  }, [query]);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <View style={styles.container}>
        <Text style={styles.heading} accessibilityRole="header">
          Search
        </Text>

        <View style={styles.searchBox}>
          <Ionicons name="search" size={18} color={COLORS.textMuted} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Songs, artists, or albums"
            placeholderTextColor={COLORS.textMuted}
            style={styles.input}
            accessibilityRole="text"
            accessibilityLabel="Search songs, artists, or albums"
            accessibilityHint="Type to filter songs and open a result"
          />
        </View>

        {!query.trim() ? (
          <View style={styles.centerState}>
            <View accessible={false} importantForAccessibility="no-hide-descendants">
              <Ionicons name="search" size={56} color="rgba(255,255,255,0.2)" />
            </View>
            <Text style={styles.stateText}>
              Search for songs, artists, or albums
            </Text>
            <Button
              variant="filled"
              label="Open library"
              backgroundColor={COLORS.accentTeal}
              textColor="#000000"
              onPress={() => navigation.navigate("Library")}
              style={styles.emptyCta}
              accessibilityHint="Opens the library tab to browse songs"
            />
          </View>
        ) : (
          <FlatList
            data={filteredSongs}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={
              <Text style={styles.resultCount}>
                {filteredSongs.length} result
                {filteredSongs.length !== 1 ? "s" : ""}
              </Text>
            }
            ListEmptyComponent={
              <View style={styles.centerState}>
                <Text style={styles.stateText}>
                  No results found for "{query}"
                </Text>
              </View>
            }
            renderItem={({ item }) => (
              <Pressable
                style={({ pressed }) => [
                  styles.row,
                  pressed && styles.rowPressed,
                ]}
                onPress={() =>
                  navigation.navigate("Player", { songId: item.id })
                } // pass id to player screen
                accessibilityRole="button"
                accessibilityLabel={`Open ${item.title} by ${item.artist}`}
                accessibilityHint="Opens the player screen for this song"
              >
                <Image
                  source={{ uri: item.artwork }}
                  style={styles.artwork}
                  accessible={false}
                  importantForAccessibility="no-hide-descendants"
                />
                <View style={styles.songMeta}>
                  <Text style={styles.songTitle} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text style={styles.songArtist} numberOfLines={1}>
                    {item.artist}
                  </Text>
                </View>
                <Text style={styles.songDuration}>{item.duration}</Text>
              </Pressable>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

/**
 * GenAI disclosure (OpenAI): StyleSheet styles below.
 * Prompt: "Generate StyleSheet styles for SearchScreen — search field, empty state, result rows for a dark music app using COLORS."
 * Outcome: Draft StyleSheet (searchBox, input, centerState, result list row styles).
 * Integration: Pasted into this file; placeholder/icon colors switched to textMuted for contrast.
 * Reflection: Useful baseline; empty-state and list layouts were refined after testing VoiceOver and layout.
 */
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  container: { flex: 1, paddingHorizontal: 24, paddingTop: 12 },
  heading: {
    color: COLORS.textPrimary,
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 20,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 18,
  },
  input: {
    flex: 1,
    color: COLORS.textPrimary,
    paddingVertical: 12,
    fontSize: 16,
  },
  resultCount: { color: COLORS.textMuted, marginBottom: 10, fontSize: 14 },
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
  songDuration: { color: COLORS.textMuted, fontSize: 12 },
  centerState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 48,
    gap: 10,
    paddingHorizontal: 24,
  },
  emptyCta: {
    marginTop: 8,
    maxWidth: 280,
  },
  stateText: { color: COLORS.textMuted, fontSize: 15, textAlign: "center" },
});

export default SearchScreen;
