import { Redirect } from 'expo-router';

/**
 * Root index redirects to the moments tab
 *
 * This ensures that when the app launches, users are immediately
 * taken to the main moments list screen within the tab navigator.
 */
export default function Index() {
  return <Redirect href="/(tabs)/moments" />;
}
