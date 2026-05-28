import { Ionicons } from "@expo/vector-icons";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { playlists } from "../data/songs";
import { COLORS } from "../styles/theme";

const PlaylistsScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <FlatList
        data={playlists}
        numColumns={2}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={styles.column}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.heading} accessibilityRole="header">
              Playlists
            </Text>
            <Text style={styles.subheading}>{playlists.length} playlists</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View
            style={styles.card}
            accessible
            accessibilityLabel={`${item.name} playlist, ${item.description}, ${item.songCount} songs`}
          >
            <View style={styles.imageWrap}>
              <Image
                source={{ uri: item.artwork }}
                style={styles.image}
                accessible={false}
                importantForAccessibility="no-hide-descendants"
              />
              <View
                style={[styles.iconBadge, { backgroundColor: item.color }]}
                accessibilityLabel={`${item.name} playlist badge`}
              >
                <Ionicons name="musical-notes" size={16} color="#fff" />
              </View>
            </View>
            <Text style={styles.name} numberOfLines={1}>
              {item.name}
            </Text>
            <Text style={styles.desc} numberOfLines={1}>
              {item.description}
            </Text>
            <Text style={styles.count}>{item.songCount} songs</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

/**
 * GenAI disclosure (OpenAI): StyleSheet styles below.
 * Prompt: "Generate StyleSheet styles for PlaylistsScreen — two-column playlist cards with image, badge, and text for a dark music app."
 * Outcome: Draft StyleSheet (card grid, image wrap, icon badge, title/description styles).
 * Integration: Pasted into this file; card width and badge position adjusted to match Figma.
 * Reflection: AI layout matched the design quickly; non-interactive cards were kept as Views for accessibility.
 */
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  content: { paddingHorizontal: 24, paddingTop: 12, paddingBottom: 24 },
  header: { marginBottom: 20 },
  heading: { color: COLORS.textPrimary, fontSize: 32, fontWeight: "700" },
  subheading: { color: COLORS.textMuted, fontSize: 14, marginTop: 4 },
  column: { justifyContent: "space-between" },
  card: {
    width: "48%",
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
  },
  imageWrap: { position: "relative", marginBottom: 10 },
  image: { width: "100%", aspectRatio: 1, borderRadius: 10 },
  iconBadge: {
    position: "absolute",
    bottom: 6,
    right: 6,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  name: { color: COLORS.textPrimary, fontSize: 16, fontWeight: "600" },
  desc: { color: COLORS.textMuted, fontSize: 12, marginTop: 2 },
  count: { color: COLORS.textMuted, fontSize: 12, marginTop: 4 },
});

export default PlaylistsScreen;
