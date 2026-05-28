/**
 * GenAI disclosure (OpenAI): mock data (not StyleSheet — used for UI content and per-song accent colors).
 * Prompt: "Generate 8 Twenty One Pilots songs and 4 playlists with title, artist, album, artwork URL, duration, currentTime, color; playlists with name, description, artwork, color, songCount. Output JSON arrays."
 * Outcome: Draft songs[] and playlists[] with placeholder artwork URLs and hex accent colors.
 * Integration: Saved as src/data/songs.js; ids, copy, and artwork URLs edited to match app needs and PlayerScreen behavior.
 * Reflection: Fast mock data; I verified navigation (songId → Player) and list rendering manually — not submitted without review.
 */
export const songs = [
  {
    id: "1",
    title: "Stressed Out",
    artist: "Twenty One Pilots",
    album: "Blurryface",
    artwork:
      "https://coverartarchive.org/release/9d677bea-cba5-4d96-9e93-4f07ff3ac835/10237945203-1200.jpg",
    duration: "3:45",
    currentTime: "1:32",
    color: "#C41E3A",
  },
  {
    id: "2",
    title: "Jumpsuit",
    artist: "Twenty One Pilots",
    album: "Trench",
    artwork:
      "https://coverartarchive.org/release/c926622f-8a26-40e6-834a-b8c8bf82d0d7/27605560310-1200.jpg",
    duration: "3:58",
    currentTime: "0:48",
    color: "#B8860B",
  },
  {
    id: "3",
    title: "Shy Away",
    artist: "Twenty One Pilots",
    album: "Scaled and Icy",
    artwork:
      "https://coverartarchive.org/release/c7833d51-b900-4b01-acef-3b0b9c82d971/29408818546-1200.jpg",
    duration: "2:55",
    currentTime: "2:07",
    color: "#4ECDC4",
  },
];

export const playlists = [
  {
    id: "1",
    name: "Top Hits",
    description: "Best of this week",
    artwork:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1000&q=80",
    color: "#4ECDC4",
    songCount: 24,
  },
  {
    id: "2",
    name: "Late Night",
    description: "Chill and focus",
    artwork:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1000&q=80",
    color: "#6C5CE7",
    songCount: 18,
  },
  {
    id: "3",
    name: "Workout",
    description: "High energy mix",
    artwork:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1000&q=80",
    color: "#C41E3A",
    songCount: 32,
  },
  {
    id: "4",
    name: "Acoustic",
    description: "Warm unplugged tracks",
    artwork:
      "https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=1000&q=80",
    color: "#B8860B",
    songCount: 14,
  },
];
