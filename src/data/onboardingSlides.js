import { COLORS } from "../styles/theme";

/**
 * GenAI disclosure (OpenAI): onboarding slide content and per-step theme values.
 * Prompt: "Generate 3 onboarding slides for a music player app: step label, title, body copy, accent color, gradient top color, Ionicons icon name, CTA label, and whether to show Skip. Match a dark UI with teal, red, and gold accents. Output JSON array."
 * Outcome: Draft ONBOARDING_SLIDES array with marketing-style copy and hex colors for gradients/accents.
 * Integration: Saved as src/data/onboardingSlides.js; copy edited to match Figma screens (00-onboarding-1/2/3); ctaTextColor added manually for WCAG contrast on red/gold CTAs; showSkip set false on final step.
 * Reflection: AI produced usable slide structure quickly; gradient and accent values were checked against Figma and onboarding Button contrast on device.
 */

export const ONBOARDING_STORAGE_KEY = "@onboarding_complete";

export const ONBOARDING_SLIDES = [
  {
    stepLabel: "01 - LIBRARY",
    title: "Every song, in its own color.",
    body: "Your collection isn't a list. It's a spectrum - each track tinted by the mood it carries.",
    accentColor: COLORS.accentTeal,
    gradientTop: "#1B3D38",
    icon: "musical-note",
    cta: "Continue",
    ctaTextColor: "#000000",
    showSkip: true,
  },
  {
    stepLabel: "02 - NOW PLAYING",
    title: "Full-screen, full-feeling.",
    body: "A player that gets out of the way. Artwork breathes, controls hover where your thumb lives.",
    accentColor: COLORS.accentRed,
    gradientTop: "#4A1016",
    icon: "headphones",
    cta: "Continue",
    ctaTextColor: "#ffffff",
    showSkip: true,
  },
  {
    stepLabel: "03 - DISCOVER",
    title: "Playlists that read the room.",
    body: "Curated collections and instant search - find the next song before the current one ends.",
    accentColor: COLORS.accentGold,
    gradientTop: "#2B2608",
    icon: "sparkles",
    cta: "Enter the library",
    ctaTextColor: "#ffffff",
    showSkip: false,
  },
];
