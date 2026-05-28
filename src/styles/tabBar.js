import BottomNav from "../components/BottomNav";

/**
 * React Navigation tab options — custom Figma BottomNav bar with variant states
 * (library / playlists / search / profile) driven by the active route.
 */
export const getTabScreenOptions = () => ({
  headerShown: false,
  tabBarShowLabel: false,
});

export const renderBottomNav = (props) => <BottomNav {...props} />;
