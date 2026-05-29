# Mobile Programming Exam - Music Player

React Native prototype for the mobile programming exam with multiple screens, bottom tab navigation, native stack navigation, shared data across screens, and accessibility-focused implementation.

## Figma design

https://www.figma.com/design/1YiKZ3Vg68jOO69NVCqWEA/programming-exam?node-id=0-1&t=XPazhkUXaHDIr6eJ-1

## Screens

| Type               | Screen            | File                            |
| ------------------ | ----------------- | ------------------------------- |
| Onboarding (stack) | Library intro     | `OnboardingLibraryScreen.js`    |
| Onboarding (stack) | Now Playing intro | `OnboardingNowPlayingScreen.js` |
| Onboarding (stack) | Discover intro    | `OnboardingDiscoverScreen.js`   |
| App (tabs)         | Library           | `LibraryScreen.js`              |
| App (tabs)         | Search            | `SearchScreen.js`               |
| App (tabs)         | Playlists         | `PlaylistsScreen.js`            |
| App (tabs)         | Profile           | `ProfileScreen.js`              |
| App (stack)        | Player            | `PlayerScreen.js`               |

**8 screens total** - 3 onboarding + 5 main app (4 tabs + Player).

## Onboarding flow

- 3-step onboarding on first launch (teal / red / gold themes), each step is its own stack screen
- **Continue** navigates to the next step; **Skip** (steps 1–2) or **Enter the library** (step 3) opens the main app
- Completion is persisted with AsyncStorage (`@onboarding_complete`)

To reset onboarding: **Profile → Settings → Reset onboarding**, or clear AsyncStorage key `@onboarding_complete` and reload.

## Implemented requirements

- **Bottom tabs** (`createBottomTabNavigator`): Library, Search, Playlists, Profile
- **Native stack** (`createNativeStackNavigator`): onboarding flow, `MainTabs`, and `Player`
- **Shared data/state** across screens:
  - `songId` route param from Library and Search → Player
  - `songs` / `playlists` mock data (`src/data/songs.js`)
  - `useOnboardingStatus` (AsyncStorage) gates initial route
  - `OnboardingActionsContext` — Profile can reset onboarding and return to intro
- **Required React Native APIs** (used at least once):
  - `View`, `Text`, `Image`, `StyleSheet`, `useState`, `Pressable`, `TouchableOpacity`, `TextInput`
  - `useNavigation` — Library, Search, Player

## Accessibility (WCAG 2.2 Level A)

- Meaningful images: album art on Player has `accessibilityLabel`; list thumbnails defer to parent row labels
- Not color alone: favorites use icon + label; progress/stats/pagination include text or `accessibilityLabel`
- Headings: `accessibilityRole="header"` on each screen’s main title
- Interactive controls: `accessibilityRole`, `accessibilityLabel`, and `accessibilityHint` on buttons, inputs, and tabs
- `TextInput` on Search: role, label, and hint
- Bottom nav tabs: `accessibilityState={{ selected }}` and per-tab labels via custom `BottomNav`
- Onboarding pagination: `accessibilityLabel` with step position (e.g. “Step 2 of 3”)

## Project structure

- `App.js` — root `NavigationContainer` and theme
- `src/navigation/AppNavigator.js` — onboarding gate, tabs, stack
- `src/screens/*` — screen implementations
- `src/components/*` — Figma variant components (`Button`, `PlayButton`, `BottomNav`, `OnboardingSlideLayout`)
- `src/data/onboardingSlides.js` — onboarding copy and theme per step
- `src/data/songs.js` — mock songs and playlists
- `src/hooks/useOnboardingStatus.js` — AsyncStorage onboarding state
- `src/hooks/useCompleteOnboarding.js` — finish onboarding and reset to main tabs
- `src/context/OnboardingActionsContext.js` — reset onboarding from Profile
- `src/styles/theme.js` — shared color tokens
- `src/styles/tabBar.js` — custom tab bar wiring for `BottomNav`

## GenAI usage

Generative AI (OpenAI) was used for **styling and mock data**, not for core navigation or business logic. Every AI-assisted block is marked in code with a **GenAI disclosure** comment that includes:

- **Prompt** — what was asked
- **Outcome** — what the model returned
- **Integration** — how it was pasted and what was changed manually
- **Reflection** — what worked well and what was verified by hand

| Location                                  | AI used for                                            |
| ----------------------------------------- | ------------------------------------------------------ |
| `src/styles/theme.js`                     | Color design tokens (`COLORS`)                         |
| `src/data/songs.js`                       | Mock songs and playlists (data, not StyleSheet)        |
| `src/data/onboardingSlides.js`            | Onboarding copy, accents, gradients, CTA labels        |
| `src/screens/*.js`                        | `StyleSheet.create(...)` at bottom of each screen file |
| `src/components/OnboardingSlideLayout.js` | Onboarding layout `StyleSheet`                         |
| `App.js`                                  | `navigationTheme` colors                               |
| `src/navigation/AppNavigator.js`          | Loading `StyleSheet`                                   |

Navigation wiring and Figma variant components (`Button`, `PlayButton`, `BottomNav`) were written manually.

## Figma variant components (coded in React Native)

| Figma component set | Variants                                                                 | React Native file              | Used on                                       |
| ------------------- | ------------------------------------------------------------------------ | ------------------------------ | --------------------------------------------- |
| Primary Button      | `filled`, `ghost`                                                        | `src/components/Button.js`     | Onboarding (CTA + Skip), Search (empty state) |
| Play Button         | `play`, `pause`                                                          | `src/components/PlayButton.js` | Player (transport control)                    |
| BottomNav           | `library`, `playlists`, `search`, `profile` (Figma Default / Variant2–4) | `src/components/BottomNav.js`  | Main tab bar                                  |

**Figma → React Native:** Each component uses a variant config (`VARIANTS` or `BOTTOM_NAV_VARIANTS`). Active tab / play-pause state is driven by navigation or `useState` on the Player screen.

## Setup and run

Install dependencies and start Expo:

```bash
npm install
npm start
```
