/**
 * GenAI disclosure (OpenAI): color tokens used for app-wide styling.
 * Prompt: "Generate theme colors for a music player app: background, card, text primary/secondary/muted/subtle, accent teal/red/gold. Output as a JSON object."
 * Outcome: Draft COLORS object with hex and rgba values for a dark UI.
 * Integration: Saved as src/styles/theme.js; adjusted textMuted/textSubtle opacity for WCAG AA contrast on #121212.
 * Reflection: Good starting palette; contrast and Figma alignment were checked manually on device.
 */
export const COLORS = {
  background: "#121212",
  card: "rgba(255,255,255,0.05)",
  cardPressed: "rgba(255,255,255,0.1)",
  textPrimary: "#ffffff",
  textSecondary: "rgba(255,255,255,0.82)",
  textMuted: "rgba(255,255,255,0.74)",
  textSubtle: "rgba(255,255,255,0.75)",
  accentTeal: "#4ECDC4",
  accentRed: "#C41E3A",
  accentGold: "#B8860B",
  tabInactive: "rgba(255,255,255,0.5)",
};
