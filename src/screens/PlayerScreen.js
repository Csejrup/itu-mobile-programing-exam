import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PlayButton from "../components/PlayButton";
import { songs } from "../data/songs";
import { COLORS } from "../styles/theme";

const PlayerScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const routeSongId = route.params?.songId;

  // INITIAL INDEX
  const initialIndex = useMemo(
    () => songs.findIndex((song) => song.id === routeSongId),
    [routeSongId],
  );
  const [currentSongIndex, setCurrentSongIndex] = useState(
    initialIndex >= 0 ? initialIndex : 0,
  );

  // LOCAL STATE
  const [isLiked, setIsLiked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (initialIndex >= 0) {
      setCurrentSongIndex(initialIndex);
    }
  }, [initialIndex]);

  const song = songs[currentSongIndex];

  // HANDLERS
  const handlePrevious = () => {
    setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length);
  };

  const handleNext = () => {
    setCurrentSongIndex((prev) => (prev + 1) % songs.length);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.iconBtn}
            accessibilityRole="button"
            accessibilityLabel="Close player"
            accessibilityHint="Returns to the previous screen"
          >
            <Ionicons name="chevron-down" size={24} color="#fff" />
          </Pressable>
          <Text style={styles.nowPlaying} accessibilityRole="header">
            Now Playing
          </Text>
          <Pressable
            onPress={() =>
              Alert.alert(
                "More options",
                "Share, queue, and other actions are not implemented",
              )
            }
            style={styles.iconBtn}
            accessibilityRole="button"
            accessibilityLabel="More options"
            accessibilityHint="Shows additional player actions"
          >
            <Ionicons name="ellipsis-horizontal" size={22} color="#fff" />
          </Pressable>
        </View>

        <View style={styles.artWrap}>
          <Image
            source={{ uri: song.artwork }}
            style={styles.artwork}
            accessibilityLabel={`${song.title} album artwork`}
          />
        </View>

        <View style={styles.meta}>
          <View style={{ flex: 1 }}>
            <Text style={styles.title} numberOfLines={1}>
              {song.title}
            </Text>
            <Text style={styles.artist} numberOfLines={1}>
              {song.artist}
            </Text>
            <Text style={styles.album} numberOfLines={1}>
              {song.album}
            </Text>
          </View>
          <Pressable
            onPress={() => setIsLiked((prev) => !prev)}
            style={styles.iconBtn}
            accessibilityRole="button"
            accessibilityLabel={
              isLiked ? "Remove from favorites" : "Add to favorites"
            }
            accessibilityHint="Toggles favorite status for this song"
          >
            <Ionicons
              name={isLiked ? "heart" : "heart-outline"}
              size={24}
              color={isLiked ? COLORS.accentRed : COLORS.textMuted}
            />
          </Pressable>
        </View>

        <View style={styles.progressSection}>
          <View style={styles.track}>
            <View
              style={[
                styles.trackFill,
                { backgroundColor: song.color, width: "40%" },
              ]}
              accessibilityLabel="Playback progress: 40 percent"
            />
          </View>
          <View style={styles.timeRow}>
            <Text style={styles.timeText}>{song.currentTime || "0:00"}</Text>
            <Text style={styles.timeText}>{song.duration}</Text>
          </View>
        </View>

        <View style={styles.controls}>
          <Pressable
            onPress={handlePrevious}
            style={styles.secondaryControl}
            accessibilityRole="button"
            accessibilityLabel="Previous song"
            accessibilityHint="Plays the previous song in the list"
          >
            <Ionicons name="play-skip-back" size={26} color="#fff" />
          </Pressable>
          <PlayButton
            variant={isPlaying ? "pause" : "play"}
            backgroundColor={song.color}
            onPress={() => setIsPlaying((prev) => !prev)}
          />
          <Pressable
            onPress={handleNext}
            style={styles.secondaryControl}
            accessibilityRole="button"
            accessibilityLabel="Next song"
            accessibilityHint="Plays the next song in the list"
          >
            <Ionicons name="play-skip-forward" size={26} color="#fff" />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

/**
 * GenAI disclosure (OpenAI): StyleSheet styles below.
 * Prompt: "Generate StyleSheet styles for PlayerScreen — full-screen player, artwork, progress bar, transport controls for a dark music app."
 * Outcome: Draft StyleSheet (header, artwork, meta, track, controls, play button).
 * Integration: Pasted into this file; nowPlaying label uses textMuted; dynamic song.color kept for play/progress accents.
 * Reflection: Core player layout from AI; control accessibility hints and contrast were verified manually.
 */
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 20,
  },
  notFound: { flex: 1, alignItems: "center", justifyContent: "center" },
  notFoundText: { color: COLORS.textPrimary, fontSize: 18 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  nowPlaying: {
    color: COLORS.textMuted,
    fontSize: 14,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  artWrap: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 20,
  },
  artwork: { width: "100%", height: "100%" },
  meta: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  title: { color: COLORS.textPrimary, fontSize: 26, fontWeight: "600" },
  artist: { color: COLORS.textSecondary, marginTop: 3, fontSize: 16 },
  album: { color: COLORS.textMuted, marginTop: 3, fontSize: 14 },
  progressSection: { marginBottom: 22 },
  track: {
    height: 4,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.2)",
    overflow: "hidden",
    marginBottom: 8,
  },
  trackFill: { height: "100%", borderRadius: 999 },
  timeRow: { flexDirection: "row", justifyContent: "space-between" },
  timeText: { color: COLORS.textMuted, fontSize: 12 },
  controls: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 32,
  },
  secondaryControl: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default PlayerScreen;
